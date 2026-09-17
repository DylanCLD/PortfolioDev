"use client"

import { useMemo, useState } from "react"
import { ArrowUpRight, Github, Maximize, Sparkles } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCarousel } from "@/components/project-carousel"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

type Category = "games" | "web" | "mobile" | "systems"

interface Project {
  id: string
  title: string
  /** Key into translations.projects for the description. */
  descriptionKey: string
  category: Category
  tech: string[]
  /** Absolute URL, or null when the project has no public link. */
  link: string | null
  youtubeId?: string
  videos?: { id: string; title: string }[]
  featured?: boolean
  images: string[]
}

const BLOB = "/projects"

const projectsData: Project[] = [
  {
    id: "animeTreasure",
    youtubeId: "ZYCvFV-1o4s",
    title: "Jeux Roblox — Anime Factory & Treasure",
    videos: [
      { id: "mJSpc6iy0Dg", title: "Anime Factory · Sell Hero" },
      { id: "ozrQ_jyysBY", title: "Anime Factory · Rebirth + Index" },
      { id: "-X_qGPO5UXE", title: "Anime Factory · Inventory" },
      { id: "p9kmtey4EQ8", title: "Anime Factory · Leaderboard" },
      { id: "74H7PtP4YPU", title: "Anime Factory · Open Box" },
      { id: "gJpI7E8QgJ0", title: "Anime Factory · Daily Rewards" },
      { id: "ZYCvFV-1o4s", title: "Anime Treasure Simulator" },
    ],
    descriptionKey: "animeTreasure",
    category: "games",
    tech: ["Roblox Studio", "Luau", "DataStore", "Moon Animator 2"],
    link: "https://www.youtube.com/watch?v=mJSpc6iy0Dg",
    featured: true,
    images: ["/projects/roblox/anime-treasure-hub.webp", "/projects/roblox/anime-treasure-shops.webp", "/projects/roblox/anime-world-1.webp", "/projects/roblox/anime-world-2.webp", "/projects/roblox/anime-world-3.webp", "/projects/roblox/anime-world-4.webp", "/projects/roblox/anime-world-5.webp"],
  },
  {
    id: "proceduralDungeon",
    youtubeId: "-PQRMW4v3l8",
    title: "Procedural Dungeon Engine — Roblox",
    descriptionKey: "proceduralDungeon",
    category: "games",
    tech: ["Roblox Studio", "Luau", "PCG", "Object Pooling", "Pathfinding"],
    link: "https://www.youtube.com/watch?v=-PQRMW4v3l8",
    images: ["/projects/roblox/dungeon-config.webp", "/projects/roblox/dungeon-generation.webp"],
  },
  {
    id: "tensuraRP",
    title: "Tensura RP – Rise of the Slimes",
    descriptionKey: "tensuraRP",
    category: "games",
    tech: ["Lua", "GLua", "Garry's Mod", "Hammer++", "Blender", "Photoshop"],
    link: null,
    images: [`${BLOB}/image-mB0SroAIKhFaQAuLXUzCxCyUVST7U0.webp`, `${BLOB}/image-fwUL5B5ocKYgASXAo3XlJUrifNMxwj.webp`],
  },
  {
    id: "inventoryManager",
    title: "Inventory Manager",
    descriptionKey: "inventoryManager",
    category: "web",
    tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    link: "https://github.com/DylanCLD/Coffre",
    images: [],
  },
  {
    id: "fertilityTracker",
    title: "Fertility Tracker",
    descriptionKey: "fertilityTracker",
    category: "mobile",
    tech: ["Flutter", "Dart", "Provider", "fl_chart", "local_auth"],
    link: "https://github.com/DylanCLD/fertility_tracker",
    images: [],
  },
  {
    id: "docsTOG",
    title: "DocsTOG – Workspace Notion-like",
    descriptionKey: "docsTOG",
    category: "web",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Tiptap"],
    link: "https://github.com/DylanCLD/DocsTOG",
    images: [],
  },
  {
    id: "pokeStrat",
    title: "PokéStrat",
    descriptionKey: "pokeStrat",
    category: "web",
    tech: ["Go", "HTML/CSS", "SQLite", "REST API"],
    link: "https://github.com/DylanCLD/pokestrat",
    images: [],
  },
  {
    id: "weatherData",
    title: "WeatherData Manager",
    descriptionKey: "weatherData",
    category: "systems",
    tech: ["C", "Struct", "Union", "Enum", "Binary I/O"],
    link: null,
    images: [],
  },
  {
    id: "sportActu",
    title: "MyFitAI – Suivi Sportif Gamifié",
    descriptionKey: "sportActu",
    category: "mobile",
    tech: ["React Native", "Expo", "TypeScript", "SQLite", "Gemini AI"],
    link: "https://github.com/DylanCLD/SportActu",
    images: [],
  },
]

