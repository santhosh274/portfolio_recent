"use client";

import { useRef } from "react";

// Simple CSS-based animated globe placeholder
// This replaces the Three.js implementation to reduce bundle size and dependencies
export default function InteractiveGlobe() {
  const globeRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={globeRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[60vh] md:w-[40vw] md:h-[70vh] lg:w-[35vw] lg:h-[80vh] pointer-events-none"
      style={{ perspective: "1000px" }}
    >
      {/* Simplified decorative globe using CSS gradients and animations */}
      <div 
        className="w-full h-full rounded-full opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 40%),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 2px,
              rgba(6, 182, 212, 0.1) 2px,
              rgba(6, 182, 212, 0.1) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 4px,
              rgba(6, 182, 212, 0.1) 4px,
              rgba(6, 182, 212, 0.1) 8px
            )
          `,
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      
      {/* Decorative dots */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500 rounded-full opacity-60"
            style={{
              transform: `rotate(${i * 30}deg) translateX(${15 + (i % 3) * 5}px)`,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.02); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
