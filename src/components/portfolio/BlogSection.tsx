"use client";

import { Shield, AlertTriangle, ChevronRight } from "lucide-react";
import FlowSection from "./FlowSection";
import { blogPosts, type BlogPost } from "@/lib/data";

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export default function BlogSection({ onSelectPost }: BlogSectionProps) {
  return (
    <FlowSection
      id="research"
      ariaLabel="Research"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-rose-500 text-sm font-mono uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> 04 — Insights
          </p>
          <h2 className="text-[clamp(3rem,7vw,8rem)] font-bold leading-[0.85] tracking-tight">
            Security
            <br />
            Blog.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="bg-zinc-900/40 p-8 rounded-2xl border border-white/5 cursor-pointer hover:border-emerald-500/50 transition-all group flex flex-col h-full shadow-lg"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-mono text-emerald-500">
                {post.date}
              </span>
              {post.severity === "CRITICAL" && (
                <span className="bg-rose-500/10 text-rose-500 text-[10px] px-2 py-1 rounded border border-rose-500/20 font-mono flex items-center gap-1">
                  <Shield className="w-3 h-3" /> {post.severity}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-1">
              {post.overview}
            </p>
            <div className="mt-auto flex items-center text-xs font-mono text-zinc-400 group-hover:text-emerald-500 transition-colors">
              Read Article <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </FlowSection>
  );
}
