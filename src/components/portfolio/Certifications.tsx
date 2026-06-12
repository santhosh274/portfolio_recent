"use client";

import { useRef, MouseEvent } from "react";
import { Award, ArrowUpRight } from "lucide-react";
import FlowSection from "./FlowSection";
import { links } from "@/lib/constants";
import { certificationEntries } from "@/lib/data";

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.querySelector(".interactive-card-layer") as HTMLDivElement;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / height) * 10;
    const rY = (mouseX / width) * 10;

    card.style.setProperty("--rotX", `${rX}deg`);
    card.style.setProperty("--rotY", `${rY}deg`);
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.querySelector(".interactive-card-layer") as HTMLDivElement;
    if (!card) return;
    
    card.style.setProperty("--rotX", "0deg");
    card.style.setProperty("--rotY", "0deg");
  };

  return (
    <FlowSection id="certifications" ariaLabel="Certifications">
      {/* Editorial Structural Header */}
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest flex items-center gap-2 mb-4">
            <Award className="w-3.5 h-3.5" /> 04 — Credentials
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.9] tracking-tight text-white">
            Certifications.
          </h2>
        </div>
        <p className="text-white/60 font-mono text-xs max-w-xs leading-relaxed md:text-right">
          Verified academic and corporate professional architectures.
        </p>
      </div>

      {/* Grid Canvas */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        style={{ perspective: "1400px" }}
      >
        {certificationEntries.map((cert, i) => {
          return (
            <a
              key={i}
              href={cert.link || links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col relative group outline-none select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main Card Substrate — Transformed into a sleek absolute black canvas */}
              <div
                className="interactive-card-layer relative overflow-hidden flex flex-col h-full rounded-2xl border border-white/[0.08] bg-neutral-950 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out"
                style={{
                  transform: "rotateX(var(--rotX, 0deg)) rotateY(var(--rotY, 0deg)) scale3d(1, 1, 1)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Dynamic Mouse-Tracing Ambient Border Highlight (Soft white glow for dark card) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 mix-blend-screen"
                  style={{
                    background: "radial-gradient(180px circle at var(--mx, 0px) var(--my, 0px), rgba(255, 255, 255, 0.15), transparent 80%)"
                  }}
                />

                {/* Spotlight Cursor Ray Glow Layer */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                  style={{
                    background: "radial-gradient(240px circle at var(--mx, 0px) var(--my, 0px), rgba(255, 255, 255, 0.07), transparent 80%)"
                  }}
                />

                {/* Minimalist Header Block */}
                <div
                  className={`h-24 bg-gradient-to-br ${cert.gradient} flex items-center justify-between px-6 relative overflow-hidden shrink-0`}
                >
                  {/* Overlay adjusted to subtly deepen dark backgrounds under vibrant colors */}
                  <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
                  
                  {/* Subtle Abstract Micro-Grid Overlay optimized for dark backing */}
                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />
                  
                  <Award 
                    className="w-8 h-8 text-white/50 transition-transform duration-700 ease-out group-hover:scale-110" 
                    style={{ transform: "translateZ(30px)" }}
                  />

                  {/* Clean Angular Link indicator */}
                  <div 
                    className="p-2 rounded-full border border-white/20 bg-black/20 text-white opacity-60 group-hover:opacity-100 group-hover:bg-black/40 transition-all duration-300"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Main Informational Sub-Canvas */}
                <div 
                  className="p-6 flex flex-col flex-1 justify-between relative z-10"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div>
                    {/* Dark Mode typography specs */}
                    <p className="text-[10px] font-mono font-medium tracking-wider text-white/40 group-hover:text-white/60 transition-colors uppercase mb-2">
                      {cert.issuer} &bull; {cert.date}
                    </p>
                    
                    <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors duration-300 tracking-tight uppercase">
                      {cert.title}
                    </h3>
                    
                    <p className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-xs leading-relaxed mt-2 line-clamp-2">
                      {cert.desc}
                    </p>
                  </div>
                  
                  {/* Micro-tagged Dark Glass Filter Layout */}
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/[0.06]">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono font-semibold tracking-wider text-white/60 bg-white/[0.04] border border-white/[0.05] px-2 py-0.5 rounded uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </a>
          );
        })}
      </div>
    </FlowSection>
  );
}