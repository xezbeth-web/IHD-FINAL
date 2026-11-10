// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver…) that the site's pages changed,
// so they recrawl within hours instead of weeks. Bing's index also feeds ChatGPT search and
// Copilot answers.
//
//   npm run indexnow                      # every URL in the live sitemap
//   npm run indexnow -- /about /contact   # only these paths
//
// Run it AFTER a deploy has finished (the key file and pages must be live). It is deliberately
// not part of the scheduled daily build: resubmitting unchanged pages every day is discouraged.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'ihd-mnl.com';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// The key is the name of the .txt file in public/ whose content is that same key.
const keyFile = fs
  .readdirSync(path.join(root, 'public'))
  .find((f) => /^[a-f0-9]{32}\.txt$/.test(f) && fs.readFileSync(path.join(root, 'public', f), 'utf8').trim() === f.slice(0, 32));
if (!keyFile) throw new Error('No IndexNow key file (32 hex chars .txt) found in public/');
const key = keyFile.slice(0, 32);

const paths = process.argv.slice(2);
let urlList;
if (paths.length) {
  urlList = paths.map((p) => `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`);
} else {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch the live sitemap (${res.status})`);
  urlList = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !u.includes('/images/'));
}

const keyCheck = await fetch(`https://${HOST}/${key}.txt`);
if (!keyCheck.ok) throw new Error(`Key file is not live yet at https://${HOST}/${key}.txt — deploy first, then rerun.`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList })
});
// 200 = accepted, 202 = accepted pending key validation.
console.log(`IndexNow: submitted ${urlList.length} URL(s) → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exitCode = 1;
