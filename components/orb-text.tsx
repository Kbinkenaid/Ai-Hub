"use client"

import { useEffect, useState } from "react"
import "./orb-text.css"

interface OrbTextProps {
  text: string
  className?: string
}

export function OrbText({ text, className = "" }: OrbTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`orb-text ${className}`}>
      <div className="text-center">
        <h1
          className={`orb-title orb-title-large orb-title-glow transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-text={text}
        >
          {text.split(" ").map((word, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {word}
              {index < text.split(" ").length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>
    </div>
  )
}
