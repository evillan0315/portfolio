import { Helmet } from "react-helmet-async"
import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { GlowBackground } from "@/components/ui/glow-background"

export default function NotFoundPage() {
  const error = useRouteError()
  const isError = isRouteErrorResponse(error)

  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Eddie Villanueva</title>
      </Helmet>

      <section className="relative flex min-h-[80vh] items-center justify-center">
        <GlowBackground
          color="rgba(99,102,241,0.1)"
          size="lg"
          blur="lg"
          className="absolute inset-0 flex items-center justify-center"
        />
        <div className="relative text-center">
          <h1 className="text-8xl font-extrabold md:text-9xl">
            <GradientText>404</GradientText>
          </h1>
          <p className="mt-4 text-xl text-text-secondary">
            {isError
              ? error.statusText
              : "This page doesn't exist."}
          </p>
          <p className="mt-2 text-text-muted">
            The page you're looking for was moved, removed, or never existed.
          </p>
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => (window.location.href = import.meta.env.BASE_URL)}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
