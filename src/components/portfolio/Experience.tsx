"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import FlowSection from "./FlowSection";
import { experienceEntries } from "@/lib/data";

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <FlowSection id="experience" ariaLabel="Experience">
      <p className="text-[#2a2a2a]/40 text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
        <Briefcase className="w-3.5 h-3.5 text-[#DC143C]" /> [SYS_WORK_TIMELINE]
      </p>

      <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight text-[#2a2a2a] uppercase select-none mb-16">
        Professional
        <br />
        Timeline<span className="text-[#DC143C]">.</span>
      </h2>

      <div className="relative w-full perspective-[2000px] pl-8 md:pl-12">
        
        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/[0.03] pointer-events-none" />

        <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-[#DC143C] via-[#DC143C] to-transparent pointer-events-none z-10 shadow-[0_0_10px_rgba(220,20,60,0.4)]" />

        <div className="space-y-2 w-full">
          {experienceEntries.map((exp, index) => {
            const key = exp.title + exp.org;
            const isHovered = hoveredIndex === index;
            const isFirst = index === 0;
            const Wrapper = isFirst ? "a" : "div";
            const wrapperProps = isFirst
              ? {
                  href: exp.link
                    ? exp.link.startsWith("http")
                      ? exp.link
                      : `https://${exp.link}`
                    : "#",
                  target: "_blank" as const,
                  rel: "noopener noreferrer" as const,
                }
              : {};

            return (
              <Wrapper
                key={key}
                {...wrapperProps}
                className="group block relative border-b border-[#2a2a2a]/[0.02] last:border-b-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Horizontal row edge alignment node */}
                <div 
                  className={`absolute -left-[24px] md:-left-[40px] top-[42px] w-2 h-2 rounded-full transition-all duration-300 z-20 ${
                    isHovered 
                      ? "bg-[#DC143C] scale-125 shadow-[0_0_8px_rgba(220,20,60,0.8)]" 
                      : "bg-neutral-200 border border-[#2a2a2a]/20 group-hover:border-[#2a2a2a]/50"
                  }`} 
                />

                {/* Modern Cinematic Backing Sheen Layer */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    backdropFilter: isHovered ? "blur(4px) saturate(110%)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/[0.015] via-transparent to-transparent pointer-events-none rounded-xl overflow-hidden"
                >
                  {isHovered && (
                    <motion.div
                      initial={{ y: "-100%" }}
                      animate={{ y: "200%" }}
                      transition={{
                        duration: 1.2,
                        ease: [0.25, 1, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 1.5,
                      }}
                      className="w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none"
                    />
                  )}
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    z: isHovered ? 20 : 0,
                    x: isHovered ? 8 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative py-8 md:py-10 px-4 rounded-xl transition-colors duration-300"
                >
                  <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-6 md:gap-12">
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-2.5">
                        <h3 className="text-[#2a2a2a]/80 font-bold text-lg md:text-xl tracking-tight transition-colors group-hover:text-[#2a2a2a] uppercase">
                          <span className="relative inline-block overflow-hidden vertical-align-middle">
                            <motion.span
                              animate={{ y: isHovered ? "-100%" : "0%" }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="block"
                            >
                              {exp.title}
                            </motion.span>
                            <motion.span
                              initial={{ y: "100%" }}
                              animate={{ y: isHovered ? "0%" : "100%" }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute inset-0 block text-[#DC143C]"
                            >
                              {exp.title}
                            </motion.span>
                          </span>
                        </h3>

                        <ArrowUpRight
                          className={`
                            w-4 h-4 text-[#DC143C]
                            transition-all duration-300 ease-out
                            ${
                              isHovered
                                ? "opacity-100 translate-x-0.5 -translate-y-0.5"
                                : "opacity-0 -translate-x-2 translate-y-2"
                            }
                          `}
                        />
                      </div>

                      <p className="text-[#2a2a2a]/60 font-mono text-[9px] uppercase tracking-widest mt-1">
                        // {exp.org}
                      </p>

                      <p
                        className={`
                          text-xs md:text-sm mt-4 leading-relaxed max-w-xl font-light tracking-wide
                          transition-all duration-400 ease-out
                          ${isHovered ? "text-[#2a2a2a]/60" : "text-[#2a2a2a]/30"}
                        `}
                      >
                        {exp.desc}
                      </p>
                    </div>

                    {/* 3D Static Card Image Module Frame */}
                    <div className="hidden lg:block relative w-40 h-24 shrink-0">
                      <motion.div
                        initial={false}
                        animate={{
                          z: isHovered ? 80 : -40,
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1.05 : 0.9,
                          rotateY: isHovered ? -10 : 0,
                          rotateX: isHovered ? 4 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 26,
                        }}
                        className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl border border-[#2a2a2a]/[0.04] bg-neutral-100"
                      >
                        <Image
                          src={exp.image || "/placeholder.svg"}
                          alt={exp.title}
                          fill
                          sizes="160px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.75] contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a]/10 via-transparent to-transparent" />
                      </motion.div>
                    </div>

                    {/* Temporal Timeline Timestamp Metadata */}
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 self-start pt-1 font-mono">
                      <span
                        className={`
                          text-xs tracking-widest transition-all duration-300 ease-out tabular-nums
                          ${isHovered ? "text-[#DC143C]" : "text-[#2a2a2a]/20"}
                        `}
                      >
                        {exp.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </FlowSection>
  );
}