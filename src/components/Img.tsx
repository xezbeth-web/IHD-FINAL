import type { ImgHTMLAttributes } from 'react';
import manifest from '../data/images.json';

interface Entry {
  width: number;
  height: number;
  widths: number[];
  og?: boolean;
}

const images = manifest as Record<string, Entry>;

const variant = (key: string, width: number) => `/images/${key}-${width}.webp`;

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'> {
  /** Manifest key, e.g. "projects/thefifthrockwell" (see scripts/optimize-images.mjs) */
  src: string;
  alt: string;
  /** Above-the-fold images load eagerly with high fetch priority */
  priority?: boolean;
}

export const Img = ({ src, alt, sizes = '100vw', priority = false, ...rest }: ImgProps) => {
  const entry = images[src];
  if (!entry) {
    if (import.meta.env.DEV) console.warn(`Missing image in manifest: ${src}`);
    return null;
  }
  const { widths } = entry;
  const fallback = widths[Math.min(1, widths.length - 1)];
  const priorityAttrs = priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {};

  return (
    <img
      src={variant(src, fallback)}
      srcSet={widths.map((w) => `${variant(src, w)} ${w}w`).join(', ')}
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
};

/** Absolute-path Open Graph JPEG (1200×630) for a manifest key, if one was generated. */
export const ogImageFor = (src: string) => (images[src]?.og ? `/images/og/${src.split('/').pop()}.jpg` : undefined);

/** Intrinsic dimensions of a manifest image, e.g. to avoid upscaling low-resolution sources. */
export const imageSize = (src: string) => images[src] && { width: images[src].width, height: images[src].height };
