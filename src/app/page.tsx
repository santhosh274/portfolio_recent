"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import InteractiveGlobe from "@/components/portfolio/InteractiveGlobe";

import type { BlogPost } from "@/lib/data";

import dynamic from "next/dynamic";

const BlogModal = dynamic(() => import("@/components/portfolio/BlogModal"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<any | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Initialize native smooth scrolling with GSAP ScrollSmoother alternative
  useEffect(() => {
    // Enable native smooth scrolling via CSS
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Handle body overflow when modal opens/closes
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedPost]);

  const scrollTo = useCallback(
    (id: string) => {
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  return (
    <div className="bg-black min-h-screen text-zinc-100 font-sans">
      <GlassFilter />
      <Navigation onNavigate={scrollTo} />

      <Hero onNavigate={scrollTo} />
      {/* Interactive Globe - positioned in the root/hero section */}
      <InteractiveGlobe />
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
