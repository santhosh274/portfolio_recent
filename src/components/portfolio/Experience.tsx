"use client";

import { ExternalLink } from "lucide-react";
import FlowSection from "./FlowSection";
import { cardColors } from "@/lib/constants";
import { experienceEntries } from "@/lib/data";

export default function Experience() {
  return (
    <FlowSection
      id="experience"
      ariaLabel="Experience"
      style={{ backgroundColor: "#000000" }}
    >

      <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
        02 — Selected Work
      </p>
      <h2 className="text-[clamp(3rem,7vw,8rem)] font-bold leading-[0.85] tracking-tight">
        Professional
        <br />
        Timeline.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {experienceEntries.map((exp, i) => {
          const c = cardColors[exp.color];
          return (
            <div
              key={i}
              className={`group border-b border-zinc-800 pb-8 ${c.hoverBorder} transition-colors`}
            >
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-2xl font-bold">{exp.title}</h3>
                <span className={`font-mono ${c.text}`}>{exp.year}</span>
              </div>
              <p className="text-zinc-400 font-mono mb-3 text-sm">{exp.org}</p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                {exp.desc}
              </p>
              {exp.link ? (
                <a
                  href={exp.link.startsWith("http") ? exp.link : `https://${exp.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-xs font-mono ${c.text} hover:underline underline-offset-4`}
                  aria-label={`Open external link for ${exp.title}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {exp.link}
                </a>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] font-mono ${c.tagText} ${c.tagBg} px-2 py-1 rounded`}
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
