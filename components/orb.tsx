"use client"

import { useEffect, useRef } from "react"

interface OrbProps {
  hue?: number
  hoverIntensity?: number
  forceHoverState?: boolean
  rotateOnHover?: boolean
  className?: string
}

export default function Orb({
  hue = 240,
  hoverIntensity = 0.3,
  forceHoverState = false,
  rotateOnHover = false,
  className = "",
}: OrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const orb = orbRef.current
    if (!orb) return

    const handleMouseMove = (e: MouseEvent) => {
      if (forceHoverState) return

      const rect = orb.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )
      const maxDistance = Math.max(rect.width, rect.height)
      const intensity = Math.max(0, 1 - distance / maxDistance) * hoverIntensity

      orb.style.setProperty("--hover-intensity", intensity.toString())

      if (rotateOnHover && intensity > 0) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
        orb.style.transform = `rotate(${angle}deg) scale(${1 + intensity * 0.1})`
      }
    }

    const handleMouseLeave = () => {
      if (forceHoverState) return
      orb.style.setProperty("--hover-intensity", "0")
      if (rotateOnHover) {
        orb.style.transform = "rotate(0deg) scale(1)"
      }
    }

    if (forceHoverState) {
      orb.style.setProperty("--hover-intensity", hoverIntensity.toString())
    }

    document.addEventListener("mousemove", handleMouseMove)
    orb.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      orb.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hue, hoverIntensity, forceHoverState, rotateOnHover])

  return (
    <div
      ref={orbRef}
      className={`relative w-full h-full rounded-full transition-all duration-300 ${className}`}
      style={{
        background: `radial-gradient(circle at center, 
          hsl(${hue}, 70%, calc(60% + var(--hover-intensity, 0) * 20%)), 
          hsl(${hue}, 60%, calc(40% + var(--hover-intensity, 0) * 15%)), 
          hsl(${hue}, 50%, calc(20% + var(--hover-intensity, 0) * 10%)), 
          transparent)`,
        boxShadow: `0 0 calc(100px + var(--hover-intensity, 0) * 50px) hsl(${hue}, 70%, calc(50% + var(--hover-intensity, 0) * 20%))`,
        "--hover-intensity": "0",
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent" />
    </div>
  )
}