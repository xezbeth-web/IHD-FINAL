import type { DisciplineSlug } from './disciplines';

export interface Faq {
  q: string;
  a: string;
}

// Questions a developer, architect or operator typically asks before engaging a consultant.
// Answers describe IHD's stated approach; keep them free of unverified claims.
export const disciplineFaqs: Record<DisciplineSlug, Faq[]> = {
  acoustics: [
    {
      q: 'What does an acoustic consultant do?',
      a: 'An acoustic consultant designs how spaces sound and how a building controls noise. That covers room acoustics for theaters, halls and meeting rooms, sound insulation between spaces, control of HVAC and equipment noise, environmental noise assessment, and verification testing once the building is complete.'
    },
    {
      q: 'When should an acoustic consultant be involved in a project?',
      a: 'As early as possible — ideally at concept or schematic design. Room shapes, wall and floor build-ups, ceiling heights and plant locations are far cheaper to get right on drawings than to correct after construction or occupancy.'
    },
    {
      q: 'Can you fix acoustic problems in an existing building?',
      a: 'Yes. We start with an acoustic survey and field measurements to identify the source of the problem, then recommend targeted treatment or noise mitigation, and verify the result with follow-up testing.'
    },
    {
      q: 'Do you also design the sound system?',
      a: 'Yes. Sound system design is part of our acoustics practice and is coordinated with our audiovisual discipline, so loudspeakers, room acoustics and the wider AV system are designed together rather than separately.'
    }
  ],
  audiovisual: [
    {
      q: 'What is the role of an AV consultant compared with an AV contractor?',
      a: 'An AV consultant defines requirements, designs the system and documents it so contractors can price and install it consistently. The consultant then oversees integration through commissioning, so the client has a technical advocate between design intent and installation.'
    },
    {
      q: 'Which spaces do you design audiovisual systems for?',
      a: 'Hotel ballrooms and function rooms, churches and chapels, school auditoriums, boardrooms and corporate offices, museums and visitor attractions, health clubs and residential amenities.'
    },
    {
      q: 'Can AV systems run over the building network?',
      a: 'Increasingly, yes. AV over IP and networked control platforms let audio, video and control share enterprise infrastructure. We design AV alongside our IT and ELV discipline so the network is sized and segmented for it.'
    },
    {
      q: 'How do you make AV systems easy to operate?',
      a: 'We design around the people who will use each room, keep control interfaces simple, and hand over with detailed system documentation and training, followed by ongoing support.'
    }
  ],
  security: [
    {
      q: 'What does an integrated security system include?',
      a: 'Typically CCTV and video analytics, access control, intrusion detection and visitor management, brought together on a unified security platform with centralised monitoring in a control room or security operations center.'
    },
    {
      q: 'Where does security design start?',
      a: 'With a risk assessment and an analysis of operational requirements: who needs access to where, what must be protected, and how the site is staffed and monitored. The system is then designed in layers to suit.'
    },
    {
      q: 'Do security systems integrate with other building systems?',
      a: 'Yes. We coordinate security with fire safety, building management and emergency response protocols, and design the supporting network with segmentation and endpoint protection for security devices.'
    }
  ],
  'information-technology': [
    {
      q: 'What are ELV systems?',
      a: 'Extra-low-voltage (ELV) systems are the low-power technology services in a building: data networks and structured cabling, telephony, Wi-Fi, CCTV, access control, audiovisual and building automation. Planning them together avoids duplicated cabling, overcrowded risers and incompatible systems.'
    },
    {
      q: 'Why does structured cabling need to be designed early?',
      a: 'Cabling routes, telecom rooms and risers occupy physical space and must be coordinated with the architecture and MEP services. Designing the cabling plant early ensures there is room, power and cooling for the network that every other system will depend on.'
    },
    {
      q: 'Do you design hotel networks?',
      a: 'Yes. Hotels and resorts make up a large part of our portfolio, with guest and back-of-house networks carrying Wi-Fi, AV, security, IoT and guest room systems.'
    },
    {
      q: 'What happens after the network is installed?',
      a: 'We provide documentation and knowledge transfer so your IT team can manage the infrastructure long after implementation, with clear upgrade paths as technology needs evolve.'
    }
  ],
  'iot-smart-buildings': [
    {
      q: 'What is a building management system (BMS)?',
      a: 'A BMS is the central platform that monitors and controls building services such as HVAC, lighting and plant. It gives facility teams one place to see system status, respond to alarms and optimise operation.'
    },
    {
      q: 'What is EPMS and why does it matter?',
      a: 'An energy and power monitoring system (EPMS) meters consumption and monitors the electrical system. It shows owners where energy is used and how power infrastructure is performing — the data needed to manage costs and plan improvements.'
    },
    {
      q: 'How is IoT different from a traditional BMS?',
      a: 'IoT adds wireless sensors, cloud and edge analytics on top of conventional building controls — for example occupancy, environmental and asset data. It extends what a BMS can see and supports predictive maintenance and space optimisation.'
    },
    {
      q: 'How do you justify smart building investment?',
      a: 'We set clear ROI objectives at the start — energy savings, operational efficiency and occupant experience — and recommend starting focused, then scaling based on proven value.'
    }
  ],
  'guest-room-management': [
    {
      q: 'What is a guest room management system (GRMS)?',
      a: 'A GRMS automates and connects everything in a hotel room — lighting, air-conditioning, curtains, entertainment, door status and service requests — through guest-friendly controls and a central dashboard for hotel staff.'
    },
    {
      q: 'How does a GRMS save energy?',
      a: 'Occupancy-based climate control and automated setback reduce air-conditioning and lighting use when rooms are empty or unsold. Our GRMS designs can reduce energy costs by up to 30%.'
    },
    {
      q: 'Does a GRMS connect to our property management system?',
      a: 'Yes. Integration with the PMS, door locks and guest services keeps room status, check-in and housekeeping coordinated, from reservation through checkout.'
    }
  ]
};
