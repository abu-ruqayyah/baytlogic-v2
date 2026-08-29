'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Shield, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Video, 
  DollarSign, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Printer, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  LogOut,
  MapPin
} from 'lucide-react'
import { CERTIFICATE_REGISTRY, CertificateRecord } from '@/lib/certificates'
import { ALUMNI_VIDEOS, AlumniVideo } from '@/components/AlumniVideoShowcase'

export default function AdminStudioPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'certs' | 'videos' | 'catalog' | 'projects' | 'trainings' | 'users'>('certs')

  // Certificate Management State
  const [certs, setCerts] = useState<CertificateRecord[]>(Object.values(CERTIFICATE_REGISTRY))
  const [certFilter, setCertFilter] = useState('')
  const [showCertModal, setShowCertModal] = useState(false)
  const [newCertId, setNewCertId] = useState('BLT-2026-068')
  const [newCertName, setNewCertName] = useState('')
  const [newCertCourse, setNewCertCourse] = useState('Smart Home Automation & CCTV Master Class')
  const [newCertCohort, setNewCertCohort] = useState('Cohort 6 - 2026')
  const [newCertDate, setNewCertDate] = useState(new Date().toISOString().split('T')[0])
  const [newCertPartners, setNewCertPartners] = useState('')
  const [newCertShowSponsor, setNewCertShowSponsor] = useState(false)

  // Videos State
  const [videos, setVideos] = useState<AlumniVideo[]>(ALUMNI_VIDEOS)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [newVidName, setNewVidName] = useState('')
  const [newVidProgram, setNewVidProgram] = useState('Kids Robotics & STEM')
  const [newVidTitle, setNewVidTitle] = useState('')
  const [newVidUrl, setNewVidUrl] = useState('')
  const [newVidDesc, setNewVidDesc] = useState('')

  // Catalog State
  const [catalog, setCatalog] = useState([
    { id: 1, name: "4K AI Outdoor IP Bullet Camera (Hikvision/EZVIZ)", price: 45000, category: "CCTV" },
    { id: 2, name: "1080p Smart WiFi PTZ Outdoor Camera (Reolink)", price: 35000, category: "CCTV" },
    { id: 3, name: "8-Channel NVR System H.265+ PoE", price: 85000, category: "CCTV" },
    { id: 4, name: "16-Channel Enterprise NVR System", price: 145000, category: "CCTV" },
    { id: 5, name: "4TB Western Digital Purple Surveillance HDD", price: 95000, category: "CCTV" },
    { id: 6, name: "16-Port Gigabit PoE Switch", price: 65000, category: "CCTV" },
    { id: 7, name: "Tuya Smart Zigbee Relay Touch Switch", price: 22000, category: "Smart Home" },
    { id: 8, name: "Universal Smart Zigbee Gateway Hub", price: 35000, category: "Smart Home" },
    { id: 9, name: "Smart Fingerprint & Keypad Door Lock", price: 75000, category: "Smart Home" },
    { id: 10, name: "3.5kVA / 24V Pure Sine Wave Solar Inverter Kit", price: 450000, category: "Solar Power" },
    { id: 11, name: "Outdoor Weatherproof Cat6 Network Cable (305m)", price: 65000, category: "Cabling" },
    { id: 12, name: "Professional Installation, Cabling & Setup Labor", price: 50000, category: "Labor" }
  ])

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {}
    localStorage.removeItem('baytlogic_staff_authenticated')
    localStorage.removeItem('baytlogic_staff_name')
    router.push('/dashboard/login')
  }

  // Issue Certificate
  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCertId || !newCertName || !newCertCourse) return

    const newRecord: CertificateRecord = {
      id: newCertId.toUpperCase(),
      name: newCertName,
      course: newCertCourse,
      cohort: newCertCohort,
      issueDate: newCertDate,
      status: 'Valid',
      showSponsor: newCertShowSponsor,
      partners: newCertPartners ? newCertPartners.split(',').map(p => p.trim()) : [],
      location: 'BaytLogic Innovation Hub, Bauchi',
      director: 'Yahaya Sulaiman Abdullahi'
    }

    setCerts([newRecord, ...certs])
    setShowCertModal(false)
    setNewCertName('')
  }

  // Save Video Story
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVidName || !newVidTitle || !newVidUrl) return

    const newVid: AlumniVideo = {
      id: Date.now(),
      name: newVidName,
      program: newVidProgram,
      cohort: '2026 Graduate',
      title: newVidTitle,
      desc: newVidDesc || `${newVidName} presenting practical project outcomes at BaytLogic Academy.`,
      videoUrl: newVidUrl,
      thumbnailUrl: '/assets/training/lv_0_20260312113248.png',
      tags: [newVidProgram.split(' ')[0], 'Showcase']
    }

    setVideos([newVid, ...videos])
    setShowVideoModal(false)
    setNewVidName('')
    setNewVidTitle('')
    setNewVidUrl('')
    setNewVidDesc('')
  }

  const filteredCerts = certs.filter(c => 
    c.id.toLowerCase().includes(certFilter.toLowerCase()) ||
    c.name.toLowerCase().includes(certFilter.toLowerCase()) ||
    c.course.toLowerCase().includes(certFilter.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans flex flex-col">
      
      {/* Admin Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition group">
            <img 
              src="/assets/baytlogic-icon-cyan.png" 
              alt="BaytLogic Logo" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform duration-300" 
            />
            <div>
              <span className="font-extrabold text-lg tracking-wider text-white">BAYTLOGIC</span>
              <span className="text-xs text-cyan-400 block font-semibold tracking-widest uppercase font-mono">Admin Management Studio</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <Link href="/" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition border border-slate-700">
              &larr; Website
            </Link>
            <Link href="/boq" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition border border-slate-700">
              BOQ Studio
            </Link>
            <Link href="/certificate" className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg transition">
              Certificate Engine
            </Link>
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/80 rounded-lg transition flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6 flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'certs'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" /> Graduate Certificates ({certs.length})
          </button>
          
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Video className="w-4 h-4" /> Alumni Videos ({videos.length})
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Pricing & Catalog ({catalog.length})
          </button>
        </div>

        {/* TAB 1: CERTIFICATES */}
        {activeTab === 'certs' && (
          <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Certificate Verification Registry
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage official issued certificates, print high-res certificates, or revoke credentials.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search by ID, name, or course..."
                  value={certFilter}
                  onChange={(e) => setCertFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 w-64"
                />
                <button
                  onClick={() => setShowCertModal(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Issue Certificate
                </button>
              </div>
            </div>

            {/* Certs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                    <th className="p-3 font-semibold">Certificate ID</th>
                    <th className="p-3 font-semibold">Graduate Name</th>
                    <th className="p-3 font-semibold">Specialization Program</th>
                    <th className="p-3 font-semibold">Cohort</th>
                    <th className="p-3 font-semibold">Issue Date</th>
                    <th className="p-3 font-semibold">Sponsors</th>
                    <th className="p-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredCerts.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-mono font-bold text-amber-400">{cert.id}</td>
                      <td className="p-3 font-bold text-white">{cert.name}</td>
                      <td className="p-3 text-slate-300">{cert.course}</td>
                      <td className="p-3 text-slate-400 font-medium">{cert.cohort}</td>
                      <td className="p-3 text-slate-400 font-mono">{cert.issueDate}</td>
                      <td className="p-3">
                        {cert.showSponsor && cert.partners && cert.partners.length > 0 ? (
                          <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-[10px] font-semibold">
                            {cert.partners.length} Partner(s)
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">Hidden</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <Link
                          href={`/certificate?id=${cert.id}&name=${encodeURIComponent(cert.name)}&course=${encodeURIComponent(cert.course)}&date=${encodeURIComponent(cert.issueDate)}&partners=${encodeURIComponent(cert.partners ? cert.partners.join(', ') : '')}`}
                          className="py-1 px-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-lg transition inline-flex items-center gap-1 border border-amber-500/30"
                        >
                          <Printer className="w-3 h-3" /> Print
                        </Link>
                        <Link
                          href={`/verify?id=${cert.id}`}
                          target="_blank"
                          className="py-1 px-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold rounded-lg transition inline-flex items-center gap-1 border border-cyan-500/30"
                        >
                          <ExternalLink className="w-3 h-3" /> Verify
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`Revoke certificate ${cert.id}?`)) {
                              setCerts(certs.filter(c => c.id !== cert.id))
                            }
                          }}
                          className="py-1 px-2 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold rounded-lg transition"
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: ALUMNI VIDEOS */}
        {activeTab === 'videos' && (
          <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-cyan-400" /> Trainee Project Showcase Videos
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage alumni video case studies, prototype demos, and YouTube embeds.
                </p>
              </div>

              <button
                onClick={() => setShowVideoModal(true)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Video Story
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div key={vid.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative">
                      <iframe src={vid.videoUrl} title={vid.title} className="w-full h-full" allowFullScreen />
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold text-[10px]">
                        {vid.program}
                      </span>
                      <strong className="text-white">{vid.name}</strong>
                    </div>
                    <h4 className="text-sm font-bold text-white">{vid.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{vid.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => setVideos(videos.filter(v => v.id !== vid.id))}
                      className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: CATALOG */}
        {activeTab === 'catalog' && (
          <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> Equipment & Services Pricing Catalog
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust default prices used in the Smart BOQ Studio and Invoicing system.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                    <th className="p-3">#</th>
                    <th className="p-3">Product / Service Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3 text-right">Base Price (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {catalog.map((item, i) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 text-slate-500 font-mono">{i + 1}</td>
                      <td className="p-3 font-bold text-white">{item.name}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-slate-800 text-cyan-300 rounded text-[11px] font-semibold">{item.category}</span></td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const val = Number(e.target.value)
                            setCatalog(catalog.map(c => c.id === item.id ? { ...c, price: val } : c))
                          }}
                          className="w-32 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-right text-xs font-mono font-bold text-emerald-400 outline-none focus:border-emerald-400"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>

      {/* Modal: Issue Certificate */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Issue Graduate Certificate
            </h3>

            <form onSubmit={handleSaveCert} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Certificate ID</label>
                  <input
                    type="text"
                    value={newCertId}
                    onChange={(e) => setNewCertId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={newCertDate}
                    onChange={(e) => setNewCertDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Graduate Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Fatima Aliyu"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Course Specialization</label>
                <input
                  type="text"
                  value={newCertCourse}
                  onChange={(e) => setNewCertCourse(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Cohort Tag</label>
                  <input
                    type="text"
                    value={newCertCohort}
                    onChange={(e) => setNewCertCohort(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                    <input
                      type="checkbox"
                      checked={newCertShowSponsor}
                      onChange={(e) => setNewCertShowSponsor(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 rounded"
                    />
                    Include Co-Sponsors
                  </label>
                </div>
              </div>

              {newCertShowSponsor && (
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Partner Names (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. NURTUREROOTS FOUNDATION, NASCOMSOFT"
                    value={newCertPartners}
                    onChange={(e) => setNewCertPartners(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Issue & Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Video Story */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-cyan-400" /> Add Trainee Video Story
            </h3>

            <form onSubmit={handleSaveVideo} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Trainee / Presenter Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kareem Saheed"
                  value={newVidName}
                  onChange={(e) => setNewVidName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Program Category</label>
                <select
                  value={newVidProgram}
                  onChange={(e) => setNewVidProgram(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                >
                  <option value="Kids Robotics & STEM">Kids Robotics & STEM</option>
                  <option value="Smart Home Automation">Smart Home Automation</option>
                  <option value="CCTV & Security">CCTV & Security</option>
                  <option value="Embedded AI & Edge">Embedded AI & Edge</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Project Video Title</label>
                <input
                  type="text"
                  placeholder="e.g. Autonomous Obstacle-Avoiding Mobile Robot"
                  value={newVidTitle}
                  onChange={(e) => setNewVidTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Video Embed URL (YouTube or MP4 Stream)</label>
                <input
                  type="text"
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  value={newVidUrl}
                  onChange={(e) => setNewVidUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description / Key Highlights</label>
                <textarea
                  rows={3}
                  value={newVidDesc}
                  onChange={(e) => setNewVidDesc(e.target.value)}
                  placeholder="Short explanation of prototype, sensors, or skills learned..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Publish Video Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
