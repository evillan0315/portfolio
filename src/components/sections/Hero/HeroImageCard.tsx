"use client"

import { motion } from "framer-motion"
import { Code2, Users, Award, Coffee } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"

/* ── Stats data ── */
const heroStats = [
  { icon: Code2, value: 3, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 20, suffix: "+", label: "Projects Completed" },
  { icon: Award, value: 10, suffix: "+", label: "Happy Clients" },
  { icon: Coffee, value: 99, suffix: "+", label: "Cups of Coffee" },
] as const

/* ── Code background lines ── */
const codeSnippet = [
  { color: "text-blue-400/30", text: "import { Engineer } from '@eddie/core';" },
  { color: "text-green-400/25", text: "" },
  { color: "text-purple-400/30", text: "const eddie = new Engineer.Builder()" },
  { color: "text-purple-400/25", text: "  .withStack('React', 'TypeScript', 'Node')" },
  { color: "text-purple-400/25", text: "  .withCloud('AWS', 'GCP', 'Azure')" },
  { color: "text-purple-400/20", text: "  .withAI('LangChain', 'OpenAI', 'Claude')" },
  { color: "text-purple-400/25", text: "  .build();" },
  { color: "text-green-400/25", text: "" },
  { color: "text-blue-400/25", text: "// Deploying next-gen solutions..." },
  { color: "text-yellow-400/20", text: "⚡ Production ready" },
]

/* ── Portrait placeholder with initials ── */
function PortraitPlaceholder() {
  return (
    <div className="relative z-10 mx-auto h-48 w-48 overflow-hidden rounded-[28px] border-2 border-white/10 shadow-2xl shadow-indigo-500/20 sm:h-56 sm:w-56 md:h-64 md:w-64">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />
      {/* Initials */}
      <div className="flex h-full items-center justify-center">
        <span className="text-5xl font-black tracking-tighter text-white/90 sm:text-6xl md:text-7xl">
          EV
        </span>
      </div>
    </div>
  )
}

/* ── Stats panel ── */
function HeroStats() {
  return (
    <div className="relative z-20 mx-auto -mt-8 grid w-[90%] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl sm:w-[85%]">
        {heroStats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 bg-black/40 px-4 py-3 sm:px-5 sm:py-4"
        >
          <stat.icon className="h-5 w-5 shrink-0 text-accent/70" aria-hidden="true" />
          <div>
            <div className="flex items-baseline gap-0.5 text-sm font-bold text-white sm:text-base">
              <AnimatedCounter to={stat.value} duration={1.5} />
              <span>{stat.suffix}</span>
            </div>
            <div className="text-[10px] text-text-muted sm:text-xs">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── HeroImageCard (right column) ── */
export function HeroImageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="relative"
    >
      <div className="relative mx-auto max-w-[480px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] shadow-2xl shadow-indigo-500/10">
        {/* Code background */}
        <div className="relative h-64 sm:h-72 md:h-80">
          {/* Subtle gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 via-purple-500/5 to-transparent" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Code lines */}
          <div className="relative flex flex-col gap-1.5 p-6 pt-8 sm:p-8">
            {/* Window dots */}
            <div className="mb-4 flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            </div>
            {codeSnippet.map((line, i) => (
              <div
                key={i}
                className={`font-mono text-[10px] leading-relaxed sm:text-xs ${line.color}`}
              >
                {line.text || <>&nbsp;</>}
              </div>
            ))}
          </div>
        </div>

        {/* Portrait — overlapping bottom of code area */}
        <div className="relative -mt-16 flex justify-center sm:-mt-20">
          <PortraitPlaceholder />
        </div>

        {/* Stats panel */}
        <div className="relative pb-6 pt-2 sm:pb-8">
          <HeroStats />
        </div>
      </div>

      {/* Decorative glow behind card */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.15), rgba(168,85,247,0.1), transparent)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
