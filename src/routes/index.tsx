import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { RootLayout } from "@/components/layout/root-layout"
import { HomePage } from "@/pages/home"
import { BlogArticlePage } from "@/pages/blog-article"
import { NotFoundPage } from "@/pages/not-found"

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blog/:slug",
        element: <BlogArticlePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
})
