"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"
import { setCookie } from "@/lib/cookies"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "ku",
  setLanguage: () => {},
})

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage: string
}

export function LanguageProvider({ children, defaultLanguage = "ku" }: LanguageProviderProps) {
  const [language, setLanguageState] = useState(defaultLanguage)

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    setCookie("language", lang, 365)
    document.documentElement.lang = lang
    document.documentElement.dir = "rtl"
  }

  useEffect(() => {
    // Initialize with the default language
    setLanguageState(defaultLanguage)
  }, [defaultLanguage])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}
