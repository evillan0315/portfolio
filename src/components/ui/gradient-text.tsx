import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p"
  className?: string
}

export function GradientText({
  children,
  as: Tag = "span",
  className,
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
