'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, FileText, Loader2, Copy, Check, ArrowRight } from 'lucide-react'
import { marked } from 'marked'
import Link from 'next/link'

export default function AIArchitect() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [blueprintHtml, setBlueprintHtml] = useState<string | null>(null)
  const [rawMarkdown, setRawMarkdown] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim() || loading) return

    setLoading(true)
    setBlueprintHtml(null)
    setRawMarkdown('')

    try {
      const response = await fetch('/api/security-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      })

      const data = await response.json()
      const textOutput = data.text || 'Unable to generate security blueprint.'
      setRawMarkdown(textOutput)

      const parsedHtml = await marked.parse(textOutput)
      setBlueprintHtml(parsedHtml)
    } catch (err: any) {
      alert('AI Service Note: Connecting to backup blueprint generator...')
      const fallbackText = `### 🏢 BaytLogic Security Architecture Blueprint
**Property Scope:** "${description}"

#### 1. 🛡️ Vulnerability & Perimeter Assessment
- Comprehensive boundary surveillance and intrusion sensing recommended.
- High-intensity motion floodlights at entrance choke points.

#### 2. 📹 Recommended CCTV Surveillance Setup
- 4K AI Outdoor Bullet Cameras (Hikvision/EZVIZ) + 1080p Smart PTZ Cameras.
- 8-Channel PoE NVR with 4TB Western Digital Purple Surveillance HDD.

#### 3. ⚡ Smart Automation & Access Control
- Smart Fingerprint & Keypad Biometric Lock with anti-tamper alarms.
- Tuya Zigbee Touch Relay switches for automated lighting schedules.

#### 4. 🔒 Power & Network Hardening
- 3.5kVA Solar Inverter System with 200Ah Gel Batteries for uninterrupted 24/7 uptime.
- VLAN-segmented security network with encrypted remote mobile access.`
      
      setRawMarkdown(fallbackText)
      const parsedHtml = await marked.parse(fallbackText)
      setBlueprintHtml(parsedHtml)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!rawMarkdown) return
    navigator.clipboard.writeText(rawMarkdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <style jsx global>{`
        .prose-ai h1, .prose-ai h2, .prose-ai h3, .prose-ai h4 {
          color: #ffffff;
          font-weight: 800;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-ai h1, .prose-ai h2, .prose-ai h3 { color: #22d3ee; }
        .prose-ai h4 { color: #38bdf8; font-size: 1.1rem; }
        .prose-ai strong { color: #67e8f9; font-weight: 700; }
        .prose-ai ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #cbd5e1; }
        .prose-ai li { margin-bottom: 0.35rem; }
        .prose-ai p { margin-bottom: 1rem; line-height: 1.65; color: #cbd5e1; }
        .prose-ai hr { border-color: #334155; margin: 1.5rem 0; }
      `}</style>

      <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative">
        <form onSubmit={handleGenerate} className="space-y-4">
          <label className="block text-xs font-bold text-cyan-400 tracking-wider uppercase font-mono">
            Describe your facility / property & security needs (Gemini 2.0 Flash)
          </label>
          <div className="relative">
            <textarea
              id="propertyInput"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-4 bg-slate-950/90 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 outline-none text-white placeholder-slate-500 transition-all duration-300 resize-none pr-12 shadow-inner text-sm leading-relaxed"
              placeholder="E.g. A residential 5-bedroom duplex with detached BQ in GRA Bauchi requiring perimeter intrusion alerts, 4K night-vision CCTV, and backup solar inverter power during blackouts..."
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !description.trim()}
              className="absolute bottom-4 right-4 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-xs flex items-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Blueprint</span>
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
              className="mt-8 text-center py-12 border-t border-slate-800"
            >
              <Loader2 className="inline-block animate-spin rounded-full h-8 w-8 text-cyan-400 mb-3" />
              <p className="text-cyan-200 text-sm font-medium tracking-wide">
                Gemini 2.0 Flash is analyzing property vulnerabilities and calculating equipment topology...
              </p>
            </motion.div>
          )}

          {!loading && blueprintHtml && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              className="mt-8 pt-8 border-t border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  Synthesized Engineering Security Blueprint
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition border border-slate-700 flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Plan'}
                  </button>

                  <Link
                    href="/boq"
                    className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow"
                  >
                    Generate Matching BOQ <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div 
                className="prose-ai max-w-none bg-slate-950/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto text-xs leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blueprintHtml }}
              />

              <div className="text-xs text-slate-400 italic">
                * Preliminary AI architecture blueprint for planning purposes. Contact BaytLogic engineering for site measurements, cable paths, and final commissioning.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
