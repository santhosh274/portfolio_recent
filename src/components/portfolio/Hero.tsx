  "use client";

  import { useRef, useCallback } from "react";
  import { Terminal, ArrowUpRight, FileText } from "lucide-react";
  import { links } from "@/lib/constants";

  interface HeroProps {
    onNavigate: (id: string) => void;
  }

  function MagneticButton({
    children,
    onClick,
    className = "",
    style,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
  }) {
    const ref = useRef<HTMLButtonElement>(null);
    const rectRef = useRef<DOMRect | null>(null);
    const MAGNET_DIST = 150;

    // Cache the bounding box on entry so pointer moves never trigger layout reads.
    const handleMouseEnter = useCallback(() => {
      rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    }, []);

    // Write the transform straight to the node: no React re-render per mousemove.
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      const el = ref.current;
      const rect = rectRef.current;
      if (!el || !rect) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAGNET_DIST) {
        const strength = 1 - dist / MAGNET_DIST;
        el.style.transform = `translate3d(${(dx * 0.25 * strength).toFixed(2)}px, ${(dy * 0.25 * strength).toFixed(2)}px, 0)`;
      } else {
        el.style.transform = "translate3d(0, 0, 0)";
      }
    }, []);

    const handleMouseLeave = useCallback(() => {
      rectRef.current = null;
      if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
    }, []);

    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          transition: "transform 0.2s cubic-bezier(0.215, 0.610, 0.355, 1)",
          ...style,
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
            linear-gradient(to right, rgba(42, 42, 42, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(42, 42, 42, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/60 pointer-events-none" />

        {/* Structural layout block pinned safely to the left */}
        <div className="relative z-10 max-w-2xl w-full">
          <div className="hero-reveal">
            

            {/* Heading */}
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-tight mb-8 text-[#2a2a2a] uppercase select-none">
              Santhosh
              <br />
              Kumarr<span className="text-[#DC143C]">.</span>
            </h1>

            {/* Description Block */}
            <p className="text-[#2a2a2a]/60 text-sm md:text-base leading-relaxed max-w-xl font-light mb-12">
              Engineering secure digital infrastructures and building scalable, defensive
              full-stack architectures with a disciplined, security-first timeline layout.
            </p>

            {/* Prominent Action Interface Layout */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:items-start">
              {/* Primary Work Button with Subtle Light Micro-Grid Texture */}
              <MagneticButton
                onClick={() => onNavigate("projects")}
                className="group relative inline-flex items-center justify-between h-14 rounded-lg px-6 font-mono text-xs uppercase tracking-wider text-white bg-[#2a2a2a] border border-[#2a2a2a] hover:bg-[#DC143C] hover:border-[#DC143C] transition-colors duration-300 cursor-pointer sm:flex-none sm:min-w-[220px] overflow-hidden"
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
                className="group relative inline-flex items-center justify-between h-14 rounded-lg px-6 font-mono text-xs uppercase tracking-wider text-[#2a2a2a]/80 bg-[#2a2a2a]/5 border border-[#2a2a2a]/10 hover:border-white hover:text-[#2a2a2a] transition-colors duration-300 cursor-pointer sm:flex-none sm:min-w-[180px] overflow-hidden"
              >
                <span className="relative z-10">Download CV</span>
                <FileText className="w-4 h-4 text-[#2a2a2a]/40 group-hover:text-[#2a2a2a] transition-colors duration-300 relative z-10" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Reserved space on the right side for the Globe component layout placement */}
        <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] pointer-events-none hidden lg:block select-none opacity-20" />
      </section>
    );
  }