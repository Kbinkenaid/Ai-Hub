"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Search, Info } from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            
            
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange("home")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>

            <Button
              variant={activeTab === "explore" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange("explore")}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Explore Tools
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            </Button>

            <Button
              variant={activeTab === "about" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange("about")}
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              About
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
