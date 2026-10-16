// Facebook page posts for /news. news.json is generated at build time by scripts/fetch-news.mjs
// (not committed); its images live in public/news/<id>-<width>.webp.
import data from './news.json';

export interface NewsPost {
  id: string;
  message: string;
  /** ISO timestamp from the Graph API, e.g. "2026-10-06T06:53:04+0000" */
  createdTime: string;
  permalink: string;
  kind: 'photo' | 'album' | 'video' | 'link' | 'text';
  photoCount?: number;
  image?: { width: number; height: number; widths: number[] };
}

export const newsPosts = (data as { posts: NewsPost[] }).posts;

// Fixed time zone so the prerendered HTML and the hydrated page print the same date.
const dateFormat = new Intl.DateTimeFormat('en-PH', { dateStyle: 'long', timeZone: 'Asia/Manila' });
export const formatPostDate = (iso: string) => dateFormat.format(new Date(iso.replace(/([+-]\d{2})(\d{2})$/, '$1:$2')));
