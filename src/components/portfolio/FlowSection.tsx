"use client";

import { cn } from "@/lib/utils";

interface FlowSectionProps {
  id?: string;
  ariaLabel?: string;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode
  noPadding?: boolean;
}

export default function FlowSection({
  id,
  ariaLabel,
  className,
  innerClassName,
  style = {},
  children,
  noPadding,
}: FlowSectionProps) {
  const { backgroundColor, ...restStyle } = style;
  return (
    <section
      id={id}
      data-flow-section
      aria-label={ariaLabel}
      className={cn(
        // No overflow clipping — rotated card corners must stay rectangular and not get cut off
        "relative min-h-screen w-full outline-none isolate",
        className
      )}
      style={{
        backgroundColor: backgroundColor ?? "transparent",
        WebkitBackfaceVisibility: "hidden",  
        backfaceVisibility: "hidden",         
      }}
    >
      <div
        data-flow-inner
        className={cn(
          "flow-art-container relative flex min-h-screen w-full flex-col outline-none",
          noPadding
            ? "justify-start"
            : "justify-between gap-6 px-[6vw] md:px-[10vw] pt-[clamp(4rem,8vw,6vw)] pb-[6vw]",
          innerClassName
        )}
        style={{
          transformOrigin: "bottom left",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          ...restStyle,
        }}
      >
        {/* Background lives inside the animated container so it rotates with the card */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
               "linear-gradient(180deg, #0a0015 0%, #2d0055 50%, #550099 100%)",
          }}
        />

        {children}
      </div>
    </section>
  );
}
