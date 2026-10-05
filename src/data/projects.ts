import type { DisciplineSlug } from './disciplines';

// Portfolio. Facts (name, location, project type, disciplines) come from IHD's existing
// project register. Do not add scope, outcomes or clients that are not recorded here.

export type SectorSlug = 'hospitality' | 'worship' | 'culture-education' | 'commercial-residential';
export type Region = 'Metro Manila' | 'Cebu' | 'Boracay' | 'Palawan' | 'Davao' | 'Clark, Pampanga';

export interface Project {
  slug: string;
  /** IHD project number, also the legacy URL id (/projects/PA123001) */
  projectNumber: string;
  name: string;
  summary: string;
  location: string;
  region: Region;
  types: string[];
  sector: SectorSlug;
  disciplines: DisciplineSlug[];
  image: string;
  imageAlt: string;
  gallery?: { image: string; alt: string }[];
}

export const sectors: { slug: SectorSlug; name: string; description: string }[] = [
  {
    slug: 'hospitality',
    name: 'Hotels & Resorts',
    description: 'City hotels, beach resorts, serviced residences, integrated resorts and hotel health clubs.'
  },
  {
    slug: 'worship',
    name: 'Worship Spaces',
    description: 'Churches and chapels where speech intelligibility and music both matter.'
  },
  {
    slug: 'culture-education',
    name: 'Performance, Culture & Education',
    description: 'Theaters, events halls, museums and school auditoriums.'
  },
  {
    slug: 'commercial-residential',
    name: 'Commercial & Residential',
    description: 'Office and bank towers and residential developments.'
  }
];

