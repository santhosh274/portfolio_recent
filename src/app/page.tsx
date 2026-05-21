"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GlassFilter from "@/components/portfolio/GlassFilter";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import FlowArt from "@/components/portfolio/FlowArt";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import BlogSection from "@/components/portfolio/BlogSection";
import Footer from "@/components/portfolio/Footer";

import type { BlogPost } from "@/lib/data";

import dynamic from "next/dynamic";

const BlogModal = dynamic(() => import("@/components/portfolio/BlogModal"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const createLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }, []);

  // Initialize Lenis on mount
  useEffect(() => {
    lenisRef.current = createLenis();
    return () => {
      if (lenisRef.current) {
        gsap.ticker.remove(lenisRef.current.raf);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [createLenis]);

  // Destroy / recreate Lenis when modal opens/closes
  useEffect(() => {
    if (selectedPost) {
      // Fully destroy Lenis so its event listeners on <html> are removed
      if (lenisRef.current) {
        gsap.ticker.remove(lenisRef.current.raf);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.body.style.overflow = "hidden";
    } else {
      // Recreate Lenis when modal closes
      document.body.style.overflow = "";
      if (!lenisRef.current) {
        lenisRef.current = createLenis();
        ScrollTrigger.refresh();
      }
    }
  }, [selectedPost, createLenis]);

  const scrollTo = useCallback(
    (id: string) => {
      if (id === "top") {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      if (lenisRef.current) {
        lenisRef.current.scrollTo(`#${id}`, { offset: 0 });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <div className="bg-black min-h-screen text-zinc-100 font-sans">
      <GlassFilter />
      <Navigation onNavigate={scrollTo} />

      <Hero onNavigate={scrollTo} />

      <FlowArt>
        <About />
        <Experience />
        <Projects />
        <BlogSection onSelectPost={setSelectedPost} />
      </FlowArt>

      
      <Footer />

      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
}
