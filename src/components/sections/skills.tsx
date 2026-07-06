"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { skillCategories } from "@/data/skills"
import { aiExpertise } from "@/data/ai"
import type { SkillCategory, AIExpertiseCategory } from "@/types"

/* ── Tab selector ── */
type Tab = SkillCategory | AIExpertiseCategory

const isSkillCategory = (tab: Tab): tab is SkillCategory =>
  "skills" in tab

/* ── Icons ── */
function TabIcon({ icon }: { icon: string }) {
  const size = 18
  const color = "text-accent group-hover:text-white transition-colors duration-200"

  return (
    <svg
      className={cn("shrink-0", color)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon === "code2" && <><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></>}
      {icon === "server" && <><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></>}
      {icon === "cloud" && <><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></>}
      {icon === "container" && <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></>}
      {icon === "database" && <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /></>}
      {icon === "brain" && <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-3.04Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-3.04Z" /></>}
      {icon === "building2" && <><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><line x1="8" x2="10" y1="6" y2="6" /><line x1="8" x2="10" y1="10" y2="10" /><line x1="14" x2="16" y1="6" y2="6" /><line x1="14" x2="16" y1="10" y2="10" /></>}
      {icon === "test-tube" && <><path d="M14.5 2v17a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V2" /><path d="M8.5 2h7" /><path d="M14.5 16h-5" /></>}
      {icon === "wrench" && <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>}
      {icon === "shield" && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>}
      {icon === "sparkles" && <><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></>}
      {icon === "stars" && <><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></>}
      {icon === "github" && <><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></>}
      {icon === "monitor" && <><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></>}
      {icon === "layers" && <><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0l8.57-3.9a1 1 0 0 0 0-1.84Z" /><path d="m22 10.5-8.57 3.9a2 2 0 0 1-1.66 0L3 10.5" /><path d="m22 15.5-8.57 3.9a2 2 0 0 1-1.66 0L3 15.5" /></>}
    </svg>
  )
}

/* ── Proficiency bar ── */
function ProficiencyBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="group relative">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-text-muted">{label}</span>
        <span className="text-text-secondary">{value}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7]"
        />
      </div>
    </div>
  )
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<"skills" | "ai">("skills")

  const tabs: { id: "skills" | "ai"; label: string }[] = [
    { id: "skills", label: "Engineering Skills" },
    { id: "ai", label: "AI & LLM Expertise" },
  ]

  const displayData: Tab[] = activeTab === "skills" ? skillCategories : aiExpertise

  return (
    <section id="skills" className="relative py-24 sm:py-32" aria-label="Skills and expertise">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Engineering disciplines, technologies, AI models, and frameworks I work with daily."
          badge="Skills"
        />

        {/* Tab switcher */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-text-muted hover:text-white",
                )}
                aria-pressed={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          >
            {displayData.map((tab) => (
              <GlassCard
                key={tab.title}
                hoverGlow
                intensity="low"
                className="p-6"
              >
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05]">
                    <TabIcon icon={tab.icon} />
                  </span>
                  <h3 className="font-semibold text-white">{tab.title}</h3>
                </div>

                {/* Skills or AI items */}
                {isSkillCategory(tab) ? (
                  <div className="space-y-3">
                    {tab.skills.map((skill) => (
                      <div key={skill.name} className="group relative">
                        <ProficiencyBar value={skill.proficiency} label={skill.name} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {tab.items.map((item) => (
                      <span
                        key={item.name}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg border border-white/5",
                          "bg-white/[0.02] px-2.5 py-1.5 text-xs font-medium text-text-secondary",
                          "hover:border-white/10 hover:text-white",
                          "transition-all duration-200",
                        )}
                        title={item.description}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
