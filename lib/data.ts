// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "M. Nufail Ismath",
  shortName: "Nufail",
  role: "Senior Blockchain Developer",
  subRole: "Full Stack & Backend Engineer",
  location: "Colombo, Sri Lanka",
  timezone: "Asia/Colombo",
  tzLabel: "GMT+5:30",
  // Hours you're willing to work, in your local time (24h). Used by the overlap widget.
  workHours: { start: 9, end: 21 },
  email: "nufailismath15@gmail.com",
  resume: "/resume.pdf",
  availability: "Open to remote roles — full-time or contract",
  // TODO: replace with your real profile URLs
  links: {
    github: "https://github.com/NufailIsmath",
    linkedin: "https://www.linkedin.com/in/nufail-i-61377b10b/",
    medium: "https://medium.com/",
  },
  headline:
    "I design and ship blockchain systems — and the backends, databases and apps that make them production-ready.",
  summary:
    "Software engineer with 7 years of experience across blockchain, backend and full-stack development. I've delivered 10+ projects and owned multiple blockchain and backend systems end to end — from requirement gathering and architecture, through smart contracts and APIs, to deployment and server operations. Currently leading blockchain and backend work at Coding Legends and building Aegis, an AI-assisted blockchain forensics platform.",
};

export const stats = [
  { value: "7+", label: "years building software" },
  { value: "10+", label: "projects delivered" },
  { value: "4", label: "surfaces: chain · API · web · mobile" },
  { value: "2", label: "Web3 hackathons (ETHGlobal, FEVM)" },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  status?: string;
  role: string;
  context: string;
  highlights: string[];
  stack: string[];
  tags: ("Blockchain" | "Backend" | "Mobile" | "Frontend" | "AI" | "DevOps")[];
  featured?: boolean;
  architecture?: { layer: string; items: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "aegis",
    name: "Aegis",
    tagline: "Blockchain forensics & intelligence platform",
    period: "2026",
    status: "In active development",
    role: "Architect & lead engineer",
    featured: true,
    context:
      "A self-hosted investigation platform for law-enforcement and government analysts to trace stolen or illicit funds across chains, flag scam entities, and produce AI-assisted investigation briefings — designed to run air-gapped, because the addresses an investigator looks up reveal who they're pursuing.",
    highlights: [
      "Pathfinder trace engine: seed an address and it walks the money-flow graph N hops outward automatically, stored as an openCypher graph on Postgres (Apache AGE) behind a swappable GraphStore interface.",
      "Watchtower scam flagging: flags are published as events over NATS JetStream; flagged entities are marked across every open trace graph and pushed live to investigators via Socket.IO.",
      "Scribe AI analyst (Claude): grounded case Q&A plus a pattern assessment against 16 fraud typologies — peel chains, mixers, bridge hopping, pig-butchering, drainers, address poisoning and more — with structured, schema-validated output and prompt-injection hardening.",
      "WebGL investigation canvas (Sigma.js + Graphology) that lays hops out as bands and collapses repeated transfers into weighted edges, keeping large traces readable.",
      "Security by design: per-case AES-256-GCM envelope encryption, a SHA-256 hash-chained tamper-evident audit log, JWT + role/permission guards and service tokens.",
      "Multi-chain adapter layer on viem with CAIP-2 chain ids, metered-RPC → public-RPC fallback and block-range chunked log scanning (Ethereum, Polygon, Base, BSC).",
    ],
    stack: [
      "NestJS 11",
      "Next.js 16",
      "TypeScript",
      "PostgreSQL + Apache AGE",
      "NATS JetStream",
      "MinIO",
      "Socket.IO",
      "viem",
      "Anthropic Claude API",
      "Sigma.js",
      "Nx monorepo",
    ],
    tags: ["Blockchain", "Backend", "AI", "Frontend"],
    architecture: [
      { layer: "Client", items: ["Workspace UI (Next.js)", "WebGL graph canvas"] },
      { layer: "Edge", items: ["Gateway / BFF", "Realtime (Socket.IO)", "IAM"] },
      { layer: "Services", items: ["Pathfinder", "Watchtower", "Scribe (AI)", "Case mgmt", "Chain data"] },
      { layer: "Data", items: ["Postgres + AGE graph", "NATS JetStream", "MinIO evidence"] },
    ],
  },
  {
    slug: "clean-id",
    name: "Clean ID",
    tagline: "Web3 digital identity & asset platform for government and enterprise",
    period: "2023 — present",
    role: "Blockchain & backend owner · mobile app",
    featured: true,
    context:
      "A blockchain-based identity platform: citizens complete KYC, receive a verifiable Clean ID and a smart wallet, and manage on-chain assets such as property deeds — with admin, organization and KYC services behind it.",
    highlights: [
      "Designed the on-chain core in Solidity (Foundry): hierarchical role-based access control with parent-child inheritance, an identity registry with multi-wallet association, and a modular registry for asset modules.",
      "Owned the backend and blockchain integration across the platform's server, KYC and organization services.",
      "Built the native iOS & Android app from scratch in React Native / Expo: OTP sign-up, multi-step KYC with document + selfie capture, biometric unlock, smart-wallet and deed management, external EVM wallet connection and a shareable QR identity card.",
    ],
    stack: [
      "Solidity",
      "Foundry",
      "Express",
      "Prisma",
      "React Native",
      "Expo Router",
      "wagmi / viem",
      "WalletConnect (Reown)",
      "TanStack Query",
      "Zustand",
      "NativeWind",
    ],
    tags: ["Blockchain", "Backend", "Mobile"],
  },
  {
    slug: "deedx",
    name: "DEEDX",
    tagline: "Property-deed tokenization with citizen and government portals",
    period: "2023 — 2024",
    role: "Blockchain & backend lead",
    context:
      "A land-registry platform that records property deeds on-chain, with separate portals for citizens and government officers.",
    highlights: [
      "Took key responsibility for the smart-contract architecture, backend and delivery.",
      "Built the contract layer (v1 on Hardhat, v2 redesign) and the API that connects registry workflows to the chain.",
    ],
    stack: ["Solidity", "Hardhat", "Express", "Prisma", "MongoDB", "ethers / viem", "Next.js"],
    tags: ["Blockchain", "Backend"],
  },
  {
    slug: "aasl-iom",
    name: "AASL & IOM",
    tagline: "Permit & operations platforms — backend and database architecture",
    period: "2024 — present",
    role: "Backend lead & database architect",
    context:
      "Two client platforms where I led the backend, designed the complete database architecture, gathered requirements directly with the client and handled server configuration and maintenance.",
    highlights: [
      "Delivered a Dynamic Template Architecture for permits — the project's key requirement — in two working days, letting new permit types be defined without code changes.",
      "Migrated the team's backend approach from Express to NestJS for stronger modularity and maintainability.",
      "Ran DevOps for the projects: server configuration, deployment and maintenance.",
    ],
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Database design", "Linux servers"],
    tags: ["Backend", "DevOps"],
  },
  {
    slug: "depro",
    name: "DePro",
    tagline: "Decentralized profiles and certificate NFTs",
    period: "Niftron · 2021 — 2023",
    role: "Smart contract & integration developer",
    context:
      "Lets users own their professional profile and certificates as NFTs, with issuers minting verifiable credentials.",
    highlights: [
      "Wrote the DePro contract: certificate issuance, profile creation and claims management.",
      "Built the blockchain integration and a relayer service so users could transact without handling gas.",
    ],
    stack: ["Solidity", "NFTs", "Relayer", "Node.js", "IPFS"],
    tags: ["Blockchain", "Backend"],
  },
  {
    slug: "ipfs",
    name: "Private IPFS on Kubernetes",
    tagline: "Self-hosted content storage for NFT metadata",
    period: "Niftron · 2021 — 2023",
    role: "Infrastructure",
    context:
      "Moved NFT metadata off third-party pinning services onto the company's own IPFS node.",
    highlights: [
      "Deployed a private IPFS node on a Kubernetes (GKE) cluster, reachable only inside the organization's network.",
      "Enabled products to add and retrieve NFT metadata and other data from in-house storage.",
    ],
    stack: ["IPFS", "Kubernetes", "GKE", "GCP"],
    tags: ["DevOps", "Blockchain"],
  },
  {
    slug: "payments",
    name: "On-chain Payment Gateway",
    tagline: "Crypto payment tracking service",
    period: "Niftron · 2021 — 2023",
    role: "Backend developer",
    context: "A service that confirms crypto payments automatically instead of by hand.",
    highlights: [
      "Listened to wallet addresses for incoming payments via Moralis, verified price and currency on-chain and updated order state in MongoDB.",
    ],
    stack: ["Node.js", "Moralis", "MongoDB", "Web3"],
    tags: ["Backend", "Blockchain"],
  },
  {
    slug: "edoc",
    name: "EDoc",
    tagline: "Virtual doctor consultation app",
    period: "Cubo Systems · 2019 — 2020",
    role: "Mobile UI lead (team of four)",
    context: "A telemedicine app connecting patients and doctors over video.",
    highlights: [
      "Designed and built the app's UI in Flutter/Dart and integrated Twilio video for consultations, on a .NET backend.",
    ],
    stack: ["Flutter", "Dart", ".NET", "Twilio"],
    tags: ["Mobile"],
  },
];

