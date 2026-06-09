"use client";

import { Shield, Cpu } from "lucide-react";
import FlowSection from "./FlowSection";

export default function About() {
  return (
    <FlowSection
      id="about"
      ariaLabel="About"
      style={{ backgroundColor: "#000000" }}
    >
      <p className="text-emerald-500 text-sm font-mono uppercase tracking-widest flex items-center gap-2">
        <Shield className="w-4 h-4" /> 01 — Mission
      </p>
      <h2 className="text-[clamp(3rem,7vw,8rem)] font-bold leading-[0.85] tracking-tight">
        Defense
        <br />
        In Depth.
      </h2>
      <div className="flex flex-col lg:flex-row gap-12 justify-between mt-8">
        <p className="max-w-[50ch] text-zinc-400 leading-relaxed font-mono">
          I specialize in offensive security and building secure full-stack
          systems. My approach centers on layering security at every level of the
          stack, from authentication design to API hardening.
        </p>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Ethical Hacking",
            "Vulnerability Analysis",
            "Digital Forensics",
            "Fullstack Development",
          ].map((s) => (
            <div
              key={s}
              className="border border-zinc-800 p-6 rounded-xl bg-zinc-900/50 flex flex-col items-start gap-3"
            >
              <Cpu className="w-6 h-6 text-emerald-500" />
              <span className="font-semibold text-sm">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </FlowSection>
  );
}
