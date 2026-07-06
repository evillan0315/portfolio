"use client"

import { useEffect, useMemo, useRef, useState } from "react"

/* ── Code lines with syntax tokens ──
   type: 0=comment, 1=keyword, 2=string, 3=function, 4=property, 5=punctuation, 6=plain
*/
interface Token { text: string; type: number }
interface CodeLine { tokens?: Token[]; text?: string; indent?: number }

const codeLines: CodeLine[] = [
  { tokens: [{ text: "// portfolio.config.ts", type: 0 }] },
  { tokens: [{ text: "import ", type: 1 }, { text: "{ ", type: 5 }, { text: "React", type: 4 }, { text: " } ", type: 5 }, { text: "from ", type: 1 }, { text: "'react'", type: 2 }] },
  { tokens: [{ text: "import ", type: 1 }, { text: "{ ", type: 5 }, { text: "motion", type: 4 }, { text: " } ", type: 5 }, { text: "from ", type: 1 }, { text: "'framer-motion'", type: 2 }] },
  { tokens: [{ text: "import ", type: 1 }, { text: "{ ", type: 5 }, { text: "type ", type: 1 }, { text: "PortfolioConfig", type: 3 }, { text: " } ", type: 5 }, { text: "from ", type: 1 }, { text: "'./types'", type: 2 }] },
  { text: "" },
  { tokens: [{ text: "const ", type: 1 }, { text: "config", type: 4 }, { text: ": ", type: 5 }, { text: "PortfolioConfig", type: 1 }, { text: " = ", type: 5 }, { text: "{", type: 5 }] },
  { tokens: [{ text: "name", type: 4 }, { text: ": ", type: 5 }, { text: "'Eddie Villanueva'", type: 2 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "role", type: 4 }, { text: ": ", type: 5 }, { text: "'Full Stack Developer'", type: 2 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "stack", type: 4 }, { text: ": ", type: 5 }, { text: "[", type: 5 }, { text: "'React'", type: 2 }, { text: ", ", type: 5 }, { text: "'Node.js'", type: 2 }, { text: ", ", type: 5 }, { text: "'TypeScript'", type: 2 }, { text: ", ", type: 5 }, { text: "'AWS'", type: 2 }, { text: "]", type: 5 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "experience", type: 4 }, { text: ": ", type: 5 }, { text: "20", type: 6 }, { text: ",  ", type: 5 }, { text: "// years building products", type: 0 }], indent: 2 },
  { tokens: [{ text: "projects", type: 4 }, { text: ": ", type: 5 }, { text: "47", type: 6 }, { text: ",  ", type: 5 }, { text: "// public repos shipped", type: 0 }], indent: 2 },
  { tokens: [{ text: "}", type: 5 }, { text: ";", type: 5 }] },
  { text: "" },
  { tokens: [{ text: "// infrastructure", type: 0 }] },
  { tokens: [{ text: "const ", type: 1 }, { text: "infra", type: 4 }, { text: " = ", type: 5 }, { text: "{", type: 5 }] },
  { tokens: [{ text: "cloud", type: 4 }, { text: ": ", type: 5 }, { text: "'AWS/Azure/GCP'", type: 2 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "container", type: 4 }, { text: ": ", type: 5 }, { text: "'Docker/K8s'", type: 2 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "cicd", type: 4 }, { text: ": ", type: 5 }, { text: "'GitHub Actions'", type: 2 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "monitoring", type: 4 }, { text: ": ", type: 5 }, { text: "'Datadog/Grafana'", type: 2 }], indent: 2 },
  { tokens: [{ text: "}", type: 5 }, { text: ";", type: 5 }] },
  { text: "" },
  { tokens: [{ text: "// AI capabilities", type: 0 }] },
  { tokens: [{ text: "const ", type: 1 }, { text: "ai", type: 4 }, { text: " = ", type: 5 }, { text: "await ", type: 1 }, { text: "buildAgent(", type: 3 }, { text: "{", type: 5 }] },
  { tokens: [{ text: "llm", type: 4 }, { text: ": ", type: 5 }, { text: "'OpenAI/Claude'", type: 2 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "rag", type: 4 }, { text: ": ", type: 5 }, { text: "true", type: 1 }, { text: ",", type: 5 }], indent: 2 },
  { tokens: [{ text: "fineTune", type: 4 }, { text: ": ", type: 5 }, { text: "true", type: 1 }], indent: 2 },
  { tokens: [{ text: "}", type: 5 }, { text: ")", type: 5 }, { text: ";", type: 5 }] },
  { text: "" },
  { tokens: [{ text: "export ", type: 1 }, { text: "default ", type: 1 }, { text: "motion(", type: 3 }, { text: "Portfolio", type: 3 }, { text: ")", type: 5 }, { text: ";", type: 5 }] },
]

