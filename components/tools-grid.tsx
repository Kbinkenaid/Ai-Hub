"use client"

import { useMemo, useState, useEffect } from "react"
import {
  Search,
  Zap,
  Clock,
  Users,
  Star,
  ExternalLink,
  Bookmark,
  Share2,
  Brain,
  Shield,
  GraduationCap,
  FileText,
  ImageIcon,
  Code,
  Sparkles,
  Globe,
  Play,
  Calendar,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import toolsData from "../data/tools.json"

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "productivity":
      return <Zap className="h-4 w-4" />
    case "design":
      return <ImageIcon className="h-4 w-4" />
    case "development":
      return <Code className="h-4 w-4" />
    case "marketing":
      return <Globe className="h-4 w-4" />
    case "writing":
      return <FileText className="h-4 w-4" />
    case "research":
      return <Brain className="h-4 w-4" />
    case "General":
      return <Brain className="h-4 w-4" />
    case "Cybersecurity":
      return <Shield className="h-4 w-4" />
    case "Academia":
      return <GraduationCap className="h-4 w-4" />
    case "Documentation":
      return <FileText className="h-4 w-4" />
    case "Image/Video Generation":
      return <ImageIcon className="h-4 w-4" />
    case "Web Development":
      return <Code className="h-4 w-4" />
    case "Other":
      return <Sparkles className="h-4 w-4" />
    default:
      return <Globe className="h-4 w-4" />
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "Intermediate":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "Advanced":
    case "Expert":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

const getPricingColor = (pricing: string) => {
  switch (pricing.toLowerCase()) {
    case "free":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "freemium":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "paid":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "enterprise":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "research":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    case "unknown":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    case "Free":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "Freemium":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "Paid":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "Enterprise":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "Research":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Cards                                    */
/* -------------------------------------------------------------------------- */

interface ToolCardProps {
  tool: any
  onVisit: (domain: string) => void
}

function ToolCard({ tool, onVisit }: ToolCardProps) {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/30 bg-background/50 backdrop-blur-sm relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{tool.logo}</div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                {tool.name}
                {tool.trending && (
                  <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs">🔥 HOT</Badge>
                )}
              </CardTitle>
              <CardDescription className="text-sm font-medium text-primary/70">{tool.shortDescription}</CardDescription>
            </div>
          </div>

          {tool.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
              <Star className="h-3 w-3 mr-1" />
              FEATURED
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick stats row */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{tool.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{tool.users}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{tool.timeToValue}</span>
          </div>
        </div>

        {/* Main description */}
        <p className="text-sm leading-relaxed text-muted-foreground">{tool.description}</p>

        {/* Use case highlight */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-primary/20">
          <div className="flex items-start gap-2">
            <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-primary mb-1">💡 Perfect For:</div>
              <div className="text-sm">{tool.useCase}</div>
            </div>
          </div>
        </div>

        {/* Practical example */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/20">
          <div className="flex items-start gap-2">
            <Play className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-green-400 mb-1">⚡ How it works:</div>
              <div className="text-sm">{tool.practicalExample}</div>
            </div>
          </div>
        </div>

        {/* Tags and badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-medium">
            {tool.category && getCategoryIcon(tool.category)}
            <span className="ml-1">{tool.category}</span>
          </Badge>
          <Badge className={`text-xs border ${getPricingColor(tool.pricing)}`}>{tool.pricing}</Badge>
          <Badge className={`text-xs border ${getDifficultyColor(tool.difficulty)}`}>{tool.difficulty}</Badge>
        </div>

        {/* Quick tip */}
        <div className="bg-yellow-500/10 rounded-lg p-2 border border-yellow-500/20">
          <div className="flex items-center gap-2">
            <div className="text-yellow-400">💡</div>
            <div className="text-xs text-yellow-400 font-medium">Pro Tip:</div>
            <div className="text-xs">{tool.quickTip}</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <Bookmark className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>
          <Button
            size="sm"
            className="rounded-full group-hover:scale-105 transition-transform bg-gradient-to-r from-primary to-primary/80"
            onClick={() => onVisit(tool.domain)}
          >
            Try Now
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                               ToolsGrid List                               */
/* -------------------------------------------------------------------------- */

interface Tool {
  id: string
  name: string
  description: string
  url: string
  category: string
  tags: string[]
  featured: boolean
  addedDate: string
  logo: string
  pricing: string
}

interface ToolsGridProps {
  selectedCategory?: string
  searchQuery?: string
}

export function ToolsGrid({ selectedCategory = "all", searchQuery = "" }: ToolsGridProps) {
  const [tools, setTools] = useState<Tool[]>([])
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])

  useEffect(() => {
    if (toolsData && toolsData.tools) {
      setTools(toolsData.tools)
    }
  }, [])

  useEffect(() => {
    let filtered = tools

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sort by featured first, then by date added (newest first)
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    })

    setFilteredTools(filtered)
  }, [tools, selectedCategory, searchQuery])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredAndSortedTools = filteredTools

  if (filteredAndSortedTools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-4">
          {searchQuery 
            ? `No tools found matching "${searchQuery}"`
            : selectedCategory !== "all" 
              ? `No tools found in "${selectedCategory}" category`
              : "No tools available"
          }
        </div>
        <p className="text-sm text-muted-foreground">
          Check back soon for new AI tools discoveries!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedTools.length} tool{filteredAndSortedTools.length !== 1 ? 's' : ''}
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {toolsData.lastUpdated ? formatDate(toolsData.lastUpdated) : 'Recently'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTools.map((tool) => (
          <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {tool.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.name}
                      {tool.featured && (
                        <Star className="inline ml-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </CardTitle>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={getPricingColor(tool.pricing)}
                >
                  {tool.pricing}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed line-clamp-3">
                {tool.description}
              </CardDescription>

              <div className="flex flex-wrap gap-1">
                {tool.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {tool.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{tool.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(tool.addedDate)}
                </div>
                
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => window.open(tool.url, '_blank', 'noopener,noreferrer')}
                >
                  Visit Tool
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedTools.length >= 12 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg">
            Load More Tools
          </Button>
        </div>
      )}
    </div>
  )
}
