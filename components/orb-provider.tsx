"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { OrbSettings } from "./admin-panel"

const defaultOrbSettings: OrbSettings = {
  hero: {
    id: "hero",
    name: "Hero Orb",
    hue: 240,
    hoverIntensity: 0.3,
    rotateOnHover: true,
    forceHoverState: true,
    enabled: true,
    position: { top: "50%", right: "10%" },
    size: { width: 400, height: 400 },
    opacity: 1,
    zIndex: 1,
  },
  floating1: {
    id: "floating1",
    name: "Floating Orb 1",
    hue: 120,
    hoverIntensity: 0.1,
    rotateOnHover: false,
    forceHoverState: true,
    enabled: true,
    position: { top: "20%", left: "5%" },
    size: { width: 200, height: 200 },
    opacity: 0.6,
    zIndex: 0,
  },
  floating2: {
    id: "floating2",
    name: "Floating Orb 2",
    hue: 300,
    hoverIntensity: 0.1,
    rotateOnHover: false,
    forceHoverState: true,
    enabled: true,
    position: { bottom: "20%", right: "5%" },
    size: { width: 200, height: 200 },
    opacity: 0.6,
    zIndex: 0,
  },
  stats: {
    id: "stats",
    name: "Stats Orb",
    hue: 270,
    hoverIntensity: 0.2,
    rotateOnHover: false,
    forceHoverState: true,
    enabled: true,
    position: { top: "50%", left: "50%" },
    size: { width: 150, height: 150 },
    opacity: 0.3,
    zIndex: 0,
  },
  cards: {
    enabled: true,
    hoverIntensity: 0.4,
    rotateOnHover: true,
  },
  featured: {
    enabled: true,
    hoverIntensity: 0.5,
    rotateOnHover: true,
  },
  global: {
    performanceMode: false,
    showOnMobile: false,
    animationSpeed: 1,
  },
}

interface OrbContextType {
  settings: OrbSettings
  updateSettings: (settings: OrbSettings) => void
}

const OrbContext = createContext<OrbContextType | undefined>(undefined)

export function OrbProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<OrbSettings>(defaultOrbSettings)

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem("orbSettings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(parsed)
      } catch (error) {
        console.error("Failed to parse saved orb settings:", error)
      }
    }
  }, [])

  const updateSettings = (newSettings: OrbSettings) => {
    setSettings(newSettings)
    localStorage.setItem("orbSettings", JSON.stringify(newSettings))
  }

  return <OrbContext.Provider value={{ settings, updateSettings }}>{children}</OrbContext.Provider>
}

export function useOrbSettings() {
  const context = useContext(OrbContext)

  // In development / preview a React fast-refresh may temporarily unmount
  // the provider.  Rather than throwing, fall back to default settings and
  // a no-op updater so the UI keeps working.
  if (!context) {
    return {
      settings: defaultOrbSettings,
      updateSettings: () => {
        /* no-op fallback */
      },
    } satisfies OrbContextType
  }

  return context
}
