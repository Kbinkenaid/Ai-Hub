"use client"

import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: React.ReactNode
  gradient?: "blue" | "purple" | "green" | "orange" | "pink"
  className?: string
}

export function GradientCard({ children, gradient = "blue", className }: GradientCardProps) {
  const gradientClasses = {
    blue: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    purple: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20",
    green: "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20",
    orange: "bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20",
    pink: "bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20",
  }

  return (
    <div
      className={cn(
        "rounded-xl border backdrop-blur-sm",
        gradientClasses[gradient],
        className
      )}
    >
      {children}
    </div>
  )
}