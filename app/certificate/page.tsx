'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  ShieldCheck, 
  Printer, 
  ArrowLeft, 
  Sliders, 
  RefreshCw, 
  Award, 
  Calendar,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  FileCheck
} from 'lucide-react'
import { CERTIFICATE_REGISTRY, normalizeCertificateId } from '@/lib/certificates'

function CertificateContent() {
  const searchParams = useSearchParams()

  // State matching sample certificate design
  const [certId, setCertId] = useState('BLT-2026-027')
  const [name, setName] = useState('Bayt Logic')
  const [durationText, setDurationText] = useState('5-Day Professional Masterclass on')
  const [course, setCourse] = useState('SMART HOME AUTOMATION & CCTV MASTER CLASS')
  const [coursePreset, setCoursePreset] = useState('SMART HOME AUTOMATION & CCTV MASTER CLASS')
  const [dates, setDates] = useState('2026-09-05')
  const [showSponsor, setShowSponsor] = useState(true)
  const [partners, setPartners] = useState('HAMJIK CARE INITIATIVE')
  const [directorName, setDirectorName] = useState('Engr. Yahaya Sulaiman Abdullahi')
  const [directorTitle, setDirectorTitle] = useState('CEO / Founder & Director')
  const [facilitatorName, setFacilitatorName] = useState('Engr. Ahmad Adamu Zakari')
  const [facilitatorTitle, setFacilitatorTitle] = useState('Lead Training Facilitator')
  const [showSidebar, setShowSidebar] = useState(true)

  // Load from search params or registry on mount
  useEffect(() => {
    const qId = searchParams.get('id') || searchParams.get('certId')
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
        if (existing.director) setDirectorName(existing.director)
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
    let max = 27
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
      
      {/* Google Fonts for Certificate Typography */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-script { font-family: 'Great Vibes', cursive; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        
        @page {
          size: 297mm 210mm landscape;
          margin: 0;
        }
        @media print {
          .no-print, header { display: none !important; }
          body, html {
            background: #ffffff !important;
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
            padding: 6mm !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
          }
        }
      `}</style>

      {/* Top Controls Header (Hidden on Print) */}
      <header className="no-print bg-slate-900 border-b border-slate-800 py-3 px-4 sm:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/invoices" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition text-xs font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Staff Dashboard
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
              <Sliders className="w-3.5 h-3.5" /> {showSidebar ? "Hide Customizer" : "Show Customizer"}
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
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
        
        {/* Left Customizer Panel (Hidden on Print) */}
        {showSidebar && (
          <div className="no-print lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Award className="w-4 h-4 text-amber-400" /> Certificate Customizer
            </h3>

            <div className="space-y-3.5 text-xs">
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

              {/* Recipient Name */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Recipient Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bayt Logic"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold outline-none focus:border-amber-400"
                />
              </div>

              {/* Course Title & Duration */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Programme Specialization</label>
                <select
                  value={coursePreset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="w-full mb-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-cyan-300 font-semibold outline-none focus:border-amber-400"
                >
                  <option value="SMART HOME AUTOMATION & CCTV MASTER CLASS">Smart Home Automation & CCTV</option>
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

              {/* Completion Subtitle / Duration */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Duration Sentence</label>
                <input
                  type="text"
                  value={durationText}
                  onChange={(e) => setDurationText(e.target.value)}
                  placeholder="e.g. 5-Day Professional Masterclass on"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 outline-none focus:border-amber-400"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Completion Date</label>
                <input
                  type="text"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="e.g. 2026-09-05"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {/* Co-Sponsors & Partners */}
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    {showSponsor ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                    Sponsoring Partner Banner
                  </label>
                  <input
                    type="checkbox"
                    checked={showSponsor}
                    onChange={(e) => setShowSponsor(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </div>
                {showSponsor && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-medium">Quick-toggle partner or type custom partner:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['HAMJIK CARE INITIATIVE', 'NURTUREROOTS FOUNDATION', 'NASCOMSOFT EMBEDDED'].map((p) => {
                        const active = partners.toUpperCase().includes(p)
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => {
                              let currentList = partners ? partners.split(',').map(s => s.trim()).filter(Boolean) : []
                              const existingIdx = currentList.findIndex(item => item.toUpperCase() === p)
                              if (existingIdx >= 0) {
                                currentList.splice(existingIdx, 1)
                              } else {
                                currentList.push(p)
                              }
                              setPartners(currentList.join(', '))
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                              active
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {active ? '✓ ' : '+ '} {p}
                          </button>
                        )
                      })}
                    </div>
                    <input
                      type="text"
                      value={partners}
                      onChange={(e) => setPartners(e.target.value)}
                      placeholder="e.g. HAMJIK CARE INITIATIVE"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 outline-none text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Signatories */}
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3">
                <span className="text-xs font-bold text-white block">Signatories Information</span>
                
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Left Signatory (CEO)</label>
                  <input
                    type="text"
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    className="w-full mb-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={directorTitle}
                    onChange={(e) => setDirectorTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Right Signatory (Lead Facilitator)</label>
                  <input
                    type="text"
                    value={facilitatorName}
                    onChange={(e) => setFacilitatorName(e.target.value)}
                    className="w-full mb-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs"
                  />
                  <input
                    type="text"
                    value={facilitatorTitle}
                    onChange={(e) => setFacilitatorTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 text-[11px]"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Right Certificate Canvas */}
        <div className={`${showSidebar ? 'lg:col-span-8' : 'lg:col-span-12'} flex justify-center items-center`}>
          
          {/* Certificate Canvas (A4 Landscape 297mm x 210mm Ratio) */}
          <div 
            id="certPaper"
            className="cert-canvas bg-[#fffdf7] text-[#0f2847] w-full max-w-[980px] aspect-[1.414/1] p-5 sm:p-7 shadow-2xl relative flex flex-col justify-between overflow-hidden rounded-sm border border-amber-200/80"
          >
            {/* Outer Gold Border Frame */}
            <div className="border-[2px] border-[#c59b27] p-1.5 h-full relative">
              <div className="border border-[#0f2847]/70 p-1 h-full relative">
                <div className="border-[1.5px] border-[#c59b27] p-5 sm:p-7 h-full flex flex-col justify-between relative bg-transparent">
                  
                  {/* Subtle Background Watermark of Official BaytLogic Dark Navy Logo */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <img 
                      src="/assets/new_projects/logo.png" 
                      alt="BaytLogic Watermark" 
                      className="w-80 sm:w-96 h-auto object-contain opacity-[0.045]" 
                    />
                  </div>

                  {/* 1. Header Section: Dark Navy Brand Logo + Company Name + Motto */}
                  <div className="text-center space-y-1 relative z-10">
                    <div className="flex justify-center items-center pb-0.5">
                      <img 
                        src="/assets/new_projects/logo.png" 
                        alt="BaytLogic Dark Navy Logo" 
                        className="h-14 sm:h-16 w-auto object-contain mx-auto" 
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[#c59b27] text-xs font-bold">◆</span>
                      <h2 className="font-cinzel text-lg sm:text-xl font-extrabold tracking-[0.25em] text-[#0f2847] uppercase">
                        BAYTLOGIC TECHNOLOGIES
                      </h2>
                      <span className="text-[#c59b27] text-xs font-bold">◆</span>
                    </div>

                    <p className="text-[10px] sm:text-xs text-slate-500 italic font-playfair tracking-wider">
                      Where Intelligence Meets Security
                    </p>
                  </div>

                  {/* 2. Certificate Title & Main Content Body */}
                  <div className="text-center space-y-2.5 my-auto relative z-10">
                    
                    <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.14em] text-[#c59b27] uppercase">
                      CERTIFICATE OF COMPLETION
                    </h1>
                    
                    <p className="text-xs sm:text-sm italic font-playfair text-slate-600 font-normal">
                      This is to certify that
                    </p>

                    {/* Recipient Name */}
                    <div className="py-1 px-4 max-w-2xl mx-auto overflow-hidden">
                      <h3 className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f2847] tracking-wide border-b-2 border-[#0f2847]/40 inline-block px-8 pb-1">
                        {name || "Bayt Logic"}
                      </h3>
                    </div>

                    {/* Completion Sentence */}
                    <p className="text-xs sm:text-sm italic font-playfair text-slate-600">
                      has successfully completed the {durationText || "5-Day Professional Masterclass on"}
                    </p>

                    {/* Course Specialization Title */}
                    <div className="max-w-2xl mx-auto px-4">
                      <h4 className="font-sans text-base sm:text-lg lg:text-xl font-black text-[#0f2847] tracking-wider uppercase leading-snug">
                        {course || "SMART HOME AUTOMATION & CCTV MASTER CLASS"}
                      </h4>
                    </div>

                    {/* Date Pill */}
                    <div className="flex justify-center items-center pt-0.5">
                      <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-mono font-medium shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>Date: <strong className="text-[#0f2847]">{dates}</strong></span>
                      </div>
                    </div>

                    {/* Sponsoring Partner Banner Pill */}
                    {showSponsor && partners && (
                      <div className="pt-1">
                        <div className="inline-block px-6 py-1.5 rounded-full bg-[#f4efe2] border border-[#c59b27]/60 text-xs">
                          <span className="italic font-playfair text-slate-700">In Collaboration With Sponsoring Partner: </span>
                          <strong className="font-sans font-bold text-[#0f2847] tracking-wide uppercase">
                            {partners.split(',').map(s => s.trim()).filter(Boolean).join(' & ')}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Signatures & Badges Row */}
                  <div className="grid grid-cols-12 items-end pt-3 gap-2 relative z-10">
                    
                    {/* Left Seal & Left Signatory */}
                    <div className="col-span-5 flex items-center gap-3">
                      {/* Certified Gold Round Badge */}
                      <div className="shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-200 shadow-md flex flex-col items-center justify-center text-center p-1 text-slate-950">
                        <span className="text-[7px] tracking-tighter text-slate-950 font-black">★ ★ ★ ★ ★</span>
                        <span className="text-[9px] font-black tracking-wider uppercase leading-tight font-sans">CERTIFIED</span>
                        <span className="text-[7px] font-bold tracking-widest uppercase text-slate-900 font-mono">BAYTLOGIC</span>
                      </div>

                      {/* Left Signatory Info */}
                      <div className="text-left space-y-0.5">
                        <div className="w-36 border-b border-[#0f2847]/70 pb-0.5">
                          <span className="font-bold text-[#0f2847] text-xs sm:text-sm block leading-tight">{directorName}</span>
                        </div>
                        <span className="text-[10px] text-slate-600 font-semibold block">{directorTitle}</span>
                        <span className="text-[9px] text-slate-400 font-medium block">BaytLogic Technologies</span>
                      </div>
                    </div>

                    {/* Right Signatory & QR Verification */}
                    <div className="col-span-7 flex items-end justify-end gap-6 text-right">
                      {/* Right Signatory Info */}
                      <div className="text-left space-y-0.5">
                        <div className="w-36 border-b border-[#0f2847]/70 pb-0.5">
                          <span className="font-bold text-[#0f2847] text-xs sm:text-sm block leading-tight">{facilitatorName}</span>
                        </div>
                        <span className="text-[10px] text-slate-600 font-semibold block">{facilitatorTitle}</span>
                        <span className="text-[9px] text-slate-400 font-medium block">BaytLogic Technologies</span>
                      </div>

                      {/* QR Code Block */}
                      <div className="flex flex-col items-center">
                        <div className="p-1 bg-white border border-slate-300 rounded shadow-xs">
                          <img 
                            src={qrUrl} 
                            alt="Scan to verify" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <span className="text-[8px] font-bold text-[#0f2847] uppercase tracking-wider mt-0.5">SCAN TO VERIFY</span>
                      </div>
                    </div>

                  </div>

                  {/* 4. Bottom Footer Info Line */}
                  <div className="pt-2 border-t border-[#0f2847]/20 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 font-mono relative z-10">
                    <div>
                      <span>• Certificate ID: <strong className="text-[#0f2847]">{certId}</strong></span>
                    </div>

                    <div className="text-center font-sans font-semibold text-slate-600">
                      BaytLogic Technologies {showSponsor && partners ? `& ${partners}` : ''}
                    </div>

                    <div>
                      <span>• Contact: 08032476476 • verify.html</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default function OfficialCertificatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-xs">Loading certificate engine...</div>}>
      <CertificateContent />
    </Suspense>
  )
}
