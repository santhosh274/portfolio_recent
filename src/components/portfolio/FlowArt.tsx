"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FlowArtProps {
  children: ReactNode;
  className?: string;
}

export default function FlowArt({ children, className }: FlowArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let cancelled = false;
    const observers: ResizeObserver[] = [];
    let ctx: { revert: () => void } | null = null;
    let refreshOnLoad: (() => void) | null = null;

    const init = async () => {
      // Loaded on demand: GSAP is not part of the initial JS bundle anymore.
      const [gsapModule, stModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const gsap = (gsapModule as any).gsap ?? (gsapModule as any).default;
      const ScrollTrigger = (stModule as any).ScrollTrigger ?? (stModule as any).default;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const isMobile = window.innerWidth < 768;
      const sections = Array.from(
        root.querySelectorAll<HTMLElement>("[data-flow-section]")
      );

      ctx = gsap.context(() => {
        sections.forEach((section, i) => {
          gsap.set(section, { zIndex: i + 1, backgroundColor: "transparent" });

          const inner = section.querySelector(".flow-art-container");

          // ─── Ensure all sections are fully visible (no rotation entrance animation) ──
          if (i > 0 && inner) {
            gsap.set(inner, { autoAlpha: 1, y: 0, rotation: 0, scale: 1 });
          }

          const hScroll = section.querySelector<HTMLElement>(
            "[data-flow-horizontal-scroll]"
          );
          const hTrack = section.querySelector<HTMLElement>(
            "[data-flow-horizontal-track]"
          );

          // ─── Pin every non-last section ──
          // On mobile, pin only sections with carousels so they have enough
          // scroll distance to fully translate all items horizontally.
          if (i < sections.length - 1) {
            if (!isMobile || hScroll) {
              ScrollTrigger.create({
                trigger: section,
                start: "bottom bottom",
                end: "bottom top-=25%",
                pin: true,
                pinSpacing: hScroll ? true : false,
                anticipatePin: 1,
              });
            }
          }

          // ─── Horizontal scroll (carousel) ─────────────────────────────────
          if (hScroll && hTrack) {
            const getTotal = () => hTrack.scrollWidth - hScroll.clientWidth;

            gsap.set(hTrack, { willChange: "transform" });

            gsap.to(hTrack, {
              x: () => -getTotal(),
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 1.5,
                invalidateOnRefresh: true,
              },
            });

            const ro = new ResizeObserver(() => ScrollTrigger.refresh());
            ro.observe(hScroll);
            ro.observe(hTrack);
            observers.push(ro);
          }
        });
      }, root);

      ScrollTrigger.refresh();

      // Re-measure once webfonts and lazy images have settled so trigger
      // offsets are exact (prevents late-scroll layout jumps).
      refreshOnLoad = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };
      if (document.fonts?.ready) {
        document.fonts.ready.then(refreshOnLoad).catch(() => {});
      }
      window.addEventListener("load", refreshOnLoad, { once: true });
    };

    init();

    return () => {
      cancelled = true;
      observers.forEach((ro) => ro.disconnect());
      if (refreshOnLoad) window.removeEventListener("load", refreshOnLoad);
      ctx?.revert();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className={cn("w-full", className)}
    >
      {children}
    </main>
  );
}
