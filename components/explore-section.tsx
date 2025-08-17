"use client"

import { useState, useEffect } from "react"
import { Search, Filter, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ToolsGrid } from "@/components/tools-grid"
import toolsData from "../data/tools.json"

export function ExploreSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  
  // Extract unique categories from tools data
  const categories = ["all", ...Array.from(new Set(toolsData.tools.map(tool => tool.category)))]
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const getCategoryCount = (category: string) => {
    if (category === "all") return toolsData.tools.length
    return toolsData.tools.filter(tool => tool.category === category).length
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Explore AI Tools
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover the latest and greatest AI-powered tools across all categories
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:scale-105 transition-transform px-3 py-1"
                onClick={() => handleCategoryChange(category)}
              >
                {category === "all" ? "All Tools" : category.charAt(0).toUpperCase() + category.slice(1)}
                <span className="ml-2 text-xs opacity-70">
                  ({getCategoryCount(category)})
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <ToolsGrid 
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {toolsData.tools.length}
              </div>
              <div className="text-sm text-muted-foreground">
                AI Tools Discovered
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-sm text-muted-foreground">
                Categories Covered
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {toolsData.tools.filter(tool => tool.featured).length}
              </div>
              <div className="text-sm text-muted-foreground">
                Featured Tools
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}