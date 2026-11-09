export interface Person {
  name: string;
  role: string;
  image: string;
}

export const leadership: Person[] = [
  { name: 'Almario Ramirez Jr.', role: 'Technical Director', image: 'team/ramirez' },
  { name: 'Judith Paz', role: 'Operations Director', image: 'team/pazj' },
  { name: 'Hadjie Malaluan', role: 'Technical Head / Senior Engineer, Security', image: 'team/hadjie' }
];

export const team: Person[] = [
  { name: 'Miguel Primicias', role: 'Acoustic Consultant', image: 'team/primicias' },
  { name: 'Randel Laureta', role: 'Audio Visual Consultant', image: 'team/randel' },
  { name: 'Spark Dagami', role: 'Senior Engineer, IT', image: 'team/spark' },
  { name: 'Florante Paz', role: 'BIM/CAD Specialist', image: 'team/pazf' },
  { name: 'Shem Mishael Cubal', role: 'Junior Acoustic Designer', image: 'team/shem3' },
  { name: 'Hector Dionisio', role: 'Technology Engineer', image: 'team/hector' },
  { name: 'Mark Lazatin', role: 'Technology Engineer', image: 'team/mark' },
  { name: 'Emmanuel Olorvida', role: 'Technology Engineer', image: 'team/emman' },
  { name: 'Johnkiel Santos', role: 'Technology Engineer', image: 'team/john' },
  { name: 'Anne Chyleen Berja', role: 'Technology Engineer', image: 'team/anne' }
];

export interface Developer {
  name: string;
  image: string;
  /** Portfolio project slugs for this developer, linked under its logo on the Partners page */
  projects?: string[];
}

export const developers: Developer[] = [
  { name: 'Ayala Land', image: 'partners/ayala' },
  { name: 'DMCI Homes', image: 'partners/dmci' },
  { name: 'Filinvest', image: 'partners/filinvest' },
  { name: 'Megaworld', image: 'partners/megaworld' },
  {
    // Logo is the HANN Resorts brand mark from hannresorts.com; Hann Philippines Inc. owns the brand.
    name: 'Hann Philippines',
    image: 'partners/hann',
    projects: ['hann-resort-clark', 'hann-reserve-tarlac']
  }
];
