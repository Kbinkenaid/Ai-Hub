"use client"

import type React from "react"
import { Target, Users2, Globe, Brain, Shield, Search, TrendingUp } from "lucide-react"
import { GradientCard } from "@/components/gradient-card"
import ScrollReveal from "@/components/scroll-reveal"
import Orb from "@/components/orb"
import { OrbText } from "@/components/orb-text"

interface HomeSectionProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>
}

export function HomeSection({ scrollContainerRef }: HomeSectionProps) {
  return (
    <>
      {/* Hero Section with Large Central Orb */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/30 to-cyan-950/30" />

        {/* Large Central Orb with Enhanced Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]">
            <Orb hue={240} hoverIntensity={0.4} forceHoverState={true} rotateOnHover={true} />
            <OrbText text="AI Innovation Hub" />
          </div>
        </div>
      </section>

      {/* About Section with ScrollReveal */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-24">
            {/* What is AI Innovation Hub */}
            <div className="text-center">
              <ScrollReveal
                scrollContainerRef={scrollContainerRef}
                containerClassName="scroll-reveal-large gradient-text text-glow mb-8"
              >
                What is AI Innovation Hub?
              </ScrollReveal>

              <div className="max-w-4xl mx-auto">
                <ScrollReveal
                  scrollContainerRef={scrollContainerRef}
                  containerClassName="scroll-reveal-medium text-muted-foreground mb-12"
                  baseOpacity={0.2}
                >
                  A revolutionary platform that automatically discovers, categorizes, and showcases the most innovative
                  AI-powered tools and solutions from across the web.
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <GradientCard gradient="blue" className="p-8 text-center">
                    <div className="p-4 rounded-full bg-blue-500/20 w-fit mx-auto mb-6">
                      <Globe className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Automated Discovery</h3>
                    <p className="text-muted-foreground">
                      Our intelligent web crawlers scan .ai and .io domains weekly to find the latest AI innovations
                      across all industries
                    </p>
                  </GradientCard>

                  <GradientCard gradient="purple" className="p-8 text-center">
                    <div className="p-4 rounded-full bg-purple-500/20 w-fit mx-auto mb-6">
                      <Brain className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Smart Categorization</h3>
                    <p className="text-muted-foreground">
                      AI-powered classification system organizes tools by use case, from productivity to specialized
                      applications
                    </p>
                  </GradientCard>

                  <GradientCard gradient="green" className="p-8 text-center">
                    <div className="p-4 rounded-full bg-green-500/20 w-fit mx-auto mb-6">
                      <Shield className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Quality Filtering</h3>
                    <p className="text-muted-foreground">
                      Advanced algorithms filter for high-quality, innovative solutions relevant to professionals and
                      enthusiasts
                    </p>
                  </GradientCard>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="text-center">
              <ScrollReveal
                scrollContainerRef={scrollContainerRef}
                containerClassName="scroll-reveal-large gradient-text text-glow mb-8"
              >
                Our Mission & Vision
              </ScrollReveal>

              <div className="max-w-4xl mx-auto">
                <ScrollReveal
                  scrollContainerRef={scrollContainerRef}
                  containerClassName="scroll-reveal-medium text-muted-foreground mb-12"
                  baseOpacity={0.2}
                >
                  To democratize access to cutting-edge AI technology by creating the world's most comprehensive,
                  up-to-date directory of AI-powered solutions across all industries.
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                  <div className="text-left">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-orange-500/20">
                        <Target className="h-6 w-6 text-orange-400" />
                      </div>
                      <h3 className="text-2xl font-bold">What We Aim To Do</h3>
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
                        <span>Accelerate the adoption of AI-driven solutions in business and personal workflows</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                        <span>Provide real-time insights into the evolving landscape of AI tools and platforms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <span>Foster innovation by highlighting emerging technologies and breakthrough solutions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-full bg-cyan-500/20">
                        <Users2 className="h-6 w-6 text-cyan-400" />
                      </div>
                      <h3 className="text-2xl font-bold">Who We Help</h3>
                    </div>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span>
                          <strong>Business Leaders:</strong> Executives and managers seeking AI solutions to optimize
                          operations
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

            {/* How It Works */}
            <div className="text-center">
              <ScrollReveal
                scrollContainerRef={scrollContainerRef}
                containerClassName="scroll-reveal-large gradient-text text-glow mb-8"
              >
                How It Works
              </ScrollReveal>

              <div className="max-w-5xl mx-auto">
                <ScrollReveal
                  scrollContainerRef={scrollContainerRef}
                  containerClassName="scroll-reveal-medium text-muted-foreground mb-16"
                  baseOpacity={0.2}
                >
                  Our automated system works around the clock to keep you informed about the latest AI innovations
                  across all industries.
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    {
                      step: "01",
                      title: "Web Scanning",
                      description: "Automated crawlers search .ai and .io domains for innovative AI-related content",
                      icon: <Search className="h-6 w-6" />,
                      color: "blue",
                    },
                    {
                      step: "02",
                      title: "AI Analysis",
                      description:
                        "Machine learning algorithms analyze and categorize discovered tools by functionality",
                      icon: <Brain className="h-6 w-6" />,
                      color: "purple",
                    },
                    {
                      step: "03",
                      title: "Quality Filter",
                      description: "Advanced filtering ensures only high-quality, innovative solutions make the cut",
                      icon: <Shield className="h-6 w-6" />,
                      color: "green",
                    },
                    {
                      step: "04",
                      title: "Weekly Updates",
                      description: "Fresh discoveries are added weekly, keeping the platform current and comprehensive",
                      icon: <TrendingUp className="h-6 w-6" />,
                      color: "orange",
                    },
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${item.color}-500/20 mb-6`}
                        >
                          <div className={`text-${item.color}-400`}>{item.icon}</div>
                        </div>
                        <div className={`text-4xl font-bold text-${item.color}-400 mb-2`}>{item.step}</div>
                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-muted-foreground/20 to-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
