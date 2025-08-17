"use client"

import { createContext, useContext } from "react"

interface OrbContextType {
  // Add any orb-related state you need here
}

const OrbContext = createContext<OrbContextType | undefined>(undefined)

export function OrbProvider({ children }: { children: React.ReactNode }) {
  const value: OrbContextType = {
    // Initialize orb context values here
  }

  return <OrbContext.Provider value={value}>{children}</OrbContext.Provider>
}

export function useOrb() {
  const context = useContext(OrbContext)
  if (context === undefined) {
    throw new Error("useOrb must be used within an OrbProvider")
  }
  return context
}