import type { ButtonHTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const variantStyles = {
  primary:
    "bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] text-white hover:shadow-[0_0_24px_rgba(99,102,241,0.4)] active:scale-[0.98]",
  secondary:
    "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
  ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]",
  outline:
    "bg-transparent text-white border border-white/10 hover:border-accent hover:text-accent active:scale-[0.98]",
} as const

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-8 py-3.5 text-lg gap-2.5",
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  children: ReactNode
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      icon,
      iconPosition = "right",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </button>
    )
  },
)

Button.displayName = "Button"
