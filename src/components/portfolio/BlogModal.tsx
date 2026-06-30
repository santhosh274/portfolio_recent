"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ChevronRight,
  AlertTriangle,
  Lock,
  X,
  Terminal,
  Activity
} from "lucide-react";
import type { BlogPost } from "@/lib/data";

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  return (
    <AnimatePresence>
      {post && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#2a2a2a]/70 backdrop-blur-xl"
          onClick={onClose}
          style={{ touchAction: "none", overscrollBehavior: "none" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#2a2a2a]/[0.06] p-6 md:p-10 relative custom-scrollbar shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              touchAction: "pan-y",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
          >
            {/* Close Button Anchor */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-lg bg-white/[0.02] border border-[#2a2a2a]/[0.04] text-[#2a2a2a]/40 hover:text-[#2a2a2a] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Platform */}
            <div className="mb-8 pr-12 border-b border-[#2a2a2a]/[0.04] pb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#DC143C] tracking-wider">
                  {post.date}
                </span>
                <span className="bg-white/[0.02] text-[#2a2a2a]/60 px-2.5 py-0.5 rounded font-mono text-[10px] tracking-widest uppercase border border-[#2a2a2a]/[0.06]">
                  {post.category}
                </span>
                {post.severity === "CRITICAL" ? (
                  <span className="bg-red-500/5 text-red-400 text-[10px] tracking-wider px-2.5 py-0.5 rounded border border-red-500/20 font-mono flex items-center gap-1 uppercase">
                    <Shield className="w-3 h-3" /> {post.severity}
                  </span>
                ) : (
                  <span className="bg-amber-500/5 text-amber-400 text-[10px] tracking-wider px-2.5 py-0.5 rounded border border-amber-500/20 font-mono flex items-center gap-1 uppercase">
                    <AlertTriangle className="w-3 h-3" /> {post.severity || "NOTICE"}
                  </span>
                )}
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#2a2a2a] uppercase leading-tight mb-2">
                {post.title}
              </h2>
              {post.subtitle && (
                <p className="text-[#2a2a2a]/60 text-sm font-mono tracking-wide">{post.subtitle}</p>
              )}
            </div>

            {/* Core Overview Shell */}
            <div className="mb-10 bg-white/[0.01] border border-[#2a2a2a]/[0.04] p-5 rounded-xl">
              <h4 className="text-[10px] font-mono text-[#2a2a2a]/30 uppercase mb-2 tracking-[0.2em] flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-[#DC143C]" /> [DATA_FLOW_OVERVIEW]
              </h4>
              <p className="text-[#2a2a2a]/70 text-xs md:text-sm leading-relaxed font-light">{post.overview}</p>
            </div>

            {/* Split Threat Diagnostics Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              
              {/* Left Column: Metrics & Indicators */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-mono text-[#2a2a2a]/30 uppercase mb-3 tracking-[0.2em]">
                    [EXPOSED_ARTIFACTS]
                  </h4>
                  <ul className="space-y-2 text-xs md:text-sm text-[#2a2a2a]/60 font-light">
                    {post.artifacts.map((art, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-[#DC143C]" />
                        <span className="font-mono bg-white/[0.01] px-1.5 py-0.5 rounded border border-[#2a2a2a]/[0.02]">{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border border-red-500/10 bg-red-500/[0.01] rounded-xl">
                  <h4 className="text-[10px] font-mono text-red-400 uppercase mb-2 tracking-[0.2em] flex items-center gap-1.5">
                    <Activity className="w-3 h-3" /> SEVERITY ASSESSMENT
                  </h4>
                  <div className="text-xs font-mono text-[#2a2a2a]/50 leading-relaxed whitespace-pre-line">
                    {post.techClass}
                  </div>
                </div>

                {post.risks && (
                  <div>
                    <h4 className="text-[10px] font-mono text-[#2a2a2a]/30 uppercase mb-3 tracking-[0.2em]">
                      [SECURITY_RISKS]
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-[#2a2a2a]/60 font-light">
                      {post.risks.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertTriangle className="w-3 h-3 text-amber-500/60 mt-1 flex-shrink-0" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Remediation Protocols */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-mono text-[#2a2a2a]/30 uppercase mb-3 tracking-[0.2em]">
                    [TECHNICAL_ROOT_CAUSE]
                  </h4>
                  <p className="text-[#2a2a2a]/60 text-xs md:text-sm leading-relaxed font-light">
                    {post.rootCause}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono text-[#DC143C] uppercase mb-3 tracking-[0.2em]">
                    [THREAT_MITIGATION]
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-[#2a2a2a]/60 font-light">
                    {post.mitigation
                      .split(". ")
                      .filter((s) => s.trim())
                      .map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-[#DC143C] mt-1 flex-shrink-0" />
                          <span>{step.trim().replace(/\.$/, "")}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Strategic Structural Disclosures */}
            <div className="space-y-6 pt-6 border-t border-[#2a2a2a]/[0.04]">
              <div>
                <h4 className="text-[10px] font-mono text-[#DC143C] mb-3 flex items-center gap-1.5 tracking-[0.2em] uppercase">
                  <Lock className="w-3.5 h-3.5" /> ETHICAL_DISCLOSURE_PROTOCOL
                </h4>
                <p className="text-[#2a2a2a]/60 text-xs md:text-sm leading-relaxed font-light italic">
                  {post.disclosure}
                </p>
              </div>

              <div className="bg-white/[0.01] p-5 rounded-xl border border-[#2a2a2a]/[0.04]">
                <h4 className="text-[10px] font-mono text-[#2a2a2a]/40 mb-3 flex items-center gap-1.5 tracking-[0.2em] uppercase">
                  <Shield className="w-3.5 h-3.5 text-[#DC143C]" /> KEY_LESSONS_LEARNED
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-[#2a2a2a]/60 leading-relaxed font-light">
                  {post.lesson
                    .split(". ")
                    .filter((s) => s.trim())
                    .map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#DC143C] font-mono mt-0.5 flex-shrink-0">▪</span>
                        <span>{lesson.trim().replace(/\.$/, "")}.</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}