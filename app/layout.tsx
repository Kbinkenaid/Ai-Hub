import { cn } from "@/lib/utils"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { OrbProvider } from "@/components/orb-provider"
import { Suspense } from "react"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "AI Innovation Hub - Discover Next-Gen AI Solutions",
  description:
    "Your centralized platform for discovering cutting-edge AI-powered tools and innovations across all industries.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <OrbProvider>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </OrbProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
