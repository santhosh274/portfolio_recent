"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ChevronRight,
  AlertTriangle,
  Lock,
  X,
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-md"
          onClick={onClose}
          style={{ touchAction: "none", overscrollBehavior: "none" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#050505] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 p-8 md:p-12 relative custom-scrollbar shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              touchAction: "pan-y",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8 pr-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-emerald-500 text-sm font-mono">
                  {post.date}
                </span>
                <span className="bg-zinc-900 text-zinc-400 px-2 py-1 rounded text-xs font-mono border border-zinc-800">
                  {post.category}
                </span>
                {post.severity === "CRITICAL" && (
                  <span className="bg-rose-500/10 text-rose-500 text-[10px] px-2 py-1 rounded border border-rose-500/20 font-mono flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {post.severity}
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
                {post.title}
              </h2>
              {post.subtitle && (
                <p className="text-zinc-500 text-base italic">{post.subtitle}</p>
              )}
            </div>

            {/* Overview */}
            <div className="mb-10">
              <h4 className="text-xs font-mono text-zinc-500 uppercase mb-3 tracking-widest">
                Overview
              </h4>
              <p className="text-zinc-300 leading-relaxed">{post.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-900">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Exposed Artifacts */}
                <div>
                  <h4 className="text-xs font-mono text-zinc-500 uppercase mb-3 tracking-widest">
                    Exposed Artifacts
                  </h4>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {post.artifacts.map((art, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-rose-500" />{" "}
                        {art}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Classification */}
                <div className="p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl">
                  <h4 className="text-xs font-mono text-rose-400 uppercase mb-2 tracking-widest">
                    Severity Assessment
                  </h4>
                  <div className="text-xs font-mono text-rose-300 leading-relaxed whitespace-pre-line">
                    {post.techClass}
                  </div>
                </div>

                {/* Security Risks */}
                {post.risks && (
                  <div>
                    <h4 className="text-xs font-mono text-zinc-500 uppercase mb-3 tracking-widest">
                      Security Risks
                    </h4>
                    <p className="text-zinc-500 text-sm mb-3">
                      The exposed data could lead to:
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      {post.risks.map((risk, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />{" "}
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Root Cause */}
                <div>
                  <h4 className="text-emerald-500 font-bold mb-3 underline text-sm">
                    Technical Root Cause
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {post.rootCause}
                  </p>
                </div>

                {/* Mitigation */}
                <div>
                  <h4 className="text-emerald-500 font-bold mb-3 underline text-sm">
                    Recommended Mitigation
                  </h4>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {post.mitigation
                      .split(". ")
                      .filter((s) => s.trim())
                      .map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-emerald-400 mt-1 flex-shrink-0" />{" "}
                          {step.trim().replace(/\.$/, "")}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              {/* Ethical Disclosure */}
              <div className="border-t border-zinc-900 pt-8">
                <h4 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Ethical Disclosure
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed italic">
                  {post.disclosure}
                </p>
              </div>

              {/* Key Lessons */}
              <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
                <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" /> Key Lessons
                </h4>
                <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
                  {post.lesson
                    .split(". ")
                    .filter((s) => s.trim())
                    .map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-1 flex-shrink-0">
                          •
                        </span>{" "}
                        {lesson.trim().replace(/\.$/, "")}.
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
