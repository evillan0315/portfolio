"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { navigation } from "@/data/navigation"


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#hero")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Scroll spy
      const sections = navigation.map((item) => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-bg-primary/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick("#hero")
          }}
          className="text-lg font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
            EV
          </span>
          <span className="ml-1 text-text-muted">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                  activeSection === item.href
                    ? "text-white"
                    : "text-text-muted hover:text-white",
                )}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#A855F7]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-text-muted hover:text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-white/10 bg-bg-primary/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-4 pb-4 pt-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      activeSection === item.href
                        ? "text-white bg-white/5"
                        : "text-text-muted hover:text-white",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
