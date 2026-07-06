"use client"

import { motion } from "framer-motion"
import type { ComponentType } from "react"
import {
  Layers,
  CheckSquare,
  Map,
  Zap,
  Container,
  Shield,
  BookOpen,
} from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { profile } from "@/data/profile"
import { engineeringPrinciples } from "@/data/principles"
import { cn } from "@/lib/utils"

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  layers: Layers,
  "check-square": CheckSquare,
  map: Map,
  zap: Zap,
  container: Container,
  shield: Shield,
  "book-open": BookOpen,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-label="About me">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="About Me"
          subtitle={profile.summary}
          badge="About"
        />

        {/* Professional summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="text-lg leading-relaxed text-text-secondary">
            I&apos;m a senior engineer with over a decade of experience building
            production systems across the full stack. My work spans cloud
            infrastructure, developer tooling, AI-powered platforms, and
            distributed systems. I believe in clean architecture, automation,
            and continuous learning.
          </p>
        </motion.div>

        {/* Engineering principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {engineeringPrinciples.map((principle) => {
            const Icon = iconMap[principle.icon] ?? Layers

            return (
              <motion.div key={principle.title} variants={itemVariants}>
                <GlassCard
                  hoverGlow
                  intensity="low"
                  className="group h-full p-6"
                >
                  <div
                    className={cn(
                      "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg",
                      "bg-gradient-to-br from-[#6366F1]/20 to-[#A855F7]/20",
                      "group-hover:from-[#6366F1]/30 group-hover:to-[#A855F7]/30",
                      "transition-all duration-300",
                    )}
                  >
                    <Icon className="h-5 w-5 text-[#A855F7]" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {principle.description}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
