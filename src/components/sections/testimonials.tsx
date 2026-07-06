"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { testimonials } from "@/data/testimonials"

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    )
  }

  const t = testimonials[current]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  if (!t) return null

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-16 py-24 sm:py-32"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Testimonials"
          subtitle="What colleagues and clients say about working with me."
          badge="Testimonials"
        />

        {/* Carousel */}
        <div className="relative">
          <GlassCard hoverGlow={false} intensity="medium" className="p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-center"
              >
                {/* Avatar placeholder */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1]/30 to-[#A855F7]/30 text-xl font-bold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Rating */}
                <div className="mb-4 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        i < t.rating
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "text-white/10",
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 text-base leading-relaxed text-text-secondary italic">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassCard>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-muted transition-colors hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === current
                      ? "w-6 bg-gradient-to-r from-[#6366F1] to-[#A855F7]"
                      : "w-2 bg-white/10 hover:bg-white/20",
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-muted transition-colors hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
