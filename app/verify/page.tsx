'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Loader2, 
  ArrowLeft, 
  Award, 
  Calendar, 
  UserCheck, 
  Building2, 
  Printer,
  CheckCircle2
} from 'lucide-react'
import { normalizeCertificateId } from '@/lib/certificates'

function VerifyContent() {
  const searchParams = useSearchParams()
  const [certId, setCertId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [searched, setSearched] = useState(false)

  const verifyId = async (idToVerify: string) => {
    if (!idToVerify.trim()) return

    setLoading(true)
    setResult(null)
    setSearched(true)

    try {
      const normalized = normalizeCertificateId(idToVerify)
      const res = await fetch(`/api/verify-cert?id=${encodeURIComponent(normalized)}`)
      const data = await res.json()

      if (res.ok && (data.valid || data.success)) {
        setResult(data.certificate || data.data)
      } else {
        setResult(null)
      }
    } catch (err) {
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    verifyId(certId)
  }

  // Auto-verify if QR code contains query parameter
  useEffect(() => {
    const q = searchParams.get('id') || searchParams.get('cert') || searchParams.get('code')
    if (q) {
      setCertId(q)
      verifyId(q)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition group">
            <img 
              src="/assets/baytlogic-icon-cyan.png" 
              alt="BaytLogic Logo" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform duration-300" 
            />
            <div>
              <span className="font-extrabold text-lg tracking-wider text-white">BAYTLOGIC</span>
              <span className="text-xs text-cyan-400 block font-semibold tracking-widest uppercase font-mono">Credential Authentication System</span>
            </div>
          </Link>

          <Link href="/" className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition border border-slate-700 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Main Form & Results */}
      <main className="max-w-3xl mx-auto px-4 py-16 w-full space-y-8 my-auto">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4" /> Official Credential Registry
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Verify Graduate <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent">Institutional Certificate</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Instant tamper-proof verification for BaytLogic Academy credentials, diplomas, and masterclass certifications.
          </p>
        </div>

        {/* Input Box */}
        <form onSubmit={handleFormSubmit} className="relative flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. BLT-2026-001, BLT-2026-020)"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-slate-900/90 border border-slate-700 text-white font-mono uppercase tracking-wider placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition shadow-xl text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>

          <button
            type="submit"
            disabled={loading || !certId.trim()}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-2xl transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> Verify Credential
              </>
            )}
          </button>
        </form>

        {/* Result Card */}
        <AnimatePresence>
          {searched && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
            >
              {result ? (
                <div className="bg-slate-900/90 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider font-mono">
                          AUTHENTIC RECORD VERIFIED
                        </span>
                        <h2 className="text-xl font-bold text-white">Valid Official Credential</h2>
                      </div>
                    </div>

                    <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
                      {result.certificateId || result.id}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                      <span className="text-slate-500 uppercase tracking-wider font-semibold block text-[10px]">Graduate Name</span>
                      <strong className="text-base text-white font-bold block">{result.studentName || result.name}</strong>
                    </div>

                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                      <span className="text-slate-500 uppercase tracking-wider font-semibold block text-[10px]">Program / Specialization</span>
                      <strong className="text-sm text-cyan-300 font-semibold block">{result.courseName || result.course}</strong>
                    </div>

                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                      <span className="text-slate-500 uppercase tracking-wider font-semibold block text-[10px]">Cohort / Period</span>
                      <strong className="text-slate-200 block">{result.cohort || 'BaytLogic Academy Graduate'}</strong>
                    </div>

                    <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1">
                      <span className="text-slate-500 uppercase tracking-wider font-semibold block text-[10px]">Date of Issuance</span>
                      <strong className="text-slate-200 block font-mono">{result.issueDate}</strong>
                    </div>
                  </div>

                  {/* Optional Partner Display */}
                  {result.showSponsor && result.partners && result.partners.length > 0 && (
                    <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-2xl text-xs flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">Institutional Partners:</span>
                      <span className="text-cyan-300 font-bold">{result.partners.join(', ')}</span>
                    </div>
                  )}

                  {/* Footer Actions */}
                  <div className="pt-2 flex flex-wrap justify-end gap-3 border-t border-slate-800">
                    <Link
                      href={`/certificate?id=${result.certificateId || result.id}&name=${encodeURIComponent(result.studentName || result.name)}&course=${encodeURIComponent(result.courseName || result.course)}&date=${encodeURIComponent(result.issueDate)}`}
                      className="px-5 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" /> View / Print High-Resolution Certificate
                    </Link>
                  </div>

                </div>
              ) : (
                <div className="bg-red-950/40 border-2 border-red-500/40 rounded-3xl p-8 text-center space-y-3 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Certificate Record Not Found</h3>
                  <p className="text-xs text-red-200 max-w-md mx-auto">
                    The certificate identifier <strong className="font-mono text-white font-bold">{certId}</strong> does not match any authenticated record in the BaytLogic certification registry. Please check the spelling or contact academic support.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
        BaytLogic Technologies Ltd • Institutional Certificate Verification System • Secure & Authenticated
      </footer>

    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading credential verification portal...</div>}>
      <VerifyContent />
    </Suspense>
  )
}
