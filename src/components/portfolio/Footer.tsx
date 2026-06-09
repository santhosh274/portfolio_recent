"use client";

import { motion } from "framer-motion";
import FlipLink from "./FlipLink";
import TextHoverEffect from "./TextHoverEffect";
import { links } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="connect" className="relative bg-[#000000] border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-[10vw] pt-20 pb-10 z-40 relative">
        {/* CTA Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-500 text-sm font-mono uppercase tracking-widest mb-4">
            05 — Connect
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight mb-6">
            Let&apos;s Build
            <br />
            Something Secure.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Currently open to freelance projects, full-stack development roles,
            and cybersecurity consulting. Whether you need a secure application
            built from scratch or revamp your existing system —
            let&apos;s talk.
          </p>
        </motion.div>

        {/* FlipLink List */}
        <div className="flex flex-col items-center gap-1 mb-16">
          <FlipLink
            href={`mailto:${links.email}`}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            Email
          </FlipLink>
          <FlipLink
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            GitHub
          </FlipLink>
          <FlipLink
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            LinkedIn
          </FlipLink>
          <FlipLink
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            Resume
          </FlipLink>
        </div>

        {/* Divider */}
        <hr className="border-zinc-800/50 mb-8" />

        

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-zinc-600 pt-4 gap-4">
          <p>
            © 2026 Santhosh Kumarr A — Security-First Engineering
          </p>
          <p className="text-zinc-700">
            Designed & Built with a security-first mindset
          </p>
        </div>
      </div>
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #06b6d422 100%)",
        }}
      />
    </footer>
  );
}
