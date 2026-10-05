// Engineering disciplines. Copy is derived from IHD's existing service pages; do not add
// capabilities, certifications or statistics here that the practice has not stated.

export type DisciplineSlug =
  | 'acoustics'
  | 'audiovisual'
  | 'security'
  | 'information-technology'
  | 'iot-smart-buildings'
  | 'guest-room-management';

export interface Item {
  title: string;
  detail: string;
}

export interface Discipline {
  slug: DisciplineSlug;
  index: string;
  /** Short name used in navigation, chips and labels */
  name: string;
  /** Mono label on cards */
  label: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  positioning: string;
  summary: string;
  overview: string[];
  capabilities: Item[];
  applications: Item[];
  methodology: Item[];
  image: string;
  imageAlt: string;
  /** Descriptive anchor text for internal links */
  anchor: string;
  related: DisciplineSlug[];
}

export const disciplines: Discipline[] = [
  {
    slug: 'acoustics',
    index: '01',
    name: 'Architectural Acoustics',
    label: 'Acoustics',
    h1: 'Architectural acoustics and noise control engineering',
    seoTitle: 'Architectural Acoustics Consultant Philippines | IHD Philippines',
    metaDescription:
      'Acoustic consultancy for theaters, events halls, worship spaces, hotels and offices in the Philippines: room acoustics, noise control, surveys and verification.',
    positioning:
      'IHD’s acoustic consultants shape how rooms sound and how buildings keep noise out — from performance venues and events halls to worship spaces, hotels and corporate offices across the Philippines.',
    summary:
      'Room acoustics, environmental and mechanical noise control, acoustic surveys and sound system design for performance, worship, hospitality and workplace environments.',
    overview: [
      'Our acoustics consultancy covers architectural, environmental and industrial sound management. We design acoustic environments where speech is intelligible, music is clear and unwanted noise stays out — whether the room is a theater, a hotel ballroom, a church sanctuary or a boardroom.',
      'From concert halls to corporate offices, the practice provides analysis, design and implementation guidance for sound quality and noise control, working closely with the architects, engineers and owners who shape the building.',
      'Acoustics is engineered most effectively at design stage. Early involvement lets room geometry, finishes, partitions and building services be coordinated before they are built, rather than corrected after occupancy.'
    ],
    capabilities: [
      { title: 'Architectural acoustics', detail: 'Room acoustics design for performance venues, theaters and conference facilities.' },
      { title: 'Environmental noise', detail: 'Assessment and mitigation of external noise impacts on a building and its surroundings.' },
      { title: 'Mechanical system noise', detail: 'HVAC and equipment noise control, coordinated with the building services design.' },
      { title: 'Noise mitigation', detail: 'Custom noise control solutions for residential and commercial projects.' },
      { title: 'Acoustic surveys', detail: 'Detailed field measurements and reporting of existing acoustic conditions.' },
      { title: 'Sound system design', detail: 'Integrated audio solutions designed together with the room’s acoustics.' },
      { title: 'Forensic acoustics', detail: 'Expert acoustic analysis for legal and technical disputes.' }
    ],
    applications: [
      { title: 'Theaters and performance venues', detail: 'Room acoustics that support both natural sound and amplified performance.' },
      { title: 'Events halls and ballrooms', detail: 'Multi-use rooms that must suit conferences, launches and celebrations.' },
      { title: 'Churches and chapels', detail: 'Speech intelligibility and music for worship, including chapels inside busy mixed-use complexes.' },
      { title: 'Hotels and resorts', detail: 'Restaurants, rooftop venues, guest floors and amenities where noise shapes the guest experience.' },
      { title: 'Offices and conference facilities', detail: 'Meeting room acoustics, speech privacy and building services noise.' },
      { title: 'Schools and auditoriums', detail: 'Multipurpose halls used for academic programs, performances and community events.' }
    ],
    methodology: [
      { title: 'Measure', detail: 'Acoustic surveys and field measurements establish existing conditions and noise sources.' },
      { title: 'Model', detail: 'Simulation software predicts how spaces will perform and tests treatments before they are specified.' },
      { title: 'Coordinate', detail: 'Acoustic requirements are integrated with architectural and engineering design through construction.' },
      { title: 'Verify', detail: 'Verification testing confirms that acoustic performance meets or exceeds the design specification.' }
    ],
    image: 'disciplines/acoustics',
    imageAlt: 'Sound level meter with windscreen on a tripod, recording environmental noise during an acoustic survey',
    anchor: 'Explore architectural acoustics engineering',
    related: ['audiovisual', 'iot-smart-buildings']
  },
  {
    slug: 'audiovisual',
    index: '02',
    name: 'Audiovisual & Multimedia',
    label: 'Audiovisual',
    h1: 'Audiovisual and multimedia system design',
    seoTitle: 'Audiovisual Consultant Philippines | AV System Design | IHD',
    metaDescription:
      'Audiovisual consultant for AV system design in the Philippines: sound reinforcement, displays, AV over IP, lighting control and media systems for venues and hotels.',
    positioning:
      'We design audiovisual systems that make presentations, collaboration, worship and entertainment work — and stay simple to operate — in boardrooms, auditoriums, ballrooms and public venues.',
    summary:
      'Sound reinforcement, display technologies, AV over IP signal distribution, lighting control and media systems engineered for performance and ease of use.',
    overview: [
      'IHD designs and oversees the integration of audio-visual systems for presentations, collaboration and entertainment. The aim is technical performance that people can operate with confidence, not equipment that needs a specialist in the room.',
      'From corporate boardrooms to auditoriums and public venues, we deliver AV environments that support communication and engagement. Every design prioritises scalability, reliability and future-proofing.',
      'Our audiovisual work spans hotel ballrooms and function rooms, churches, schools, museums, health clubs and residential developments — each with different users, content and operating teams.'
    ],
    capabilities: [
      { title: 'Audio systems', detail: 'Professional sound reinforcement, conference audio and immersive audio experiences.' },
      { title: 'Display technologies', detail: 'LED walls, projection systems, video walls and interactive displays.' },
      { title: 'Signal distribution', detail: 'High-performance AV over IP, matrix switching and signal processing.' },
      { title: 'Networked AV', detail: 'Enterprise-wide AV distribution and control platforms.' },
      { title: 'Lighting design & control', detail: 'Dynamic lighting systems for performances, events and architectural enhancement.' },
      { title: 'Entertainment systems', detail: 'Broadcast, streaming and media server solutions.' },
      { title: 'Interactive experiences', detail: 'Touch interfaces, gesture control and immersive environments.' },
      { title: '3D modeling & simulation', detail: 'Pre-visualisation and system modeling for complex installations.' }
    ],
    applications: [
      { title: 'Ballrooms and function rooms', detail: 'Flexible sound, video and lighting for banquets, conferences and events.' },
      { title: 'Churches and chapels', detail: 'Clear speech and music reinforcement, displays and streaming for worship.' },
      { title: 'Schools and auditoriums', detail: 'Systems for academic programs, performances and community events.' },
      { title: 'Boardrooms and corporate offices', detail: 'Presentation and collaboration systems that are intuitive to use.' },
      { title: 'Museums and attractions', detail: 'Immersive and interactive media for visitor experiences.' },
      { title: 'Hotel amenities', detail: 'Background audio, displays and entertainment for health clubs, restaurants and public areas.' }
    ],
    methodology: [
      { title: 'Define', detail: 'Design starts from how each space will be used, by whom, and how often it changes configuration.' },
      { title: 'Model', detail: '3D modeling and simulation pre-visualise system layouts before they are built.' },
      { title: 'Integrate', detail: 'We partner with the project team from concept through commissioning.' },
      { title: 'Hand over', detail: 'Detailed documentation, training and ongoing support protect the AV investment over its lifecycle.' }
    ],
    image: 'disciplines/audiovisual',
    imageAlt: 'Channel faders on a professional audio mixing console',
    anchor: 'Explore audiovisual system design',
    related: ['acoustics', 'information-technology']
  },
  {
    slug: 'security',
    index: '03',
    name: 'Security Systems',
    label: 'Security',
    h1: 'Integrated security systems design',
    seoTitle: 'Security Systems Consultant Philippines | IHD Philippines',
    metaDescription:
      'Integrated security system design in the Philippines: CCTV and video analytics, access control, intrusion detection, visitor management and security command centers.',
    positioning:
      'Layered security that protects people, assets and operations — surveillance, access control and intrusion detection designed as one coordinated system with centralised monitoring.',
    summary:
      'CCTV and video analytics, access control, intrusion detection, visitor management and security command centers, designed as one integrated platform.',
    overview: [
      'We design integrated security ecosystems that combine surveillance, access control and intrusion detection for complete facility protection. Centralised monitoring and management enable proactive threat detection and rapid incident response.',
      'Security design begins with risk assessment and analysis of operational requirements, so that each system balances protection with user convenience and regulatory compliance.',
      'Because today’s security devices are network devices, our designs also address the cybersecurity of physical systems through network segmentation and endpoint protection.'
    ],
    capabilities: [
      { title: 'CCTV & video surveillance', detail: 'IP cameras, video analytics and intelligent monitoring systems.' },
      { title: 'Access control', detail: 'Card readers, biometrics and credential management platforms.' },
      { title: 'Intrusion detection', detail: 'Perimeter security, motion sensors and alarm management.' },
      { title: 'Visitor management', detail: 'Registration, tracking and badging systems.' },
      { title: 'Security command centers', detail: 'Centralised monitoring, control rooms and SOC design.' },
      { title: 'Integrated security platforms', detail: 'PSIM and unified security management systems.' },
      { title: 'Cybersecurity for physical systems', detail: 'Network segmentation and endpoint protection for security devices.' }
    ],
    applications: [
      { title: 'Hotels and resorts', detail: 'Guest safety and back-of-house security across large, open properties.' },
      { title: 'Residential towers', detail: 'Access control and surveillance for residents, visitors and staff.' },
      { title: 'Commercial and enterprise buildings', detail: 'Layered protection with centralised monitoring and management.' },
      { title: 'Control rooms', detail: 'Security command centers that bring monitoring and response together.' }
    ],
    methodology: [
      { title: 'Assess', detail: 'Risk assessment and operational requirements analysis.' },
      { title: 'Layer', detail: 'Multi-layered strategies that balance effectiveness, convenience and compliance.' },
      { title: 'Integrate', detail: 'Coordination with fire safety, building management and emergency response protocols.' },
      { title: 'Scale', detail: 'Infrastructure that adapts to evolving threats and organisational growth.' }
    ],
    image: 'disciplines/security',
    imageAlt: 'Dome and bullet IP surveillance cameras used in CCTV security systems',
    anchor: 'Explore integrated security system design',
    related: ['information-technology', 'iot-smart-buildings']
  },
  {
    slug: 'information-technology',
    index: '04',
    name: 'IT & ELV Infrastructure',
    label: 'Information Technology',
    h1: 'IT network, ELV and structured cabling design',
    seoTitle: 'IT, ELV & Structured Cabling Consultant Philippines | IHD',
    metaDescription:
      'ELV and IT consultancy in the Philippines: structured cabling, enterprise network architecture, data center design, Wi-Fi, unified communications and network security.',
    positioning:
      'The network is now the backbone every other building system depends on. We design resilient, scalable IT and extra-low-voltage infrastructure for hotels, offices, residences and resorts.',
    summary:
      'Structured cabling and ELV pathways, enterprise network architecture, data center and server room design, wireless, unified communications and network security.',
    overview: [
      'IHD designs enterprise IT infrastructure that powers modern building operations: resilient, scalable networks and data center facilities that support mission-critical applications.',
      'Audiovisual, security, IoT and guest room systems increasingly run over the same IP network and the same structured cabling plant. Designing IT and ELV infrastructure as one coordinated layer — from telecom rooms and cable pathways to switching and wireless — is what allows those systems to perform and to be managed reliably.',
      'We begin with your business processes and technology roadmap, then design infrastructure that aligns with operational goals and growth — balancing performance requirements with budget realities.'
    ],
    capabilities: [
      {
        title: 'Structured cabling & ELV pathways',
        detail: 'Fibre backbone, horizontal cabling, telecom rooms and containment planned as the physical layer for every building system.'
      },
      { title: 'Network architecture', detail: 'LAN, WAN and wireless network design for enterprise environments.' },
      { title: 'Data center design', detail: 'Server rooms, colocation facilities and compute infrastructure.' },
      { title: 'Wireless solutions', detail: 'Enterprise Wi-Fi, private LTE/5G and mobile device management.' },
      { title: 'Unified communications', detail: 'VoIP, video conferencing and collaboration platforms.' },
      { title: 'Network security', detail: 'Firewalls, VPNs and intrusion prevention systems.' },
      { title: 'Cloud infrastructure', detail: 'Hybrid cloud strategy, migration planning and integration.' },
      { title: 'Storage systems', detail: 'SAN, NAS and data backup and recovery solutions.' },
      { title: 'Infrastructure monitoring', detail: 'Network management systems and performance monitoring.' }
    ],
    applications: [
      { title: 'Hotels and resorts', detail: 'Guest and back-of-house networks that carry every hotel system.' },
      { title: 'Office and bank towers', detail: 'Enterprise networks for mission-critical business operations.' },
      { title: 'Residential developments', detail: 'Shared infrastructure for residents, amenities and building systems.' },
      { title: 'Server and equipment rooms', detail: 'Compute, storage and network rooms designed for resilience.' }
    ],
    methodology: [
      { title: 'Understand', detail: 'Business processes and the technology roadmap come first.' },
      { title: 'Design', detail: 'Infrastructure aligned with operations and growth, balanced against budget.' },
      { title: 'Protect', detail: 'Defense-in-depth and failover mechanisms built into every layer.' },
      { title: 'Transfer', detail: 'Documentation and knowledge transfer with clear upgrade paths.' }
    ],
    image: 'disciplines/information-technology',
    imageAlt: 'Fiber optic patch cords connected to a network switch in a server rack',
    anchor: 'Explore IT, ELV and structured cabling design',
    related: ['security', 'iot-smart-buildings', 'audiovisual']
  },
  {
    slug: 'iot-smart-buildings',
    index: '05',
    name: 'BMS, IoT & Smart Buildings',
    label: 'BMS & IoT',
    h1: 'Building automation, BMS and IoT for smart buildings',
    seoTitle: 'Building Automation, BMS & IoT Consultant Philippines | IHD',
    metaDescription:
      'Building automation consultancy in the Philippines: BMS, energy and power monitoring (EPMS), IoT sensor networks, analytics and smart building platforms.',
    positioning:
      'Connected buildings that sense, respond and improve. We design building management, energy monitoring and IoT platforms that link plant, devices and people to raise comfort, efficiency and operational performance.',
    summary:
      'Building management systems (BMS), energy and power monitoring (EPMS), IoT sensor networks, automation and control, analytics and smart building platforms.',
    overview: [
      'IHD designs smart building solutions that connect devices, systems and people — turning facilities into responsive environments that optimise comfort, efficiency and operational performance.',
      'At the core is the building management system: monitoring and control of HVAC, lighting and plant, supported by energy and power monitoring (EPMS) that shows where energy goes and how electrical systems are performing.',
      'IoT sensor networks, edge computing and analytics extend that foundation so buildings can learn and adapt, reducing operating costs and environmental impact. Each design starts from clear ROI objectives and scales progressively based on proven value, with dashboards and automated reporting that turn raw data into decisions.'
    ],
    capabilities: [
      {
        title: 'Building management systems (BMS)',
        detail: 'Monitoring and control of HVAC, lighting and building plant from a central management platform.'
      },
      {
        title: 'Energy & power monitoring (EPMS)',
        detail: 'Metering and electrical system monitoring that give owners visibility of consumption and power performance.'
      },
      { title: 'Smart building platforms', detail: 'Integrated IoT ecosystems for facility management and automation.' },
      { title: 'Sensor networks', detail: 'Environmental monitoring, occupancy detection and asset tracking.' },
      { title: 'Automation & control', detail: 'Intelligent workflows and autonomous system responses.' },
      { title: 'IoT connectivity', detail: 'LoRaWAN, NB-IoT and mesh networking for device communication.' },
      { title: 'Edge computing', detail: 'Local data processing and real-time decision making at the network edge.' },
      { title: 'Data analytics & AI', detail: 'Predictive maintenance, pattern recognition and operational optimisation.' },
      { title: 'Digital twins', detail: 'Virtual building models for simulation and optimisation.' }
    ],
    applications: [
      { title: 'Commercial and mixed-use buildings', detail: 'Facility-wide monitoring and automation across tenants and services.' },
      { title: 'Hotels and hospitality', detail: 'Energy and maintenance intelligence across rooms, amenities and plant.' },
      { title: 'Workplaces', detail: 'Occupancy and environmental data that shape how space is used.' },
      { title: 'Campuses', detail: 'Multi-building estates managed from a single platform.' }
    ],
    methodology: [
      { title: 'Define value', detail: 'Clear ROI objectives: energy savings, operational efficiency and occupant experience.' },
      { title: 'Start small', detail: 'Implementations begin focused and scale progressively based on proven value.' },
      { title: 'Secure', detail: 'End-to-end encryption, secure device provisioning and continuous monitoring.' },
      { title: 'Inform', detail: 'Dashboards and automated reporting that drive better decisions.' }
    ],
    image: 'disciplines/iot-smart-buildings',
    imageAlt: 'Laptop with connected-device and cloud network icons representing a smart building IoT platform',
    anchor: 'Explore building automation, BMS and IoT',
    related: ['guest-room-management', 'information-technology', 'security']
  },
  {
    slug: 'guest-room-management',
    index: '06',
    name: 'Guest Room Management',
    label: 'GRMS',
    h1: 'Guest room management systems for hotels and resorts',
    seoTitle: 'Guest Room Management System (GRMS) Consultant | IHD Philippines',
    metaDescription:
      'GRMS design for hotels and resorts in the Philippines: in-room automation of lighting, climate and entertainment, energy management, door lock and PMS integration.',
    positioning:
      'Rooms that respond to guests and save energy when they leave. We design guest room management systems that bring lighting, climate, entertainment and services under one intuitive control layer.',
    summary:
      'In-room automation, guest control interfaces, occupancy-based energy management, door lock and PMS integration for hotels and resorts.',
    overview: [
      'We design integrated guest room solutions that enhance comfort, personalisation and operational efficiency — controlling lighting, climate, entertainment and services through intuitive interfaces that adapt to guest preferences.',
      'A well-designed GRMS balances guest convenience with operational efficiency. Our GRMS designs can reduce energy costs by up to 30% while enabling the personalised experiences that build guest satisfaction and loyalty.',
      'Integration with existing hotel systems keeps operations seamless from reservation through checkout, and analytics on room usage, energy patterns and maintenance needs support continuous optimisation.'
    ],
    capabilities: [
      { title: 'In-room automation', detail: 'Integrated control of lighting, HVAC, curtains and entertainment.' },
      { title: 'Guest control interfaces', detail: 'Tablets, mobile apps, voice control and traditional panels.' },
      { title: 'Energy management', detail: 'Occupancy-based climate control and automated setback.' },
      { title: 'Entertainment systems', detail: 'Smart TVs, casting and content streaming integration.' },
      { title: 'Door lock integration', detail: 'Keyless entry, mobile check-in and security monitoring.' },
      { title: 'Maintenance alerting', detail: 'Automated fault detection and housekeeping coordination.' },
      { title: 'PMS integration', detail: 'Connection with property management and guest services systems.' }
    ],
    applications: [
      { title: 'City and business hotels', detail: 'Efficient, consistent room control across high-occupancy properties.' },
      { title: 'Resorts', detail: 'Villas and guest rooms spread across large sites, managed centrally.' },
      { title: 'Serviced residences', detail: 'Long-stay comfort with energy management between occupancies.' }
    ],
    methodology: [
      { title: 'Experience', detail: 'Define the guest journey and what each room must do for guests and staff.' },
      { title: 'Automate', detail: 'Design in-room control of lighting, climate, curtains and entertainment.' },
      { title: 'Integrate', detail: 'Connect door locks, PMS and guest services so operations stay seamless.' },
      { title: 'Optimise', detail: 'Use room usage, energy and maintenance analytics to keep improving.' }
    ],
    image: 'disciplines/guest-room-management',
    imageAlt: 'Hotel guest room with a wall-mounted smart room control panel',
    anchor: 'Explore guest room management systems',
    related: ['iot-smart-buildings', 'information-technology', 'audiovisual']
  }
];

export const getDiscipline = (slug: string | undefined) => disciplines.find((d) => d.slug === slug);
