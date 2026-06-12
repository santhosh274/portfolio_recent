"use client";

import { useState } from "react";
import { Shield, Target, Search, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import FlowSection from "./FlowSection";

export default function About() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const specializations = [
    {
      name: "Ethical Hacking",
      icon: Target,
      desc: "Attack surface minimization & active threat mitigation.",
    },
    {
      name: "Vulnerability Analysis",
      icon: Shield,
      desc: "Deep-dive code auditing and robust defense-in-depth mapping.",
    },
    {
      name: "Digital Forensics",
      icon: Search,
      desc: "Root-cause vector isolation and technical incident response.",
    },
    {
      name: "Fullstack Development",
      icon: Code2,
      desc: "Secure, highly optimized architectures built with modern engineering frameworks.",
    },
  ];

  return (
    <FlowSection
      id="about"
      ariaLabel="About"
      noPadding
      className="!p-0 !m-0 !mt-0 !mb-0 !pt-0 !pb-0 w-full max-w-none overflow-hidden"
      style={{ background: "transparent", padding: 0, margin: 0 }}
    >
      {/* Full-Bleed Spatial Canvas */}
      <div
        className="relative flex flex-col lg:flex-row m-0 p-0"
        style={{
          width: "100vw",
          minHeight: "100vh",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        {/* ─── LEFT BLOCK: Structural Title & Deck (35vw) ────────────────── */}
        <div className="w-full lg:w-[35vw] flex flex-col justify-between p-6 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/[0.06] shrink-0">
          
          {/* Top Metadata */}
          <div className="flex items-center justify-between font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">
            <span className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#ff5555]" /> [NODE // 01]
            </span>
            <span>SYS_VER_2026</span>
          </div>

          {/* Main Core Typography Header */}
          <div className="my-auto py-12 lg:py-0">
            <h2 className="text-[clamp(2.5rem,4.5vw,5rem)] font-bold leading-[0.85] tracking-tight text-white uppercase select-none">
              Defense
              <br />
              <span className="text-white/30 font-light italic font-serif tracking-normal lowercase block mt-1">
                in depth.
              </span>
            </h2>

            <p className="mt-8 text-xs md:text-sm text-white/50 leading-relaxed font-mono tracking-wide max-w-[32ch]">
              I specialize in offensive security and building secure full-stack systems.
              My approach centers on layering security at every level of the stack—from
              authentication design to API hardening and resilient infrastructure.
            </p>
          </div>

          {/* System Terminal Status */}
          <div className="flex items-center gap-4 font-mono text-[9px] text-white/30 tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5555] animate-pulse" />
            IDENTITY // SECURE_CORE_EST
          </div>
        </div>

        {/* ─── RIGHT BLOCK: Kinetic Tactical Grid (65vw) ───────── */}
        <div className="w-full lg:w-[65vw] grid grid-cols-1 md:grid-cols-2 bg-white/[0.005]">
          {specializations.map((s, idx) => {
            const Icon = s.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 md:p-12 xl:p-16 border-b border-white/[0.05] md:border-b-0 md:[&:nth-child(1)]:border-b md:[&:nth-child(2)]:border-b md:[&:nth-child(odd)]:border-r overflow-hidden"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 1. Kinetic Scanline Overlay Backing */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    backgroundColor: isHovered ? "rgba(255, 53, 53, 0.015)" : "rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Digital Linear Scan Reflection Beam */}
                  {isHovered && (
                    <motion.div
                      initial={{ y: "-100%" }}
                      animate={{ y: "200%" }}
                      transition={{
                        duration: 0.85,
                        ease: [0.25, 1, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 2.5
                      }}
                      className="w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none"
                    />
                  )}
                </motion.div>

                {/* Grid Item Header Identity */}
                <div className="flex items-start justify-between mb-8 md:mb-16 relative z-10">
                  <div className="text-white/30 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5 transition-transform duration-500 ease-out group-hover:scale-110" />
                  </div>
                  
                  {/* Absolute Giant Grid Coordinate Index */}
                  <span className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white/[0.03] group-hover:text-[#ff5555]/[0.08] transition-colors duration-400 select-none">
                    0{idx + 1}
                  </span>
                </div>

                {/* Grid Item Text Deck with Asymmetric Text Push */}
                <motion.div 
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative z-10 mt-auto flex flex-col align-left"
                >
                  {/* Minimal Technical Identity Prefix Tag */}
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 group-hover:text-[#ff5555]/80 transition-colors duration-300 mb-1.5 select-none">
                    HI I'M EXPERT IN //
                  </span>

                  <h3 className="text-base lg:text-lg font-bold text-white/80 group-hover:text-white tracking-tight transition-colors duration-200">
                    {s.name}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-white/40 group-hover:text-white/70 font-mono leading-relaxed mt-3 transition-colors duration-300 max-w-[36ch]">
                    {s.desc}
                  </p>
                </motion.div>

                {/* 3. Bounding Frame Micro-Crosshair Animation */}
                {/* Horizontal Corner Rule */}
                <motion.div
                  initial={false}
                  animate={{ width: isHovered ? "40px" : "12px", backgroundColor: isHovered ? "#ff5555" : "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-4 right-4 h-[1px]"
                />
                {/* Vertical Corner Rule */}
                <motion.div
                  initial={false}
                  animate={{ height: isHovered ? "40px" : "12px", backgroundColor: isHovered ? "#ff5555" : "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-4 right-4 w-[1px]"
                />

                {/* Counterpart Mirrors (Top-Right Micro Bounds) */}
                <motion.div
                  initial={false}
                  animate={{ width: isHovered ? "16px" : "0px" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-4 right-4 h-[1px] bg-[#ff5555]/40"
                />
                <motion.div
                  initial={false}
                  animate={{ height: isHovered ? "16px" : "0px" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-4 right-4 w-[1px] bg-[#ff5555]/40"
                />
              </div>
            );
          })}
        </div>

      </div>
    </FlowSection>
  );
}