export const projects: Project[] = [
  {
    slug: 'metrobank-center-grand-hyatt',
    projectNumber: 'PA123001',
    name: 'Metrobank Center Grand Hyatt',
    summary:
      'Metrobank Center Grand Hyatt in Bonifacio Global City, Taguig — a landmark mixed-use development in one of Metro Manila’s prime business districts.',
    location: 'Bonifacio Global City, Taguig',
    region: 'Metro Manila',
    types: ['Bank'],
    sector: 'commercial-residential',
    disciplines: ['audiovisual', 'information-technology'],
    image: 'projects/metrobankcenter',
    imageAlt: 'Glass curtain-wall towers of Metrobank Center and Grand Hyatt Manila rising over Bonifacio Global City',
    gallery: [
      {
        image: 'projects/metrobankcentergrandhyatt',
        alt: 'Upward view of the Metrobank Center Grand Hyatt tower façade against a clear sky'
      }
    ]
  },
  {
    slug: 'ascott-residences-makati',
    projectNumber: 'PA123002',
    name: 'Ascott Residences',
    summary:
      'Ascott Residences in Makati City, a premium serviced residence within the city’s central business and lifestyle district.',
    location: 'Makati City',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual'],
    image: 'projects/ascott',
    imageAlt: 'Twin residential towers and entrance driveway of Ascott Residences in Makati City'
  },
  {
    slug: 'crimson-boracay',
    projectNumber: 'PA123006',
    name: 'Crimson Boracay Resort',
    summary:
      'Crimson Boracay Resort, a beachfront destination on one of the Philippines’ most popular white-sand island getaways.',
    location: 'Boracay',
    region: 'Boracay',
    types: ['Hotel & Resort'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics', 'information-technology', 'security'],
    image: 'projects/crimsonboracay',
    imageAlt: 'Infinity pool and cabana overlooking the sea at Crimson Boracay Resort'
  },
  {
    slug: 'grand-hyatt-residences',
    projectNumber: 'PA133001',
    name: 'Grand Hyatt Residences',
    summary:
      'Grand Hyatt Residences in Taguig City, a high-end residential development offering premium living in a modern urban setting.',
    location: 'Taguig City',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['security'],
    image: 'projects/grandhyatt',
    imageAlt: 'Artist’s perspective of a Grand Hyatt Residences bedroom with floor-to-ceiling city views'
  },
  {
    slug: 'savoy-hotel-newport',
    projectNumber: 'PA133003',
    name: 'Savoy Hotel Newport',
    summary:
      'Savoy Hotel Newport in Newport City, Pasay — a contemporary hotel serving travelers beside the airport and integrated resort complex.',
    location: 'Newport City, Pasay City',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual'],
    image: 'projects/savoynewport',
    imageAlt: 'Savoy Hotel tower façade above the Newport City entrance sculpture in Pasay'
  },
  {
    slug: 'winford-resort-casino',
    projectNumber: 'PA133009',
    name: 'Winford Resort & Casino',
    summary:
      'Winford Resort & Casino in Metro Manila, a hospitality and gaming destination serving guests from across the capital region.',
    location: 'Metro Manila',
    region: 'Metro Manila',
    types: ['Resort & Casino'],
    sector: 'hospitality',
    disciplines: ['audiovisual'],
    image: 'projects/winford',
    imageAlt: 'Gaming floor beneath ornate chandeliers at Winford Resort & Casino, Manila'
  },
  {
    slug: 'hilton-manila',
    projectNumber: 'PA133011',
    name: 'Hilton Manila',
    summary:
      'Hilton in Newport City, Pasay — an international hotel brand within a vibrant integrated resort and commercial precinct.',
    location: 'Newport City, Pasay City',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'information-technology'],
    image: 'projects/hilton',
    imageAlt: 'Hotel lobby lounge with sculptural chandelier and marble finishes at Hilton Manila'
  },
  {
    slug: 'dusit-davao',
    projectNumber: 'PA133013',
    name: 'Dusit Davao Hotel',
    summary:
      'Dusit Davao Hotel in Davao City, a lakeside-style urban resort serving both business travelers and leisure guests in Mindanao.',
    location: 'Davao City',
    region: 'Davao',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['information-technology'],
    image: 'projects/dusit',
    imageAlt: 'Illuminated entrance and tower of Dusit Davao Hotel in Davao City at dusk'
  },
  {
    slug: 'shangri-la-mactan',
    projectNumber: 'PA133014',
    name: 'Shangri-La Mactan',
    summary:
      'Renovation works at Shangri-La Mactan, Cebu — a well-known beachfront resort overlooking tropical waters and landscaped grounds.',
    location: 'Mactan, Cebu',
    region: 'Cebu',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual'],
    image: 'projects/shangmactan',
    imageAlt: 'Garden pool and pavilion at Shangri-La Mactan resort in the evening'
  },
  {
    slug: 'edsa-shangri-la-health-club',
    projectNumber: 'PA133015',
    name: 'EDSA Shangri-La Health Club',
    summary:
      'EDSA Shangri-La Health Club in Mandaluyong City, a wellness facility within a major city hotel complex.',
    location: 'Mandaluyong City, Metro Manila',
    region: 'Metro Manila',
    types: ['Fitness Center'],
    sector: 'hospitality',
    disciplines: ['audiovisual'],
    image: 'projects/edsashangcenter',
    imageAlt: 'Functional training rig and fitness equipment in the EDSA Shangri-La Health Club'
  },
  {
    slug: 'makati-shangri-la-health-club-inagiku',
    projectNumber: 'PA133016',
    name: 'Makati Shangri-La Health Club & Inagiku',
    summary:
      'Makati Shangri-La Health Club & Inagiku in Makati, providing fitness and dining spaces in a landmark luxury hotel.',
    location: 'Makati, Metro Manila',
    region: 'Metro Manila',
    types: ['Fitness Center'],
    sector: 'hospitality',
    disciplines: ['audiovisual'],
    image: 'projects/makatishang',
    imageAlt: 'Timber-panelled corridor in the Makati Shangri-La Health Club'
  },
  {
    slug: 'full-gospel-church-makati',
    projectNumber: 'PA143001',
    name: 'Full Gospel Church',
    summary:
      'Full Gospel Church in Makati, Metro Manila — a city church serving a growing congregation in a dense urban environment.',
    location: 'Makati, Metro Manila',
    region: 'Metro Manila',
    types: ['Church'],
    sector: 'worship',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/fullgospel',
    imageAlt: 'Congregation facing the sanctuary, pipe organ and twin projection screens at Full Gospel Church, Makati'
  },
  {
    slug: 'savoy-hotel-mactan',
    projectNumber: 'PA143002',
    name: 'Savoy Hotel Mactan',
    summary:
      'Savoy Hotel Mactan, Cebu — a hotel catering to resort guests and business travelers near beaches and commercial hubs.',
    location: 'Mactan, Cebu',
    region: 'Cebu',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/savoymactan',
    imageAlt: 'All-day dining restaurant and pool deck at Savoy Hotel Mactan'
  },
  {
    slug: 'esl-tower-garden-wing',
    projectNumber: 'PA143003',
    name: 'ESL Tower & Garden Wing',
    summary:
      'ESL Tower & Garden Wing in Mandaluyong City, Metro Manila, a development within a wider mixed-use community.',
    location: 'Mandaluyong City, Metro Manila',
    region: 'Metro Manila',
    types: ['Residential'],
    sector: 'commercial-residential',
    disciplines: ['audiovisual'],
    image: 'projects/eslgarden',
    imageAlt: 'Landscaped tropical garden and water feature at ESL Tower & Garden Wing, Mandaluyong'
  },
  {
    slug: 'savoy-hotel-boracay',
    projectNumber: 'PA143004',
    name: 'Savoy Hotel Boracay',
    summary:
      'Savoy Hotel Boracay, a resort hotel offering direct access to one of the island’s leisure and beachfront areas.',
    location: 'Boracay',
    region: 'Boracay',
    types: ['Hotel & Resort'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/savoyboracay',
    imageAlt: 'Resort pool framed by guest room wings at Savoy Hotel Boracay'
  },
  {
    slug: 'savoy-hotel-bayshore-mactan',
    projectNumber: 'PA143005',
    name: 'Savoy Hotel Bayshore',
    summary: 'Savoy Hotel Bayshore in Mactan, Cebu — a coastal hotel development designed for both holiday and business stays.',
    location: 'Mactan, Cebu',
    region: 'Cebu',
    types: ['Hotel & Resort'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/savoyhotelbayshore',
    imageAlt: 'Savoy Hotel Bayshore tower illuminated at night in Mactan, Cebu'
  },
  {
    slug: 'philam-life-building',
    projectNumber: 'PA143007',
    name: 'Philam Life Building',
    summary: 'Philam Life Building in Makati, Metro Manila — an office property in a key business and commercial district.',
    location: 'Makati, Metro Manila',
    region: 'Metro Manila',
    types: ['Business'],
    sector: 'commercial-residential',
    disciplines: ['acoustics'],
    image: 'projects/philamlife',
    imageAlt: 'Philam Life office tower in Makati framed by palm trees'
  },
  {
    slug: 'belmont-hotel-mactan',
    projectNumber: 'PA143009',
    name: 'Belmont Hotel Mactan',
    summary:
      'Belmont Hotel Mactan, Cebu — a hotel serving tourists and corporate guests near the island’s resorts and airport.',
    location: 'Mactan, Cebu',
    region: 'Cebu',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/belmontmactan',
    imageAlt: 'Glass façade and signage of Belmont Hotel Mactan'
  },
  {
    slug: 'eton-tower-makati',
    projectNumber: 'PA143010',
    name: 'Eton Tower',
    summary:
      'Eton Tower in Makati, Metro Manila — a residential tower located close to offices, retail and transport connections.',
    location: 'Makati, Metro Manila',
    region: 'Metro Manila',
    types: ['Residential'],
    sector: 'commercial-residential',
    disciplines: ['audiovisual', 'acoustics', 'information-technology', 'security'],
    image: 'projects/etontower',
    imageAlt: 'Residential lobby and reception desk beneath a circular chandelier at Eton Tower, Makati'
  },
  {
    slug: 'marco-polo-ortigas-ballroom',
    projectNumber: 'PA153001',
    name: 'Marco Polo Hotel Ballroom Renovation',
    summary:
      'Ballroom renovation at Marco Polo Hotel in Ortigas — upgrading a major events venue within a prominent city hotel.',
    location: 'Ortigas, Manila',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual'],
    image: 'projects/ballroommarco',
    imageAlt: 'Banquet set-up beneath a timber feature ceiling in the renovated Marco Polo Ortigas ballroom'
  },
  {
    slug: 'pasig-catholic-school-auditorium',
    projectNumber: 'PA153003',
    name: 'Pasig Catholic School Auditorium',
    summary:
      'Pasig Catholic School Auditorium in Pasig City — a multipurpose hall used for academic programs, performances and community events.',
    location: 'Pasig City',
    region: 'Metro Manila',
    types: ['School'],
    sector: 'culture-education',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/pasigcatholic',
    imageAlt: 'Entrance gable with mosaic artwork at the Pasig Catholic school auditorium'
  },
  {
    slug: 'shangri-la-plaza-chapel',
    projectNumber: 'PA153005',
    name: 'Shangri-La Plaza Mall Chapel',
    summary:
      'The chapel at Shangri-La Plaza in Ortigas — a worship space integrated within a major shopping and lifestyle complex.',
    location: 'Ortigas, Manila',
    region: 'Metro Manila',
    types: ['Chapel'],
    sector: 'worship',
    disciplines: ['audiovisual'],
    image: 'projects/shangrilaplazachapel',
    imageAlt: 'Rows of timber pews under cove lighting in the Shangri-La Plaza Mall chapel'
  },
  {
    slug: 'christian-bible-church-quezon-city',
    projectNumber: 'PA153006',
    name: 'Christian Bible Church',
    summary:
      'Christian Bible Church in Quezon City — a community church serving worship services, gatherings and outreach activities.',
    location: 'Quezon City',
    region: 'Metro Manila',
    types: ['Church'],
    sector: 'worship',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/christianbible',
    imageAlt: 'Architectural rendering of the Christian Bible Church building in Quezon City'
  },
  {
    slug: 'grand-hyatt-manila-rooftop',
    projectNumber: 'PA153008',
    name: 'Grand Hyatt Rooftop',
    summary:
      'The Grand Hyatt rooftop in Taguig City — an elevated venue for events and dining with panoramic views over the city.',
    location: 'Taguig City',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['acoustics'],
    image: 'projects/grandhyattrooftop',
    imageAlt: 'Rooftop dining room with floor-to-ceiling windows over the Manila skyline at dusk, Grand Hyatt'
  },
  {
    slug: 'widus-tower-3-clark',
    projectNumber: 'PA153009',
    name: 'Widus Tower 3',
    summary:
      'Widus Tower 3 in Clark, Pampanga — a hotel tower within a growing mixed-use and leisure destination in Central Luzon.',
    location: 'Clark, Pampanga',
    region: 'Clark, Pampanga',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics', 'information-technology', 'security'],
    image: 'projects/widustower3',
    imageAlt: 'Widus hotel tower and porte-cochère lit at dusk in Clark, Pampanga'
  },
  {
    slug: 'seda-hotel-bgc',
    projectNumber: 'PA163011',
    name: 'Seda Hotel BGC',
    summary:
      'Seda Hotel BGC in Bonifacio Global City, Taguig — a business hotel located amid corporate offices and lifestyle destinations.',
    location: 'Bonifacio Global City, Taguig',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/sedahotel',
    imageAlt: 'Open-air rooftop lounge at night overlooking Bonifacio Global City, Seda Hotel BGC'
  },
  {
    slug: 'seda-hotel-arca-south',
    projectNumber: 'PA163014',
    name: 'Seda Hotel Arca South',
    summary: 'Seda Hotel in Arca South, Taguig City — a contemporary hotel within an emerging mixed-use estate.',
    location: 'Arca South, Taguig City',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['acoustics'],
    image: 'projects/sedaarca',
    imageAlt: 'Architectural rendering of Seda Hotel and the adjoining mall streetscape at Arca South, Taguig'
  },
  {
    slug: 'seda-hotel-glorietta',
    projectNumber: 'PA163015',
    name: 'Seda Hotel Glorietta',
    summary:
      'Seda Hotel Glorietta in Makati — directly connected to a major mall and surrounded by offices and retail.',
    location: 'Makati, Metro Manila',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/sedamakati',
    imageAlt: 'Suite living area with kitchen and dining table at Seda Hotel Glorietta, Makati'
  },
  {
    slug: 'sheraton-cebu-mactan',
    projectNumber: 'PA173008',
    name: 'Sheraton Mactan',
    summary: 'Sheraton Mactan, Cebu — a beachfront resort hotel with ocean views and resort-style amenities.',
    location: 'Mactan, Cebu',
    region: 'Cebu',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'information-technology'],
    image: 'projects/sheraton',
    imageAlt: 'Restaurant interior with perforated metal pendant lights at Sheraton Mactan'
  },
  {
    slug: 'crimson-mactan',
    projectNumber: 'PA183002',
    name: 'Crimson Mactan',
    summary: 'Crimson Mactan in Mactan, Cebu — a luxury resort featuring villas, beachfront areas and leisure facilities.',
    location: 'Mactan, Cebu',
    region: 'Cebu',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics', 'information-technology', 'security'],
    image: 'projects/crimsonmactan',
    imageAlt: 'Lagoon pool and palm gardens leading to the sea at Crimson Mactan'
  },
  {
    slug: 'hotel-okura-manila',
    projectNumber: 'PA183008',
    name: 'Hotel Okura Manila',
    summary:
      'Hotel Okura in Newport City, Pasay — a Japanese-inspired luxury hotel in a large integrated resort complex.',
    location: 'Newport City, Pasay City',
    region: 'Metro Manila',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/okura',
    imageAlt: 'Grand lobby entrance with crystal chandelier and gilded columns at Hotel Okura Manila'
  },
  {
    slug: 'rockwell-performing-arts-theater',
    projectNumber: 'PA183009',
    name: 'Rockwell Performing Arts Theater',
    summary:
      'Rockwell Performing Arts Theater in Makati — a dedicated venue for concerts, shows and cultural performances.',
    location: 'Makati, Metro Manila',
    region: 'Metro Manila',
    types: ['Theater'],
    sector: 'culture-education',
    disciplines: ['acoustics'],
    image: 'projects/rockwellperformingarts',
    imageAlt: 'View from the stage of the Rockwell Performing Arts Theater auditorium, with red seating and timber wall panels'
  },
  {
    slug: 'quest-hotel-clark',
    projectNumber: 'PA183013',
    name: 'Quest Hotel Clark Expansion',
    summary:
      'Expansion of Quest Hotel in Clark, Pampanga — a business and leisure hotel within a growing economic zone.',
    location: 'Clark, Pampanga',
    region: 'Clark, Pampanga',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'information-technology', 'security'],
    image: 'projects/questhotelclark',
    imageAlt: 'Rendering of the lobby lounge for the Quest Hotel Clark expansion'
  },
  {
    slug: 'mactan-world-museum',
    projectNumber: 'PA183014',
    name: 'Mactan World Museum',
    summary:
      'Mactan World Museum, Cebu — a museum-style attraction designed to showcase history and culture in an immersive setting.',
    location: 'Mactan, Cebu',
    region: 'Cebu',
    types: ['Museum'],
    sector: 'culture-education',
    disciplines: ['audiovisual', 'acoustics'],
    image: 'projects/mactanworld',
    imageAlt: 'Architectural rendering of the Mactan World Museum building in Cebu'
  },
  {
    slug: 'the-fifth-at-rockwell',
    projectNumber: 'PA193001',
    name: 'The Fifth at Rockwell',
    summary:
      'The Fifth at Rockwell in Makati — a premium events hall used for conferences, launches and social celebrations.',
    location: 'Makati, Metro Manila',
    region: 'Metro Manila',
    types: ['Events Hall'],
    sector: 'culture-education',
    disciplines: ['acoustics'],
    image: 'projects/thefifthrockwell',
    imageAlt: 'Column-free events hall with linear ceiling lighting at The Fifth at Rockwell, Makati'
  },
  {
    slug: 'four-points-palawan',
    projectNumber: 'PA193008',
    name: 'Four Points Palawan',
    summary:
      'Four Points hotel in Palawan, a resort-style property located in one of the Philippines’ most scenic island provinces.',
    location: 'Palawan',
    region: 'Palawan',
    types: ['Hotel'],
    sector: 'hospitality',
    disciplines: ['audiovisual', 'acoustics', 'information-technology', 'security'],
    image: 'projects/fourpoints',
    imageAlt: 'Courtyard pool between guest wings at sunset, Four Points Palawan'
  }
];

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);

export const projectsByDiscipline = (slug: DisciplineSlug) => projects.filter((p) => p.disciplines.includes(slug));

export const regions: Region[] = ['Metro Manila', 'Cebu', 'Boracay', 'Palawan', 'Davao', 'Clark, Pampanga'];

export const sectorName = (slug: SectorSlug) => sectors.find((s) => s.slug === slug)?.name ?? slug;
