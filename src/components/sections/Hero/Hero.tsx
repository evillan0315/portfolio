"use client"

import { HeroContent } from "./HeroContent"
import { HeroImageCard } from "./HeroImageCard"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-32 pb-20"
      aria-label="Hero introduction"
    >
      {/* Rich glow backgrounds */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-40 blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full opacity-30 blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.12), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-20 h-[700px] w-[700px] rounded-full opacity-20 blur-[180px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[42%_58%] lg:gap-20">
          {/* Left column — text content */}
          <HeroContent />

          {/* Right column — image card */}
          <HeroImageCard />
        </div>
      </div>
    </section>
  )
}
