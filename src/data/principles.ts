import type { EngineeringPrinciple } from "@/types"

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    title: "Clean Architecture",
    description:
      "Separation of concerns with well-defined boundaries between layers. Domain logic is independent of frameworks, databases, and external concerns.",
    icon: "layers",
  },
  {
    title: "SOLID Principles",
    description:
      "Single responsibility, open-closed, Liskov substitution, interface segregation, and dependency inversion form the foundation of maintainable code.",
    icon: "check-square",
  },
  {
    title: "Domain-Driven Design",
    description:
      "Modeling software around the business domain with a shared ubiquitous language, bounded contexts, and strategic design patterns.",
    icon: "map",
  },
  {
    title: "API First",
    description:
      "Designing APIs as first-class contracts before implementation. Enables parallel development, clear boundaries, and better developer experience.",
    icon: "api",
  },
  {
    title: "Automation First",
    description:
      "Automating everything that can be automated: testing, deployment, infrastructure provisioning, documentation, and code quality checks.",
    icon: "zap",
  },
  {
    title: "DevOps Culture",
    description:
      "Bridging development and operations with shared responsibility, continuous delivery, monitoring, and observability as core practices.",
    icon: "container",
  },
  {
    title: "Security by Design",
    description:
      "Security is not an afterthought. Threat modeling, secure coding practices, and defense in depth are integrated throughout the development lifecycle.",
    icon: "shield",
  },
  {
    title: "Continuous Learning",
    description:
      "Staying at the cutting edge of technology through deliberate practice, open-source contributions, and knowledge sharing with the community.",
    icon: "book-open",
  },
]
