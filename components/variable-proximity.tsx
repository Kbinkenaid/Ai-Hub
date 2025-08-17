"use client"

import { useEffect, useRef, useState } from "react"

interface VariableProximityProps {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef?: React.RefObject<HTMLElement>
  radius?: number
  falloff?: "linear" | "exponential"
  className?: string
}

export default function VariableProximity({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 100,
  falloff = "linear",
  className = "",
}: VariableProximityProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [fontVariationSettings, setFontVariationSettings] = useState(fromFontVariationSettings)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const updateFontVariation = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )

      let intensity = 0
      if (distance <= radius) {
        if (falloff === "exponential") {
          intensity = Math.pow(1 - distance / radius, 2)
        } else {
          intensity = 1 - distance / radius
        }
      }

      // Interpolate between font variation settings
      const fromSettings = parseFontVariationSettings(fromFontVariationSettings)
      const toSettings = parseFontVariationSettings(toFontVariationSettings)
      
      const interpolatedSettings = interpolateFontSettings(fromSettings, toSettings, intensity)
      setFontVariationSettings(formatFontVariationSettings(interpolatedSettings))
    }

    document.addEventListener("mousemove", updateFontVariation)

    return () => {
      document.removeEventListener("mousemove", updateFontVariation)
    }
  }, [fromFontVariationSettings, toFontVariationSettings, radius, falloff])

  const parseFontVariationSettings = (settings: string) => {
    const parsed: Record<string, number> = {}
    const matches = settings.match(/'(\w+)'\s+(\d+)/g)
    
    matches?.forEach(match => {
      const [, key, value] = match.match(/'(\w+)'\s+(\d+)/) || []
      if (key && value) {
        parsed[key] = parseInt(value)
      }
    })
    
    return parsed
  }

  const interpolateFontSettings = (
    from: Record<string, number>,
    to: Record<string, number>,
    intensity: number
  ) => {
    const result: Record<string, number> = {}
    
    for (const key in from) {
      const fromValue = from[key]
      const toValue = to[key] || fromValue
      result[key] = Math.round(fromValue + (toValue - fromValue) * intensity)
    }
    
    for (const key in to) {
      if (!(key in result)) {
        result[key] = to[key]
      }
    }
    
    return result
  }

  const formatFontVariationSettings = (settings: Record<string, number>) => {
    return Object.entries(settings)
      .map(([key, value]) => `'${key}' ${value}`)
      .join(", ")
  }

  return (
    <span
      ref={elementRef}
      className={className}
      style={{ fontVariationSettings }}
    >
      {label}
    </span>
  )
}