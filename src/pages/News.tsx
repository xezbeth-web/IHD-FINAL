import { Fragment } from 'react';
import { ArrowUpRight } from '../components/Icons';
import Scene from '../components/Scene';
import { SocialIcon } from '../components/SocialIcons';
import { CtaBand, PageHero, delay } from '../components/ui';
import { formatPostDate, newsPosts, type NewsPost } from '../data/news';
import { breadcrumbs, graph, webPage } from '../lib/schema';
import { Seo } from '../lib/seo';
import { SITE, socialUrl } from '../lib/site';

const TITLE = 'News & Updates | IHD Philippines';
const DESCRIPTION =
  'The latest news and project updates from IHD Philippines on architectural acoustics, audiovisual solutions and intelligent building systems, posted on our Facebook page.';
const PATH = '/news';

const facebook = socialUrl('Facebook');
const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Post text with links and hashtags made clickable; line breaks are kept by the parent's CSS. */
const RichText = ({ text }: { text: string }) => (
  <>
    {text.split(/(https?:\/\/[^\s]+|#[\p{L}\p{N}_]+)/u).map((part, i) => {
      if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
      if (part.startsWith('#')) {
        return (
          <a key={i} href={`https://www.facebook.com/hashtag/${encodeURIComponent(part.slice(1))}`} {...external} className="text-signal hover:underline">
            {part}
          </a>
        );
      }
      // Leave sentence punctuation that follows a URL outside the link.
      const [, url, trail] = part.match(/^(.*?)([.,!?;:)]*)$/)!;
      return (
        <Fragment key={i}>
          <a href={url} {...external} className="break-words text-signal hover:underline">
            {url}
          </a>
          {trail}
        </Fragment>
      );
    })}
  </>
);

const PostImage = ({ post, sizes, priority = false }: { post: NewsPost; sizes: string; priority?: boolean }) => {
  if (!post.image) return null;
  const { width, height, widths } = post.image;
  const src = (w: number) => `/news/${post.id}-${w}.webp`;
  return (
    <img
      src={src(widths[widths.length - 1])}
      srcSet={widths.map((w) => `${src(w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={width}
      height={height}
      // The post text sits right beside the picture, so the image itself is decorative.
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
    />
  );
};

const MediaBadge = ({ post }: { post: NewsPost }) => {
  const label = post.kind === 'album' && post.photoCount ? `${post.photoCount} photos` : post.kind === 'video' ? 'Video' : null;
  if (!label) return null;
  return (
    <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
      {label}
    </span>
  );
};

const PostDate = ({ post }: { post: NewsPost }) => (
  <time dateTime={post.createdTime} className="label">
    {formatPostDate(post.createdTime)}
  </time>
);

/** The newest post, shown in full. */
const FeaturedPost = ({ post }: { post: NewsPost }) => (
  <article
    className={`group grid overflow-hidden rounded-lg border border-white/10 bg-surface ${post.image ? 'lg:grid-cols-12' : ''}`}
    data-rv
    aria-labelledby={`post-${post.id}`}
  >
    {post.image && (
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-raised lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
        <PostImage post={post} sizes="(min-width: 1024px) 58vw, 100vw" priority />
        <MediaBadge post={post} />
      </div>
    )}
    <div className={`flex flex-col gap-6 p-7 md:p-9 ${post.image ? 'lg:col-span-5' : 'max-w-3xl'}`}>
      <div className="flex items-center gap-3">
        <span className="chip-signal">Latest</span>
        <PostDate post={post} />
      </div>
      <h3 id={`post-${post.id}`} className="sr-only">
        Facebook post from {formatPostDate(post.createdTime)}
      </h3>
      <p className="whitespace-pre-line text-[15px] font-light leading-[1.8] text-ink-body md:text-base">
        <RichText text={post.message} />
      </p>
      <a href={post.permalink} {...external} className="link-arrow mt-auto self-start">
        View on Facebook <ArrowUpRight />
      </a>
    </div>
  </article>
);

/** Older posts: a preview of the text, with the whole card linking to the post on Facebook. */
const PostCard = ({ post, index }: { post: NewsPost; index: number }) => (
  <li className="h-full" data-rv style={delay(120 + (index % 3) * 90)}>
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-surface transition-colors duration-500 hover:border-white/25">
      {post.image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-raised">
          <PostImage post={post} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          <MediaBadge post={post} />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div>
          <PostDate post={post} />
          <p className={`mt-3 whitespace-pre-line text-sm font-light leading-[1.75] text-ink-body ${post.image ? 'line-clamp-5' : 'line-clamp-[12]'}`}>
            {post.message || 'Photo post'}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <a href={post.permalink} {...external} className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-secondary transition-colors after:absolute after:inset-0 group-hover:text-ink">
            View on Facebook<span className="sr-only">: post from {formatPostDate(post.createdTime)}</span>
          </a>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink-secondary transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:text-signal"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  </li>
);

const FollowLinks = () => (
  <div className="mt-10 flex flex-wrap items-center gap-3">
    <a href={facebook} {...external} className="btn-primary">
      <SocialIcon name="Facebook" />
      Follow on Facebook
    </a>
    {SITE.social
      .filter((s) => s.name !== 'Facebook')
      .map((s) => (
        <a key={s.name} href={s.url} {...external} className="btn-ghost px-4" aria-label={`IHD Philippines on ${s.name}`}>
          <SocialIcon name={s.name} />
        </a>
      ))}
  </div>
);

const News = () => {
  const [featured, ...rest] = newsPosts;
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        jsonLd={graph(
          webPage('CollectionPage', PATH, TITLE, DESCRIPTION, {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: newsPosts.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'SocialMediaPosting',
                  url: p.permalink,
                  datePublished: p.createdTime,
                  articleBody: p.message,
                  author: { '@type': 'Organization', name: SITE.legalName, url: SITE.url }
                }
              }))
            }
          }),
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'News', path: PATH }
          ])
        )}
      />

      <PageHero
        compact
        eyebrow="News & Updates"
        trail={[
          { name: 'Home', path: '/' },
          { name: 'News', path: PATH }
        ]}
        title="News and updates from IHD Philippines"
        lead="Project milestones, announcements and insights on architectural acoustics, audiovisual solutions and intelligent building systems, straight from our Facebook page."
      >
        <FollowLinks />
      </PageHero>

      <Scene tone="alt" aria-labelledby="feed-heading" full={false}>
        <div className="container-site scene-pad">
          <h2 id="feed-heading" className="sr-only">
            Latest posts
          </h2>
          {featured ? (
            <>
              <FeaturedPost post={featured} />
              {rest.length > 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </ul>
              )}
              <a href={facebook} {...external} className="link-arrow mt-12" data-rv="fade">
                See every post on Facebook <ArrowUpRight />
              </a>
            </>
          ) : (
            <div className="flex flex-col items-start gap-6 rounded-lg border border-white/10 bg-surface p-8 md:p-10" data-rv>
              <p className="max-w-xl font-display text-2xl font-light text-ink">Our latest updates are on Facebook.</p>
              <p className="prose-body max-w-xl">New posts appear here automatically. In the meantime, follow us to see them as they go up.</p>
              <a href={facebook} {...external} className="link-arrow">
                Visit our Facebook page <ArrowUpRight />
              </a>
            </div>
          )}
        </div>
      </Scene>

      <CtaBand />
    </>
  );
};

export default News;
