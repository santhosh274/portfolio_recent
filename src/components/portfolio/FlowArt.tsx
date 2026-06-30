"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface FlowArtProps {
  children: ReactNode;
  className?: string;
}

export default function FlowArt({ children, className }: FlowArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observers: ResizeObserver[] = [];

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const sections = Array.from(
        containerRef.current!.querySelectorAll("[data-flow-section]")
      );

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1, backgroundColor: "transparent" });

        const inner = section.querySelector(".flow-art-container");

        // Check if CURRENT section has a horizontal carousel
        const hasCarousel = section.querySelector<HTMLElement>(
          "[data-flow-horizontal-scroll]"
        );

        // ─── Ensure all sections are fully visible (no rotation entrance animation) ──
        if (i > 0 && inner) {
          gsap.set(inner, { autoAlpha: 1, y: 0, rotation: 0, scale: 1 });
        }

        // ─── Pin every non-last section ──
        // On mobile, pin only sections with carousels so they have enough
        // scroll distance to fully translate all items horizontally.
        const hScroll = section.querySelector<HTMLElement>(
          "[data-flow-horizontal-scroll]"
        );
        const hTrack = section.querySelector<HTMLElement>(
          "[data-flow-horizontal-track]"
        );

        if (i < sections.length - 1) {
          if (!isMobile || hasCarousel) {
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top-=25%",
              pin: true,
              pinSpacing: hasCarousel ? true : false,
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

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      observers.forEach((ro) => ro.disconnect());
      ctx.revert();
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