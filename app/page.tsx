"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Calendar, TrendingUp, Target, Users2, Globe, Brain, Shield } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { GradientCard } from "@/components/gradient-card"
import { FloatingNavbar } from "@/components/floating-navbar"
import Orb from "@/components/orb"
import ScrollReveal from "@/components/scroll-reveal"
import VariableProximity from "@/components/variable-proximity"
import { AdminToggle } from "@/components/admin-toggle"
// Remove this import
// import { Navigation } from "@/components/navigation"

// Add this import
import { DockNavigation } from "@/components/dock-navigation"
import { ExploreSection } from "@/components/explore-section"
import { SuggestToolSection } from "@/components/suggest-tool-section"
import { AiAssistantSection } from "@/components/ai-assistant-section"
import { PageLoading } from "@/components/page-loading"

export default function AIInnovationHub() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["home", "explore", "suggest-tool", "ai-assistant"].includes(tab)) {
      setActiveTab(tab)
    }
    setIsLoading(false)
  }, [searchParams])

  const handleTabChange = (tab: string) => {
    console.log("Changing tab to:", tab)
    setActiveTab(tab)

    // Update URL without page reload
    const newUrl = tab === "home" ? "/" : `/?tab=${tab}`
    router.push(newUrl, { scroll: false })
  }

  const renderContent = () => {
    console.log("Current active tab:", activeTab) // Debug log

    switch (activeTab) {
      case "home":
        return (
          <div ref={scrollContainerRef} className="min-h-screen bg-background text-foreground">
            <FloatingNavbar />

            {/* Hero Section with Large Central Orb */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/30 to-cyan-950/30" />

              {/* Large Central Orb with Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]">
                  <Orb hue={240} hoverIntensity={0.4} forceHoverState={true} rotateOnHover={true} />
                  {/* Text overlay inside the orb */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <h2 className="text-4xl lg:text-6xl font-bold text-white/90 drop-shadow-2xl">
                        AI Innovation
                        <br />
                        Hub
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex justify-end mb-8 absolute top-8 right-8">
                  <ThemeToggle />
                </div>

                <div className="max-w-4xl mx-auto"></div>
              </div>
            </section>

            {/* About Section with ScrollReveal and VariableProximity */}
            <section className="py-32 px-4">
              <div className="container mx-auto max-w-6xl">
                <div className="space-y-24">
                  {/* What is AI Innovation Hub */}
                  <div className="text-center">
                    <div className="mb-8">
                      <VariableProximity
                        label="What is AI Innovation Hub?"
                        fromFontVariationSettings="'wght' 400, 'slnt' 0"
                        toFontVariationSettings="'wght' 800, 'slnt' -10"
                        containerRef={scrollContainerRef}
                        radius={100}
                        falloff="exponential"
                        className="text-4xl lg:text-6xl font-bold gradient-text text-glow"
                      />
                    </div>

                    <div className="max-w-4xl mx-auto">
                      <ScrollReveal
                        scrollContainerRef={scrollContainerRef}
                        containerClassName="scroll-reveal-medium text-muted-foreground mb-12"
                        baseOpacity={0.2}
                      >
                        A platform that automatically discovers, categorizes, and showcases the most innovative
                        AI-powered tools and solutions from across the web.
                      </ScrollReveal>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                        <GradientCard gradient="blue" className="p-8 text-center">
                          <div className="p-4 rounded-full bg-blue-500/20 w-fit mx-auto mb-6">
                            <Globe className="h-8 w-8 text-blue-400" />
                          </div>
                          <VariableProximity
                            label="Automated Discovery"
                            fromFontVariationSettings="'wght' 600, 'slnt' 0"
                            toFontVariationSettings="'wght' 800, 'slnt' -5"
                            containerRef={scrollContainerRef}
                            radius={80}
                            className="text-xl font-bold mb-4 block"
                          />
                          <p className="text-muted-foreground">
                            Our intelligent web crawlers scan .ai and .io domains weekly to find the latest AI
                            innovations across all industries
                          </p>
                        </GradientCard>

                        <GradientCard gradient="purple" className="p-8 text-center">
                          <div className="p-4 rounded-full bg-purple-500/20 w-fit mx-auto mb-6">
                            <Brain className="h-8 w-8 text-purple-400" />
                          </div>
                          <VariableProximity
                            label="Smart Categorization"
                            fromFontVariationSettings="'wght' 600, 'slnt' 0"
                            toFontVariationSettings="'wght' 800, 'slnt' -5"
                            containerRef={scrollContainerRef}
                            radius={80}
                            className="text-xl font-bold mb-4 block"
                          />
                          <p className="text-muted-foreground">
                            AI-powered classification system organizes tools by use case, from productivity to
                            specialized applications
                          </p>
                        </GradientCard>

                        <GradientCard gradient="green" className="p-8 text-center">
                          <div className="p-4 rounded-full bg-green-500/20 w-fit mx-auto mb-6">
                            <Shield className="h-8 w-8 text-green-400" />
                          </div>
                          <VariableProximity
                            label="Quality Filtering"
                            fromFontVariationSettings="'wght' 600, 'slnt' 0"
                            toFontVariationSettings="'wght' 800, 'slnt' -5"
                            containerRef={scrollContainerRef}
                            radius={80}
                            className="text-xl font-bold mb-4 block"
                          />
                          <p className="text-muted-foreground">
                            Advanced algorithms filter for high-quality, innovative solutions relevant to professionals
                            and enthusiasts
                          </p>
                        </GradientCard>
                      </div>
                    </div>
                  </div>

                  {/* Our Mission */}
                  <div className="text-center">
                    <div className="mb-8">
                      <VariableProximity
                        label="Our Mission & Vision"
                        fromFontVariationSettings="'wght' 400, 'slnt' 0"
                        toFontVariationSettings="'wght' 800, 'slnt' -10"
                        containerRef={scrollContainerRef}
                        radius={100}
                        falloff="exponential"
                        className="text-4xl lg:text-6xl font-bold gradient-text text-glow"
                      />
                    </div>

                    <div className="max-w-4xl mx-auto">
                      <ScrollReveal
                        scrollContainerRef={scrollContainerRef}
                        containerClassName="scroll-reveal-medium text-muted-foreground mb-12"
                        baseOpacity={0.2}
                      >
                        To democratize access to cutting-edge AI technology by creating a comprehensive, up-to-date
                        directory of AI-powered solutions across all industries.
                      </ScrollReveal>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                        <div className="text-left">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-full bg-orange-500/20">
                              <Target className="h-6 w-6 text-orange-400" />
                            </div>
                            <VariableProximity
                              label="What We Aim To Do"
                              fromFontVariationSettings="'wght' 600, 'slnt' 0"
                              toFontVariationSettings="'wght' 800, 'slnt' -5"
                              containerRef={scrollContainerRef}
                              radius={80}
                              className="text-2xl font-bold"
                            />
                          </div>
                          <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                              <span>
                                Bridge the gap between innovative AI startups and enterprise teams across industries
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                              <span>
                                Accelerate the adoption of AI-driven solutions in business and personal workflows
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                              <span>
                                Provide real-time insights into the evolving landscape of AI tools and platforms
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                              <span>
                                Foster innovation by highlighting emerging technologies and breakthrough solutions
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="text-left">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-full bg-cyan-500/20">
                              <Users2 className="h-6 w-6 text-cyan-400" />
                            </div>
                            <VariableProximity
                              label="Who We Help"
                              fromFontVariationSettings="'wght' 600, 'slnt' 0"
                              toFontVariationSettings="'wght' 800, 'slnt' -5"
                              containerRef={scrollContainerRef}
                              radius={80}
                              className="text-2xl font-bold"
                            />
                          </div>
                          <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                              <span>
                                <strong>Business Leaders:</strong> Executives and managers seeking AI solutions to
                                optimize operations
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                              <span>
                                <strong>Developers & Engineers:</strong> Technical professionals building AI-powered
                                applications
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                              <span>
                                <strong>Researchers & Academics:</strong> Scientists and educators tracking AI industry
                                innovations
                              </span>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                              <span>
                                <strong>Entrepreneurs & Investors:</strong> Innovators and VCs monitoring the AI market
                                landscape
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
      case "explore":
        return (
          <div className="pt-20">
            <ExploreSection />
          </div>
        )
      case "suggest-tool":
        return (
          <div className="pt-20">
            <SuggestToolSection />
          </div>
        )
      case "ai-assistant":
        return (
          <div className="pt-20">
            <AiAssistantSection />
          </div>
        )
      default:
        return (
          <div className="pt-20">
            <div className="min-h-screen flex items-center justify-center">
              <p>Page not found</p>
            </div>
          </div>
        )
    }
  }

  if (isLoading) {
    return <PageLoading />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Replace the Navigation component with DockNavigation */}
      <DockNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {renderContent()}

      {/* Enhanced Footer - Symbol Removed */}
      <footer className="border-t bg-background/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl font-bold">AI Hub</span>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discovering and showcasing the future of AI-powered solutions. Stay ahead of the curve with cutting-edge
            technology and innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Next update: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </div>
          </div>
        </div>
      </footer>

      <AdminToggle />
    </div>
  )
}
