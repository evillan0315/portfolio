"use client"

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  /** Distance in px before the viewport edge to trigger loading (default: 200) */
  rootMargin?: string
  /** Placeholder while loading */
  fallback?: ReactNode
  /** Unique id for aria labelling */
  id?: string
}

/**
 * Renders a placeholder until the element is within `rootMargin` of the viewport,
 * then swaps in the actual children. Useful for below-fold sections to avoid
 * paying the cost of heavy component imports on initial load.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  fallback,
  id,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} id={id}>
      {visible ? (
        <Suspense
          fallback={
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent/40 border-t-transparent" />
                <span className="text-xs text-text-muted">Loading section…</span>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
      ) : (
        fallback ?? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent/40 border-t-transparent" />
              <span className="text-xs text-text-muted">Loading section…</span>
            </div>
          </div>
        )
      )}
    </div>
  )
}
