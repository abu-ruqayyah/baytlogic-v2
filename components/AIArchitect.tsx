'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, FileText, Loader2 } from 'lucide-react'
import { marked } from 'marked'

export default function AIArchitect() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [blueprint, setBlueprint] = useState<string | null>(null)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || loading) return

    setLoading(true)
    setBlueprint(null)

    try {
      const response = await fetch('/api/security-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate blueprint')
      }

      // Parse the markdown string returned by the Netlify serverless function
      const htmlContent = await marked.parse(data.text || 'No blueprint returned.')
      setBlueprint(htmlContent)
    } catch (err: any) {
      alert('AI Service Error: ' + (err.message || 'Could not connect.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* CSS Styling scoped for markdown parsing */}
      <style>{`
        .prose-ai h1, .prose-ai h2, .prose-ai h3 {
          color: #ffffff;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-ai h1 { font-size: 1.5rem; color: #22d3ee; }
        .prose-ai h2 { font-size: 1.35rem; color: #22d3ee; }
        .prose-ai h3 { font-size: 1.2rem; color: #22d3ee; }
        .prose-ai strong { color: #22d3ee; font-weight: 700; }
        .prose-ai ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #d1d5db; }
        .prose-ai li { margin-bottom: 0.25rem; }
        .prose-ai table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          color: #d1d5db;
        }
        .prose-ai th {
          background-color: #1e293b;
          color: #22d3ee;
          text-align: left;
          padding: 10px;
          border: 1px solid #475569;
          font-weight: 600;
        }
        .prose-ai td {
          border: 1px solid #475569;
          padding: 10px;
          background-color: rgba(15, 23, 42, 0.3);
        }
        .prose-ai p {
          margin-bottom: 1rem;
          line-height: 1.625;
          color: #d1d5db;
        }
      `}</style>

      <div className="bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-zinc-800 p-6 md:p-8 shadow-2xl relative">
        <form onSubmit={handleGenerate} className="space-y-4">
          <label className="block text-sm font-medium text-cyan-200/90 tracking-wide uppercase font-mono">
            Describe your property & security needs
          </label>
          <div className="relative">
            <textarea
              id="propertyInput"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-4 bg-zinc-950/80 border border-zinc-850 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 outline-none text-white placeholder-zinc-500 transition-all duration-300 resize-none pr-12 shadow-inner"
              placeholder="E.g., A warehouse in Bauchi needing perimeter control and AI cameras, or a residential duplex in Abuja requiring remote cloud viewing and smart automation..."
              disabled={loading}
            ></textarea>

            <button
              type="submit"
              disabled={loading || !description.trim()}
              className="absolute bottom-4 right-4 p-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-xl font-semibold text-sm flex items-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Generate Blueprint</span>
                </div>
              )}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-8 text-center py-12 border-t border-zinc-800"
            >
              <Loader2 className="inline-block animate-spin rounded-full h-8 w-8 text-cyan-400 mb-3" />
              <p className="text-cyan-200 text-sm font-medium tracking-wide">AI Architect is synthesizing requirements...</p>
            </motion.div>
          )}

          {!loading && blueprint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="mt-8 pt-8 border-t border-zinc-800"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Custom Security Blueprint
              </h3>
              <div 
                className="prose-ai max-w-none bg-zinc-950/80 p-6 rounded-2xl border border-zinc-850 shadow-inner overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: blueprint }}
              />
              <div className="mt-4 text-xs text-cyan-400/60 italic flex items-center gap-1">
                * AI-generated system recommendations. Contact our engineering team for an onsite survey and finalized Bill of Quantities (BOQ).
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
