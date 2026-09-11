"use client"

import { Mail, Linkedin, Github, Phone, MapPin } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.email,
      value: "dylanclochard@gmail.com",
      href: "mailto:dylanclochard@gmail.com",
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      value: "linkedin.com/in/dylan-clochard",
      href: "https://www.linkedin.com/in/dylan-clochard-75095b335",
    },
    {
      icon: Github,
      label: t.contact.github,
      value: "github.com/DylanCLD",
      href: "https://github.com/DylanCLD",
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+33 7 83 61 12 09",
      href: "tel:+33783611209",
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: "Aix-En-Provence, France",
      href: "#",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-pretty">{t.contact.title}</h2>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">{t.contact.description}</p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {contactInfo.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.label !== t.contact.location ? "_blank" : undefined}
                rel={item.label !== t.contact.location ? "noopener noreferrer" : undefined}
                className="p-6 bg-card border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-300 group"
              >
                <Icon className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
                <p className="font-semibold group-hover:text-accent transition-colors">{item.value}</p>
              </a>
            )
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">{t.contact.ready}</p>
          <a
            href="mailto:dylanclochard@gmail.com"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
          >
            {t.contact.startConversation}
          </a>
        </div>
      </div>
    </section>
  )
}
