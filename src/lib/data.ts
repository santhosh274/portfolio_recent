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
  image?: string;
}


export interface CertificationEntry {
  title: string;
  issuer: string;
  date: string;
  desc: string;
  link?: string;
  tags: string[];
  color: "emerald" | "purple" | "rose" | "teal";
  gradient: string;
}

export const certificationEntries: CertificationEntry[] = [
  {
    title: "Ethical Hacker",
    issuer: "Cisco",
    date: "2026",
    desc: "Foundational cybersecurity knowledge covering threats, vulnerabilities, cryptography, identity management, and secure network design.",
    tags: ["Risk Management", "Cryptography", "Penetration Testing", "Vulnerability Assessment"],
    color: "emerald",
    gradient: "from-[#DC143C]/20 via-[#DC143C]/10 to-white/60",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2025",
    desc: "Introduction of ethical hacking methodologies, reconnaissance, scanning, enumeration, and exploitation techniques for modern enterprise environments.",
    tags: ["Penetration Testing", "Vulnerability Assessment", "Network Security"],
    color: "rose",
    link: "https://media.licdn.com/dms/image/v2/D562DAQGE7Qz55VIjiQ/profile-treasury-document-images_480/B56ZfJ1JH9GoAY-/1/1751437844423?e=1782345600&v=beta&t=r3Yz8jLP9mHxppC5GZUp24KZZZD9TYVwWoNBbAdukoM",
    gradient: "from-[#DC143C]/20 via-[#DC143C]/10 to-white/60",
  },
  {
    title: "SQL Injection Attacks",
    issuer: "EC-Council",
    date: "2025",
    desc: "Identifying vulnerable web applications, SQLi attacks and remediation steps",
    tags: ["Websites", "SQLi", "Database enumeration"],
    color: "teal",
    link: "https://media.licdn.com/dms/image/v2/D562DAQG-XuHKkXveqA/profile-treasury-image-shrink_800_800/B56ZYqQu6IGoAY-/0/1744465752911?e=1781874000&v=beta&t=a7Owv7B5hAmkTYSEiPsnSEGcTwWyw0VdzbCvIi5ssk0",
    gradient: "from-[#DC143C]/20 via-[#DC143C]/10 to-white/60",
  },
  {
    title: "Cloud Foundations",
    issuer: "AWS Academy",
    date: "2026",
    desc: "foundational knowledge of cloud computing, AWS core services, security, architecture, and pricing models.",
    tags: ["AWS","Cloud Computing", "AWS Services"],
    color: "teal",
    link: "https://www.credly.com/badges/2c880958-d919-4cbe-83f9-12d2154b628c/public_url",
    gradient: "from-[#DC143C]/20 via-[#DC143C]/10 to-white/60",
  },
];

export interface ProjectEntry {
  title: string;
  year: string;
  desc: string;
  tags: string[];
  image?: string;
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
    title: "Founder & Managing Director - Beacon",
    org: "Self-Employed",
    year: "2026",
    desc: "Managing end-to-end client engagements, technical strategy, and organizational direction while architecting and delivering high-performance web platforms, cloud-native solutions, and secure digital experiences.",
    link: "teambeacon.vercel.app",
    tags: ["React.js", "Node.js", "Next.js"],
    color: "emerald",
    image: "/freelance.png",
  },
  {
    title: "Development Lead",
    org: "Acutix Soft LLP",
    year: "2026",
    desc: "Ongoing development of a Clinic Management System designed to enhance hospital workflows and streamline patient data management.",
    tags: ["React.JS", "Node.JS", "PostgreSQL"],
    color: "purple",
    image: "/acutix.png",
  },
  {
    title: "Campus Ambassador",
    org: "Perplexity AI",
    year: "2025",
    desc: "Selected to participate in the Perplexity Partner Program, representing and promoting innovative AI solutions to a global audience.",
    tags: ["Perplexity AI", "Comet"],
    color: "purple",
    image: "/perplexity.png",
  },
  {
    title: "Cybersecurity Intern",
    org: "National Small Industries Corporation (NSIC)",
    year: "2025",
    desc: "Studied and implemented offensive attack vectors in controlled lab environments to understand real-world exploitation techniques.",
    tags: ["Linux", "RAT Simulations", "Security Tools"],
    color: "rose",
    image: "/cyber.png",
  },
  {
    title: "Design Lead",
    org: "Ashok Leyland – Consultancy Project",
    year: "2025",
    desc: "Designed a minimalist and workflow-centric UI system to enhance usability and process clarity.",
    tags: ["Figma", "Photoshop", "Canva"],
    color: "emerald",
    image: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?fm=jpg&q=60&w=3000&auto=format&fit=crop",
  },
];

export const projectEntries: ProjectEntry[] = [
  /** 
  {
    title: "Ransomware Detection & Blocking",
    year: "2026",
    desc: "Python based forensics tool for continuous directory check and early mitigation of encryption through Machine Learning.",
    tags: ["Python", "Random Forest", "Node.js", "React.js"],
    color: "rose",
    image: "/ransomprj.png",
  },*/
  {
    title: "Calibration Management System UI",
    year: "2025",
    desc: "Designed a clean and efficient user interface to streamline Ashok Leyland's calibration workflow processes. Improved accessibility, visual clarity, and structured navigation.",
    tags: ["Figma", "Photoshop", "Canva", "UI/UX Design"],
    image: "/redacted.jpeg",
    color: "teal",
  },
  {
    title: "College Symposium Website",
    year: "2025",
    desc: "Built a modern and scalable event platform using React and Node.js for registrations, scheduling, and announcements. Optimized performance and deployed via Vercel.",
    tags: ["React.js", "Node.js", "Vercel"],
    color: "emerald",
    image: "/symposium.png",
  },
  {
    title: "Gym Management & Oversight Web Application",
    year: "2026",
    desc: "Built a modern gym management platform combining a business showcase with role-based access, member management, and broadcast messaging.",
    tags: ["React.js", "Node.js", "Vercel"],
    color: "rose",
    image: "/gym.png",
  },
  {
    title: "Cyber Portfolio",
    year: "2026",
    desc: "Engineered a cybersecurity-focused personal portfolio featuring glassmorphic UI and animated interactions. Showcases secure development practices and a security-first engineering philosophy.",
    tags: ["React", "TailwindCSS", "Vite"],
    color: "purple",
    image: "/portfolio.png",
  },
];
