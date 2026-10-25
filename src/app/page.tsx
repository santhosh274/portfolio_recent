"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type Lenis from "lenis";

import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Certifications from "@/components/portfolio/Certifications";
import BlogSection from "@/components/portfolio/BlogSection";
import Footer from "@/components/portfolio/Footer";
// Rendered on the server so every section ships as HTML on first paint.
// (It previously used `ssr: false`, which forced the whole page to hydrate blank.)
import FlowArt from "@/components/portfolio/FlowArt";

import type { BlogPost } from "@/lib/data";

import dynamic from "next/dynamic";

const InteractiveGlobe = dynamic(() => import("@/components/portfolio/InteractiveGlobe"), {
  ssr: false,
});

const BlogModal = dynamic(() => import("@/components/portfolio/BlogModal"), {
  ssr: false,
});

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Initialize smooth scroll + GSAP only after hydration. Both libraries are
  // imported lazily so they stay out of the critical JS bundle.
  useEffect(() => {
    let cancelled = false;
    let ticker: { remove: (fn: (time: number) => void) => void } | null = null;
    let tickCallback: ((time: number) => void) | null = null;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = async () => {
      const [lenisModule, gsapModule, stModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const gsap = (gsapModule as any).gsap ?? gsapModule.default;
      const ScrollTrigger = (stModule as any).ScrollTrigger ?? stModule.default;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      // Respect the OS setting: keep native scrolling, skip the animation ticker.
      if (prefersReduced) return;

      const LenisCtor = (lenisModule as any).default ?? lenisModule;
      const lenis = new LenisCtor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ScrollTrigger using a single RAF loop.
      lenis.on("scroll", ScrollTrigger.update);
      tickCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      ticker = gsap.ticker;
      gsap.ticker.add(tickCallback);
      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      cancelled = true;
      if (ticker && tickCallback) ticker.remove(tickCallback);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle body overflow when modal opens/closes
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
  }, [selectedPost]);

  const scrollTo = useCallback((id: string) => {
    const el = id === "top" ? null : document.getElementById(id);
    const lenis = lenisRef.current;

    if (lenis) {
      lenis.scrollTo(id === "top" ? 0 : (el as HTMLElement), { duration: 1.5 });
      return;
    }

    // Fallback for reduced-motion / pre-hydration navigation.
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative min-h-screen font-sans">
      <div className="relative z-10">
      <Navigation onNavigate={scrollTo} />

      <div className="relative">
      <Hero onNavigate={scrollTo} />
      {/* Interactive Globe - positioned in the root/hero section */}
      <InteractiveGlobe />
      </div>
      <FlowArt>
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <BlogSection onSelectPost={setSelectedPost} />
      </FlowArt>

      
      <Footer />

      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
      </div>
    </div>
  );
}
