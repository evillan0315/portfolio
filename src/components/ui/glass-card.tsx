import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hoverGlow?: boolean
  intensity?: "low" | "medium" | "high"
}

const intensityStyles = {
  low: "bg-white/[0.03] backdrop-blur-[2px]",
  medium: "bg-white/[0.05] backdrop-blur-[6px]",
  high: "bg-white/[0.08] backdrop-blur-[12px]",
} as const

export function GlassCard({
  className,
  children,
  hoverGlow = true,
  intensity = "medium",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 shadow-lg",
        intensityStyles[intensity],
        hoverGlow &&
          "hover:shadow-[0_0_24px_rgba(99,102,241,0.15)] hover:border-white/20",
        "transition-all duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
