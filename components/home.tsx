import About from "@/components/about"
import Backdrop from "@/components/backdrop"
import BootOverlay from "@/components/boot-overlay"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import Projects from "@/components/projects"

export default function Home() {
  return (
    <>
      <span id="top" aria-hidden="true" />
      <Backdrop />
      <Navigation />
      <BootOverlay />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
