"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Certifications from "@/components/portfolio/Certifications";
import BlogSection from "@/components/portfolio/BlogSection";
import Footer from "@/components/portfolio/Footer";

import type { BlogPost } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

import dynamic from "next/dynamic";

const FlowArt = dynamic(() => import("@/components/portfolio/FlowArt"), {
  ssr: false,
});

const InteractiveGlobe = dynamic(() => import("@/components/portfolio/InteractiveGlobe"), {
  ssr: false,
});

const BlogModal = dynamic(() => import("@/components/portfolio/BlogModal"), {
  ssr: false,
});

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const tickCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickCallback);
      lenis.destroy();
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

  const scrollTo = useCallback(
    (id: string) => {
      if (id === "top") {
        lenisRef.current?.scrollTo(0, { duration: 1.5 });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        lenisRef.current?.scrollTo(el, { duration: 1.5 });
      }
    },
    []
  );

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
