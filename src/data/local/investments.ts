import type { Investment } from "../types";

export const investments: Investment[] = [
  // ── Active platform investments ─────────────────────────────────────────
  {
    slug: "pai",
    name: "PAI",
    logo: "/images/portfolio/pai.webp",
    status: "active",
    platformInvestmentDate: "March 2026",
    website: "https://pai-inc.com/",
    description: [
      "PAI is a supply chain management solutions provider to the Military Sealift Command, U.S. Marine Corps, and U.S. Navy. The Company is uniquely positioned to manage complex global logistics and supply chain management programs of scale within the maritime customer base. PAI combines decades of experience with operational excellence to support mission-critical programs globally, with direct exposure to Indo-Pacific demand.",
    ],
  },
  {
    slug: "valiant-solutions",
    name: "Valiant Solutions",
    logo: "/images/portfolio/valiant-solutions.webp",
    status: "active",
    sector: "Cybersecurity",
    platformInvestmentDate: "November 2024",
    website: "https://www.valiantsolutions.com/",
    description: [
      "Valiant is a pure-play cybersecurity provider to federal agencies. The Company specializes in advanced threat detection data analytics, zero trust architecture implementation, compliance and risk assessment solutions, and cloud and container security. Valiant leverages proprietary software frameworks to integrate and maintain market leading cybersecurity solutions to ensure customers are at the forefront of cybersecurity technical innovation.",
    ],
    acquisitions: [
      { name: "Abile Group", logo: "/images/portfolio/abile-group.webp" },
    ],
    relatedNews: [
      "bluestone-investment-valiant",
      "valiant-acquires-abile-group",
      "wilson-weston-partner-bluestone",
    ],
  },
  {
    slug: "abile-group",
    name: "Abile Group",
    logo: "/images/portfolio/abile-group.webp",
    status: "active",
    parentSlug: "valiant-solutions",
    sector: "Program Management",
    tagline: "Program and acquisition management for the federal government.",
    platformInvestmentDate: "November 2020",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "qualis",
    name: "Qualis Corporation",
    logo: "/images/portfolio/qualis.webp",
    status: "active",
    sector: "Defense Technology",
    platformInvestmentDate: "August 2024",
    website: "https://www.qualis-corp.com/",
    description: [
      "Qualis is a defense technology company delivering integrated hardware and software for missile defense, space domain awareness, integrated fires, and electronic warfare missions across the U.S. Army, Space Force, Air Force, Missile Defense Agency, and NASA. Combining RF and signals engineering, ground-based radar and electro-optical sensors, and AI-enabled user experience frameworks, the company rapidly fields modernized capabilities that help warfighters identify, track, and respond to emerging threats across the sensor-to-shooter continuum.",
    ],
    acquisitions: [
      { name: "InTrack Radar Technologies", logo: "/images/portfolio/intrack-radar-technologies.webp" },
      { name: "Tektonux", logo: "/images/portfolio/tektonux.webp" },
    ],
    relatedNews: [
      "bluestone-investment-qualis",
      "qualis-intrack-tektonux-merger",
    ],
  },
  {
    slug: "tektonux",
    name: "Tektonux",
    logo: "/images/portfolio/tektonux.webp",
    status: "active",
    parentSlug: "qualis",
    sector: "Cyber & Mission IT",
    tagline: "Cyber, intelligence, and mission IT solutions.",
    platformInvestmentDate: "September 2022",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "intrack-radar-technologies",
    name: "InTrack Radar Technologies",
    logo: "/images/portfolio/intrack-radar-technologies.webp",
    status: "active",
    parentSlug: "qualis",
    sector: "Sensors & Radar",
    tagline: "Advanced radar and sensor technologies.",
    platformInvestmentDate: "May 2023",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "precise-systems",
    name: "Precise Systems",
    logo: "/images/portfolio/precise-systems.webp",
    status: "active",
    sector: "Naval Engineering",
    platformInvestmentDate: "January 2023",
    website: "https://goprecise.com/",
    description: [
      "Precise Systems is a professional services company providing advanced engineering, program and project management, acquisition and lifecycle support, and information technology services. Founded in 1990, the Company has provided cutting-edge solutions and support to the Department of Defense since its establishment. Precise Systems understands and provides expert consultation on network and weapons systems programs, maintenance and modernization programs, and sustainment programs.",
    ],
    acquisitions: [
      { name: "Excet", logo: "/images/portfolio/excet.webp" },
      { name: "JHT", logo: "/images/portfolio/jht.webp" },
      { name: "TES-i", logo: "/images/portfolio/tes.webp" },
      { name: "Mission Focused Systems", logo: "/images/portfolio/mission-focused-systems.webp" },
    ],
    relatedNews: [
      "bluestone-investment-precise-systems",
      "precise-systems-acquires-excet",
      "precise-systems-acquires-jht",
      "precise-systems-acquires-tes",
      "precise-systems-acquires-mfs",
    ],
  },
  {
    slug: "mission-focused-systems",
    name: "Mission Focused Systems",
    logo: "/images/portfolio/mission-focused-systems.webp",
    status: "active",
    parentSlug: "precise-systems",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "tes",
    name: "TES-i",
    logo: "/images/portfolio/tes.webp",
    status: "active",
    parentSlug: "precise-systems",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "jht",
    name: "JHT",
    logo: "/images/portfolio/jht.webp",
    status: "active",
    parentSlug: "precise-systems",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "excet",
    name: "Excet",
    logo: "/images/portfolio/excet.webp",
    status: "active",
    parentSlug: "precise-systems",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },

  // ── Exited investments ───────────────────────────────────────────────────
  {
    slug: "cbeyondata",
    name: "cBEYONData",
    logo: "/images/portfolio/cbeyondata.webp",
    status: "realized",
    sector: "Data & Analytics",
    platformInvestmentDate: "August 2021",
    website: "https://cbeyondata.com/",
    description: [
      "cBEYONData is a professional services and solutions company specializing in supporting mission-driven agencies and organizations with the enhancement and automation of business processes, cloud migrations and enablement, business intelligence, data management and warehouses, data analytics, and agile project and process management. cBEYONData primarily provides these solutions to government Chief Financial Officer-level executives at multiple law enforcement, civilian, and defense agencies.",
    ],
    acquisitions: [
      { name: "Alta Via Consulting", logo: "/images/portfolio/alta-via-consulting.webp" },
      { name: "Summit 2 Sea Consulting", logo: "/images/portfolio/summit-2-sea-consulting.webp" },
    ],
    relatedNews: [
      "bluestone-investment-cbeyondata",
      "cbeyondata-acquires-alta-via",
      "testoni-executive-chairman-cbeyondata",
      "cbeyondata-acquires-summit2sea",
      "bluestone-sale-cbeyondata",
    ],
  },
  {
    slug: "summit-2-sea-consulting",
    name: "Summit 2 Sea Consulting",
    logo: "/images/portfolio/summit-2-sea-consulting.webp",
    status: "realized",
    parentSlug: "cbeyondata",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "alta-via-consulting",
    name: "Alta Via Consulting",
    logo: "/images/portfolio/alta-via-consulting.webp",
    status: "realized",
    parentSlug: "cbeyondata",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "cti",
    name: "CTI",
    logo: "/images/portfolio/cti.webp",
    status: "realized",
    sector: "Mission IT",
    platformInvestmentDate: "April 2021",
    website: "https://www.ctic.us/",
    description: [
      "CTI is a technology company that utilizes open and government open software and systems development to provide advanced, user-focused systems for command and control, electronic warfare, cyber-spectral operations and other complex military and security applications. CTI primarily performs this work in support of the Combatant Commands, Theater Special Operations Commands, Service Components, and Department of Defense Programs of Record across the services.",
    ],
    acquisitions: [
      { name: "Rapid Imaging Solutions", logo: "/images/portfolio/rapid-imaging-solutions.webp" },
      { name: "Asymmetric Technologies", logo: "/images/portfolio/asymmetric-technologies.webp" },
    ],
    relatedNews: [
      "bluestone-investment-cti",
      "cti-acquires-rapid-imaging",
      "cti-acquires-asymmetric",
      "bluestone-sale-cti",
    ],
  },
  {
    slug: "asymmetric-technologies",
    name: "Asymmetric Technologies",
    logo: "/images/portfolio/asymmetric-technologies.webp",
    status: "realized",
    parentSlug: "cti",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "rapid-imaging-solutions",
    name: "Rapid Imaging Solutions",
    logo: "/images/portfolio/rapid-imaging-solutions.webp",
    status: "realized",
    parentSlug: "cti",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "axim-geospatial",
    name: "Axim Geospatial",
    logo: "/images/portfolio/axim-geospatial.webp",
    status: "realized",
    sector: "Geospatial Intelligence",
    platformInvestmentDate: "March 2020",
    website: "https://www.nv5.com/geospatial/",
    description: [
      "Axim is the result of three companies that came together over 18 months via acquisition. The rebrand is a merging of culture, services, capabilities, and technologies across these organizations that created the largest singular provider of end-to-end geospatial solutions and services in the U.S. Axim's mission is to use geospatial solutions to make the world a smarter, safer, and better place to live with a focus on empowering our clients to solve the world's toughest problems. Collectively, Axim transforms information into insights and analysis into action to address challenges such as national security, global climate change and resiliency, infrastructure and physical security, and environmental management.",
    ],
    acquisitions: [
      { name: "TSG Solutions", logo: "/images/portfolio/tsg-solutions.webp" },
      { name: "GIS Inc", logo: "/images/portfolio/gis-inc.webp" },
    ],
    relatedNews: [
      "bluestone-investment-continental-mapping",
      "continental-mapping-acquires-tsg",
      "continental-mapping-acquires-gisinc",
    ],
    externalNews: [
      {
        title: "NV5 Continues Geospatial Market Push with Axim Purchase",
        url: "https://www.govconwire.com/articles/nv5-continues-geospatial-market-push-with-axim-purchase",
      },
    ],
  },
  {
    slug: "gis-inc",
    name: "GIS Inc",
    logo: "/images/portfolio/gis-inc.webp",
    status: "realized",
    parentSlug: "axim-geospatial",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "tsg-solutions",
    name: "TSG Solutions",
    logo: "/images/portfolio/tsg-solutions.webp",
    status: "realized",
    parentSlug: "axim-geospatial",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "intrepid-mission-driven-solutions",
    name: "Intrepid Mission-Driven Solutions",
    logo: "/images/portfolio/intrepid-mission-driven-solutions.webp",
    status: "realized",
    sector: "Enterprise IT",
    platformInvestmentDate: "June 2019",
    description: [
      "Intrepid Solutions and Services, LLC is a premier provider of high-end enterprise IT, data analysis, and operational training services to customers in the U.S. Intelligence Community. The Company provides Data Center as a Service (DCaaS), cloud integration solutions, cybersecurity support, and counterintelligence training services among other offerings.",
    ],
    acquisitions: [
      { name: "BWM Outcomes", logo: "/images/portfolio/bwm-outcomes.webp" },
      { name: "Darkblade Systems", logo: "/images/portfolio/darkblade-systems.webp" },
    ],
    relatedNews: [
      "bluestone-investment-intrepid",
      "intrepid-acquires-bwm",
      "dennis-kelly-joins-intrepid",
      "intrepid-acquires-delta-solutions",
      "intrepid-acquires-darkblade",
    ],
  },
  {
    slug: "darkblade-systems",
    name: "Darkblade Systems",
    logo: "/images/portfolio/darkblade-systems.webp",
    status: "realized",
    parentSlug: "intrepid-mission-driven-solutions",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "bwm-outcomes",
    name: "BWM Outcomes",
    logo: "/images/portfolio/bwm-outcomes.webp",
    status: "realized",
    parentSlug: "intrepid-mission-driven-solutions",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  {
    slug: "quadel",
    name: "Quadel Consulting",
    logo: "/images/portfolio/quadel.webp",
    status: "realized",
    platformInvestmentDate: "February 2019",
    website: "https://quadel.com/",
    description: [
      "Quadel is a leading provider of outsourced program management, consulting, and training services enabling federal, state, and local organizations to realize cost savings, improve performance, and expand the effectiveness of affordable housing programs. The Company operates in a specialized niche with significant intellectual property.",
    ],
    relatedNews: [
      "bluestone-investment-quadel",
    ],
    externalNews: [
      {
        title: "System One Completes Acquisition of Quadel",
        url: "https://www.prweb.com/releases/system-one-completes-acquisition-of-quadel-to-bolster-its-integrated-services-portfolio-854829072.html",
      },
    ],
  },
  {
    slug: "omniplex-world-services-corporation",
    name: "Omniplex World Services Corporation",
    logo: "/images/portfolio/omniplex-world-services-corporation.webp",
    status: "realized",
    platformInvestmentDate: "December 2012",
    description: [
      "Founded in 1990 and headquartered in Chantilly, Virginia, OMNIPLEX is a leading provider of integrated security solutions including background investigations, personnel security, and protective security services for Intelligence Community, homeland security, federal civilian, and commercial customers.",
    ],
    relatedNews: [
      "bluestone-exit-omniplex",
    ],
  },
  {
    slug: "gap",
    name: "GAP Solutions",
    logo: "/images/portfolio/gap.webp",
    status: "realized",
    platformInvestmentDate: "September 2013",
    website: "https://www.gapsi.com/",
    description: [
      "GAP Solutions, Inc. provides a full spectrum of mission support services focused on emergency management, security and information management, managerial and administrative support, and logistics support. GAP Solutions' customer base includes the Department of Health and Human Services (HHS), Department of Homeland Security (DHS), Department of State (State), Department of Justice (DOJ), as well as various other civilian and defense agencies.",
    ],
    relatedNews: [
      "bluestone-investment-gap",
      "bluestone-sale-gap-solutions",
    ],
  },
  {
    slug: "cis-secure-computing",
    name: "CIS Secure Computing",
    logo: "/images/portfolio/cis-secure-computing.webp",
    status: "realized",
    platformInvestmentDate: "June 2012",
    website: "https://cissecure.com/",
    description: [
      "Headquartered in Dulles, Virginia, CIS is a leading provider of secure communications equipment and computing solutions for a wide range of U.S. Government customers. CIS is a leading player in a niche market focused on modifying commercial-off-the-shelf (COTS) communications and network equipment to support stringent government requirements to protect sensitive and classified information from illicit capture or manipulation.",
    ],
    relatedNews: [
      "bluestone-investment-cis",
      "bluestone-sale-cis",
    ],
  },
];
