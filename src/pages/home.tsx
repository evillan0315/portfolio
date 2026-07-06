import { lazy } from "react"
import { Helmet } from "react-helmet-async"
import { Hero } from "@/components/sections/hero"
import { LazySection } from "@/components/common/lazy-section"

const About = lazy(() => import("@/components/sections/about"))
const Skills = lazy(() => import("@/components/sections/skills"))
const Projects = lazy(() => import("@/components/sections/projects"))
const Experience = lazy(() => import("@/components/sections/experience"))
const Testimonials = lazy(() => import("@/components/sections/testimonials"))
const Blog = lazy(() => import("@/components/sections/blog"))

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Eddie Villanueva — Full-Stack & AI Engineer</title>
        <meta
          name="description"
          content="Senior full-stack, cloud, DevOps, and AI engineer building scalable platforms, developer tooling, and AI-powered solutions."
        />
        <meta property="og:title" content="Eddie Villanueva — Full-Stack & AI Engineer" />
        <meta
          property="og:description"
          content="Senior full-stack, cloud, DevOps, and AI engineer building scalable platforms, developer tooling, and AI-powered solutions."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eddie Villanueva — Full-Stack & AI Engineer" />
        <meta
          name="twitter:description"
          content="Senior full-stack, cloud, DevOps, and AI engineer building scalable platforms, developer tooling, and AI-powered solutions."
        />
        <link rel="canonical" href="https://evillan0315.github.io/portfolio/" />
        <meta property="og:url" content="https://evillan0315.github.io/portfolio/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Eddie Villanueva",
            jobTitle: "Full-Stack & AI Engineer",
            url: "https://evillan0315.github.io/portfolio/",
            sameAs: [
              "https://github.com/evillan0315",
              "https://www.linkedin.com/in/evillanueva0315",
            ],
          })}
        </script>
      </Helmet>

      {/* Hero — above the fold, loaded eagerly */}
      <Hero />

      {/* Below-fold sections — lazy loaded via IntersectionObserver */}
      <LazySection id="about-section">
        <About />
      </LazySection>
      <LazySection id="skills-section">
        <Skills />
      </LazySection>
      <LazySection id="projects-section">
        <Projects />
      </LazySection>
      <LazySection id="experience-section">
        <Experience />
      </LazySection>
      <LazySection id="testimonials-section">
        <Testimonials />
      </LazySection>
      <LazySection id="blog-section">
        <Blog />
      </LazySection>
    </>
  )
}
