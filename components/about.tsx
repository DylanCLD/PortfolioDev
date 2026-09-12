"use client"

import { Briefcase, Code2, Gamepad2, GraduationCap, Layers, Terminal, Zap } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

const STACK_MARQUEE = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Flutter",
  "Dart",
  "Supabase",
  "SQL",
  "Python",
  "Go",
  "Lua",
  "Luau",
  "C#",
  "C",
  "PHP",
  "Roblox Studio",
  "Git",
]

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  const skills = [
    {
      category: t.about.categories.languages,
      items: ["Python", "Lua", "Luau", "C", "C#", "Go", "PHP", "JavaScript", "TypeScript", "Dart"],
      Icon: Code2,
    },
    {
      category: t.about.categories.web,
      items: ["React", "Next.js", "React Native", "HTML/CSS", "Flutter", "Supabase", "SQL"],
      Icon: Zap,
    },
    {
      category: t.about.categories.specializations,
      items: ["Game Development", "AI/ML", "Backend Systems", "Database Design", "API Development"],
      Icon: Gamepad2,
    },
    {
      category: t.about.categories.tools,
      items: ["Git", "SVN", "Linux/SSH", "Playwright", "Google Analytics", "OOP", "Web Accessibility"],
      Icon: Terminal,
    },
  ]

  // Most recent first; only the ongoing entry carries the badge.
  const timeline = [
    {
      key: "iscod",
      Icon: GraduationCap,
      title: t.about.iscodDegree,
      subtitle: t.about.iscodDetail,
      badge: t.about.current,
    },
    {
      key: "internship",
      Icon: Briefcase,
      title: t.about.internship,
      subtitle: t.about.internshipDesc,
      badge: null,
    },
    {
      key: "esgi",
      Icon: GraduationCap,
      title: t.about.esgiDegree,
      subtitle: t.about.esgiDetail,
      badge: null,
    },
    {
      key: "bac",
      Icon: GraduationCap,
      title: t.about.bacDegree,
      subtitle: t.about.bacDetail,
      badge: null,
    },
  ]

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={t.about.index} title={t.about.title} lead={t.about.lead} />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Bio + stack marquee */}
          <Reveal className="md:col-span-2">
            <article className="edge-light surface-card flex h-full flex-col justify-between gap-8 bg-surface-1/70 p-7 backdrop-blur md:p-9">
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">{t.about.bio}</p>

              <div>
                <p className="section-index mb-4">{t.about.stackTitle}</p>
                {/* Marquee: duplicated once so the translate(-50%) loop is seamless */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
                  }}
                >
                  <ul className="marquee-track flex w-max gap-2.5">
                    {[...STACK_MARQUEE, ...STACK_MARQUEE].map((tech, index) => (
                      <li
                        key={`${tech}-${index}`}
                        aria-hidden={index >= STACK_MARQUEE.length ? "true" : undefined}
                        className="whitespace-nowrap rounded-md border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Timeline */}
          <Reveal delay={90} className="md:col-span-2">
            <article className="edge-light surface-card h-full bg-surface-1/70 p-7 backdrop-blur">
              <h3 className="mb-6 flex items-center gap-2.5 text-base font-semibold">
                <Layers className="h-4 w-4 text-accent-bright" />
                {t.about.education}
              </h3>

              <ol className="relative space-y-6 border-l border-border pl-6">
                {timeline.map((entry) => (
                  <li key={entry.key} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[1.9rem] top-1 grid h-5 w-5 place-items-center rounded-full border border-border bg-surface-2 text-accent-bright"
                    >
                      <entry.Icon className="h-3 w-3" />
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold leading-snug">{entry.title}</h4>
                      {entry.badge ? (
                        <span className="rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-success">
                          {entry.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.subtitle}</p>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>

          {/* Skill groups */}
          {skills.map((skill, index) => (
            <Reveal key={skill.category} delay={120 + index * 70}>
              <article className="edge-light surface-card group h-full bg-surface-1/70 p-6 backdrop-blur transition-colors duration-300 hover:border-border-strong">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface-2 text-accent-bright transition-colors duration-300 group-hover:border-accent/50">
                    <skill.Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {skill.category}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent-bright"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
