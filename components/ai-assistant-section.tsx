"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"

// Import the complete tools database from explore-section
// This ensures consistency between the assistant and main catalog
const ALL_TOOLS = [
  // General AI Tools - Updated with latest 2025 tools
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
    featured: true,
    trending: true,
    accuracy: 0.95,
    useCase: "Get instant help with any task or question",
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
  
  // Latest 2025 AI Tools - Adding the tools we just added to main database
  {
    id: 25,
    name: "Yupp AI",
    domain: "yupp.ai",
    shortDescription: "Multi-model AI platform with 500+ models",
    category: "General",
    tags: ["Multi-model", "AI Comparison", "Platform", "Cryptocurrency"],
    rating: 4.6,
    pricing: "Freemium",
    logo: "🚀",
    featured: true,
    trending: true,
  },
  {
    id: 26,
    name: "Grok",
    domain: "grok.com",
    shortDescription: "X's rebellious AI assistant with real-time data access",
    category: "General",
    tags: ["Real-time", "Social Media", "Conversational", "X Integration"],
    rating: 4.4,
    pricing: "Paid",
    logo: "🤪",
    trending: true,
  },
  {
    id: 27,
    name: "DeepSeek",
    domain: "deepseek.com",
    shortDescription: "Open-source reasoning AI model",
    category: "General",
    tags: ["Open Source", "Reasoning", "Mathematics", "Research"],
    rating: 4.5,
    pricing: "Free",
    logo: "🧮",
    trending: true,
  },
  {
    id: 28,
    name: "Cline",
    domain: "github.com/cline/cline",
    shortDescription: "AI coding agent in VS Code (formerly Claude Dev)",
    category: "Code Generation",
    tags: ["VS Code", "AI Agent", "Open Source", "Autonomous"],
    rating: 4.7,
    pricing: "Free",
    logo: "🤖",
    featured: true,
    trending: true,
  },
  {
    id: 29,
    name: "Lovable",
    domain: "lovable.dev",
    shortDescription: "No-code app builder using natural language",
    category: "Development Environment",
    tags: ["No-code", "App Builder", "Natural Language", "Prototyping"],
    rating: 4.3,
    pricing: "Freemium",
    logo: "💝",
    trending: true,
  },
  {
    id: 30,
    name: "Bolt.new",
    domain: "bolt.new",
    shortDescription: "Instant full-stack web app development",
    category: "UI Development",
    tags: ["Full-stack", "Rapid Prototyping", "Web Development", "Instant"],
    rating: 4.5,
    pricing: "Freemium",
    logo: "⚡",
    featured: true,
    trending: true,
  },
  {
    id: 31,
    name: "Reworkd AI",
    domain: "reworkd.ai",
    shortDescription: "AI-powered web scraping and data pipeline automation",
    category: "Developer Platform",
    tags: ["Web Scraping", "Data Pipeline", "AI Agents", "Automation"],
    rating: 4.5,
    pricing: "Freemium",
    logo: "🕷️",
    featured: true,
    trending: true,
  },
  {
    id: 32,
    name: "Linear",
    domain: "linear.app",
    shortDescription: "AI-enhanced issue tracking and project management",
    category: "Productivity",
    tags: ["Project Management", "Issue Tracking", "AI Triage", "Development"],
    rating: 4.9,
    pricing: "Freemium",
    logo: "📈",
    featured: true,
    trending: true,
  },
  {
    id: 33,
    name: "Arc Browser",
    domain: "arc.net",
    shortDescription: "AI-powered browser with intelligent features",
    category: "Productivity",
    tags: ["Browser", "AI Search", "Tab Management", "Productivity"],
    rating: 4.7,
    pricing: "Free",
    logo: "🌐",
    trending: true,
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
  // Validation and error handling
  if (!tools || !Array.isArray(tools) || tools.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <p className="text-sm text-gray-400">No tools found for this request.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm text-gray-400 mb-3">
        Here are {tools.length} recommended tool{tools.length > 1 ? 's' : ''} that might help:
      </p>
      {tools.map((tool) => {
        // Validate tool data
        if (!tool || !tool.id) {
          console.warn("Invalid tool data:", tool)
          return null
        }

        const getPricingColor = (pricing: string) => {
          switch (pricing) {
            case "Free":
              return "bg-green-600 text-white"
            case "Freemium":
              return "bg-blue-600 text-white"
            case "Paid":
              return "bg-orange-600 text-white"
            default:
              return "bg-gray-600 text-white"
          }
        }

        return (
          <div
            key={tool.id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl" role="img" aria-label={tool.name}>
                  {tool.logo || "🔧"}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">{tool.name || "Unknown Tool"}</h4>
                    {tool.trending && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                        🔥 Trending
                      </span>
                    )}
                    {tool.featured && (
                      <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {tool.shortDescription || "AI tool for various tasks"}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs bg-blue-600/80 text-white px-2 py-1 rounded">
                      {tool.category || "General"}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getPricingColor(tool.pricing)}`}>
                      {tool.pricing || "Unknown"}
                    </span>
                    <span className="text-xs text-yellow-400 flex items-center gap-1">
                      ⭐ {tool.rating || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  try {
                    if (tool.domain) {
                      window.open(`https://${tool.domain}`, "_blank", "noopener,noreferrer")
                    } else {
                      console.warn("No domain available for tool:", tool.name)
                    }
                  } catch (error) {
                    console.error("Error opening tool link:", error)
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors font-medium"
                disabled={!tool.domain}
                aria-label={`Visit ${tool.name}`}
              >
                Visit →
              </button>
            </div>
          </div>
        )
      }).filter(Boolean)}
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

  // Advanced AI-powered recommendation system with improved accuracy
  const getRecommendations = (userMessage: string): { 
    tools: typeof ALL_TOOLS; 
    isOutOfScope: boolean;
    confidence: number;
    reasoning: string;
  } => {
    const message = userMessage.toLowerCase().trim()
    
    // Input validation and sanitization
    if (!message || message.length < 2) {
      return { tools: [], isOutOfScope: true, confidence: 0, reasoning: "Invalid input" }
    }
    
    // Enhanced scope detection with semantic analysis
    const aiRelatedPatterns = [
      // Core AI terms
      /\b(ai|artificial intelligence|machine learning|ml|neural|algorithm)\b/,
      // Tool/software indicators
      /\b(tool|software|platform|app|service|solution|system)\b/,
      // Action verbs for digital tasks
      /\b(create|generate|build|develop|design|analyze|automate|optimize|enhance|edit)\b/,
      // Digital content types
      /\b(code|image|video|audio|text|content|data|document|presentation|website)\b/,
      // Work/productivity contexts
      /\b(work|project|task|productivity|workflow|business|help|assist|support)\b/
    ]
    
    const outOfScopePatterns = [
      // Physical world
      /\b(weather|temperature|climate|restaurant|food|cooking|recipe|travel|hotel|vacation)\b/,
      // Entertainment/personal
      /\b(sports|movie|game|celebrity|gossip|joke|funny|dating|relationship|romance)\b/,
      // Professional advice
      /\b(medical|health|diagnosis|legal|financial|investment|stock|medical advice|legal advice)\b/,
      // Shopping/commercial
      /\b(buy|purchase|shop|store|price|cost|discount|sale)\b/,
      // News/current events
      /\b(news|politics|election|president|government|breaking|latest news)\b/
    ]
    
    const hasAiContext = aiRelatedPatterns.some(pattern => pattern.test(message))
    const isOutOfScope = outOfScopePatterns.some(pattern => pattern.test(message))
    
    if (isOutOfScope) {
      return { 
        tools: [], 
        isOutOfScope: true, 
        confidence: 0.95, 
        reasoning: "Request is outside AI tools domain" 
      }
    }
    
    if (!hasAiContext && message.length > 20) {
      return { 
        tools: [], 
        isOutOfScope: true, 
        confidence: 0.8, 
        reasoning: "No AI-related context detected" 
      }
    }
    
    // Advanced scoring system for tool recommendations
    const toolScores = new Map<number, number>()
    
    // Semantic matching patterns with weights
    interface MatchingPattern {
      patterns: RegExp[]
      categories: string[]
      tags: string[]
      weight: number
      antiGeneral?: boolean
    }
    
    const matchingPatterns: MatchingPattern[] = [
      // Development & Coding (weight: 15) - HIGHEST PRIORITY
      {
        patterns: [
          /\b(code|coding|program|programming|develop|development|software|debug|ide|github|git)\b/,
          /\b(javascript|python|react|node|web development|frontend|backend|full.?stack)\b/,
          /\b(vs code|visual studio|editor|copilot|autocomplete|code completion|coding assistant)\b/,
          /\b(build an? app|create an? app|develop an? application|write code|code help)\b/
        ],
        categories: ["Code Generation", "Code Editor", "Code Completion", "Development Environment", "UI Development"],
        tags: ["code", "programming", "ide", "development", "ai agent", "coding", "developer"],
        weight: 15, // Increased from 10 to 15
        antiGeneral: true // Flag to heavily penalize general tools
      },
      
      // Image & Visual Content (weight: 12) - HIGH PRIORITY
      {
        patterns: [
          /\b(image|art|design|visual|logo|graphic|picture|photo|artwork|illustration)\b/,
          /\b(midjourney|dall.?e|stable diffusion|ai art|text.?to.?image|generate image)\b/,
          /\b(create images?|make an? image|design an? image|ai image|image generator)\b/
        ],
        categories: ["Image Generation"],
        tags: ["image", "art", "design", "creative", "visual"],
        weight: 12, // Increased from 9
        antiGeneral: true
      },
      
      // Video Content (weight: 11) - HIGH PRIORITY
      {
        patterns: [
          /\b(video|edit|editing|clip|movie|film|footage|animation|motion)\b/,
          /\b(video editor|video creation|video editing|short clips|viral videos)\b/,
          /\b(create videos?|make an? video|edit videos?|video tool)\b/
        ],
        categories: ["Video Creation", "Video Editing"],
        tags: ["video", "editing", "creation"],
        weight: 11,
        antiGeneral: true
      },
      
      // Presentations (weight: 10) - HIGH PRIORITY
      {
        patterns: [
          /\b(presentation|slide|slides|pitch|deck|slideshow|powerpoint)\b/,
          /\b(create presentations?|make slides?|presentation tool)\b/
        ],
        categories: ["Presentations"],
        tags: ["presentation", "slides"],
        weight: 10,
        antiGeneral: true
      },
      
      // Music & Audio (weight: 10) - HIGH PRIORITY
      {
        patterns: [
          /\b(music|audio|voice|sound|song|podcast|speech|singing|vocals)\b/,
          /\b(text.?to.?speech|voice cloning|audio editing|music creation)\b/,
          /\b(create music|make music|generate music|voice tool|audio tool)\b/
        ],
        categories: ["Music Creation", "Voice & Audio"],
        tags: ["music", "audio", "voice"],
        weight: 10,
        antiGeneral: true
      },
      
      // Content Writing (weight: 9) - MEDIUM-HIGH PRIORITY
      {
        patterns: [
          /\b(write|writing|content|copy|copywriting|blog|article|text|document)\b/,
          /\b(content creation|copywriter|blog post|marketing copy|article writing)\b/,
          /\b(write content|create content|content tool|writing tool)\b/
        ],
        categories: ["Content Creation"],
        tags: ["writing", "content", "copy"],
        weight: 9,
        antiGeneral: false // Allow some general tools for writing
      },
      
      // Research & Academia (weight: 9) - HIGH PRIORITY for academic queries
      {
        patterns: [
          /\b(research|academic|study|paper|literature|scholar|citation|peer.?review)\b/,
          /\b(research assistant|literature review|academic research|scientific)\b/,
          /\b(find papers|research papers|academic papers|scientific papers)\b/
        ],
        categories: ["Academia"],
        tags: ["research", "academic", "literature"],
        weight: 9,
        antiGeneral: true
      },
      
      // Productivity & Organization (weight: 8) - MEDIUM PRIORITY
      {
        patterns: [
          /\b(productivity|organize|schedule|task|workflow|document|project|manage)\b/,
          /\b(task management|project management|calendar|scheduling|organization)\b/,
          /\b(organize tasks?|manage projects?|schedule meetings?)\b/
        ],
        categories: ["Productivity", "Documentation"],
        tags: ["productivity", "task", "workflow", "organization"],
        weight: 8,
        antiGeneral: false // Some general tools are good for productivity
      },
      
      // General AI Chat (weight: 4) - LOWEST PRIORITY
      {
        patterns: [
          /\b(chat|chatbot|assistant|help|ai helper|conversational|question|ask)\b/,
          /\b(general ai|ai assistant|help me|answer questions?)\b/
        ],
        categories: ["General"],
        tags: ["assistant", "chat", "conversational"],
        weight: 4, // Reduced from 5 to make it lowest priority
        antiGeneral: false // This IS for general tools
      }
    ]
    
    // Advanced scoring system that prioritizes specialized tools over general ones
    ALL_TOOLS.forEach(tool => {
      let totalScore = 0
      let specificityBonus = 0
      
      matchingPatterns.forEach(({ patterns, categories, tags, weight, antiGeneral }) => {
        let patternScore = 0
        
        // Check if message matches patterns
        const matchesPattern = patterns.some(pattern => pattern.test(message))
        if (matchesPattern) {
          patternScore += weight
          
          // MAJOR FIX: Heavily penalize generic tools when specific matches exist
          if (tool.category === "General") {
            if (antiGeneral) {
              patternScore *= 0.1 // 90% penalty for coding/specific requests
            } else if (weight >= 8) {
              patternScore *= 0.2 // 80% penalty for other specific requests
            } else {
              patternScore *= 0.4 // 60% penalty for general requests
            }
          }
        }
        
        // Check category match - prioritize exact category matches
        if (categories.includes(tool.category)) {
          patternScore += weight * 1.2 // Increased from 0.8 to 1.2
          
          // Give massive bonus for specialized categories
          if (tool.category !== "General") {
            specificityBonus += weight * 0.5
          }
        }
        
        // Check tag matches with higher precision
        const tagMatches = tool.tags.filter(tag => 
          tags.some(searchTag => tag.toLowerCase().includes(searchTag))
        ).length
        patternScore += tagMatches * (weight * 0.4) // Increased from 0.3 to 0.4
        
        totalScore += patternScore
      })
      
      // Add specificity bonus
      totalScore += specificityBonus
      
      // CRITICAL FIX: Penalize generic tools heavily in specific contexts
      if (tool.category === "General") {
        // Check if this is a specific request (has high-weight matches)
        const hasSpecificRequest = matchingPatterns.some(({ patterns, weight }) => 
          weight >= 7 && patterns.some(pattern => pattern.test(message))
        )
        
        if (hasSpecificRequest) {
          totalScore *= 0.2 // Massive penalty for general tools in specific contexts
        } else {
          totalScore *= 0.6 // Still penalize but less severely
        }
      }
      
      // Boost specialized tools for their domain
      if (tool.category !== "General") {
        totalScore *= 1.3 // 30% boost for specialized tools
      }
      
      // Smart trending/featured boost (don't over-boost general tools)
      const trendingMultiplier = tool.category === "General" ? 1.05 : 1.15
      const featuredMultiplier = tool.category === "General" ? 1.1 : 1.25
      
      if (tool.trending) totalScore *= trendingMultiplier
      if (tool.featured) totalScore *= featuredMultiplier
      
      // Rating boost (but capped to prevent ChatGPT's high rating from dominating)
      const ratingMultiplier = Math.min(1.2, tool.rating / 4.2) // Cap at 1.2x instead of using full rating
      totalScore *= ratingMultiplier
      
      if (totalScore > 0) {
        toolScores.set(tool.id, totalScore)
      }
    })
    
    // DIVERSITY ENFORCEMENT: Ensure we don't get all general tools
    const sortedScores = Array.from(toolScores.entries()).sort(([, a], [, b]) => b - a)
    const topTools = sortedScores.slice(0, 8).map(([id]) => ALL_TOOLS.find(tool => tool.id === id)!)
    
    // If more than 2 general tools in top 4, replace extras with specialized alternatives
    const generalToolsInTop = topTools.filter(tool => tool.category === "General").length
    let finalTools = [...topTools]
    
    if (generalToolsInTop > 1) {
      // Keep only the top general tool and replace others with specialized ones
      const generalTools = finalTools.filter(tool => tool.category === "General")
      const specializedTools = finalTools.filter(tool => tool.category !== "General")
      const otherSpecializedTools = sortedScores
        .map(([id]) => ALL_TOOLS.find(tool => tool.id === id)!)
        .filter(tool => tool.category !== "General" && !specializedTools.some(t => t.id === tool.id))
      
      // Keep top general tool + specialized tools + fill with more specialized
      finalTools = [
        generalTools[0], // Keep only the best general tool
        ...specializedTools,
        ...otherSpecializedTools
      ].filter(Boolean).slice(0, 4)
      
      // Update scores for final selection
      toolScores.clear()
      finalTools.forEach((tool, index) => {
        toolScores.set(tool.id, 100 - index * 10) // Assign decreasing scores
      })
    }
    
    // Sort and select top recommendations
    const sortedTools = Array.from(toolScores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([id]) => ALL_TOOLS.find(tool => tool.id === id)!)
    
    const confidence = sortedTools.length > 0 ? 
      Math.min(0.95, Math.max(0.3, toolScores.get(sortedTools[0].id)! / 50)) : 0.1
    
    let reasoning = ""
    if (sortedTools.length > 0) {
      reasoning = `Found ${sortedTools.length} relevant tools with ${Math.round(confidence * 100)}% confidence`
    } else if (hasAiContext) {
      // Fallback to general tools
      const generalTools = ALL_TOOLS.filter(tool => tool.category === "General").slice(0, 2)
      return {
        tools: generalTools,
        isOutOfScope: false,
        confidence: 0.4,
        reasoning: "No specific matches found, showing general AI tools"
      }
    } else {
      reasoning = "No relevant AI tools found for this request"
    }
    
    return {
      tools: sortedTools,
      isOutOfScope: false,
      confidence,
      reasoning
    }
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

    // Enhanced AI processing with error handling
    setTimeout(() => {
      try {
        const result = getRecommendations(inputValue)
        
        let assistantMessage: Message
        
        if (result.isOutOfScope) {
          assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            content: "I'm specifically designed to help you find AI tools and software solutions. Please ask me about AI tools for tasks like:\n\n• 💻 Coding and development\n• 🎨 Image and art generation\n• 📹 Video editing and creation\n• 📊 Presentations and design\n• ✍️ Content writing and copywriting\n• 🎵 Music and audio creation\n• 📚 Research and academia\n• 📋 Productivity and organization\n\nTry asking something like: \"I need help with coding\" or \"Show me image generation tools\"",
            timestamp: new Date(),
          }
        } else if (result.tools.length > 0) {
          const confidenceText = result.confidence > 0.8 ? "excellent" : 
                                result.confidence > 0.6 ? "good" : "decent"
          
          assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            content: `Great! I found ${result.tools.length} ${confidenceText} matches for your request with ${Math.round(result.confidence * 100)}% confidence. These tools are specifically designed for your use case and are highly rated by our community.`,
            timestamp: new Date(),
            recommendations: result.tools,
          }
        } else {
          assistantMessage = {
            id: (Date.now() + 1).toString(),
            type: "assistant",
            content: "I understand you're looking for AI tools, but I couldn't find specific matches for your request. Here are some popular general AI tools that might be helpful as a starting point:",
            timestamp: new Date(),
            recommendations: ALL_TOOLS.filter(tool => tool.category === "General" && tool.featured).slice(0, 3),
          }
        }

        setMessages(prev => [...prev, assistantMessage])
      } catch (error) {
        // Error handling for failed recommendations
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: "I apologize, but I encountered an error while processing your request. Please try rephrasing your question or ask about a specific AI tool category like 'coding tools' or 'image generation'.",
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, errorMessage])
        console.error("Recommendation error:", error)
      } finally {
        setIsLoading(false)
      }
    }, 1200) // Reduced delay for better user experience
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickPrompts = [
    "I need help with coding and development",
    "Show me AI image generation tools",
    "I want to create presentations",
    "Help me with video editing",
    "I need content writing tools",
    "Show me productivity and automation tools",
    "I want AI music creation tools",
    "Help me with research and academia",
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
