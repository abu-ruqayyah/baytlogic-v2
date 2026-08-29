'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShieldCheck, ShieldAlert, Loader2, Calendar, Award, User, Printer } from 'lucide-react'
import Link from 'next/link'
import { normalizeCertificateId } from '@/lib/certificates'

interface Certificate {
  certificateId: string
  studentName: string
  issueDate: string
  courseName: string
  cohort?: string
  status?: string
  showSponsor?: boolean
  partners?: string[]
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
      const normalizedId = normalizeCertificateId(certId)
      const res = await fetch(`/api/verify-cert?id=${encodeURIComponent(normalizedId)}`)
      const data = await res.json()

      if (res.ok && (data.valid || data.success)) {
        setResult({
          valid: true,
          certificate: data.certificate || data.data
        })
      } else {
        setResult({
          valid: false,
          error: data.error || 'Certificate not found in BaytLogic registry'
        })
      }
    } catch (err) {
      setResult({ valid: false, error: 'Network error connecting to verification registry. Please try again.' })
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
            placeholder="Enter Certificate ID (e.g. BLT-2026-001, BLT-2026-020)"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-900/90 border border-slate-700 text-white font-mono uppercase tracking-wider placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300 shadow-xl text-sm"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        </div>
        <button
          type="submit"
          disabled={loading || !certId.trim()}
          className="ml-3 px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 flex items-center gap-2 text-sm shrink-0"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`p-6 sm:p-8 rounded-3xl border ${
              result.valid
                ? 'bg-slate-900/90 border-emerald-500/40 shadow-2xl shadow-emerald-500/10'
                : 'bg-red-950/40 border-red-500/40 shadow-xl'
            }`}
          >
            {result.valid && result.certificate ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                        AUTHENTIC RECORD CONFIRMED
                      </h4>
                      <p className="text-slate-400 text-xs font-mono">Official BaytLogic Registry</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold font-mono">
                    {result.certificate.certificateId}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <User className="w-3.5 h-3.5" />
                      <span className="font-semibold text-[10px] uppercase">Graduate Name</span>
                    </div>
                    <p className="font-bold text-white text-sm">{result.certificate.studentName}</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Award className="w-3.5 h-3.5" />
                      <span className="font-semibold text-[10px] uppercase">Course Specialization</span>
                    </div>
                    <p className="font-semibold text-cyan-300">{result.certificate.courseName}</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-semibold text-[10px] uppercase">Issue Date</span>
                    </div>
                    <p className="font-mono text-slate-300">{result.certificate.issueDate}</p>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="font-semibold text-[10px] uppercase">Validation Status</span>
                    </div>
                    <p className="font-bold text-emerald-400">{result.certificate.status || 'Valid'}</p>
                  </div>
                </div>

                {/* Conditional Sponsor Partners */}
                {result.certificate.showSponsor && result.certificate.partners && result.certificate.partners.length > 0 && (
                  <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/20 text-xs text-slate-300">
                    <span className="text-slate-500 font-semibold">Institutional Partners: </span>
                    <strong className="text-cyan-300">{result.certificate.partners.join(', ')}</strong>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <Link
                    href={`/certificate?id=${result.certificate.certificateId}&name=${encodeURIComponent(result.certificate.studentName)}&course=${encodeURIComponent(result.certificate.courseName)}&date=${encodeURIComponent(result.certificate.issueDate)}`}
                    className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> View / Print High-Resolution Certificate
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-red-200 text-xs">
                <ShieldAlert className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-red-300">Record Not Recognized</h4>
                  <p className="text-red-400/80 mt-0.5">{result.error}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
