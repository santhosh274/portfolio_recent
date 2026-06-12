"use client";

import { motion as motionClient } from "framer-motion";
import { Terminal, ShieldCheck } from "lucide-react";
import FlipLink from "./FlipLink";
import { links } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="connect" className="relative border-t border-white/[0.06] bg-neutral-950 overflow-hidden select-none">
      {/* Structural Background Lines Matrix */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff5555]/30 to-transparent" />

      <div className="w-full max-w-none px-6 md:px-12 lg:px-16 pt-24 pb-12 relative z-10">
        
        {/* Main Grid Splitting Typography Deck and Navigation Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-28">
          
          {/* Left Block: Primary Tactical Content */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motionClient.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Node Identity Prefix */}
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-6">
                <Terminal className="w-3.5 h-3.5 text-[#ff5555]" /> Connect
              </div>

              {/* Core Typography Header */}
              <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] font-bold leading-[0.85] tracking-tight text-white uppercase mb-8">
                Let&apos;s Build
                <br />
                Something <span className="text-[#ff5555]">Secure.</span>
              </h2>

              {/* Defensive Statement Description */}
              <p className="text-xs md:text-sm text-white/50 leading-relaxed max-w-[42ch]">
                Currently orchestrating system architecture reviews, threat modeling cycles, 
                and full-stack implementation frameworks. Let's harden your digital perimeter.
              </p>
            </motionClient.div>

            {/* Live Infrastructure System Pulse */}
            <div className="hidden lg:flex items-center gap-4 font-mono text-[9px] text-white/30 tracking-widest mt-16">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5555] animate-pulse" />
              STATUS // ACTIVE
            </div>
          </div>

          {/* Right Block: Ultra-Massive Kinetic Core Links */}
          <div className="lg:col-span-7 flex flex-col justify-end lg:pl-16 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-12 lg:pt-0">
            <div className="flex flex-col w-full group/list">
              {[
                { label: "Email", target: `mailto:${links.email}` },
                { label: "GitHub", target: links.github },
                { label: "LinkedIn", target: links.linkedin },
                { label: "Resume", target: links.resume }
              ].map((link, idx) => (
                <div 
                  key={idx} 
                  className="group relative flex items-center justify-between py-4 md:py-6 border-b border-white/[0.04] hover:border-white/20 transition-colors duration-500 overflow-hidden"
                >
                  {/* Subtle hover background block overlay */}
                  <div className="absolute inset-0 bg-white/[0.01] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />

                  <div className="relative z-10 flex items-baseline w-full">
                    <FlipLink
                      href={link.target}
                      target={link.label !== "Email" ? "_blank" : undefined}
                      rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                      className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white/20 group-hover:text-white group-hover/list:opacity-40 hover:!opacity-100 transition-all duration-300 w-full"
                    >
                      {link.label}
                    </FlipLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Framing Bounds Border Break Rule */}
        <div className="relative w-full h-px bg-white/[0.06] mb-8">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-[#ff5555]" />
        </div>

        {/* Micro-Metadata Structural Base Deck */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] font-mono text-white/30 tracking-widest uppercase pt-2 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff5555]/60" />
            <span>© 2026 Santhosh Kumarr A</span>
          </div>
          
        </div>

      </div>
    </footer>
  );
}