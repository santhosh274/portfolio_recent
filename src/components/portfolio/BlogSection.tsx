"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, Terminal, ArrowUpRight } from "lucide-react";
import FlowSection from "./FlowSection";
import { blogPosts, type BlogPost } from "@/lib/data";

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export default function BlogSection({ onSelectPost }: BlogSectionProps) {
  return (
    <FlowSection id="research" ariaLabel="Research" innerClassName="justify-start md:justify-between">
      {/* Editorial Section Header */}
      <div className="w-full mb-8 md:mb-16 relative">
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase mb-6">
          <Terminal className="w-3.5 h-3.5 text-[#ff5555]" /> Intel Logs
        </div>
        
        <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.85] tracking-tight text-white uppercase">
          Security
          <br />
          <span className="text-[#ff5555]">Research.</span>
        </h2>
      </div>

      {/* Modernized Asymmetric Stack Layout */}
      <div className="flex flex-col w-full gap-4 group/list">
        {blogPosts.map((post, idx) => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="group relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 p-6 md:p-8 rounded-xl bg-neutral-950/40 border border-white/[0.04] hover:border-white/20 hover:bg-neutral-900/40 transition-all duration-500 cursor-pointer overflow-hidden group-hover/list:opacity-50 hover:!opacity-100"
          >
            {/* Ambient Kinetic Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.01] to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none" />

            {/* Left Block: Index & Meta Timeline (3 Columns) */}
            <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between md:justify-center gap-2 relative z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-white/20 group-hover:text-[#ff5555] transition-colors duration-300">
                  0{idx + 1}.
                </span>
                <span className="font-mono text-xs text-white/40 group-hover:text-white/60 transition-colors">
                  {post.date}
                </span>
              </div>
              
              {/* Dynamic Severity Token Base */}
              <div className="md:mt-2">
                {post.severity === "CRITICAL" ? (
                  <span className="bg-red-500/5 text-red-400 text-[9px] tracking-[0.15em] px-2 py-0.5 rounded border border-red-500/10 font-mono flex items-center gap-1 uppercase">
                    <Shield className="w-2.5 h-2.5 text-red-400" /> {post.severity}
                  </span>
                ) : (
                  <span className="bg-amber-500/5 text-amber-400 text-[9px] tracking-[0.15em] px-2 py-0.5 rounded border border-amber-500/10 font-mono flex items-center gap-1 uppercase">
                    <AlertTriangle className="w-2.5 h-2.5 text-amber-400" /> {post.severity || "NOTICE"}
                  </span>
                )}
              </div>
            </div>

            {/* Center Block: Core Typographic Intel Payload (7 Columns) */}
            <div className="md:col-span-7 flex flex-col justify-center relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-white/80 group-hover:text-white tracking-tight leading-snug transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light group-hover:text-white/60 max-w-2xl transition-colors">
                {post.overview}
              </p>
            </div>

            {/* Right Block: Pure Functional Action Anchor (2 Columns) */}
            <div className="md:col-span-2 flex justify-end items-center relative z-10 pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.04]">
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/30 group-hover:text-white tracking-widest uppercase transition-all duration-300 transform group-hover:-translate-x-2">
                <span>[EXPLORE]</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#ff5555] transition-colors" />
              </div>
            </div>

          </div>
        ))}
      </div>
    </FlowSection>
  );
}