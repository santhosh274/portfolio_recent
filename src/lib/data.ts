export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  severity: string;
  date: string;
  overview: string;
  artifacts: string[];
  techClass: string;
  rootCause: string;
  risks: string[];
  mitigation: string;
  disclosure: string;
  lesson: string;
}

export interface ExperienceEntry {
  title: string;
  org: string;
  year: string;
  desc: string;
  /** Optional external link for the experience (e.g., portfolio, site, case study). */
  link?: string;
  tags: string[];
  color: "emerald" | "purple" | "rose" | "teal";
}


export interface ProjectEntry {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  color: "emerald" | "purple" | "rose" | "teal";
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Anna University Sensitive Data Exposure",
    subtitle:
      "Public Exposure of Sensitive Student Records – A Case Study",
    category: "Research Case",
    severity: "CRITICAL",
    date: "February 2026",
    overview:
      "Recently, a publicly accessible server hosting student-related documents from colleges affiliated with Anna University was discovered to be exposed via search engine indexing. Using a basic search query (Google dork), sensitive documents were accessible without authentication. This represents a critical information disclosure vulnerability.",
    artifacts: [
      "Student Marksheets",
      "Income Certificates",
      "Personally Identifiable Information (PII)",
    ],
    techClass:
      "CWE-200: Exposure of Sensitive Information\nOWASP A01: Broken Access Control\nOWASP A05: Security Misconfiguration\nImpact Level: High to Critical",
    rootCause:
      "The exposure appears to be caused by publicly accessible IP-based document hosting with an absence of authentication controls. No access restriction via firewall or reverse proxy was in place, search engine indexing was not blocked via robots.txt, and there was a lack of directory listing hardening. This allowed indexing and retrieval of documents directly through search engines.",
    risks: [
      "Identity theft",
      "Financial fraud",
      "Social engineering attacks",
      "Academic record manipulation",
      "Privacy law violations",
    ],
    mitigation:
      "Disable public directory listing. Restrict access via authentication middleware. Implement reverse proxy with proper ACLs. Add firewall-level IP restrictions. Prevent indexing using robots.txt. Conduct regular security audits and penetration testing. Encrypt sensitive documents at rest.",
    disclosure:
      "The issue was identified and reported responsibly to the appropriate authority for mitigation. Public disclosure was avoided until remediation steps could be initiated. No sensitive data was downloaded, stored, or redistributed during this research. The issue was observed passively and reported through official channels.",
    lesson:
      "Never host sensitive documents on publicly exposed IPs. Always enforce authentication and authorization. Security misconfigurations remain one of the most common vulnerabilities. Institutions must adopt defense-in-depth strategies. Cybersecurity is not only about complex exploits — it is often about eliminating simple configuration failures before attackers discover them.",
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    title: "Freelance Full-Stack Developer",
    org: "Self-Employed",
    year: "2026",
    desc: "Building and delivering custom full-stack web applications for diverse clients, focusing on scalable architecture and secure development practices.",
    link: "apollodesign.vercel.app",
    tags: ["React.js", "Node.js", "Next.js"],
    color: "emerald",
  },
  {
    title: "Development Lead",
    org: "Acutix Soft LLP",
    year: "2026",
    desc: "Ongoing development of a Clinic Management System designed to enhance hospital workflows and streamline patient data management.",
    tags: ["React.JS", "Node.JS", "PostgreSQL"],
    color: "purple",
  },
  {
    title: "Cybersecurity Intern",
    org: "National Small Industries Corporation (NSIC)",
    year: "2025",
    desc: "Studied and implemented offensive attack vectors in controlled lab environments to understand real-world exploitation techniques. Strengthened practical skills in enumeration, vulnerability analysis, and Linux-based security tooling.",
    tags: ["Linux", "RAT Simulations", "Security Tools"],
    color: "rose",
  },
  {
    title: "Development Lead",
    org: "Ashok Leyland – Consultancy Project",
    year: "2025",
    desc: "Led development of a hardware-assisted workflow optimization system to improve operational efficiency. Integrated Linux, Python, and Raspberry Pi to build a scalable and performance-driven solution.",
    tags: ["Linux", "Python", "Raspberry Pi"],
    color: "teal",
  },
  {
    title: "Design Lead",
    org: "Ashok Leyland – Consultancy Project",
    year: "2025",
    desc: "Designed a minimalist and workflow-centric UI system to enhance usability and process clarity. Created high-fidelity prototypes using Figma and visual assets via Photoshop and Canva.",
    tags: ["Figma", "Photoshop", "Canva"],
    color: "emerald",
  },
];

export const projectEntries: ProjectEntry[] = [
  {
    title: "Ransomware Detection & Blocking",
    year: "2026",
    desc: "Python based forensics tool for continuous directory check and early mitigation of encryption through Machine Learning.",
    tags: ["Python", "Random Forest", "Node.js", "React.js"],
    color: "rose",
  },
  {
    title: "Threat Intelligence Aggregator",
    year: "2025",
    desc: "Python and MongoDB-based intelligence tool that scrapes cybersecurity feeds, CVE databases, and hacker forums for actionable insights. Integrated AI-powered summarization and automated alerts via Telegram, Slack, and Email.",
    tags: ["Python", "MongoDB", "Flask", "Chart.js", "Telegram API"],
    color: "purple",
  },
  {
    title: "Calibration Management System UI",
    year: "2025",
    desc: "Designed a clean and efficient user interface to streamline Ashok Leyland's calibration workflow processes. Improved accessibility, visual clarity, and structured navigation.",
    tags: ["Figma", "Photoshop", "Canva", "UI/UX Design"],
    color: "teal",
  },
  {
    title: "College Symposium Website",
    year: "2025",
    desc: "Built a modern and scalable event platform using React and Node.js for registrations, scheduling, and announcements. Optimized performance and deployed via Vercel.",
    tags: ["React.js", "Node.js", "Vercel"],
    color: "emerald",
  },
  {
    title: "Cyber Portfolio",
    year: "2026",
    desc: "Engineered a cybersecurity-focused personal portfolio featuring glassmorphic UI and animated interactions. Showcases secure development practices and a security-first engineering philosophy.",
    tags: ["React", "TailwindCSS", "Vite"],
    color: "purple",
  },
];
