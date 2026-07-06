import { lazy, Suspense } from "react"
import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { RootLayout } from "@/components/layout/root-layout"

const HomePage = lazy(() => import("@/pages/home"))
const BlogArticlePage = lazy(() => import("@/pages/blog-article"))
const NotFoundPage = lazy(() => import("@/pages/not-found"))

function SuspenseWrapper({ Component }: { Component: React.LazyExoticComponent<React.ComponentType> }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#09090B]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <span className="text-sm text-text-muted">Loading…</span>
          </div>
        </div>
      }
    >
      <Component />
    </Suspense>
  )
}

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper Component={HomePage} />,
      },
      {
        path: "blog/:slug",
        element: <SuspenseWrapper Component={BlogArticlePage} />,
      },
      {
        path: "*",
        element: <SuspenseWrapper Component={NotFoundPage} />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
})
