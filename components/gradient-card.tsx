"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: ReactNode
  className?: string
  gradient?: "blue" | "purple" | "green" | "orange" | "red"
}

export function GradientCard({ children, className, gradient = "blue" }: GradientCardProps) {
  const gradients = {
    blue: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50 border-blue-200 dark:border-blue-800",
    purple:
      "bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/50 dark:to-violet-900/50 border-purple-200 dark:border-purple-800",
    green:
      "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-900/50 border-green-200 dark:border-green-800",
    orange:
      "bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/50 dark:to-amber-900/50 border-orange-200 dark:border-orange-800",
    red: "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950/50 dark:to-rose-900/50 border-red-200 dark:border-red-800",
  }

  return (
    <div
      className={cn(
        "rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
        gradients[gradient],
        className,
      )}
    >
      {children}
    </div>
  )
}
