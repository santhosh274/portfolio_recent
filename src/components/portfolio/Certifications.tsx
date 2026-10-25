"use client";

import { Award, ArrowUpRight } from "lucide-react";
import LiquidGradientCanvas from "@/components/ui/liquid-gradient";
import FlowSection from "./FlowSection";
import { links } from "@/lib/constants";
import { certificationEntries } from "@/lib/data";

export default function Certifications() {
  return (
    <FlowSection id="certifications" ariaLabel="Certifications" noPadding>
      <div className="px-[6vw] md:px-[10vw] pt-[clamp(4rem,8vw,6vw)] pb-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-[#2a2a2a]/50 text-xs font-mono uppercase tracking-widest flex items-center gap-2 mb-4">
              <Award className="w-3.5 h-3.5" /> 04 — Credentials
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.9] tracking-tight text-[#2a2a2a]">
              Certifications.
            </h2>
          </div>
          <p className="text-[#2a2a2a]/60 font-mono text-xs max-w-xs leading-relaxed md:text-right">
            Verified academic and corporate professional architectures.
          </p>
        </div>
      </div>

      <div
        data-flow-horizontal-scroll
        className="w-full overflow-hidden flex-1 flex items-start"
      >
        <div
          data-flow-horizontal-track
          className="flex gap-6 px-[6vw] md:px-[10vw] pb-[6vw] will-change-transform"
        >
          {certificationEntries.map((cert, i) => (
            <a
              key={i}
              href={cert.link || links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-[85vw] md:w-[42vw] lg:w-[36vw] xl:w-[30vw] outline-none"
            >
              <div className="glass glass-hover relative h-full rounded-2xl overflow-hidden flex flex-col min-h-[380px]">
                <div className="h-36 relative overflow-hidden shrink-0">
                  <LiquidGradientCanvas
                    colors={["#DC143C", "#8B0000", "#DC143C", "#FF6B6B"]}
                    speed={0.3}
                    scale={0.3}
                    seed={i + 1}
                    turbAmp={0.3}
                    turbFreq={0.4}
                    turbIter={6}
                    waveFreq={2.0}
                    exposure={1.1}
                    contrast={1.05}
                    saturation={1.0}
                    ditherMode="off"
                    dither={0}
                    fps={30}
                    maxDpr={1.5}
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-[#2a2a2a]/10 mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,rgba(42,42,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,42,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                  <div className="relative z-10 h-full flex items-center justify-between px-6">
                    <Award className="w-8 h-8 text-white/70 transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="p-2 rounded-full border border-white/20 bg-white/10 text-white opacity-60 group-hover:opacity-100 group-hover:bg-white/20 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-[10px] font-mono font-medium tracking-wider text-[#2a2a2a]/60 group-hover:text-[#2a2a2a]/80 transition-colors uppercase mb-2">
                      {cert.issuer} &bull; {cert.date}
                    </p>
                    <h3 className="text-base font-bold text-[#2a2a2a]/90 group-hover:text-[#2a2a2a] transition-colors duration-300 tracking-tight uppercase">
                      {cert.title}
                    </h3>
                    <p className="text-[#2a2a2a]/50 group-hover:text-[#2a2a2a]/70 transition-colors duration-300 text-xs leading-relaxed mt-2 line-clamp-2">
                      {cert.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-[#2a2a2a]/[0.06]">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono font-semibold tracking-wider text-[#2a2a2a]/60 bg-[#2a2a2a]/[0.04] border border-[#2a2a2a]/[0.05] px-2 py-0.5 rounded uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </FlowSection>
  );
}
