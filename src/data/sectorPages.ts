import type { DisciplineSlug } from './disciplines';
import { projects, type SectorSlug } from './projects';

export interface SectorPage {
  slug: SectorSlug;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string[];
  /** Why each discipline matters in this sector, in priority order */
  focus: { discipline: DisciplineSlug; detail: string }[];
  cover: string;
}

const count = (slug: SectorSlug) => projects.filter((p) => p.sector === slug).length;

export const sectorPages: SectorPage[] = [
  {
    slug: 'hospitality',
    eyebrow: 'Sector · Hotels & Resorts',
    h1: 'Hotel and resort technology consultancy',
    seoTitle: 'Hotel AV, Acoustics & Technology Consultant Philippines | IHD',
    metaDescription: `Technology consultancy for hotels and resorts in the Philippines: ballroom AV, acoustics, hotel networks, security and GRMS across ${count('hospitality')} hospitality projects.`,
    intro: [
      'Hotels and resorts are the largest part of IHD’s portfolio — city hotels, beach resorts, serviced residences, an integrated resort and casino, and hotel health clubs, from Metro Manila to Cebu, Boracay, Palawan, Davao and Clark.',
      'In hospitality, technology is part of the guest experience. Ballrooms must handle a wedding one night and a conference the next, restaurants and rooftop venues must sound right, guest rooms must be quiet, connected and efficient, and back-of-house networks and security must run around the clock.'
    ],
    focus: [
      { discipline: 'audiovisual', detail: 'Ballrooms, function rooms, restaurants, health clubs and public areas — sound reinforcement, displays and background audio.' },
      { discipline: 'acoustics', detail: 'Noise control between guest rooms, plant and venues, and room acoustics for ballrooms, restaurants and rooftop spaces.' },
      { discipline: 'information-technology', detail: 'Guest and back-of-house networks, Wi-Fi and the structured cabling every hotel system depends on.' },
      { discipline: 'security', detail: 'CCTV, access control and centralised monitoring across large, open properties.' },
      { discipline: 'guest-room-management', detail: 'In-room automation, occupancy-based energy management, door lock and PMS integration.' }
    ],
    cover: 'hotel-okura-manila'
  },
  {
    slug: 'worship',
    eyebrow: 'Sector · Worship Spaces',
    h1: 'Church acoustics and audiovisual design',
    seoTitle: 'Church Acoustics & Sound System Design Philippines | IHD',
    metaDescription:
      'Church acoustics, sound system and AV design in the Philippines: speech intelligibility, music support, displays and streaming for churches and chapels.',
    intro: [
      'Worship spaces ask more of acoustics and AV than almost any other building type. The spoken word must be clearly understood in every seat, while music — congregational singing, choirs, organ or a worship band — needs warmth and support.',
      'IHD has designed audiovisual and acoustic systems for city churches in Makati and Quezon City and for a chapel set within a busy shopping complex in Ortigas — balancing intelligibility, music, video and streaming in rooms that are often also used for events and community gatherings.'
    ],
    focus: [
      { discipline: 'acoustics', detail: 'Room acoustics that balance speech intelligibility with support for music, plus isolation from traffic, mall and plant noise.' },
      { discipline: 'audiovisual', detail: 'Speech and music reinforcement, projection and LED displays, and streaming for congregations at home.' }
    ],
    cover: 'full-gospel-church-makati'
  },
  {
    slug: 'culture-education',
    eyebrow: 'Sector · Performance, Culture & Education',
    h1: 'Acoustics and AV for theaters, events halls and auditoriums',
    seoTitle: 'Theater, Auditorium & Events Hall Acoustics Philippines | IHD',
    metaDescription:
      'Acoustic and AV consultancy for theaters, auditoriums, events halls and museums in the Philippines, including Rockwell Performing Arts Theater and The Fifth.',
    intro: [
      'Performance and assembly spaces are where acoustics is most audible. IHD’s portfolio includes the Rockwell Performing Arts Theater and The Fifth at Rockwell in Makati, a school auditorium in Pasig and a museum attraction in Mactan, Cebu.',
      'Each room type has its own brief: a theater needs clarity and envelopment for performance, an events hall must adapt between conferences and celebrations, an auditorium serves academic programs and community events, and a museum uses media to tell its story.'
    ],
    focus: [
      { discipline: 'acoustics', detail: 'Room acoustics for performance and speech, sound isolation between venues, and control of mechanical noise.' },
      { discipline: 'audiovisual', detail: 'Sound reinforcement, stage and event lighting control, projection and immersive media for exhibits.' }
    ],
    cover: 'rockwell-performing-arts-theater'
  },
  {
    slug: 'commercial-residential',
    eyebrow: 'Sector · Commercial & Residential',
    h1: 'Technology consultancy for office and residential towers',
    seoTitle: 'Office & Residential Tower Technology Consultant Philippines | IHD',
    metaDescription:
      'Acoustics, AV, IT, ELV and security consultancy for office and residential towers in Metro Manila, including Metrobank Center Grand Hyatt and Eton Tower.',
    intro: [
      'Towers concentrate many users, systems and tenants in one building. IHD’s work in this sector includes Metrobank Center Grand Hyatt in Bonifacio Global City, the Philam Life Building and Eton Tower in Makati, and ESL Tower & Garden Wing in Mandaluyong.',
      'The priorities are a resilient network backbone, security that manages residents, tenants and visitors, acoustic comfort against city and building services noise, and AV for lobbies, amenities and meeting spaces.'
    ],
    focus: [
      { discipline: 'information-technology', detail: 'Backbone networks, structured cabling and telecom rooms for tenants, residents and building systems.' },
      { discipline: 'security', detail: 'Access control, visitor management and CCTV for lobbies, car parks and amenities.' },
      { discipline: 'acoustics', detail: 'Protection from traffic, plant and neighbour noise in offices and homes.' },
      { discipline: 'audiovisual', detail: 'Lobby, amenity and meeting room systems that are simple for building staff to run.' },
      { discipline: 'iot-smart-buildings', detail: 'Building management and energy monitoring for central plant and common areas.' }
    ],
    cover: 'metrobank-center-grand-hyatt'
  }
];

export const getSectorPage = (slug: string | undefined) => sectorPages.find((s) => s.slug === slug);
