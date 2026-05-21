"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type LiquidButtonVariant = "default" | "outline";
type LiquidButtonSize = "default" | "lg" | "xxl";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: LiquidButtonVariant;
  size?: LiquidButtonSize;
  asChild?: boolean;
  className?: string;
}

const liquidbuttonVariants: Record<LiquidButtonVariant, string> = {
  default: "bg-transparent hover:scale-105 text-emerald-400",
  outline:
    "border border-emerald-900 bg-black/50 hover:bg-emerald-950 hover:text-emerald-300 text-zinc-300",
};

const liquidbuttonSizes: Record<LiquidButtonSize, string> = {
  default: "h-9 px-4 py-2",
  lg: "h-11 rounded-md px-8",
  xxl: "h-14 rounded-md px-10 text-lg",
};

const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "xxl",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "relative group inline-flex items-center transition-all justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none focus-visible:ring-[3px]",
          liquidbuttonVariants[variant],
          liquidbuttonSizes[size],
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 z-0 h-full w-full rounded-md transition-all shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.05),0_0_12px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
        <div
          className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md opacity-50"
          style={{ backdropFilter: 'url("#container-glass")' }}
        />
        <div className="pointer-events-none z-10 flex items-center gap-2">
          {children}
        </div>
      </Comp>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export default LiquidButton;
