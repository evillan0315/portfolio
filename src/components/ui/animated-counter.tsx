"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * easeOut

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}
