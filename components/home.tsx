import About from "@/components/about"
import Backdrop from "@/components/backdrop"
import BootOverlay from "@/components/boot-overlay"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"
import Projects from "@/components/projects"
import PremiumHero from "@/components/premium-hero"

export default function Home() {
  return (
    <>
      <span id="top" aria-hidden="true" />
      <Backdrop />
      <Navigation />
      <BootOverlay />
      <main id="main" className="relative">
        <PremiumHero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
