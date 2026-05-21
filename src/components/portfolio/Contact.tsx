"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import FloatingPaths from "./FloatingPaths";
import { links } from "@/lib/constants";

export default function Contact() {
  const words = "Get In Touch".split(" ");

  return (
    <div
      id="contact"
      className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl sm:text-7xl font-bold mb-8 tracking-tighter">
            {words.map((word, wI) => (
              <span key={wI} className="inline-block mr-4 last:mr-0">
                {word.split("").map((l, lI) => (
                  <motion.span
                    key={`${wI}-${lI}`}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: wI * 0.1 + lI * 0.03 }}
                    className="inline-block text-white"
                  >
                    {l}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <a
              href={`mailto:${links.email}`}
              className="group relative inline-flex items-center justify-center bg-emerald-950/20 border border-emerald-500/30 px-8 py-4 rounded-xl backdrop-blur-lg hover:bg-emerald-900/40 transition-all"
            >
              <span className="font-mono text-emerald-400 flex items-center gap-3">
                <Mail className="w-5 h-5" /> Email Me
              </span>
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-zinc-900 border border-zinc-800 px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all"
            >
              <span className="font-mono text-zinc-300 group-hover:text-white flex items-center gap-3">
                <Linkedin className="w-5 h-5" /> LinkedIn
              </span>
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center bg-zinc-900 border border-zinc-800 px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all"
            >
              <span className="font-mono text-zinc-300 group-hover:text-white flex items-center gap-3">
                <Github className="w-5 h-5" /> GitHub
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
