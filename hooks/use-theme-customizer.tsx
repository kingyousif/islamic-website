"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { useTheme } from "next-themes"

type ThemeMode = "light" | "dark" | "system" | "custom"

interface ThemeCustomizerContextType {
  buttonColor: string
  setButtonColor: (color: string) => void
  textColor: string
  setTextColor: (color: string) => void
  buttonRadius: string
  setButtonRadius: (radius: string) => void
  resetTheme: () => void
  predefinedColors: string[]
  predefinedRadii: { value: string; label: string; preview: string }[]
  recentColors: string[]
  addRecentColor: (color: string) => void
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  applyThemeMode: (mode: ThemeMode) => void
  isCustomTheme: boolean
}

// Default colors for light and dark modes
const lightModeDefaults = {
  buttonColor: "#22c55e",
  textColor: "#0f172a", // Dark slate for text on light background
}

const darkModeDefaults = {
  buttonColor: "#22c55e",
  textColor: "#f8fafc", // Light slate for text on dark background
}

const defaultButtonRadius = "8"

const predefinedColors = [
  "#ffffff", // White
  "#f8fafc", // Slate 50
  "#f1f5f9", // Slate 100
  "#22c55e", // Green 500
  "#10b981", // Emerald 500
  "#06b6d4", // Cyan 500
  "#3b82f6", // Blue 500
  "#8b5cf6", // Violet 500
  "#d946ef", // Fuchsia 500
  "#f43f5e", // Rose 500
]

const predefinedRadii = [
  { value: "0", label: "Square", preview: "0px" },
  { value: "8", label: "Rounded", preview: "8px" },
  { value: "16", label: "Soft", preview: "16px" },
  { value: "28", label: "Full", preview: "28px" },
]

const ThemeCustomizerContext = createContext<ThemeCustomizerContextType | undefined>(undefined)

