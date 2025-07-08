"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"

// Import the tool data from explore-section
// We'll create a simplified version for now
const SAMPLE_TOOLS = [
  {
    id: 1,
    name: "ChatGPT",
    domain: "chat.openai.com",
    shortDescription: "AI assistant that understands and helps with anything",
    category: "General",
    tags: ["AI Chat", "Assistant", "General Purpose"],
    rating: 4.8,
    pricing: "Freemium",
    logo: "🤖",
  },
  {
    id: 2,
    name: "GitHub Copilot",
    domain: "github.com/features/copilot",
    shortDescription: "AI pair programmer that writes code with you",
    category: "Code Generation",
    tags: ["Code Generation", "IDE Integration", "Productivity"],
    rating: 4.8,
    pricing: "Paid",
    logo: "🤖",
  },
  {
    id: 3,
    name: "Midjourney",
    domain: "midjourney.com",
    shortDescription: "Create stunning AI art from text prompts",
    category: "Image Generation",
    tags: ["AI Art", "Text-to-Image", "Creative"],
    rating: 4.9,
    pricing: "Paid",
    logo: "🎨",
  },
]

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  recommendations?: typeof SAMPLE_TOOLS
}

interface ToolRecommendationProps {
  tools: typeof SAMPLE_TOOLS
}

function ToolRecommendation({ tools }: ToolRecommendationProps) {
  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm text-gray-400 mb-3">Here are some tools that might help:</p>
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">{tool.logo}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{tool.name}</h4>
                <p className="text-sm text-gray-400 mt-1">{tool.shortDescription}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                    {tool.category}
                  </span>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                    {tool.pricing}
                  </span>
                  <span className="text-xs text-yellow-400">★ {tool.rating}</span>
                </div>
              </div>
            </div>
            <a
              href={`https://${tool.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Visit
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AiAssistantSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hi! I'm your AI tool recommendation assistant. Tell me what you're trying to accomplish, and I'll suggest the best AI tools from our database to help you.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simple keyword-based recommendation system
  const getRecommendations = (userMessage: string): typeof SAMPLE_TOOLS => {
    const message = userMessage.toLowerCase()
    
    if (message.includes("code") || message.includes("programming") || message.includes("develop")) {
      return SAMPLE_TOOLS.filter(tool => tool.category === "Code Generation")
    }
    
    if (message.includes("image") || message.includes("art") || message.includes("design") || message.includes("visual")) {
      return SAMPLE_TOOLS.filter(tool => tool.category === "Image Generation")
    }
    
    if (message.includes("chat") || message.includes("help") || message.includes("question")) {
      return SAMPLE_TOOLS.filter(tool => tool.category === "General")
    }
    
    // Default recommendations
    return SAMPLE_TOOLS.slice(0, 2)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const recommendations = getRecommendations(inputValue)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Based on your request, I found some great tools that can help you. These tools are specifically designed for your use case and are highly rated by our community.`,
        timestamp: new Date(),
        recommendations,
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickPrompts = [
    "I need to create presentations",
    "Help me with coding tasks",
    "I want to generate images",
    "I need to automate workflows",
  ]

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt)
  }

  return (
    <section className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">AI Tool Assistant</h2>
          <p className="text-gray-400">
            Describe what you're trying to accomplish, and I'll recommend the perfect AI tools for you.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0">
                    {message.type === "assistant" ? (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-4 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.recommendations && (
                      <ToolRecommendation tools={message.recommendations} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="bg-gray-800 text-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Finding the best tools for you...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-3 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe what you're trying to accomplish..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
