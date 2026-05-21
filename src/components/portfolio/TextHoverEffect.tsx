"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TextHoverEffectProps {
  text: string;
  duration?: number;
}

export default function TextHoverEffect({
  text,
  duration = 0,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({
    cx: "50%",
    cy: "50%",
  });

  useEffect(() => {
    if (svgRef.current && cursor.x !== 0 && cursor.y !== 0) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage =
        ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage =
        ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 600 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none uppercase cursor-pointer"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="25%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="75%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#c084fc" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-zinc-800/50"
        style={{
          fontSize: "70px",
          fontFamily: "var(--font-syne), Syne, sans-serif",
          fontWeight: 800,
          opacity: hovered ? 0.7 : 0,
        }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-emerald-500/40"
        style={{
          fontSize: "70px",
          fontFamily: "var(--font-syne), Syne, sans-serif",
          fontWeight: 800,
        }}
        initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 2000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent"
        style={{
          fontSize: "70px",
          fontFamily: "var(--font-syne), Syne, sans-serif",
          fontWeight: 800,
        }}
      >
        {text}
      </text>
    </svg>
  );
}
