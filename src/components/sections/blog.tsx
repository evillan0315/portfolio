"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { blogPosts } from "@/data/blog"

const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort()

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function Blog() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts

  return (
    <section id="blog" className="relative py-24 sm:py-32" aria-label="Blog posts">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Latest Writings"
          subtitle="Thoughts on engineering, AI, architecture, and building production systems."
          badge="Blog"
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
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlassCard
                hoverGlow
                intensity="low"
                className="group flex h-full flex-col p-5"
              >
                {/* Meta */}
                <div className="mb-3 flex items-center gap-3 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} aria-hidden="true" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" />
                    {post.readingTime} min read
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 font-semibold text-white group-hover:text-accent transition-colors duration-200">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Read link */}
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-white"
                >
                  Read Article
                  <ArrowRight size={12} />
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Button variant="ghost" size="md" icon={<ArrowRight size={16} />}>
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
