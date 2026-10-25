import type { Metadata, Viewport } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    default: "Santhosh Kumarr A | Security-First Engineer & Full-Stack Developer",
    template: "%s | Santhosh Kumarr A",
  },
  description:
    "Engineering secure digital infrastructures and building scalable full-stack systems with a disciplined security-first mindset. Specializing in network security, ethical hacking, and full-stack development.",
  keywords: [
    "Santhosh Kumarr",
    "security engineer",
    "full-stack developer",
    "cybersecurity",
    "ethical hacking",
    "React",
    "Node.js",
    "Python",
    "Next.js",
    "portfolio",
    "penetration testing",
    "vulnerability assessment",
  ],
  authors: [
    {
      name: "Santhosh Kumarr A",
      url: "https://santhosh-kumarr.vercel.app",
    },
  ],
  creator: "Santhosh Kumarr A",
  publisher: "Santhosh Kumarr A",
  metadataBase: new URL("https://santhosh-kumarr.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Santhosh Kumarr A | Security-First Engineer",
    description:
      "Engineering secure digital infrastructures and building scalable full-stack systems with a disciplined security-first mindset.",
    url: "https://santhosh-kumarr.vercel.app",
    siteName: "Santhosh Kumarr Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Santhosh Kumarr A - Security-First Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santhosh Kumarr A | Security-First Engineer",
    description:
      "Security-First Engineer | Full-Stack Developer | Cybersecurity Specialist",
    images: ["/og-image.png"],
  },
  category: "technology",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Santhosh Kumarr A",
  url: "https://santhosh-kumarr.vercel.app",
  jobTitle: "Security-First Engineer & Full-Stack Developer",
  description:
    "Security-First Engineer specializing in offensive security, network security, ethical hacking, and full-stack development.",
  sameAs: [
    "https://github.com/santhosh274",
    "https://www.linkedin.com/in/santhosh-kumarr-a-ace277",
  ],
  knowsAbout: [
    "Cybersecurity",
    "Full-Stack Development",
    "Ethical Hacking",
    "Network Security",
    "Penetration Testing",
    "Vulnerability Assessment",
    "React",
    "Node.js",
    "Python",
    "Cloud Security",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Sri Eshwar College of Engineering",
    },
  ],
  email: "santhoshkumarr.a7@gmail.com",
  image: "https://santhosh-kumarr.vercel.app/og-image.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Dark Reader (and similar extensions) rewrites every inline style and
          injects data-darkreader-* attributes before React hydrates, which
          React reports as a hydration mismatch it cannot patch. The site is
          intentionally light-only, so opt out of extension theming.
        */}
        <meta name="darkreader-lock" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${spaceMono.variable} font-sans antialiased selection:bg-[#DC143C]/30`}
      >
        {children}
      </body>
    </html>
  );
}
