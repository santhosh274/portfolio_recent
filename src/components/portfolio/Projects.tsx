"use client";

import { Server, ExternalLink } from "lucide-react";
import FlowSection from "./FlowSection";
import { cardColors, links } from "@/lib/constants";
import { projectEntries } from "@/lib/data";

export default function Projects() {
  return (
    <FlowSection
      id="projects"
      ariaLabel="Projects"
      style={{ backgroundColor: "#000000" }}
    >
      <p className="text-purple-500 text-sm font-mono uppercase tracking-widest flex items-center gap-2">
        <Server className="w-4 h-4" /> 03 — Engineering
      </p>
      <h2 className="text-[clamp(3rem,7vw,8rem)] font-bold leading-[0.85] tracking-tight">
        Selected
        <br />
        Projects.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projectEntries.map((p, i) => {
          const c = cardColors[p.color];
          return (
            <div
              key={i}
              className={`${c.cardBg} border ${c.cardBorder} p-8 rounded-2xl ${c.hoverBorder} transition-all flex flex-col cursor-pointer group`}
              onClick={() => window.open(links.github, "_blank")}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-zinc-500 text-sm flex-1 leading-relaxed">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-zinc-800/50">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] font-mono ${c.tagText} ${c.tagBg} px-2 py-0.5 rounded`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </FlowSection>
  );
}
