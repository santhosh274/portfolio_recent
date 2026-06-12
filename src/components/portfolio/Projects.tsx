"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Server, ArrowUpRight } from "lucide-react";
import FlowSection from "./FlowSection";
import { links } from "@/lib/constants";
import { projectEntries } from "@/lib/data";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    let ctx: any;
    let ro: ResizeObserver;

    const initGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      
      ctx = gsap.context(() => {
        ro = new ResizeObserver(() => ScrollTrigger.refresh());
        cards.forEach((c) => ro.observe(c));

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return; 

          const nextCard = cards[i + 1];

          gsap.to(card, {
            scale: 0.9,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 90%",
              end: "top 15%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    };

    initGsap();

    return () => {
      ro?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
      <FlowSection
      id="projects"
      ariaLabel="Projects"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-16">
        <div>
          <p className="text-white/60 text-sm font-mono uppercase tracking-widest flex items-center gap-2 mb-3">
            <Server className="w-4 h-4" /> 03 — Engineering
          </p>
          <h2 className="text-[clamp(3rem,7vw,8rem)] font-bold leading-[0.85] tracking-tight text-white">
            Selected
            <br />
            Projects.
          </h2>
        </div>

        <p className="text-white/70 max-w-xs text-sm leading-relaxed mt-auto font-medium md:text-right">
          A selective showcase of production-grade systems, secure architectures, and
          interactive digital interfaces.
        </p>
      </div>

      {/* Stack Container */}
      <div
        ref={containerRef}
        className="relative w-full flex flex-col items-center gap-y-[6vh] md:gap-y-[12vh] pb-32"
      >
        {projectEntries.map((p, i) => {
          const projectIndex = String(i + 1).padStart(2, "0");

          return (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="relative md:sticky w-full rounded-3xl border border-white/[0.08] bg-neutral-950 overflow-hidden group cursor-pointer transition-colors duration-300 hover:bg-neutral-900 md:shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
              style={{
                top: "clamp(6vh, 12vh, 12vh)",
                zIndex: i + 1, 
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                const w = window.open(p.githubLink || links.github, "_blank");
                if (w) w.opener = null;
              }}
            >
              {/* Premium dark glass sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/[0.04] pointer-events-none" />

              {/* Subtle grid bg matching root site style */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />

              {/* Shimmer scanline overlay */}
              <motion.div
                initial={false}
                animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
              >
                {hoveredCard === i && (
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "200%" }}
                    transition={{
                      duration: 0.85,
                      ease: [0.25, 1, 0.5, 1],
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    }}
                    className="w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent pointer-events-none"
                  />
                )}
              </motion.div>

              {/* Split layout */}
              <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[50vh] md:min-h-[55vh]">
                {/* Image Frame — rendered first in DOM but pushed to right on desktop via the grid */}
                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-neutral-900 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

                  <img
                    src={p.image || "/api/placeholder/600/400"}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 ease-out filter brightness-[0.75] contrast-[1.05]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-between relative z-10">
                  <div>
                    <span className="block text-5xl md:text-6xl font-serif italic text-white/10 group-hover:text-white/20 transition-colors duration-300 mb-10">
                      {projectIndex}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-bold text-white/90 group-hover:text-white tracking-tight uppercase leading-[1.1] transition-colors duration-300 max-w-md">
                      {p.title}
                    </h3>

                    <p className="text-white/50 group-hover:text-white/70 text-base max-w-xl leading-relaxed mt-6 transition-colors duration-300">
                      {p.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-6 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono font-semibold tracking-wider text-white/60 bg-white/[0.04] border border-white/[0.05] px-3 py-1 rounded-md uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                      <span>EXPLORE</span>
                      <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FlowSection>
  );
}