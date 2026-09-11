"use client"

import { useState } from "react"
import { ExternalLink } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { ProjectCarousel } from "@/components/project-carousel"

const projectsData = [
  {
    title: "Eternal Seas – RPG Roblox",
    descriptionKey: "eternalSeas",
    tech: ["Lua", "Roblox Studio", "Roact", "Blender"],
    link: "https://www.roblox.com/",
    color: "from-blue-600 to-cyan-600",
    showButton: true,
    showCarousel: true,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T5wUjR05pLOxzgzBRxv5lKc73bu3IO.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PfhNngzIey6UC7tPjNpecY1uFCbEVp.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5VDTZtc0w3443ZX8WJnEIPHXAEySjE.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IBm8HxXuQiPholI1u80oBWDUb8TfTj.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8b9tHRTwTj01DdqzrnVyVMk5yBhQWI.png",
    ],
  },
  {
    title: "Poor to Rich Tycoon",
    descriptionKey: "poorToRich",
    tech: ["Lua", "Roblox Studio", "ProfileService", "Knit"],
    link: "https://www.roblox.com/",
    color: "from-yellow-600 to-orange-600",
    showButton: true,
    showCarousel: true,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-x5p1M3YnZv5ja8AY1tgl5H9HP30KC0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HlFivTl0x6PIiF1pBQrZF0jByRKVKf.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UpgIUSXYcotgtU8mutwNMUFwjSObr9.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-elTLPpMtvaYAj0m2fF48FKzYjdztJ2.png",
    ],
  },
  {
    title: "Tensura RP – Rise of the Slimes",
    descriptionKey: "tensuraRP",
    tech: ["Lua", "GLua", "Garry's Mod", "Hammer++", "Blender", "Photoshop"],
    link: "#",
    color: "from-indigo-600 to-purple-600",
    showButton: true,
    showCarousel: true,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mB0SroAIKhFaQAuLXUzCxCyUVST7U0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fwUL5B5ocKYgASXAo3XlJUrifNMxwj.png",
    ],
  },
  {
    title: "Mushoku Tensei RP – Garry's Mod",
    descriptionKey: "mushokuTensei",
    tech: ["Lua", "GLua", "Garry's Mod", "Hammer++"],
    link: "https://steamcommunity.com/app/4000",
    color: "from-purple-600 to-pink-600",
    showButton: true,
    showCarousel: false,
    images: [],
  },
  {
    title: "Inventory Manager",
    descriptionKey: "inventoryManager",
    tech: ["Flutter", "Dart", "Firebase", "Material Design"],
    link: "https://github.com/DylanCLD/inventory-manager",
    color: "from-green-600 to-emerald-600",
    showButton: true,
    showCarousel: false,
    images: [],
  },
  {
    title: "PokéStrat",
    descriptionKey: "pokeStrat",
    tech: ["Go", "HTML/CSS", "SQLite", "REST API"],
    link: "https://github.com/DylanCLD/pokestrat",
    color: "from-red-600 to-yellow-600",
    showButton: true,
    showCarousel: false,
    images: [],
  },
  {
    title: "WeatherData Manager",
    descriptionKey: "weatherData",
    tech: ["C", "Struct", "Union", "Enum", "Binary I/O"],
    link: "https://github.com/DylanCLD/weatherdata",
    color: "from-cyan-600 to-blue-600",
    showButton: false,
    showCarousel: false,
    images: [],
  },
  {
    title: "AlgoSuite – Exercices d'algorithmique",
    descriptionKey: "algoSuite",
    tech: ["Python", "VSCode", "Jupyter", "Algorithmes"],
    link: "#",
    color: "from-emerald-600 to-teal-600",
    showButton: false,
    showCarousel: false,
    images: [],
  },
]

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-pretty fade-in">{t.projects.title}</h2>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 animate-stagger">
          {projectsData.map((project, index) => {
            const imageTitlesKey = `${project.descriptionKey}Images` as keyof typeof t.projects
            const imageTitles = project.showCarousel ? Object.values(t.projects[imageTitlesKey] || {}) : []

            return (
              <div key={project.title}>
                <ProjectCarousel
                  images={project.images}
                  imageTitles={imageTitles}
                  projectName={project.title}
                  isOpen={selectedProject === project.title}
                  onClose={() => setSelectedProject(null)}
                />

                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur" />

                  <div className="relative block p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 h-full overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {t.projects[project.descriptionKey as keyof typeof t.projects]}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-mono hover:bg-accent/20 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.showButton && (
                        <button
                          onClick={() => {
                            if (project.showCarousel) {
                              setSelectedProject(project.title)
                            } else {
                              window.open(project.link, "_blank")
                            }
                          }}
                          className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all hover:text-accent/80"
                        >
                          {t.projects.viewProject}
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
