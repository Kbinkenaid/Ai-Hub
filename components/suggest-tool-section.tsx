"use client"

import { useState } from "react"
import { Send, Star, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function SuggestToolSection() {
  const [formData, setFormData] = useState({
    toolName: '',
    toolUrl: '',
    description: '',
    category: '',
    yourName: '',
    yourEmail: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    'productivity',
    'design', 
    'development',
    'marketing',
    'writing',
    'research',
    'other'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      // Reset form
      setFormData({
        toolName: '',
        toolUrl: '',
        description: '',
        category: '',
        yourName: '',
        yourEmail: ''
      })
    }, 2000)
  }

  const isFormValid = formData.toolName && formData.toolUrl && formData.description && formData.category

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-muted-foreground mb-4">
              Your tool suggestion has been submitted successfully. We'll review it and add it to our database if it meets our criteria.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Submit Another Tool
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
            Suggest an AI Tool
          </h1>
          <p className="text-muted-foreground text-lg">
            Help us grow our directory by suggesting amazing AI tools you've discovered
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Submit a New AI Tool
            </CardTitle>
            <CardDescription>
              Found an awesome AI tool that's not in our directory? Let us know about it!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="toolName" className="text-sm font-medium">
                    Tool Name *
                  </label>
                  <Input
                    id="toolName"
                    value={formData.toolName}
                    onChange={(e) => handleInputChange('toolName', e.target.value)}
                    placeholder="e.g., ChatGPT, Midjourney"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="toolUrl" className="text-sm font-medium">
                    Tool URL *
                  </label>
                  <Input
                    id="toolUrl"
                    type="url"
                    value={formData.toolUrl}
                    onChange={(e) => handleInputChange('toolUrl', e.target.value)}
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Briefly describe what this tool does and what makes it special..."
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Your Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="yourName" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="yourName"
                      value={formData.yourName}
                      onChange={(e) => handleInputChange('yourName', e.target.value)}
                      placeholder="Your name (for attribution)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="yourEmail" className="text-sm font-medium">
                      Your Email
                    </label>
                    <Input
                      id="yourEmail"
                      type="email"
                      value={formData.yourEmail}
                      onChange={(e) => handleInputChange('yourEmail', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Tool Suggestion
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Quality Standards
              </h3>
              <p className="text-sm text-muted-foreground">
                We review all submissions to ensure they meet our quality standards and provide genuine value to our users.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-green-500" />
                Community Driven
              </h3>
              <p className="text-sm text-muted-foreground">
                Our directory grows thanks to contributions from the community. Thank you for helping us discover new tools!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}