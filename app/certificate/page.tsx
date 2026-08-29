'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  ShieldCheck, 
  Printer, 
  Download, 
  ArrowLeft, 
  Sliders, 
  RefreshCw, 
  Award, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react'
import { CERTIFICATE_REGISTRY, normalizeCertificateId } from '@/lib/certificates'

function CertificateContent() {
  const searchParams = useSearchParams()

  // State
  const [certId, setCertId] = useState('BLT-2026-020')
  const [name, setName] = useState('Muhammad Ukasha Abdullahi')
  const [course, setCourse] = useState('SMART HOME AUTOMATION & SMART CCTV INSTALLATION')
  const [coursePreset, setCoursePreset] = useState('SMART HOME AUTOMATION & SMART CCTV INSTALLATION')
  const [location, setLocation] = useState('Ibrahim Bako, Bauchi')
  const [dates, setDates] = useState('June 11 – June 15, 2026')
  const [director, setDirector] = useState('Yahaya Sulaiman Abdullahi')
  const [showSponsor, setShowSponsor] = useState(false)
  const [partners, setPartners] = useState('CENTER FOR EMBEDDED AI (ATBU), NASCOMSOFT EMBEDDED')
  const [showSidebar, setShowSidebar] = useState(true)

  // Load from search params on mount
  useEffect(() => {
    const qId = searchParams.get('id')
    const qName = searchParams.get('name')
    const qCourse = searchParams.get('course')
    const qDate = searchParams.get('date')
    const qPartners = searchParams.get('partners')

    if (qId) {
      const normalized = normalizeCertificateId(qId)
      setCertId(normalized)
      const existing = CERTIFICATE_REGISTRY[normalized]
      if (existing) {
        setName(existing.name)
        setCourse(existing.course.toUpperCase())
        setDates(existing.issueDate)
        if (existing.location) setLocation(existing.location)
        if (existing.director) setDirector(existing.director)
        if (existing.showSponsor !== undefined) setShowSponsor(existing.showSponsor)
        if (existing.partners) setPartners(existing.partners.join(', '))
      }
    }

    if (qName) setName(qName)
    if (qCourse) {
      setCourse(qCourse.toUpperCase())
      setCoursePreset('CUSTOM')
    }
    if (qDate) setDates(qDate)
    if (qPartners) {
      setPartners(qPartners)
      setShowSponsor(true)
    }
  }, [searchParams])

  const handlePresetChange = (preset: string) => {
    setCoursePreset(preset)
    if (preset !== 'CUSTOM') {
      setCourse(preset)
    }
  }

  const generateNextId = () => {
    let max = 67
    const match = certId.match(/(\d+)$/)
    if (match) {
      const curr = parseInt(match[1], 10)
      if (!isNaN(curr)) max = curr + 1
    }
    setCertId(`BLT-2026-${String(max).padStart(3, '0')}`)
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://baytlogic.com.ng/verify?id=${certId}`)}`

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans flex flex-col justify-between">
      
      {/* Top Controls Header (Hidden on Print) */}
      <header className="no-print bg-slate-900 border-b border-slate-800 py-3 px-4 sm:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition text-xs font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Admin Studio
            </Link>
            <span className="text-slate-700">|</span>
            <span className="text-xs text-amber-400 font-bold tracking-wider uppercase flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Official Certificate Engine (A4 Landscape 297×210mm)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition border border-slate-700 flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" /> {showSidebar ? "Hide Controls" : "Customizer Options"}
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition shadow-lg flex items-center gap-1.5 shadow-amber-500/20"
            >
              <Printer className="w-4 h-4" /> Print / Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Grid */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* Left Customizer Panel (Hidden on Print) */}
        {showSidebar && (
          <div className="no-print lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Award className="w-4 h-4 text-amber-400" /> Certificate Customizer
            </h3>

            <div className="space-y-4 text-xs">
              {/* Cert ID */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Certificate ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={generateNextId}
                    title="Generate Next ID"
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition flex items-center gap-1 shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Next
                  </button>
                </div>
              </div>

              {/* Graduate Name */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Recipient Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              {/* Course Presets */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Programme Specialization</label>
                <select
                  value={coursePreset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full mb-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-cyan-300 font-semibold outline-none focus:border-amber-400"
                >
                  <option value="SMART HOME AUTOMATION & SMART CCTV INSTALLATION">Smart Home Automation & CCTV</option>
                  <option value="YOUNG INNOVATORS ROBOTICS & STEM BOOTCAMP">Young Innovators Robotics Bootcamp</option>
                  <option value="EMBEDDED AI & EDGE COMPUTER VISION MASTERCLASS">Embedded AI & Edge Computer Vision</option>
                  <option value="CUSTOM">Custom Title...</option>
                </select>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold outline-none focus:border-amber-400"
                />
              </div>

              {/* Location & Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Training Dates</label>
                  <input
                    type="text"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Director Name */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Director Name</label>
                <input
                  type="text"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold outline-none focus:border-amber-400"
                />
              </div>

              {/* Conditional Sponsor Hiding Toggle */}
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    {showSponsor ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                    Co-Sponsors / Partners
                  </label>
                  <input
                    type="checkbox"
                    checked={showSponsor}
                    onChange={(e) => setShowSponsor(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </div>
                {showSponsor && (
                  <input
                    type="text"
                    value={partners}
                    onChange={(e) => setPartners(e.target.value)}
                    placeholder="Partner Names (comma separated)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-cyan-300 outline-none text-xs"
                  />
                )}
              </div>

              {/* Scan URL preview */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 text-[11px] text-slate-400 space-y-1">
                <p><strong className="text-amber-400">⚡ Live Verification Link:</strong></p>
                <p className="font-mono text-cyan-400 truncate">https://baytlogic.com.ng/verify?id={certId}</p>
              </div>
            </div>
          </div>
        )}

        {/* Right Preview Canvas */}
        <div className={`${showSidebar ? 'lg:col-span-8' : 'lg:col-span-12'} flex justify-center items-center`}>
          
          {/* Exact A4 Landscape Certificate Canvas */}
          <div 
            id="certPaper"
            className="cert-canvas bg-[#fdfdfb] text-[#0f2847] w-full max-w-[960px] aspect-[1.414/1] p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between overflow-hidden rounded-md border border-slate-300"
          >
            {/* Double-Line Institutional Border Frame */}
            <div className="border border-[#0f2847] p-1.5 h-full relative">
              <div className="border-[1.5px] border-[#c59b27] p-6 sm:p-8 h-full flex flex-col justify-between relative bg-transparent">
                
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <img 
                    src="/assets/new_projects/logo.png" 
                    alt="BaytLogic Watermark" 
                    className="w-72 sm:w-80 h-auto object-contain opacity-[0.04] grayscale" 
                  />
                </div>

                {/* 1. Header: BaytLogic Logo & Institutional Branding */}
                <div className="text-center space-y-1 relative z-10">
                  <div className="flex justify-center items-center pb-1">
                    <img 
                      src="/assets/new_projects/logo.png" 
                      alt="Official BaytLogic Logo" 
                      className="h-14 sm:h-16 w-auto object-contain mx-auto" 
                    />
                  </div>
                  <h2 className="font-sans text-xl sm:text-2xl font-black tracking-[0.2em] text-[#0f2847] uppercase">
                    BAYTLOGIC TECHNOLOGIES
                  </h2>
                  <p className="text-[10px] sm:text-xs text-[#9a7b2c] font-bold tracking-[0.15em] uppercase">
                    Where Intelligence Meets Security
                  </p>
                </div>

                {/* 2. Main Certificate Body */}
                <div className="text-center space-y-2.5 my-auto">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.12em] text-[#c59b27] uppercase">
                    CERTIFICATE OF COMPLETION
                  </h1>
                  
                  <p className="text-xs sm:text-sm italic font-serif text-slate-600">
                    This is to certify that
                  </p>

                  <div className="py-1 px-4 max-w-2xl mx-auto overflow-hidden">
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f2847] tracking-wide border-b border-[#c59b27]/50 inline-block px-6 pb-1">
                      {name || "Graduate Name"}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-slate-600 font-normal">
                    has successfully completed the professional masterclass on
                  </p>

                  <div className="max-w-2xl mx-auto px-4">
                    <h4 className="font-sans text-base sm:text-lg lg:text-xl font-bold text-[#0f2847] tracking-wider uppercase leading-snug">
                      {course || "PROGRAMME SPECIALIZATION"}
                    </h4>
                  </div>

                  {/* Conditional Sponsor Partners Block */}
                  {showSponsor && partners && (
                    <div className="pt-1 text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                      Co-sponsored by: <span className="text-[#0f2847] font-bold">{partners}</span>
                    </div>
                  )}
                </div>

                {/* 3. Bottom Grid */}
                <div className="grid grid-cols-12 items-end text-xs text-slate-700 pt-3 border-t border-[#0f2847]/20 gap-4">
                  
                  {/* Left: Location & Dates */}
                  <div className="col-span-4 space-y-1 text-left">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Location</span>
                      <strong className="text-[#0f2847] font-semibold text-xs block">{location}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Date of Issue</span>
                      <strong className="text-[#0f2847] font-semibold text-xs block">{dates}</strong>
                    </div>
                  </div>

                  {/* Center: Certificate ID & Verification Details */}
                  <div className="col-span-4 text-center space-y-1">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Certificate ID</span>
                      <strong className="text-[#0f2847] font-mono font-bold text-xs block tracking-wide">{certId}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">CONTACT</span>
                      <span className="text-slate-600 text-[11px] block">+234 803 247 6476 • info@baytlogic.com.ng</span>
                    </div>
                  </div>

                  {/* Right: Signature & QR Verification */}
                  <div className="col-span-4 text-right flex flex-col items-end justify-between space-y-2">
                    <div className="border-t border-[#0f2847]/40 pt-1 inline-block text-right">
                      <p className="font-bold text-[#0f2847] text-xs sm:text-sm">{director}</p>
                      <p className="text-[10px] text-slate-500 font-medium block">Founder & Director</p>
                      <p className="text-[9px] text-slate-400 font-semibold block">BaytLogic Technologies</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-[#0f2847] uppercase tracking-wider block">VERIFY CERTIFICATE</span>
                        <span className="text-[8px] text-slate-500 block">Scan to authenticate</span>
                      </div>
                      <div className="p-1 bg-white border border-slate-300 rounded shadow-sm inline-block">
                        <img 
                          src={qrUrl} 
                          alt="Scan to verify certificate" 
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      <style jsx global>{`
        @page {
          size: 297mm 210mm landscape;
          margin: 0;
        }
        @media print {
          .no-print, header { display: none !important; }
          body, html {
            background: #fdfdfb !important;
            color: #0f2847 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #certPaper {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 297mm !important;
            height: 210mm !important;
            max-width: 297mm !important;
            max-height: 210mm !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 8mm !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function OfficialCertificatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading certificate engine...</div>}>
      <CertificateContent />
    </Suspense>
  )
}
