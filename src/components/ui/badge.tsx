import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "primary" | "accent" | "success" | "warning"
  className?: string
}

const badgeVariants = {
  default: "bg-white/5 text-text-secondary border border-white/10",
  primary: "bg-gradient-to-r from-[#6366F1]/20 to-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/20",
  accent: "bg-accent/10 text-accent border border-accent/20",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
} as const

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
