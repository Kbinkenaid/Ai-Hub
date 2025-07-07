"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminPanel } from "./admin-panel"
import { useOrbSettings } from "./orb-provider"

export function AdminToggle() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const { settings, updateSettings } = useOrbSettings()

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-4 right-4 z-40 h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border-2"
        title="Open Orb Admin Panel"
      >
        <Settings className="h-5 w-5" />
      </Button>

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onSettingsChange={updateSettings}
        currentSettings={settings}
      />
    </>
  )
}
