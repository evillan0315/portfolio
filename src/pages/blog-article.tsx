import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlowBackground } from "@/components/ui/glow-background"
import { blogPosts } from "@/data/blog"

/* Import all markdown articles eagerly — keyed by slug derived from filename */
const articles = import.meta.glob<string>("@/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

/** Extract slug from a full path like "/src/content/blog/my-post.md" -> "my-post" */
function pathToSlug(path: string): string {
  return path.replace(/^.*\//, "").replace(/\.md$/, "")
}

/* Build a slug→content map once */
const contentBySlug: Record<string, string> = {}
for (const [path, content] of Object.entries(articles)) {
  const slug = pathToSlug(path)
  contentBySlug[slug] = content
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Custom markdown components styled to match the portfolio's glassmorphism aesthetic.
 */
const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mb-4 mt-10 text-2xl font-semibold text-white"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold text-white" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 leading-relaxed text-text-secondary" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 list-disc pl-6 text-text-secondary space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 list-decimal pl-6 text-text-secondary space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="rounded-md bg-white/5 px-1.5 py-0.5 text-sm font-mono text-accent"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <pre className="mb-6 overflow-x-auto rounded-xl border border-glass-border bg-white/5 p-4 text-sm font-mono leading-relaxed text-text-secondary">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    )
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mb-5 border-l-2 border-accent pl-4 italic text-text-muted"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-8 border-glass-border" {...props} />,
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt ?? ""}
      className="my-6 w-full rounded-xl border border-glass-border"
      loading="lazy"
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-glass-border">
      <table className="w-full text-sm text-text-secondary" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="border-b border-glass-border bg-white/5 px-4 py-3 text-left font-semibold text-white" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-glass-border px-4 py-3" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)
  const markdownContent = slug ? contentBySlug[slug] : undefined

  /* --- 404 if no matching post or content --- */
  if (!post || !markdownContent) {
    return (
      <>
        <Helmet>
          <title>Blog Post Not Found | Eddie Villanueva</title>
        </Helmet>
        <section className="relative flex min-h-[60vh] items-center justify-center">
          <GlowBackground
            color="rgba(99,102,241,0.1)"
            size="lg"
            blur="lg"
            className="absolute inset-0 flex items-center justify-center"
          />
          <div className="relative text-center">
            <h1 className="text-6xl font-extrabold">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Post Not Found
              </span>
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              This article doesn't exist or may have been removed.
            </p>
            <div className="mt-8">
              <Link to={import.meta.env.BASE_URL}>
                <Button variant="primary" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  const pageUrl = `${import.meta.env.BASE_URL}blog/${post.slug}`

  return (
    <>
      <Helmet>
        <title>{post.title} | Eddie Villanueva</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={`${post.title} | Eddie Villanueva`} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      <article className="relative py-24 sm:py-32">
        <GlowBackground
          color="rgba(99,102,241,0.06)"
          size="lg"
          blur="lg"
          className="absolute inset-0 flex items-start justify-center pt-32"
        />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to={import.meta.env.BASE_URL}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Home
          </Link>

          {/* Article header */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {/* Article content */}
          <div className="prose-custom">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-glass-border pt-8">
            <Link to={import.meta.env.BASE_URL}>
              <Button variant="ghost" size="md" icon={<ArrowLeft size={16} />}>
                Back to Home
              </Button>
            </Link>
          </footer>
        </div>
      </article>
    </>
  )
}
