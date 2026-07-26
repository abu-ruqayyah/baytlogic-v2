'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShieldCheck, ShieldAlert, Loader2, Calendar, Award, User } from 'lucide-react'

interface Certificate {
  certificateId: string
  studentName: string
  issueDate: string
  courseName: string
}

export default function CertificateVerifier() {
  const [certId, setCertId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ valid: boolean; certificate?: Certificate; error?: string } | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certId.trim()) return

    setLoading(true)
    setResult(null)

    try {
      // Small artificial delay for premium loading feel
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      const response = await fetch(`/api/verify-cert?id=${encodeURIComponent(certId.trim())}`)
      const data = await response.json()
      
      setResult(data)
    } catch (err) {
      setResult({ valid: false, error: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleVerify} className="relative flex items-center mb-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter Certificate ID (e.g., MOCK123)"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 shadow-xl"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        </div>
        <button
          type="submit"
          disabled={loading || !certId.trim()}
          className="ml-3 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Verify'
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md"
          >
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
            <p className="text-zinc-400 text-sm font-medium">Securing connection to registry...</p>
          </motion.div>
        )}

        {!loading && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="w-full"
          >
            {result.valid && result.certificate ? (
              <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/20 p-8 md:p-10 shadow-2xl shadow-emerald-500/5">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />

                <div className="flex items-start justify-between mb-6 border-b border-zinc-800 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> Authenticated
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Official Certificate Record</h3>
                  </div>
                  <Award className="w-12 h-12 text-emerald-500/80 stroke-[1.5]" />
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-zinc-800/50 text-zinc-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Recipient Name</p>
                      <p className="text-lg font-semibold text-white">{result.certificate.studentName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-zinc-800/50 text-zinc-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Course / Certification</p>
                      <p className="text-lg font-semibold text-white">{result.certificate.courseName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-zinc-500" />
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Issue Date</p>
                        <p className="text-sm font-medium text-zinc-300">{result.certificate.issueDate}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Certificate ID</p>
                      <p className="text-sm font-mono font-medium text-emerald-400">{result.certificate.certificateId}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-rose-500/20 bg-zinc-900/80 p-6 flex items-start gap-4 shadow-xl">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Verification Failed</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {result.error || 'The entered Certificate ID is invalid or does not match any official registry records. Please double-check and try again.'}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
