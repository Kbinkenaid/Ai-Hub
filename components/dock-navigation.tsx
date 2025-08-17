"use client"

import { Home, Search, Plus, Bot } from "lucide-react"

interface DockNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DockNavigation({ activeTab, onTabChange }: DockNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Search, label: "Explore" },
    { id: "suggest-tool", icon: Plus, label: "Suggest Tool" },
    { id: "ai-assistant", icon: Bot, label: "AI Assistant" },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-background/80 backdrop-blur-md border rounded-full px-2 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground scale-110"
                    : "hover:bg-accent hover:scale-105"
                }`}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}