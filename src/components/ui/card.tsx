import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/5 bg-white/[0.03] p-6",
        "transition-all duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