/* ── Syntax color map ── */
const tokenColors = [
  "text-emerald-400",  // 0 — comment
  "text-purple-400",   // 1 — keyword
  "text-amber-300",    // 2 — string
  "text-sky-400",      // 3 — function
  "text-blue-300",     // 4 — property
  "text-zinc-500",     // 5 — punctuation
  "text-zinc-200",     // 6 — plain
]

export function HeroTerminal() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Compute character counts per line
  const charCounts = useMemo(
    () =>
      codeLines.map((line) => {
        if (line.text === "" && !line.tokens) return 0
        const tokens = line.tokens ?? [{ text: line.text ?? "", type: 6 }]
        return tokens.reduce((s, t) => s + t.text.length, 0)
      }),
    [],
  )

  const flatLength = useMemo(() => charCounts.reduce((a, b) => a + b, 0), [charCounts])

  // Animate visible characters
  const [visibleIndex, setVisibleIndex] = useState(0)

  useEffect(() => {
    if (visibleIndex >= flatLength) return
    // Pause at start, then type at ~45 chars/sec
    const delay = visibleIndex === 0 ? 600 : 22
    const timer = setTimeout(() => setVisibleIndex((p) => p + 1), delay)
    return () => clearTimeout(timer)
  }, [visibleIndex, flatLength])

  // Auto-scroll to keep the typing line visible
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (visibleIndex <= 0) return
    let accum = 0
    for (let i = 0; i < charCounts.length; i++) {
      accum += charCounts[i]!
      if (visibleIndex <= accum) {
        const el = lineRefs.current[i]
        if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" })
        break
      }
    }
  }, [visibleIndex, charCounts])

  // Walk lines and slice chars based on visibleIndex
  let charCursor = 0
  const isFullyTyped = visibleIndex >= flatLength

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl"
      role="log"
      aria-label="Code typewriter"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-[11px] text-text-muted tracking-tight">
          portfolio.config.ts
        </span>
        <span className="ml-auto hidden text-[11px] text-text-muted sm:inline">
          TypeScript
        </span>
      </div>

      {/* Code body — scrollable */}
      <div
        ref={containerRef}
        className="h-full max-h-[clamp(280px,38vh,500px)] overflow-y-auto p-4 font-mono text-[13px] leading-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
      >
        {codeLines.map((line, li) => {
          const lineLen = charCounts[li] ?? 0

          // Empty line
          if ((line.text === "" || (!line.text && !line.tokens)) && lineLen === 0) {
            charCursor += lineLen
            return <div key={li} ref={(el) => { lineRefs.current[li] = el }} className="h-3" />
          }

          const tokens = line.tokens ?? [{ text: line.text ?? "", type: 6 }]
          const indent = line.indent ?? 0

          // How many chars into this line are visible?
          const startOfLine = charCursor
          const endOfLine = startOfLine + lineLen
          const visibleChars = Math.max(0, Math.min(visibleIndex - startOfLine, lineLen))
          charCursor += lineLen

          if (visibleChars <= 0) return null

          // Slice tokens to visible portion
          let remaining = visibleChars
          const parts: { text: string; className: string }[] = []
          for (const token of tokens) {
            if (remaining <= 0) break
            const take = Math.min(remaining, token.text.length)
            if (take > 0) {
              parts.push({
                text: token.text.slice(0, take),
                className: tokenColors[token.type] ?? "text-zinc-200",
              })
            }
            remaining -= take
          }

          const showCursorThisLine = visibleIndex === endOfLine && visibleIndex < flatLength

          return (
            <div
              key={li}
              ref={(el) => { lineRefs.current[li] = el }}
              style={{ paddingLeft: `${indent * 1}rem` }}
            >
              <span>
                {parts.map((p, i) => (
                  <span key={i} className={p.className}>{p.text}</span>
                ))}
                {showCursorThisLine && (
                  <span className="inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-accent" />
                )}
              </span>
            </div>
          )
        })}
        {isFullyTyped && (
          <span className="inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-accent" />
        )}
      </div>
    </div>
  )
}
