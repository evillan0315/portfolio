"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { aiFlowStages } from "@/data/ai"

/* ── Flow stage icon paths ── */
const iconPaths: Record<string, string> = {
  "message-square":
    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  "file-text":
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M16 2v6h6 M12 18v-4 M8 18v-2 M8 12h8",
  database:
    "M12 2v20 M2 12h20 M2 12a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4 M2 12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4",
  wrench:
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  brain:
    "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-3.04Z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-3.04Z",
  "hard-drive":
    "M22 12H2 M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6 M6 12V2h12v10 M6 18h.01 M10 18h.01 M14 18h.01 M18 18h.01",
  "check-square":
    "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
}

function StageIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {iconPaths[icon] && <path d={iconPaths[icon]} />}
    </svg>
  )
}

/* ── Arrow between stages ── */
function ArrowRight() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex items-center justify-center"
    >
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        aria-hidden="true"
        className="text-accent/60"
      >
        {/* Arrow line */}
        <line
          x1="4"
          y1="12"
          x2="26"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        {/* Arrow head */}
        <path
          d="M26 12l-6-5m6 5l-6 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Glow dot */}
        <circle cx="8" cy="12" r="2" fill="currentColor" opacity="0.4">
          <animate
            attributeName="opacity"
            values="0.2;0.6;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="1.5;2.5;1.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  )
}

/* ── Down arrow for vertical connector ── */
function ArrowDown() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex items-center justify-center"
    >
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        aria-hidden="true"
        className="text-accent/60"
      >
        <line
          x1="12"
          y1="4"
          x2="12"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M12 26l-5-6m5 6l5-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.4">
          <animate
            attributeName="opacity"
            values="0.2;0.6;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="1.5;2.5;1.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  )
}

/* ── Stage node card ── */
function FlowStage({
  stage,
  index,
}: {
  stage: (typeof aiFlowStages)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="min-w-0"
    >
      <GlassCard
        hoverGlow
        intensity="low"
        className="group flex flex-col p-4 transition-all duration-300 hover:border-accent/30 sm:p-5"
      >
        {/* Header: icon + label */}
        <div className="mb-2 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
            <StageIcon icon={stage.icon} size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white">{stage.label}</h3>
          </div>
        </div>

        {/* Step number */}
        <span className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
          Step {index + 1}
        </span>

        {/* Description */}
        <p className="mb-3 text-xs leading-relaxed text-text-secondary">
          {stage.description}
        </p>

        {/* Items as pills */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {stage.items.map((item) => (
            <span
              key={item}
              className="inline-block rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

/* ── Main diagram component ── */
export function AIFlowDiagram() {
  /* Split stages into rows for the layout */
  const row1 = aiFlowStages.slice(0, 4) // Input → Prompt → Context → Tools
  const row2 = aiFlowStages.slice(4, 7) // Inference → Memory → Output

  return (
    <section aria-label="AI infrastructure pipeline">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <span className="inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1 text-xs font-medium text-accent">
          AI Infrastructure Pipeline
        </span>
        <p className="mt-2 text-sm text-text-muted">
          How I architect AI-powered systems from user input to structured output
        </p>
      </motion.div>

      {/* Pipeline visual */}
      <div className="flex flex-col items-center gap-2">
        {/* Divider label */}
        <div className="mb-4 flex w-full items-center gap-3 text-text-muted">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        {/* Row 1: 4 stages with horizontal arrows */}
        <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-0">
          {row1.map((stage, i) => (
            <div key={stage.id} className="flex items-center gap-2 sm:gap-0">
              <div className="w-[160px] sm:w-[155px] md:w-[175px]">
                <FlowStage stage={stage} index={i} />
              </div>
              {i < row1.length - 1 && (
                <div className="hidden sm:flex">
                  <ArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Vertical connector between rows */}
        <div className="my-1 sm:hidden">
          <ArrowDown />
        </div>

        {/* Connecting line for desktop */}
        <div className="hidden sm:flex sm:w-full sm:justify-center">
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="relative flex h-10 w-full max-w-[150px] items-center justify-center"
          >
            <svg
              width="150"
              height="40"
              viewBox="0 0 150 40"
              fill="none"
              aria-hidden="true"
              className="text-accent/50"
            >
              {/* Vertical line down */}
              <line
                x1="75"
                y1="0"
                x2="75"
                y2="28"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Arrow head pointing down */}
              <path
                d="M75 28l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Row 2: 3 stages with horizontal arrows */}
        <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-0">
          {row2.map((stage, i) => (
            <div key={stage.id} className="flex items-center gap-2 sm:gap-0">
              <div className="w-[160px] sm:w-[155px] md:w-[175px]">
                <FlowStage stage={stage} index={i + row1.length} />
              </div>
              {i < row2.length - 1 && (
                <div className="hidden sm:flex">
                  <ArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
