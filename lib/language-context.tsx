"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Language } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const STORAGE_KEY = "language"

const defaultContextValue: LanguageContextType = {
  language: "fr",
  setLanguage: () => {},
  toggleLanguage: () => {},
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

function isLanguage(value: string | null): value is Language {
  return value === "fr" || value === "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLanguage(saved)) {
      setLanguageState(saved)
    }
  }, [])

  // Keep the document language in sync so screen readers and browser
  // translation use the right pronunciation rules.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Private mode or blocked storage — the choice just won't persist.
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "fr" ? "en" : "fr")
  }, [language, setLanguage])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
