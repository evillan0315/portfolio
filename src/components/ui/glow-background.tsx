import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlowBackgroundProps {
  children?: ReactNode
  className?: string
  color?: string
  size?: "sm" | "md" | "lg"
  blur?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "w-64 h-64",
  md: "w-96 h-96",
  lg: "w-[32rem] h-[32rem]",
}

const blurMap = {
  sm: "blur-3xl",
  md: "blur-[120px]",
  lg: "blur-[180px]",
}

export function GlowBackground({
  children,
  className,
  color = "rgba(99,102,241,0.15)",
  size = "md",
  blur = "lg",
}: GlowBackgroundProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "pointer-events-none absolute -z-10 rounded-full",
          sizeMap[size],
          blurMap[blur],
        )}
        style={{ background: color }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
