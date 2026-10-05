import type { Item } from './disciplines';

// Delivery lifecycle, drawn from the practice's stated approach:
// "from discovery to deployment", "concept through commissioning", analysis → verification,
// integration oversight, documentation, training and lifecycle support.
export const lifecycle: Item[] = [
  {
    title: 'Discovery & analysis',
    detail:
      'Owner requirements, site and space analysis, risk assessment and acoustic surveys establish what each system must achieve.'
  },
  {
    title: 'Design & documentation',
    detail:
      'System design supported by measurement data, simulation and 3D modeling, coordinated in BIM/CAD and documented in drawings and specifications for tender.'
  },
  {
    title: 'Tender & integration oversight',
    detail:
      'Technical review of contractor proposals against the specification, then oversight alongside architects, engineers and installers through construction.'
  },
  {
    title: 'Commissioning & handover',
    detail:
      'Verification testing, system documentation and training, followed by lifecycle support as technology needs evolve.'
  }
];

export const principles: Item[] = [
  {
    title: 'Integrated, not siloed',
    detail:
      'Acoustics, AV, security, IT, IoT and room management are planned as one technology layer, by section leaders who work across disciplines.'
  },
  {
    title: 'Measured, then designed',
    detail: 'Projects begin with thorough analysis and end with verification testing against the design specification.'
  },
  {
    title: 'Built to be operated',
    detail:
      'Documentation, training and knowledge transfer mean the people who run a building can manage its systems long after handover.'
  },
  {
    title: 'Ready for what comes next',
    detail: 'Designs prioritise scalability and future-proofing, with clear upgrade paths as technology and requirements change.'
  }
];