export const skills: { domain: string; blurb: string; items: string[] }[] = [
  {
    domain: "Blockchain & Web3",
    blurb: "Contracts, integrations and infrastructure across EVM and non-EVM chains.",
    items: [
      "Solidity",
      "Smart contract design",
      "EVM L1 & L2",
      "Web3 integration (viem, wagmi, ethers)",
      "Relayers & gasless flows",
      "Stellar",
      "Bitcoin",
      "Hyperledger",
      "IPFS",
      "On-chain forensics",
    ],
  },
  {
    domain: "Backend & Data",
    blurb: "APIs, services and the data models underneath them.",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Graph data (Apache AGE / Cypher)",
      "Event-driven (NATS)",
      "Database architecture",
      "Java · C# · .NET",
    ],
  },
  {
    domain: "Frontend & Mobile",
    blurb: "Product UIs on web and native mobile.",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Flutter",
      "Tailwind / NativeWind",
      "TanStack Query",
      "Zustand",
      "WebGL graphs (Sigma.js)",
    ],
  },
  {
    domain: "AI & LLMs",
    blurb: "Putting LLMs into products with grounded, verifiable output.",
    items: [
      "Claude API",
      "Tool use & structured output",
      "Prompt caching",
      "Grounded / cited answers",
      "Prompt-injection hardening",
    ],
  },
  {
    domain: "DevOps & Cloud",
    blurb: "Getting it running and keeping it running.",
    items: ["GCP", "GKE / Kubernetes", "Docker", "Server config & maintenance", "CI (GitHub Actions)"],
  },
  {
    domain: "Tooling",
    blurb: "Everyday smart-contract toolchain.",
    items: ["Foundry", "Hardhat", "Truffle", "Remix IDE", "Nx monorepos"],
  },
];

