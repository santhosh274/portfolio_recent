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

        // Check if PREVIOUS section has a horizontal carousel
        const prevSection = sections[i - 1] as HTMLElement | undefined;
        const prevHasCarousel = prevSection?.querySelector(
          "[data-flow-horizontal-scroll]"
        );

        // ─── Entry animation ──────────────────────────────────────────────
        if (i > 0 && inner) {
          if (isMobile) {
            gsap.set(inner, { autoAlpha: 1, y: 0 });
          } else {
          const fromLeft = i % 2 === 1;

          gsap.set(inner, {
            rotation: fromLeft ? 12 : -12,
            transformOrigin: fromLeft ? "bottom left" : "bottom right",
            scale: 1.025,
            autoAlpha: 0,
            force3D: true,
          });

          if (prevHasCarousel) {
            // The section after a carousel must stack OVER it like a normal card,
            // but only after the carousel has shown all projects.
            //
            // How it works:
            // - The carousel section is pinned with pinSpacing: true, which injects
            //   a spacer equal to 1 viewport height into the page flow.
            // - We trigger this entry animation off the PREVIOUS (carousel) section.
            // - start: "bottom 100%" = the moment the carousel's bottom edge is at
            //   the viewport bottom (carousel fully scrolled, last card visible).
            // - end: "bottom 0%" = the carousel's bottom reaches the top of the
            //   viewport (it has fully slid out of view behind the incoming card).
            // - This maps 1:1 with the stacking behaviour of non-carousel cards:
            //   they rotate in exactly as the previous section slides up and away.
            gsap.to(inner, {
              rotation: 0,
              scale: 1,
              autoAlpha: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: prevSection,       // anchor to the carousel section
                start: "bottom 100%",       // carousel bottom enters viewport bottom
                end: "bottom 0%",           // carousel bottom reaches viewport top
                scrub: true,
              },
            });
          } else {
            gsap.to(inner, {
              rotation: 0,
              scale: 1,
              autoAlpha: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "top 50%",
                scrub: true,
              },
            });
          }
          }
        }

        // ─── Pin every non-last section (desktop only — too aggressive on mobile) ──
        const hScroll = section.querySelector<HTMLElement>(
          "[data-flow-horizontal-scroll]"
        );
        const hTrack = section.querySelector<HTMLElement>(
          "[data-flow-horizontal-track]"
        );

        if (!isMobile && i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: hasCarousel ? true : false,
            anticipatePin: 1,
          });
        }

        // ─── Horizontal scroll (carousel) ─────────────────────────────────
        if (hScroll && hTrack) {
          const getTotal = () => hTrack.scrollWidth - hScroll.clientWidth;

          // Added explicit transform containment layers to optimize scroll rendering
          gsap.set(hTrack, { willChange: "transform" });

          gsap.to(hTrack, {
            x: () => -getTotal(),
            ease: "none",
            force3D: true, // Forces GPU subpixel hardware acceleration layer rendering on layout translations
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
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