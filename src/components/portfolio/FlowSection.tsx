"use client";

import { cn } from "@/lib/utils";

interface FlowSectionProps {
  id?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function FlowSection({
  id,
  ariaLabel,
  className,
  style = {},
  children,
}: FlowSectionProps) {
  return (
    <section
      id={id}
      data-flow-section
      aria-label={ariaLabel}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
    >
      <div
        data-flow-inner
        className={cn(
          "flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[6vw] md:px-[10vw] pt-[clamp(4rem,8vw,6vw)] pb-[6vw] will-change-transform"
        )}
        style={{ transformOrigin: "bottom left", ...style }}
      >
        {children}
      </div>
    </section>
  );
}
