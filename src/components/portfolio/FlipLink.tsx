"use client";

import { motion } from "framer-motion";
import { DURATION, STAGGER } from "@/lib/constants";

interface FlipLinkProps {
  children: string;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
}

export default function FlipLink({
  children,
  href,
  target,
  rel,
  className = "",
}: FlipLinkProps) {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target={target}
      rel={rel}
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
      style={{ lineHeight: 0.85 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            key={`top-${i}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            key={`bot-${i}`}
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block text-[#DC143C]"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
}
