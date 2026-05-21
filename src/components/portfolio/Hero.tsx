"use client";

import { motion } from "framer-motion";
import { Terminal, Crosshair, FileText } from "lucide-react";
import LiquidButton from "./LiquidButton";
import { links } from "@/lib/constants";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-[6vw] md:px-[10vw] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-emerald-500 font-mono mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Security-First Engineer
          </p>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter mb-6">
            Hi, I&apos;m <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              Santhosh Kumarr A
            </span>
          </h1>
          <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-zinc-400 max-w-2xl leading-relaxed mb-12">
            Engineering secure digital infrastructures and building scalable
            full-stack systems with a disciplined security-first mindset.
          </p>
          <div className="flex flex-wrap gap-6">
            <LiquidButton
              onClick={() => onNavigate("projects")}
              size="xxl"
              variant="default"
              className="bg-black"
            >
              View Work <Crosshair className="w-5 h-5 ml-2" />
            </LiquidButton>
            <LiquidButton
              onClick={() => window.open(links.resume, "_blank")}
              size="xxl"
              variant="outline"
            >
              Resume <FileText className="w-5 h-5 ml-2" />
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
