import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { RootLayout } from "@/components/layout/root-layout"
import { HomePage } from "@/pages/home"

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
