  "use client";

  import { useRef, useCallback, useState } from "react";
  import { motion } from "framer-motion";
  import { Terminal, ArrowUpRight, FileText } from "lucide-react";
  import { links } from "@/lib/constants";

  interface HeroProps {
    onNavigate: (id: string) => void;
  }

  function MagneticButton({
    children,
    onClick,
    className = "",
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const MAGNET_DIST = 150;

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAGNET_DIST) {
        const strength = 1 - dist / MAGNET_DIST;
        setOffset({ x: dx * 0.25 * strength, y: dy * 0.25 * strength });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    }, []);

    const handleMouseLeave = useCallback(() => {
      setOffset({ x: 0, y: 0 });
    }, []);

    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.2s cubic-bezier(0.215, 0.610, 0.355, 1)",
        }}
      >
        {children}
      </button>
    );
  }

  export default function Hero({ onNavigate }: HeroProps) {
    return (
      <section 
        className="relative min-h-screen flex flex-col justify-center px-[6vw] md:px-[8vw] overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        {/* Dynamic Overlay Vignette to soften the background grid edge lines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-[#2d0066]/60 pointer-events-none" />

        {/* Structural layout block pinned safely to the left */}
        <div className="relative z-10 max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            

            {/* Heading */}
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-tight mb-8 text-white uppercase select-none">
              Santhosh
              <br />
              Kumarr<span className="text-[#ff5555]">.</span>
            </h1>

            {/* Description Block */}
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl font-light mb-12">
              Engineering secure digital infrastructures and building scalable, defensive
              full-stack architectures with a disciplined, security-first timeline layout.
            </p>

            {/* Prominent Action Interface Layout */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:items-start">
              {/* Primary Work Button with Subtle Light Micro-Grid Texture */}
              <MagneticButton
                onClick={() => onNavigate("projects")}
                className="group relative inline-flex items-center justify-between h-14 rounded-lg px-6 font-mono text-xs uppercase tracking-wider text-white bg-neutral-950 border border-neutral-950 hover:bg-[#ff5555] hover:border-[#ff5555] transition-colors duration-300 cursor-pointer sm:flex-none sm:min-w-[220px] overflow-hidden"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "12px 12px",
                }}
              >
                <span className="relative z-10">View Selected Work</span>
                <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" />
              </MagneticButton>

              {/* Secondary Resume Button with Subtle Dark Micro-Grid Texture */}
              <MagneticButton
                onClick={() => {
                  const w = window.open(links.resume, "_blank");
                  if (w) w.opener = null;
                }}
                className="group relative inline-flex items-center justify-between h-14 rounded-lg px-6 font-mono text-xs uppercase tracking-wider text-white/80 bg-white/10 border border-white/10 hover:border-white hover:text-white transition-colors duration-300 cursor-pointer sm:flex-none sm:min-w-[180px] overflow-hidden"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 0, 0, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "12px 12px",
                }}
              >
                <span className="relative z-10">Download CV</span>
                <FileText className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300 relative z-10" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* Reserved space on the right side for the Globe component layout placement */}
        <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] pointer-events-none hidden lg:block select-none opacity-20" />
      </section>
    );
  }