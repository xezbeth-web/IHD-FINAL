// Pulls the latest posts from the IHD Facebook page for the /news page.
//
//   FB_PAGE_ID=... FB_PAGE_TOKEN=... node scripts/fetch-news.mjs
//
// Writes src/data/news.json and resized post images to public/news/. Neither is committed: CI
// runs this before every build and caches the result (.github/workflows/deploy.yml), so if
// Facebook is unreachable or the token has lapsed, the site is built from the last good fetch
// instead of failing. Without credentials (local dev) it keeps whatever is already there.
//
// Images are downloaded rather than hotlinked because Facebook's CDN URLs are signed and expire.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'src', 'data', 'news.json');
const OUT = path.join(ROOT, 'public', 'news');

const LIMIT = 12;
const WIDTHS = [480, 960];
// Unversioned calls use the app's default Graph API version, which Meta moves forward as old
// versions retire, so this never breaks on a version sunset.
const GRAPH = 'https://graph.facebook.com';
const FIELDS = [
  'message',
  'story',
  'created_time',
  'permalink_url',
  'full_picture',
  'attachments{media_type,media{image{width,height}},subattachments.limit(50){media_type}}'
].join(',');

const readExisting = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch {
    return null;
  }
};

const keepExisting = (reason) => {
  const existing = readExisting();
  if (!existing) {
    fs.mkdirSync(path.dirname(DATA), { recursive: true });
    fs.writeFileSync(DATA, JSON.stringify({ fetchedAt: null, posts: [] }, null, 2) + '\n');
  }
  console.log(`News: ${reason}; ${existing ? `keeping ${existing.posts.length} cached post(s)` : 'no cached posts'}.`);
};

const { FB_PAGE_ID: pageId, FB_PAGE_TOKEN: token } = process.env;

const fetchPosts = async () => {
  // The token goes in a header, never the URL, so it can't leak into logs or error messages.
  const url = `${GRAPH}/${encodeURIComponent(pageId)}/posts?fields=${encodeURIComponent(FIELDS)}&limit=${LIMIT * 2}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(20_000) });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Graph API ${res.status}: ${body.error?.message ?? 'unknown error'}`);
  return body.data ?? [];
};

/** Downloads a post's picture and writes WebP variants; returns the manifest entry or undefined. */
const saveImage = async (id, src) => {
  const res = await fetch(src, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`image ${res.status}`);
  const base = sharp(Buffer.from(await res.arrayBuffer())).rotate();
  const { width, height } = await base.metadata();
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, width)))];
  for (const w of widths) {
    await base.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(OUT, `${id}-${w}.webp`));
  }
  return { width, height, widths };
};

const kindOf = (attachment) => {
  switch (attachment?.media_type) {
    case 'album':
      return 'album';
    case 'video':
      return 'video';
    case 'link':
      return 'link';
    case 'photo':
      return 'photo';
    default:
      return 'text';
  }
};

const run = async () => {
  if (!pageId || !token) return keepExisting('FB_PAGE_ID / FB_PAGE_TOKEN not set, skipping fetch');

  let raw;
  try {
    raw = await fetchPosts();
  } catch (error) {
    return keepExisting(`fetch failed (${error.message})`);
  }

  const previous = new Map((readExisting()?.posts ?? []).map((p) => [p.id, p]));
  fs.mkdirSync(OUT, { recursive: true });

  const posts = [];
  let skipped = 0;
  for (const item of raw) {
    if (posts.length === LIMIT) break;
    // Keep anything with a caption, and photo posts without one. Skip automatic activity
    // ("IHD Philippines updated their cover photo"), which carries a story but no message.
    const message = item.message?.trim() ?? '';
    if (!message && (item.story || !item.full_picture)) {
      skipped++;
      continue;
    }

    // Post IDs are "<pageId>_<postId>"; the second half is unique and filename-safe.
    const id = item.id.split('_').pop();
    const attachment = item.attachments?.data?.[0];
    const kind = kindOf(attachment);

    let image;
    const cached = previous.get(id)?.image;
    if (cached && cached.widths.every((w) => fs.existsSync(path.join(OUT, `${id}-${w}.webp`)))) {
      image = cached;
    } else if (item.full_picture) {
      try {
        image = await saveImage(id, item.full_picture);
      } catch (error) {
        console.warn(`News: could not save the image for post ${id} (${error.message}); showing it without one.`);
      }
    }

    posts.push({
      id,
      message,
      createdTime: item.created_time,
      permalink: item.permalink_url,
      kind,
      ...(kind === 'album' ? { photoCount: attachment.subattachments?.data?.length ?? 0 } : {}),
      ...(image ? { image } : {})
    });
  }

  // Remove images of posts that have dropped off the feed.
  const keep = new Set(posts.flatMap((p) => (p.image ? p.image.widths.map((w) => `${p.id}-${w}.webp`) : [])));
  for (const file of fs.readdirSync(OUT)) if (!keep.has(file)) fs.rmSync(path.join(OUT, file));

  fs.writeFileSync(DATA, JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2) + '\n');
  console.log(`News: saved ${posts.length} post(s) from Facebook (${raw.length} returned, ${skipped} automatic or empty skipped).`);
};

await run();
