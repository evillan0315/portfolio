import { Helmet } from "react-helmet-async"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Testimonials } from "@/components/sections/testimonials"
import { Blog } from "@/components/sections/blog"

export function HomePage() {
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Eddie Villanueva",
            jobTitle: "Full-Stack & AI Engineer",
            url: "https://yourdomain.com",
            sameAs: [
              "https://github.com/yourusername",
              "https://linkedin.com/in/yourusername",
            ],
          })}
        </script>
      </Helmet>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Blog />
    </>
  )
}
