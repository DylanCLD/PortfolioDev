"use client"

import { useState, useEffect } from "react"
import { Terminal } from "@/components/icons"
import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BinaryBackground from "@/components/binary-background"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <BinaryBackground />
      <Navigation />

      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <Terminal className="w-12 h-12 mx-auto mb-4 glow-text" />
            <div className="font-mono text-lg cursor-blink">initializing_system...</div>
          </div>
        </div>
      ) : (
        <>
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  )
}
