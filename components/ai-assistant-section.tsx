"use client"

import { useState, useEffect } from "react"
import { Send, Bot, User, Lightbulb, Zap, Code, Palette, Globe, Brain, FileText, Shield, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import toolsData from "../data/tools.json"

const categoryKeywords = {
  productivity: ["productivity", "task", "organize", "manage", "workflow", "schedule", "time", "efficiency", "automation"],
  design: ["design", "image", "visual", "creative", "art", "graphic", "logo", "ui", "ux", "photo", "video"],
  development: ["code", "programming", "developer", "software", "app", "api", "database", "backend", "frontend", "deploy"],
  marketing: ["marketing", "advertising", "campaign", "social", "email", "analytics", "seo", "content", "promotion"],
  writing: ["writing", "content", "blog", "article", "copywriting", "documentation", "text", "editing", "grammar"],
  research: ["research", "data", "analysis", "insights", "study", "academic", "science", "information", "knowledge"],
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "productivity": return <Zap className="h-4 w-4" />
    case "design": return <Palette className="h-4 w-4" />
    case "development": return <Code className="h-4 w-4" />
    case "marketing": return <Globe className="h-4 w-4" />
    case "writing": return <FileText className="h-4 w-4" />
    case "research": return <Brain className="h-4 w-4" />
    default: return <Lightbulb className="h-4 w-4" />
  }
}

function detectCategories(userInput: string): string[] {
  const lowercaseInput = userInput.toLowerCase()
  const detectedCategories: string[] = []
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    const hasKeyword = keywords.some(keyword => lowercaseInput.includes(keyword))
    if (hasKeyword) {
      detectedCategories.push(category)
    }
  }
  
  return detectedCategories.length > 0 ? detectedCategories : ["productivity"] // Default fallback
}

function getSuggestedTools(userInput: string, maxSuggestions = 3) {
  if (!userInput.trim()) {
    return []
  }
  
  const detectedCategories = detectCategories(userInput)
  const lowercaseInput = userInput.toLowerCase()
  
  // Filter tools by categories and relevance
  const relevantTools = toolsData.tools.filter(tool => {
    // Check if tool category matches detected categories
    const categoryMatch = detectedCategories.includes(tool.category)
    
    // Check if tool description/name contains relevant keywords
    const descriptionMatch = tool.description.toLowerCase().includes(lowercaseInput) ||
                           tool.name.toLowerCase().includes(lowercaseInput) ||
                           tool.tags.some(tag => lowercaseInput.includes(tag.toLowerCase()))
    
    return categoryMatch || descriptionMatch
  })
  
  // Sort by relevance (prioritize tools with direct keyword matches)
  const sortedTools = relevantTools.sort((a, b) => {
    const aDirectMatch = a.name.toLowerCase().includes(lowercaseInput) || 
                        a.description.toLowerCase().includes(lowercaseInput)
    const bDirectMatch = b.name.toLowerCase().includes(lowercaseInput) || 
                        b.description.toLowerCase().includes(lowercaseInput)
    
    if (aDirectMatch && !bDirectMatch) return -1
    if (!aDirectMatch && bDirectMatch) return 1
    
    // Prioritize featured tools
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    
    return 0
  })
  
  return sortedTools.slice(0, maxSuggestions)
}

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: any[]
}

export function AiAssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I\'m your AI assistant. Tell me what you\'re trying to accomplish, and I\'ll suggest the best AI tools for your specific use case.',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(() => {
      const suggestions = getSuggestedTools(inputValue)
      
      let responseContent = `Based on your request "${inputValue}", here are some AI tools that could help:`
      
      if (suggestions.length === 0) {
        responseContent = `I couldn't find specific tools for "${inputValue}". Here are some popular general-purpose AI tools that might be helpful:`
        // Fallback to featured tools
        const fallbackSuggestions = toolsData.tools.filter(tool => tool.featured).slice(0, 3)
        suggestions.push(...fallbackSuggestions)
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        suggestions: suggestions
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)

    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            AI Tool Assistant
          </h1>
          <p className="text-muted-foreground text-lg">
            Get personalized AI tool recommendations based on your specific needs
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Chat with AI Assistant
            </CardTitle>
            <CardDescription>
              Describe what you want to accomplish, and I'll suggest the perfect AI tools for your use case.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-purple-500 text-white'
                      }`}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="ml-11 space-y-3">
                      {message.suggestions.map((tool) => (
                        <Card key={tool.id} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-primary/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                                  <Badge variant="secondary" className="text-xs">
                                    {getCategoryIcon(tool.category)}
                                    <span className="ml-1">{tool.category}</span>
                                  </Badge>
                                  <Badge className={`text-xs ${
                                    tool.pricing === 'free' ? 'bg-green-500/20 text-green-400' :
                                    tool.pricing === 'freemium' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-orange-500/20 text-orange-400'
                                  }`}>
                                    {tool.pricing}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {tool.tags.slice(0, 3).map((tag: string) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => window.open(tool.url, '_blank')}
                                className="ml-4"
                              >
                                Try Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., I need to create marketing visuals for my startup..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isLoading}
                className="px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">Quick Example</h3>
              <p className="text-sm text-muted-foreground">
                "I need to automate my social media posting"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 text-center">
              <Palette className="h-8 w-8 mx-auto mb-3 text-purple-500" />
              <h3 className="font-semibold mb-2">Design Help</h3>
              <p className="text-sm text-muted-foreground">
                "I want to create a logo for my business"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold mb-2">Code Assistance</h3>
              <p className="text-sm text-muted-foreground">
                "Help me write Python code for data analysis"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}