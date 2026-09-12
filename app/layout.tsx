import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

const SITE_URL = "https://dylanclochard.dev"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dylan Clochard — Développeur Web Full-Stack & Game Developer",
    template: "%s — Dylan Clochard",
  },
  description:
    "Portfolio de Dylan Clochard, développeur web full-stack en recherche d'alternance (Bachelor Développeur Web & IA, ISCOD). Web, mobile et game development en TypeScript, Flutter, Python et Luau.",
  keywords: [
    "Dylan Clochard",
    "développeur full-stack",
    "alternance développeur",
    "alternance Marseille",
    "ISCOD",
    "game developer",
    "Roblox",
    "Next.js",
    "Python",
    "Lua",
    "Go",
    "ESGI",
  ],
  authors: [{ name: "Dylan Clochard", url: SITE_URL }],
  creator: "Dylan Clochard",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: "Dylan Clochard",
    title: "Dylan Clochard — Développeur Web Full-Stack & Game Developer",
    description:
      "Développeur web full-stack en recherche d'alternance à Marseille. Je construis des jeux, des apps mobiles et des interfaces web soignées.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Clochard — Développeur Web Full-Stack & Game Developer",
    description:
      "Développeur web full-stack en recherche d'alternance à Marseille. Je construis des jeux, des apps mobiles et des interfaces web soignées.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#080b11",
  colorScheme: "dark",
}

// Structured data so search engines resolve the identity behind the site.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dylan Clochard",
  url: SITE_URL,
  jobTitle: "Développeur Web Full-Stack",
  email: "mailto:dylanclochard@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marseille",
    addressCountry: "FR",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "ISCOD" },
    { "@type": "CollegeOrUniversity", name: "ESGI — École Supérieure de Génie Informatique" },
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "React Native",
    "Flutter",
    "Supabase",
    "Python",
    "Go",
    "Luau",
    "C#",
    "Game Development",
    "AI",
  ],
  sameAs: ["https://github.com/DylanCLD", "https://www.linkedin.com/in/dylan-clochard-75095b335"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`dark ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent-foreground"
        >
          Aller au contenu
        </a>
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster position="bottom-right" />
        <script
          type="application/ld+json"
          // Static, author-controlled payload — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  )
}