const FILTERS: Array<{ value: Category | "all"; key: keyof (typeof translations)["fr"]["projects"]["filters"] }> = [
  { value: "all", key: "all" },
  { value: "games", key: "games" },
  { value: "web", key: "web" },
  { value: "mobile", key: "mobile" },
  { value: "systems", key: "systems" },
]

function isGithub(link: string) {
  return link.includes("github.com")
}

export default function Projects() {
  const [filter, setFilter] = useState<Category | "all">("all")
  const [openProject, setOpenProject] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  const visible = useMemo(
    () => (filter === "all" ? projectsData : projectsData.filter((project) => project.category === filter)),
    [filter],
  )

  const active = projectsData.find((project) => project.id === openProject) ?? null
  const activeTitles = active
    ? Object.values(
        ((t.projects as Record<string, unknown>)[`${active.id}Images`] as Record<string, string> | undefined) ?? {},
      )
    : []

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: projectsData.length }
    for (const project of projectsData) {
      base[project.category] = (base[project.category] ?? 0) + 1
    }
    return base
  }, [])

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index={t.projects.index}
          title={t.projects.title}
          lead={t.projects.lead}
          aside={
            <div
              role="group"
              aria-label={t.projects.filterLabel}
              className="project-filters flex flex-wrap gap-1.5 rounded-xl border border-border bg-surface-1/70 p-1.5 backdrop-blur"
            >
              {FILTERS.map(({ value, key }) => {
                const selected = filter === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    aria-pressed={selected}
                    className={cn(
                      "inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-sm transition-colors duration-200",
                      selected
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                    )}
                  >
                    {t.projects.filters[key]}
                    <span className={cn("tabular font-mono text-[0.65rem]", selected ? "opacity-70" : "opacity-50")}>
                      {counts[value] ?? 0}
                    </span>
                  </button>
                )
              })}
            </div>
          }
        />

        {visible.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">{t.projects.empty}</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, index) => {
              const description = (t.projects as Record<string, unknown>)[project.descriptionKey] as string
              const hasGallery = project.images.length > 0
              const wide = project.featured && filter === "all"
              const shownTech = project.tech.slice(0, 4)
              const hiddenTech = project.tech.length - shownTech.length

              return (
                <Reveal
                  key={project.id}
                  delay={Math.min(index, 5) * 70}
                  className={cn(wide && "md:col-span-2 xl:col-span-2")}
                >
                  <article
                    className={cn(
                      "edge-light surface-card group relative flex h-full flex-col overflow-hidden bg-surface-1/70 backdrop-blur transition-[border-color,transform,box-shadow] duration-300",
                      "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-glow-soft)]",
                    )}
                  >
                    {hasGallery ? (
                      <button
                        type="button"
                        onClick={() => setOpenProject(project.id)}
                        className="relative block w-full cursor-pointer overflow-hidden border-b border-border bg-surface-3 text-left"
                        aria-label={`${t.projects.gallery} — ${project.id === "animeTreasure" && language === "en" ? "Roblox Games — Anime Factory & Treasure" : project.title}`}
                      >
                        <span className={cn("block", wide ? "aspect-[21/9]" : "aspect-[16/10]")}>
                          <img
                            src={project.images[0]}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover opacity-85 transition-[opacity,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="project-image-shade absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/20 to-transparent"
                        />
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2.5 py-1.5 font-mono text-[0.7rem] text-foreground backdrop-blur">
                          <Maximize className="h-3 w-3" />
                          {project.videos ? `${project.videos.length} ${language === "fr" ? "vidéos · " : "videos · "}` : ""}{project.images.length} {t.projects.screenshots}
                        </span>
                        {project.featured ? (
                          <span className="project-featured absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/15 px-2.5 py-1 font-mono text-[0.7rem] text-accent-bright backdrop-blur">
                            <Sparkles className="h-3 w-3" />
                            {t.projects.featured}
                          </span>
                        ) : null}
                      </button>
                    ) : null}

                    <div className="flex flex-1 flex-col p-6">
                      <p className="section-index mb-3">{t.projects.filters[project.category]}</p>

                      <h3 className="text-balance text-lg font-semibold leading-snug transition-colors duration-200 group-hover:text-accent-bright">
                        {project.id === "animeTreasure" && language === "en" ? "Roblox Games — Anime Factory & Treasure" : project.title}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {shownTech.map((tech) => (
                          <li
                            key={tech}
                            className="rounded border border-border bg-surface-2 px-2 py-1 font-mono text-[0.7rem] text-muted-foreground"
                          >
                            {tech}
                          </li>
                        ))}
                        {hiddenTech > 0 ? (
                          <li
                            title={project.tech.slice(4).join(", ")}
                            className="rounded border border-border bg-surface-2 px-2 py-1 font-mono text-[0.7rem] text-muted-foreground"
                          >
                            +{hiddenTech}
                          </li>
                        ) : null}
                      </ul>

                      {hasGallery || project.link ? (
                        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
                          {hasGallery ? (
                            <button
                              type="button"
                              onClick={() => setOpenProject(project.id)}
                              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface-2 px-3.5 text-sm font-medium transition-colors duration-200 hover:border-accent/60 hover:text-accent-bright"
                            >
                              <Maximize className="h-3.5 w-3.5" />
                              {project.youtubeId ? (language === "fr" ? "Vidéos & captures" : "Videos & screenshots") : t.projects.gallery}
                            </button>
                          ) : null}

                          {project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent-bright"
                            >
                              {isGithub(project.link) ? (
                                <>
                                  <Github className="h-3.5 w-3.5" />
                                  {t.projects.source}
                                </>
                              ) : (
                                <>
                                  {project.link.startsWith("https://www.youtube.com/") ? (language === "fr" ? "Voir la démo vidéo" : "Watch video demo") : t.projects.visit}
                                  <ArrowUpRight className="h-3.5 w-3.5" />
                                </>
                              )}
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                      {project.youtubeId ? <a href="https://olabsroblox.vercel.app" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 self-start text-xs text-muted-foreground underline decoration-border-strong underline-offset-4 hover:text-accent-bright">
                        {language === "fr" ? "Portfolio Roblox du studio · OLabs" : "Studio Roblox portfolio · OLabs"}<ArrowUpRight className="h-3 w-3" />
                      </a> : null}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>

      {/* One modal instance, driven by the open project — the old code mounted
          a carousel per card and kept stale slide state between projects. */}
      <ProjectCarousel
        videos={active?.videos}
        youtubeId={active?.youtubeId}
        images={active?.images ?? []}
        imageTitles={activeTitles}
        projectName={active?.title ?? ""}
        isOpen={active !== null}
        onClose={() => setOpenProject(null)}
      />
    </section>
  )
}
