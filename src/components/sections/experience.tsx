"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, User } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { experience } from "@/data/experience"

const typeConfig = {
  work: { icon: Briefcase, label: "Work" },
  freelance: { icon: User, label: "Freelance" },
  education: { icon: GraduationCap, label: "Education" },
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32" aria-label="Professional experience">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Experience"
          subtitle="Professional journey building production systems at scale."
          badge="Experience"
        />

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experience.map((entry, i) => {
              const TypeIcon = typeConfig[entry.type].icon

              return (
                <motion.div
                  key={`${entry.role}-${entry.company}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute left-3 top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full",
                      "border border-white/10 bg-bg-primary",
                    )}
                  >
                    <TypeIcon size={14} className="text-accent" />
                  </div>

                  {/* Content card */}
                  <div
                    className={cn(
                      "rounded-xl border border-white/10 bg-white/[0.03] p-5",
                      "hover:border-white/20 hover:shadow-[0_0_16px_rgba(99,102,241,0.08)]",
                      "transition-all duration-300",
                    )}
                  >
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-white">
                          {entry.role}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {entry.company}
                          {entry.location && ` · ${entry.location}`}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-text-muted">
                        {entry.period}
                      </span>
                    </div>

                    <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                      {entry.description}
                    </p>

                    {/* Tech badges */}
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {entry.technologies.map((tech) => (
                        <Badge key={tech} variant="default">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Achievements */}
                    {entry.achievements.length > 0 && (
                      <ul className="space-y-1">
                        {entry.achievements.map((achievement, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-xs text-text-muted"
                          >
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
