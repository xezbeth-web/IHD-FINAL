// Builds /llms.txt: a plain-Markdown summary of the practice for AI assistants and answer
// engines (https://llmstxt.org). Generated from the same content files as the site, so it
// stays in step with every edit. Written to dist/ by scripts/prerender.mjs.
import { disciplines, getDiscipline } from '../data/disciplines';
import { projects, sectors } from '../data/projects';
import { developers, leadership, team } from '../data/team';
import { SITE, absoluteUrl, addressLines } from './site';

export const llmsTxt = () => {
  const lines: string[] = [];
  const add = (...l: string[]) => lines.push(...l);

  add(
    `# ${SITE.name}`,
    '',
    `> ${SITE.legalName} is a technology and engineering consultancy headquartered in ${SITE.address.city}, Metro Manila, Philippines. It designs architectural acoustics, audiovisual and multimedia, security, IT and ELV infrastructure, BMS/IoT and guest room management systems for hotels and resorts, performance venues, worship spaces and commercial buildings, from discovery to commissioning.`,
    '',
    `- Website: ${SITE.url}`,
    `- Email: ${SITE.email}`,
    `- Phone: ${SITE.phoneDisplay}`,
    `- Office: ${addressLines.join(', ')}`,
    `- Hours: ${SITE.hours}`,
    `- Portfolio: ${projects.length} projects across the Philippines`,
    ...SITE.social.map((s) => `- ${s.name}: ${s.url}`),
    '',
    '## Engineering disciplines',
    '',
    ...disciplines.map((d) => `- [${d.name}](${absoluteUrl(`/disciplines/${d.slug}`)}): ${d.summary}`),
    '',
    '## Sectors',
    '',
    ...sectors.map((s) => `- [${s.name}](${absoluteUrl(`/sectors/${s.slug}`)}): ${s.description}`),
    '',
    '## Project portfolio',
    '',
    ...projects.map((p) => {
      const scope = p.disciplines.map((s) => getDiscipline(s)!.name).join(', ');
      return `- [${p.name}](${absoluteUrl(`/projects/${p.slug}`)}): ${p.types[0]}, ${p.location}. Scope: ${scope}.`;
    }),
    '',
    '## People',
    '',
    ...[...leadership, ...team].map((p) => `- ${p.name}: ${p.role}`),
    '',
    '## Property developers IHD has worked with',
    '',
    ...developers.map((d) => `- ${d.name}`),
    '',
    '## Key pages',
    '',
    `- [Practice profile](${absoluteUrl('/about')}): who IHD is, approach, leadership and team`,
    `- [Engineering disciplines](${absoluteUrl('/disciplines')}): overview of the six disciplines`,
    `- [Project portfolio](${absoluteUrl('/projects')}): all projects, filterable by discipline and sector`,
    `- [Partners](${absoluteUrl('/partners')}): developer relationships and collaborators`,
    `- [Contact](${absoluteUrl('/contact')}): request technical advisory`,
    ''
  );
  return lines.join('\n');
};
