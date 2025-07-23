"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"

// Comprehensive AI Tools Database
const ALL_TOOLS = [
  // General AI Tools
  {
    id: 1,
    name: "ChatGPT",
    domain: "chat.openai.com",
    shortDescription: "AI assistant that understands and helps with anything",
    category: "General",
    tags: ["AI Chat", "Assistant", "General Purpose", "Conversational"],
    rating: 4.8,
    pricing: "Freemium",
    logo: "🤖",
  },
  {
    id: 2,
    name: "Claude",
    domain: "claude.ai",
    shortDescription: "Anthropic's AI assistant for complex reasoning",
    category: "General",
    tags: ["AI Assistant", "Analysis", "Reasoning", "Safety"],
    rating: 4.7,
    pricing: "Freemium",
    logo: "🧠",
  },
  {
    id: 3,
    name: "Perplexity AI",
    domain: "perplexity.ai",
    shortDescription: "AI-powered search engine with real-time answers",
    category: "Search & Research",
    tags: ["AI Search", "Research", "Real-time", "Sources"],
    rating: 4.8,
    pricing: "Freemium",
    logo: "🔍",
  },
  {
    id: 4,
    name: "Gemini",
    domain: "gemini.google.com",
    shortDescription: "Google's multimodal AI assistant",
    category: "General",
    tags: ["Multimodal", "Google", "Image Analysis", "Integration"],
    rating: 4.6,
    pricing: "Freemium",
    logo: "💎",
  },
  
  // Coding Tools
  {
    id: 5,
    name: "GitHub Copilot",
    domain: "github.com/features/copilot",
    shortDescription: "AI pair programmer that writes code with you",
    category: "Code Generation",
    tags: ["Code Generation", "IDE Integration", "Productivity", "AI Assistant"],
    rating: 4.8,
    pricing: "Paid",
    logo: "🤖",
  },
  {
    id: 6,
    name: "Cursor",
    domain: "cursor.sh",
    shortDescription: "AI-first code editor built for productivity",
    category: "Code Editor",
    tags: ["Code Editor", "AI Coding", "Productivity", "Development"],
    rating: 4.7,
    pricing: "Freemium",
    logo: "⚡",
  },
  {
    id: 7,
    name: "Codeium",
    domain: "codeium.com",
    shortDescription: "Free AI code completion and chat assistant",
    category: "Code Completion",
    tags: ["Free", "Code Completion", "Chat Assistant", "Multi-language"],
    rating: 4.4,
    pricing: "Free",
    logo: "💫",
  },
  {
    id: 8,
    name: "Replit AI",
    domain: "replit.com",
    shortDescription: "AI-powered online coding environment",
    category: "Development Environment",
    tags: ["Online IDE", "Collaboration", "Deployment", "AI Coding"],
    rating: 4.6,
    pricing: "Freemium",
    logo: "🔧",
  },
  
  // Image & Video Tools
  {
    id: 9,
    name: "Midjourney",
    domain: "midjourney.com",
    shortDescription: "Create stunning AI art from text prompts",
    category: "Image Generation",
    tags: ["AI Art", "Text-to-Image", "Creative", "Design"],
    rating: 4.9,
    pricing: "Paid",
    logo: "🎨",
  },
  {
    id: 10,
    name: "DALL-E 3",
    domain: "openai.com/dall-e-3",
    shortDescription: "OpenAI's advanced image generation model",
    category: "Image Generation",
    tags: ["Image Generation", "OpenAI", "Detailed", "Accurate"],
    rating: 4.8,
    pricing: "Paid",
    logo: "🖼️",
  },
  {
    id: 11,
    name: "Runway ML",
    domain: "runwayml.com",
    shortDescription: "AI video editor that creates Hollywood-level effects",
    category: "Video Creation",
    tags: ["Video Generation", "AI Effects", "Creative", "Text-to-Video"],
    rating: 4.7,
    pricing: "Freemium",
    logo: "🎬",
  },
  {
    id: 12,
    name: "Leonardo AI",
    domain: "leonardo.ai",
    shortDescription: "AI art generator with fine-tuned control",
    category: "Image Generation",
    tags: ["AI Art", "Character Design", "Consistency", "Professional"],
    rating: 4.6,
    pricing: "Freemium",
    logo: "🖼️",
  },
  
  // Presentations
  {
    id: 13,
    name: "Gamma",
    domain: "gamma.app",
    shortDescription: "AI presentation maker that creates stunning slides",
    category: "Presentations",
    tags: ["Presentations", "Design", "AI Content", "Professional"],
    rating: 4.7,
    pricing: "Freemium",
    logo: "📊",
  },
  {
    id: 14,
    name: "Tome",
    domain: "tome.app",
    shortDescription: "AI storytelling platform for presentations",
    category: "Presentations",
    tags: ["Storytelling", "Presentations", "AI Content", "Narrative"],
    rating: 4.5,
    pricing: "Freemium",
    logo: "📖",
  },
  
  // Content Creation
  {
    id: 15,
    name: "Copy.ai",
    domain: "copy.ai",
    shortDescription: "AI-powered copywriter for marketing and sales",
    category: "Content Creation",
    tags: ["Copywriting", "AI Writer", "Marketing", "Sales"],
    rating: 4.5,
    pricing: "Freemium",
    logo: "©️",
  },
  {
    id: 16,
    name: "Jasper AI",
    domain: "jasper.ai",
    shortDescription: "Enterprise AI writing platform",
    category: "Content Creation",
    tags: ["Enterprise", "Brand Voice", "Content Scale", "Marketing"],
    rating: 4.2,
    pricing: "Paid",
    logo: "📄",
  },
  
  // Video Editing
  {
    id: 17,
    name: "Descript",
    domain: "descript.com",
    shortDescription: "AI-powered video and podcast editing platform",
    category: "Video Editing",
    tags: ["Video Editing", "Podcast", "Text-based", "Voice Cloning"],
    rating: 4.7,
    pricing: "Freemium",
    logo: "✂️",
  },
  {
    id: 18,
    name: "Opus Clip",
    domain: "opus.pro",
    shortDescription: "AI tool to turn long videos into viral short clips",
    category: "Video Editing",
    tags: ["Content Repurposing", "Social Media", "Automation", "Short-form Video"],
    rating: 4.8,
    pricing: "Freemium",
    logo: "🎬",
  },
  
  // Music & Audio
  {
    id: 19,
    name: "Suno AI",
    domain: "suno.ai",
    shortDescription: "AI music generator that creates full songs",
    category: "Music Creation",
    tags: ["Music AI", "Song Generation", "Vocals", "Instruments"],
    rating: 4.8,
    pricing: "Freemium",
    logo: "🎵",
  },
  {
    id: 20,
    name: "ElevenLabs",
    domain: "elevenlabs.io",
    shortDescription: "AI voice cloning and text-to-speech platform",
    category: "Voice & Audio",
    tags: ["Voice Cloning", "Text-to-Speech", "Audiobooks", "Voiceover"],
    rating: 4.8,
    pricing: "Freemium",
    logo: "🎤",
  },
  
  // Productivity
  {
    id: 21,
    name: "Motion",
    domain: "usemotion.com",
    shortDescription: "AI-powered calendar and project manager",
    category: "Productivity",
    tags: ["Calendar", "Task Management", "Scheduling", "Automation"],
    rating: 4.7,
    pricing: "Paid",
    logo: "🗓️",
  },
  {
    id: 22,
    name: "Notion AI",
    domain: "notion.so",
    shortDescription: "AI-powered workspace for documentation",
    category: "Documentation",
    tags: ["Documentation", "Organization", "AI Writing", "Workspace"],
    rating: 4.6,
    pricing: "Freemium",
    logo: "📋",
  },
  
  // Academia & Research
  {
    id: 23,
    name: "Elicit",
    domain: "elicit.org",
    shortDescription: "AI research assistant for academic literature",
    category: "Academia",
    tags: ["Literature Review", "Research Discovery", "Academic", "Synthesis"],
    rating: 4.6,
    pricing: "Freemium",
    logo: "🔬",
  },
  {
    id: 24,
    name: "Consensus",
    domain: "consensus.app",
    shortDescription: "AI-powered scientific research search engine",
    category: "Academia",
    tags: ["Scientific Research", "Evidence-based", "Peer Review", "Citations"],
    rating: 4.4,
    pricing: "Freemium",
    logo: "🧪",
  },
]

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  recommendations?: typeof ALL_TOOLS
}

