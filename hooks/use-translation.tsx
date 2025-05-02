"use client"

import { useLanguage } from "@/hooks/use-language"
import translations from "@/lib/translations"

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (!value || typeof value !== "object") return key
      value = value[k]
    }

    // Make sure we're returning a string, not an object
    if (typeof value === "object") return key

    // If the value is undefined or not a string, try the fallback language
    if (value === undefined || typeof value !== "string") {
      let fallbackValue: any = translations.ar
      const fallbackKeys = key.split(".")

      for (const k of fallbackKeys) {
        if (!fallbackValue || typeof fallbackValue !== "object") return key
        fallbackValue = fallbackValue[k]
      }

      return typeof fallbackValue === "string" ? fallbackValue : key
    }

    return value
  }

  return { t }
}