export function ThemeCustomizerProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [buttonColor, setButtonColorState] = useState(lightModeDefaults.buttonColor)
  const [textColor, setTextColorState] = useState(lightModeDefaults.textColor)
  const [buttonRadius, setButtonRadiusState] = useState(defaultButtonRadius)
  const [recentColors, setRecentColors] = useState<string[]>([])
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system")
  const [isCustomTheme, setIsCustomTheme] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load saved theme from localStorage
  useEffect(() => {
    setMounted(true)

    const savedThemeMode = localStorage.getItem("quran-qa-theme-mode") as ThemeMode | null
    const savedButtonColor = localStorage.getItem("quran-qa-button-color")
    const savedTextColor = localStorage.getItem("quran-qa-text-color")
    const savedButtonRadius = localStorage.getItem("quran-qa-button-radius")
    const savedRecentColors = localStorage.getItem("quran-qa-recent-colors")
    const savedIsCustomTheme = localStorage.getItem("quran-qa-is-custom-theme")

    if (savedThemeMode) setThemeModeState(savedThemeMode)
    if (savedButtonColor) setButtonColorState(savedButtonColor)
    if (savedTextColor) setTextColorState(savedTextColor)
    if (savedButtonRadius) setButtonRadiusState(savedButtonRadius)
    if (savedRecentColors) setRecentColors(JSON.parse(savedRecentColors))
    if (savedIsCustomTheme) setIsCustomTheme(savedIsCustomTheme === "true")

    // Apply the saved theme mode
    if (savedThemeMode && savedThemeMode !== "custom") {
      setTheme(savedThemeMode)
    }
  }, [setTheme])

  // Apply theme changes to CSS variables
  useEffect(() => {
    if (!mounted) return

    // Apply text color
    document.documentElement.style.setProperty("--custom-text", textColor)

    // Apply button color
    document.documentElement.style.setProperty("--custom-button-color", buttonColor)

    // Apply button radius
    document.documentElement.style.setProperty("--custom-button-radius", `${buttonRadius}px`)

    // Convert hex to HSL for primary color
    const hexToRgb = (hex: string) => {
      // Remove # if present
      hex = hex.replace(/^#/, "")

      // Handle 3-digit hex
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }

      // Parse as hex
      const bigint = Number.parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255

      return { r, g, b }
    }

    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255
      g /= 255
      b /= 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0,
        s = 0,
        l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }

        h /= 6
      }

      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
    }

    try {
      // Handle both 3-digit and 6-digit hex colors
      if (buttonColor.startsWith("#")) {
        const rgb = hexToRgb(buttonColor)
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
        document.documentElement.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      }

      // Convert text color to HSL for foreground
      if (textColor.startsWith("#")) {
        const rgb = hexToRgb(textColor)
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
        document.documentElement.style.setProperty("--foreground", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      }
    } catch (error) {
      console.error("Error converting color:", error)
    }
  }, [buttonColor, textColor, buttonRadius, mounted])

  // Set theme mode
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
    localStorage.setItem("quran-qa-theme-mode", mode)

    // If mode is not custom, update the theme
    if (mode !== "custom") {
      setTheme(mode)
      setIsCustomTheme(false)
      localStorage.setItem("quran-qa-is-custom-theme", "false")
    } else {
      setIsCustomTheme(true)
      localStorage.setItem("quran-qa-is-custom-theme", "true")
    }
  }

  // Apply a specific theme mode
  const applyThemeMode = (mode: ThemeMode) => {
    if (mode === "light") {
      setButtonColorState(lightModeDefaults.buttonColor)
      setTextColorState(lightModeDefaults.textColor)
      localStorage.setItem("quran-qa-button-color", lightModeDefaults.buttonColor)
      localStorage.setItem("quran-qa-text-color", lightModeDefaults.textColor)
      setTheme("light")
    } else if (mode === "dark") {
      setButtonColorState(darkModeDefaults.buttonColor)
      setTextColorState(darkModeDefaults.textColor)
      localStorage.setItem("quran-qa-button-color", darkModeDefaults.buttonColor)
      localStorage.setItem("quran-qa-text-color", darkModeDefaults.textColor)
      setTheme("dark")
    } else if (mode === "system") {
      setTheme("system")
    }

    setThemeMode(mode)
  }

  const setButtonColor = (color: string) => {
    setButtonColorState(color)
    localStorage.setItem("quran-qa-button-color", color)

    // When manually changing colors, switch to custom theme mode
    if (!isCustomTheme) {
      setThemeMode("custom")
    }
  }

  const setTextColor = (color: string) => {
    setTextColorState(color)
    localStorage.setItem("quran-qa-text-color", color)

    // When manually changing colors, switch to custom theme mode
    if (!isCustomTheme) {
      setThemeMode("custom")
    }
  }

  const setButtonRadius = (radius: string) => {
    setButtonRadiusState(radius)
    localStorage.setItem("quran-qa-button-radius", radius)
  }

  const addRecentColor = (color: string) => {
    setRecentColors((prev) => {
      // Remove the color if it already exists
      const filtered = prev.filter((c) => c !== color)
      // Add the new color to the beginning
      const updated = [color, ...filtered].slice(0, 16) // Keep only the 16 most recent colors
      // Save to localStorage
      localStorage.setItem("quran-qa-recent-colors", JSON.stringify(updated))
      return updated
    })
  }

  const resetTheme = () => {
    // Reset to system theme
    applyThemeMode("system")
    setButtonRadius(defaultButtonRadius)
    localStorage.setItem("quran-qa-button-radius", defaultButtonRadius)
  }

  return (
    <ThemeCustomizerContext.Provider
      value={{
        buttonColor,
        setButtonColor,
        textColor,
        setTextColor,
        buttonRadius,
        setButtonRadius,
        resetTheme,
        predefinedColors,
        predefinedRadii,
        recentColors,
        addRecentColor,
        themeMode,
        setThemeMode,
        applyThemeMode,
        isCustomTheme,
      }}
    >
      {children}
    </ThemeCustomizerContext.Provider>
  )
}

export function useThemeCustomizer() {
  const context = useContext(ThemeCustomizerContext)

  if (context === undefined) {
    throw new Error("useThemeCustomizer must be used within a ThemeCustomizerProvider")
  }

  return context
}