interface ToolRecommendationProps {
  tools: typeof ALL_TOOLS
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

  // Enhanced keyword-based recommendation system with better accuracy
  const getRecommendations = (userMessage: string): { tools: typeof ALL_TOOLS; isOutOfScope: boolean } => {
    const message = userMessage.toLowerCase()
    
    // Define AI-related keywords
    const aiKeywords = [
      'ai', 'artificial intelligence', 'machine learning', 'ml', 'automation', 'tool', 'software',
      'code', 'programming', 'develop', 'build', 'create', 'generate', 'design', 'image', 'art',
      'visual', 'chat', 'assistant', 'help', 'productivity', 'workflow', 'presentation', 'video',
      'audio', 'music', 'text', 'writing', 'content', 'analysis', 'data', 'research', 'document',
      'cybersecurity', 'security', 'academic', 'study', 'learn', 'edit', 'enhance', 'optimize'
    ]
    
    // Check if the message contains any AI-related keywords
    const hasAiKeywords = aiKeywords.some(keyword => message.includes(keyword))
    
    // Check for obviously out-of-scope topics
    const outOfScopeKeywords = [
      'weather', 'recipe', 'cooking', 'restaurant', 'food', 'travel', 'vacation', 'hotel',
      'sports', 'game score', 'news', 'politics', 'celebrity', 'gossip', 'shopping', 'buy',
      'medical advice', 'health diagnosis', 'legal advice', 'financial advice', 'investment',
      'personal relationship', 'dating', 'romance', 'joke', 'funny', 'entertainment'
    ]
    
    const hasOutOfScopeKeywords = outOfScopeKeywords.some(keyword => message.includes(keyword))
    
    // If it's clearly out of scope or doesn't contain AI-related keywords
    if (hasOutOfScopeKeywords || (!hasAiKeywords && message.length > 10)) {
      return { tools: [], isOutOfScope: true }
    }
    
    // Enhanced AI tool recommendations with better matching
    const recommendations: typeof ALL_TOOLS = []
    
    // Coding and development
    if (message.includes("code") || message.includes("programming") || message.includes("develop") || 
        message.includes("software") || message.includes("debug") || message.includes("ide") ||
        message.includes("coding") || message.includes("program") || message.includes("script")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Code Generation" || tool.category === "Code Editor" || 
        tool.category === "Code Completion" || tool.category === "Development Environment" ||
        tool.tags.some(tag => tag.toLowerCase().includes("code") || tag.toLowerCase().includes("programming") || tag.toLowerCase().includes("ide"))
      ))
    }
    
    // Image and visual content
    if (message.includes("image") || message.includes("art") || message.includes("design") || 
        message.includes("visual") || message.includes("logo") || message.includes("graphic") ||
        message.includes("picture") || message.includes("photo") || message.includes("artwork")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Image Generation" ||
        tool.tags.some(tag => tag.toLowerCase().includes("image") || tag.toLowerCase().includes("art") || tag.toLowerCase().includes("design") || tag.toLowerCase().includes("creative"))
      ))
    }
    
    // Video content
    if (message.includes("video") || message.includes("edit") || message.includes("clip") || 
        message.includes("movie") || message.includes("film") || message.includes("editing")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Video Creation" || tool.category === "Video Editing" ||
        tool.tags.some(tag => tag.toLowerCase().includes("video"))
      ))
    }
    
    // Presentations
    if (message.includes("presentation") || message.includes("slide") || message.includes("pitch") || 
        message.includes("deck") || message.includes("slideshow")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Presentations" ||
        tool.tags.some(tag => tag.toLowerCase().includes("presentation"))
      ))
    }
    
    // Music and audio
    if (message.includes("music") || message.includes("audio") || message.includes("voice") || 
        message.includes("sound") || message.includes("song") || message.includes("podcast")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Music Creation" || tool.category === "Voice & Audio" ||
        tool.tags.some(tag => tag.toLowerCase().includes("music") || tag.toLowerCase().includes("audio") || tag.toLowerCase().includes("voice"))
      ))
    }
    
    // Content creation and writing
    if (message.includes("write") || message.includes("content") || message.includes("copy") || 
        message.includes("blog") || message.includes("article") || message.includes("writing")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Content Creation" ||
        tool.tags.some(tag => tag.toLowerCase().includes("writing") || tag.toLowerCase().includes("content") || tag.toLowerCase().includes("copy"))
      ))
    }
    
    // Research and academia
    if (message.includes("research") || message.includes("academic") || message.includes("study") || 
        message.includes("paper") || message.includes("literature") || message.includes("scholar")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Academia" ||
        tool.tags.some(tag => tag.toLowerCase().includes("research") || tag.toLowerCase().includes("academic"))
      ))
    }
    
    // Productivity and organization
    if (message.includes("productivity") || message.includes("organize") || message.includes("schedule") || 
        message.includes("task") || message.includes("workflow") || message.includes("document")) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "Productivity" || tool.category === "Documentation" ||
        tool.tags.some(tag => tag.toLowerCase().includes("productivity") || tag.toLowerCase().includes("task") || tag.toLowerCase().includes("workflow") || tag.toLowerCase().includes("documentation"))
      ))
    }
    
    // General AI assistance (only if no other specific matches)
    if ((message.includes("chat") || message.includes("help") || message.includes("question") || 
        message.includes("ai") || message.includes("assistant")) && recommendations.length === 0) {
      recommendations.push(...ALL_TOOLS.filter(tool => 
        tool.category === "General" ||
        tool.tags.some(tag => tag.toLowerCase().includes("assistant") || tag.toLowerCase().includes("chat"))
      ))
    }
    
    // Remove duplicates and limit results
    const uniqueRecommendations = recommendations.filter((tool, index, self) => 
      index === self.findIndex(t => t.id === tool.id)
    ).slice(0, 4)
    
    // If no specific matches, return popular general tools
    if (uniqueRecommendations.length === 0 && hasAiKeywords) {
      return { tools: ALL_TOOLS.filter(tool => tool.category === "General").slice(0, 3), isOutOfScope: false }
    }
    
    return { tools: uniqueRecommendations, isOutOfScope: false }
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
      const result = getRecommendations(inputValue)
      
      let assistantMessage: Message
      
      if (result.isOutOfScope) {
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: "I'm sorry, but that request is outside of my scope. I'm specifically designed to help you find AI tools and software solutions. Please ask me about AI tools for tasks like coding, image generation, productivity, content creation, or other technology-related needs.",
          timestamp: new Date(),
        }
      } else {
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: result.tools.length > 0 
            ? "Based on your request, I found some great tools that can help you. These tools are specifically designed for your use case and are highly rated by our community."
            : "I understand you're looking for AI tools, but I couldn't find specific matches for your request. Here are some popular AI tools that might be helpful:",
          timestamp: new Date(),
          recommendations: result.tools.length > 0 ? result.tools : ALL_TOOLS.filter(tool => tool.category === "General").slice(0, 2),
        }
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
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">AI Tool Assistant</h2>
          <p className="text-gray-400">
            Describe what you're trying to accomplish, and I'll recommend the perfect AI tools for you.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl">
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
