"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TerminalLine {
  text: string
  type?: "output" | "input" | "info" | "success" | "error"
  delay?: number
}

interface TerminalWindowProps {
  lines: TerminalLine[]
  className?: string
  title?: string
}

const lineStyles = {
  output: "text-text-secondary",
  input: "text-[#38BDF8]",
  info: "text-[#8B5CF6]",
  success: "text-[#22C55E]",
  error: "text-red-400",
} as const

const promptStyles = {
  output: "",
  input: "$",
  info: "ℹ",
  success: "✓",
  error: "✗",
} as const

export function TerminalWindow({
  lines,
  className,
  title = "terminal",
}: TerminalWindowProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    if (visibleLines >= lines.length) return

    const line = lines[visibleLines]
    if (!line) return
    const delay = line.delay ?? 800

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [visibleLines, lines])

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#0a0a0f] shadow-2xl overflow-hidden",
        className,
      )}
      role="log"
      aria-label="Terminal window"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-3 text-xs text-text-muted">{title}</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1.5 p-4 font-mono text-sm leading-relaxed">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={cn("flex gap-2", lineStyles[line.type ?? "output"])}>
            {line.type && line.type !== "output" && (
              <span className="shrink-0 text-text-muted">
                {promptStyles[line.type]}
              </span>
            )}
            <span>{line.text}</span>
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
        )}
      </div>
    </div>
  )
}
