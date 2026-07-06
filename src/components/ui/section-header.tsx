import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { GradientText } from "@/components/ui/gradient-text"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  align?: "left" | "center"
  className?: string
  children?: ReactNode
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-wider text-text-muted">
          {badge}
        </span>
      )}
      <h2 className="text-4xl font-bold md:text-5xl">
        <GradientText>{title}</GradientText>
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary md:text-xl">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}
