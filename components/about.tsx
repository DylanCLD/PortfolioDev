"use client"

import { Code2, Zap, Gamepad2 } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  const skills = [
    {
      category: t.about.categories.languages,
      items: ["Python", "Lua", "C", "Go", "PHP", "JavaScript", "TypeScript", "Dart"],
      icon: Code2,
    },
    {
      category: t.about.categories.web,
      items: ["React", "Next.js", "HTML/CSS", "Flutter", "Firebase", "SQL"],
      icon: Zap,
    },
    {
      category: t.about.categories.specializations,
      items: ["Game Development", "AI/ML", "Backend Systems", "Database Design", "API Development"],
      icon: Gamepad2,
    },
  ]

  return (
    <section id="about" className="py-20 px-4 bg-muted/30 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-pretty fade-in">{t.about.title}</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-stagger">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.category}
                className="p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-mono hover:bg-accent/20 transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-16 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-2xl font-bold mb-4">{t.about.education}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-lg">{t.about.bachelor}</h4>
              <p className="text-muted-foreground">{t.about.esgi}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.about.specialization}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg">{t.about.experience}</h4>
              <p className="text-muted-foreground">{t.about.internship}</p>
              <p className="text-sm text-muted-foreground">{t.about.internshipDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
