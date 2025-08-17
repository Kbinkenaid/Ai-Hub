"use client"

import { useState } from "react"
import { Settings } from "lucide-react"

export function AdminToggle() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="p-3 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-accent transition-colors shadow-lg"
      >
        <Settings className="h-5 w-5" />
      </button>
      
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-2 p-4 bg-background border rounded-lg shadow-lg min-w-[200px]">
          <h3 className="font-semibold mb-2">Admin Panel</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Tools management</p>
            <p>Content updates</p>
            <p>Analytics</p>
          </div>
        </div>
      )}
    </div>
  )
}