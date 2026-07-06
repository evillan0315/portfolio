"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

/**
 * Reusable glass-style pagination with page numbers, prev/next, and item count.
 */
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  // Build visible page numbers — show max 7 with ellipsis
  const pages = buildPageRange(currentPage, totalPages)

  return (
    <nav
      className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
      aria-label="Pagination"
    >
      {/* Item count */}
      <p className="text-sm text-text-muted">
        <span className="font-medium text-white">{startItem}</span>
        {" — "}
        <span className="font-medium text-white">{endItem}</span>
        {" of "}
        <span className="font-medium text-white">{totalItems}</span>
        {" items"}
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-xs transition-all duration-200",
            currentPage <= 1
              ? "cursor-not-allowed text-text-muted/40"
              : "text-text-muted hover:bg-white/5 hover:text-white",
          )}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-9 w-9 items-center justify-center text-xs text-text-muted"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200",
                p === currentPage
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-text-muted hover:bg-white/5 hover:text-white",
              )}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-xs transition-all duration-200",
            currentPage >= totalPages
              ? "cursor-not-allowed text-text-muted/40"
              : "text-text-muted hover:bg-white/5 hover:text-white",
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  )
}

/* ── Build page range with ellipsis ── */
function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "ellipsis")[] = []

  // Always show first page
  pages.push(1)

  if (current > 3) pages.push("ellipsis")

  // Pages around current
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push("ellipsis")

  // Always show last page
  if (total > 1) pages.push(total)

  return pages
}
