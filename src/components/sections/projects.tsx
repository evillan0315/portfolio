"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Star } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { projects } from "@/data/projects"
import type { Project } from "@/types"

const PAGE_SIZE = 9

/* ── Tag extractor ── */
const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort()

export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Reset page when tag filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTag])

  const filtered = useMemo(
    () => (activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects),
    [activeTag],
  )

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  return (
    <section id="projects" className="relative py-24 sm:py-32" aria-label="Featured projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="Production systems I've designed, built, and deployed across multiple domains."
          badge="Projects"
        />

        {/* Tag filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
              activeTag === null
                ? "bg-white/10 text-white"
                : "text-text-muted hover:text-white",
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                activeTag === tag
                  ? "bg-white/10 text-white"
                  : "text-text-muted hover:text-white",
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTag ?? "all"}-page-${currentPage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {paginated.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  )
}

/* ── ProjectCard ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <GlassCard
        hoverGlow
        intensity="low"
        className="group flex h-full flex-col p-0"
      >
        {/* Thumbnail placeholder */}
        <div className="relative aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10">
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-white/10">
              {project.title.charAt(0)}
            </span>
          </div>
          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="primary">
                <Star size={10} className="mr-1" aria-hidden="true" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 font-semibold text-white">{project.title}</h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Metrics */}
          {project.metrics.length > 0 && (
            <div className="mb-4 flex gap-4 border-t border-white/5 pt-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-sm font-semibold text-white">
                    {metric.value}
                  </div>
                  <div className="text-xs text-text-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium transition-colors",
                  link.label === "Live Demo"
                    ? "text-accent hover:text-white"
                    : "text-text-muted hover:text-white",
                )}
                aria-label={`${project.title} ${link.label}`}
              >
                {link.label === "GitHub" ? (
                  <Github size={14} />
                ) : (
                  <ExternalLink size={14} />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
