import type { ImgHTMLAttributes } from 'react';
import manifest from '../data/images.json';

interface Entry {
  width: number;
  height: number;
  widths: number[];
  avif?: boolean;
  og?: boolean;
}

const images = manifest as Record<string, Entry>;

const variant = (key: string, width: number, ext: 'webp' | 'avif' = 'webp') => `/images/${key}-${width}.${ext}`;
const srcSetFor = (key: string, widths: number[], ext: 'webp' | 'avif') =>
  widths.map((w) => `${variant(key, w, ext)} ${w}w`).join(', ');

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'> {
  /** Manifest key, e.g. "projects/thefifthrockwell" (see scripts/optimize-images.mjs) */
  src: string;
  alt: string;
  /** Above-the-fold images load eagerly with high fetch priority */
  priority?: boolean;
}

/**
 * Responsive image. Serves AVIF (typically 30–50% smaller) with WebP as the fallback for any
 * browser that can't decode it; the <picture> wrapper is inline and doesn't affect layout.
 */
export const Img = ({ src, alt, sizes = '100vw', priority = false, ...rest }: ImgProps) => {
  const entry = images[src];
  if (!entry) {
    if (import.meta.env.DEV) console.warn(`Missing image in manifest: ${src}`);
    return null;
  }
  const { widths } = entry;
  const fallback = widths[Math.min(1, widths.length - 1)];
  const priorityAttrs = priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {};

  const img = (
    <img
      src={variant(src, fallback)}
      srcSet={srcSetFor(src, widths, 'webp')}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...priorityAttrs}
      {...rest}
    />
  );

  if (!entry.avif) return img;
  return (
    <picture>
      <source type="image/avif" srcSet={srcSetFor(src, widths, 'avif')} sizes={sizes} />
      {img}
    </picture>
  );
};

/** Absolute-path Open Graph JPEG (1200×630) for a manifest key, if one was generated. */
export const ogImageFor = (src: string) => (images[src]?.og ? `/images/og/${src.split('/').pop()}.jpg` : undefined);

/** Intrinsic dimensions of a manifest image, e.g. to avoid upscaling low-resolution sources. */
export const imageSize = (src: string) => images[src] && { width: images[src].width, height: images[src].height };
