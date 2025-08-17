"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <nav className="bg-background/80 backdrop-blur-md border rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center space-x-8">
          <div className="font-bold text-lg">AI Hub</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-sm hover:text-primary transition-colors">
              Home
            </a>
            <a href="#explore" className="text-sm hover:text-primary transition-colors">
              Explore
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <div className="flex flex-col space-y-2">
              <a href="#home" className="text-sm hover:text-primary transition-colors py-2">
                Home
              </a>
              <a href="#explore" className="text-sm hover:text-primary transition-colors py-2">
                Explore
              </a>
              <a href="#about" className="text-sm hover:text-primary transition-colors py-2">
                About
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}