"use client"

import { HeroContent } from "./HeroContent"
import { HeroTerminal } from "./HeroTerminal"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
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

      {/* Full-fluid layout */}
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-none items-center px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-16">
          {/* Left column — text content */}
          <div className="mx-auto w-full max-w-xl xl:max-w-2xl">
            <HeroContent />
          </div>

          {/* Right column — terminal typewriter */}
          <div className="mx-auto w-full max-w-2xl xl:max-w-3xl">
            <HeroTerminal />
          </div>
        </div>
      </div>
    </section>
  )
}
