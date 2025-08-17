"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  scrollContainerRef?: React.RefObject<HTMLElement>
  containerClassName?: string
  baseOpacity?: number
  threshold?: number
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  containerClassName = "",
  baseOpacity = 0.1,
  threshold = 0.1,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(baseOpacity)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const updateOpacity = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0))
      const visibleHeight = Math.max(0, visibleTop)
      const elementHeight = rect.height
      
      // Calculate visibility ratio
      const visibilityRatio = visibleHeight / elementHeight
      
      // Apply threshold and calculate opacity
      if (visibilityRatio >= threshold) {
        const adjustedRatio = (visibilityRatio - threshold) / (1 - threshold)
        const newOpacity = baseOpacity + (1 - baseOpacity) * adjustedRatio
        setOpacity(Math.min(1, newOpacity))
      } else {
        setOpacity(baseOpacity)
      }
    }

    const scrollContainer = scrollContainerRef?.current || window
    
    updateOpacity() // Initial calculation
    
    const handleScroll = () => {
      requestAnimationFrame(updateOpacity)
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateOpacity)

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateOpacity)
    }
  }, [scrollContainerRef, baseOpacity, threshold])

  return (
    <div
      ref={elementRef}
      className={containerClassName}
      style={{ opacity, transition: "opacity 0.3s ease-out" }}
    >
      {children}
    </div>
  )
}