export const experience = [
  {
    company: "Coding Legends",
    period: "08/2023 — present",
    roles: [
      {
        title: "Senior Blockchain Developer",
        period: "11/2023 — present",
        points: [
          "Lead blockchain initiatives from concept to delivery while owning backend development and database architecture across multiple projects.",
          "Owned Clean ID and DEEDX across blockchain and backend — architecture, development and delivery.",
          "Led backend and complete database architecture for AASL & IOM; delivered a dynamic permit template architecture in two working days.",
          "Gather requirements directly with clients and handle DevOps: server configuration and maintenance.",
          "Moved backend work from Express to NestJS; create educational content and mentor teammates.",
        ],
      },
      {
        title: "Full Stack & Blockchain Developer",
        period: "08/2023 — 11/2023",
        points: [
          "Scoped requirements, architected systems and built products from the ground up with project squads, from inception to deployment.",
        ],
      },
    ],
  },
  {
    company: "Niftron",
    period: "06/2021 — 06/2023",
    roles: [
      {
        title: "Full Stack / Blockchain Developer",
        period: "06/2021 — 06/2023",
        points: [
          "Built the DePro decentralized profile & certificate-NFT contract, blockchain integration and relayer service.",
          "Deployed a private IPFS node on Kubernetes for in-house NFT metadata storage.",
          "Developed an on-chain payment gateway listener with Moralis and MongoDB.",
        ],
      },
    ],
  },
  {
    company: "Cubo Systems",
    period: "08/2019 — 07/2020",
    roles: [
      {
        title: "Trainee Software Engineer",
        period: "08/2019 — 07/2020",
        points: [
          "Xelution Health: built patient and doctor consultation UIs for a paperless patient-data system.",
          "EDoc: designed the Flutter app UI and integrated Twilio video consultations.",
        ],
      },
    ],
  },
];

export const education = [
  { title: "BEng (Hons) Software Engineering", place: "University of Westminster", period: "2018 — 2021" },
  { title: "Foundation in Higher Studies", place: "Informatics Institute of Technology", period: "2017 — 2018" },
  { title: "GCE Ordinary Level — Cambridge", place: "Minhal International Boys School", period: "2003 — 2016" },
];

export const achievements = [
  "Participated in the ETHGlobal Hackathon",
  "Participated in the Filecoin FEVM Hackathon",
];

export const principles = [
  {
    title: "Own it end to end",
    body: "Requirements call, schema, contracts, API, deploy, on-call. I'm comfortable holding the whole thread.",
  },
  {
    title: "Data model first",
    body: "Most projects are won or lost in the schema. I design it before I write the first endpoint.",
  },
  {
    title: "Ship fast, safely",
    body: "Two days for a dynamic permit engine — because the architecture made the change small.",
  },
  {
    title: "Async by default",
    body: "Clear written updates, decision docs and PRs that explain the why. Built for remote teams.",
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Selected work" },
  { id: "mobile", label: "Mobile" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
