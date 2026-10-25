"use client";

import { DURATION, STAGGER } from "@/lib/constants";

interface FlipLinkProps {
  children: string;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Per-character flip on hover. Implemented with CSS transitions instead of
 * one motion component per character, which keeps hydration cheap.
 */
export default function FlipLink({
  children,
  href,
  target,
  rel,
  className = "",
}: FlipLinkProps) {
  const chars = children.split("");

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group/link relative block overflow-hidden whitespace-nowrap ${className}`}
      style={{ lineHeight: 0.85 }}
    >
      <div>
        {chars.map((l, i) => (
          <span
            key={`top-${i}`}
            className="inline-block transition-transform ease-in-out group-hover/link:-translate-y-full"
            style={{
              transitionDuration: `${DURATION}s`,
              transitionDelay: `${STAGGER * i}s`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="absolute inset-0">
        {chars.map((l, i) => (
          <span
            key={`bot-${i}`}
            className="inline-block translate-y-full transition-transform ease-in-out text-[#DC143C] group-hover/link:translate-y-0"
            style={{
              transitionDuration: `${DURATION}s`,
              transitionDelay: `${STAGGER * i}s`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </a>
  );
}
