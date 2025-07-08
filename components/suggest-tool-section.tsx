"use client"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle, Plus, Globe, Tag, FileText } from "lucide-react"
import emailjs from '@emailjs/browser'

interface FormData {
  toolName: string
  website: string
  category: string
  description: string
  whyRecommend: string
}

const CATEGORIES = [
  "Code Generation",
  "Image Generation", 
  "Content Creation",
  "Productivity",
  "Data Analysis",
  "Design Tools",
  "Video/Audio",
  "Cybersecurity",
  "Academic/Research",
  "General AI",
  "Other"
]

export function SuggestToolSection() {
  const [formData, setFormData] = useState<FormData>({
    toolName: "",
    website: "",
    category: "",
    description: "",
    whyRecommend: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.toolName.trim()) {
      setErrorMessage("Tool name is required")
      return false
    }
    if (!formData.website.trim()) {
      setErrorMessage("Website URL is required")
      return false
    }
    if (!formData.category) {
      setErrorMessage("Please select a category")
      return false
    }
    if (!formData.description.trim()) {
      setErrorMessage("Description is required")
      return false
    }
    
    // Basic URL validation
    try {
      new URL(formData.website.startsWith('http') ? formData.website : `https://${formData.website}`)
    } catch {
      setErrorMessage("Please enter a valid website URL")
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_aihub'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_tool_submission'
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'

      // Prepare email template parameters
      const templateParams = {
        to_email: 'kbinkenaid@gmail.com',
        from_name: 'AI Hub Tool Submission',
        tool_name: formData.toolName,
        website: formData.website.startsWith('http') ? formData.website : `https://${formData.website}`,
        category: formData.category,
        description: formData.description,
        why_recommend: formData.whyRecommend || 'Not specified',
        submission_date: new Date().toLocaleString(),
        reply_to: 'noreply@aihub.com'
      }

      // Send email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      setSubmitStatus("success")
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          toolName: "",
          website: "",
          category: "",
          description: "",
          whyRecommend: ""
        })
        setSubmitStatus("idle")
      }, 3000)
      
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus("error")
      setErrorMessage("Failed to submit. Please check your internet connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <section className="min-h-screen bg-black text-white py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center">
            <div className="mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">Thank You!</h2>
              <p className="text-gray-400 text-lg">
                Your tool suggestion has been submitted successfully. We'll review it within 48 hours and add it to our database if it meets our criteria.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <div>
                    <p className="font-medium">Review Process</p>
                    <p className="text-gray-400 text-sm">Our team will evaluate the tool for quality, innovation, and relevance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <div>
                    <p className="font-medium">Testing & Verification</p>
                    <p className="text-gray-400 text-sm">We'll test the tool and verify all information provided.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <div>
                    <p className="font-medium">Publication</p>
                    <p className="text-gray-400 text-sm">If approved, the tool will be added to our database and featured on the site.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSubmitStatus("idle")}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Submit Another Tool
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Suggest an AI Tool</h2>
          <p className="text-gray-400 text-lg">
            Know an amazing AI tool that should be featured? Help us grow our database by suggesting new tools for the community.
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Name */}
            <div>
              <label htmlFor="toolName" className="block text-sm font-medium text-gray-300 mb-2">
                <Plus className="inline h-4 w-4 mr-2" />
                Tool Name *
              </label>
              <input
                type="text"
                id="toolName"
                name="toolName"
                value={formData.toolName}
                onChange={handleInputChange}
                placeholder="e.g., ChatGPT, Midjourney, GitHub Copilot"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                <Globe className="inline h-4 w-4 mr-2" />
                Website URL *
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com or example.com"
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                <Tag className="inline h-4 w-4 mr-2" />
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                <FileText className="inline h-4 w-4 mr-2" />
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this tool does, its key features, and how it helps users..."
                rows={4}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Why Recommend */}
            <div>
              <label htmlFor="whyRecommend" className="block text-sm font-medium text-gray-300 mb-2">
                Why do you recommend this tool?
              </label>
              <textarea
                id="whyRecommend"
                name="whyRecommend"
                value={formData.whyRecommend}
                onChange={handleInputChange}
                placeholder="What makes this tool special? How has it helped you or others?"
                rows={3}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>


            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-800 rounded-lg p-3">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Tool Suggestion
                </>
              )}
            </button>
          </form>

          {/* Guidelines */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Submission Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Tool must be AI-powered or AI-related</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Website must be functional and accessible</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Tool should offer unique value or innovation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>No spam, adult content, or malicious tools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
