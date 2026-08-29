'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Shield, Phone, MessageSquare, Globe, FileInput, Check } from 'lucide-react'

export default function DigitalBusinessCard() {
  const [timeLeft, setTimeLeft] = useState(10)
  const [redirectStopped, setRedirectStopped] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Track click function calling our tracking endpoint
  const trackClick = async (type: string) => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      })
    } catch (err) {
      console.error('Tracking failed:', err)
    }
  }

  const stopRedirect = () => {
    setRedirectStopped(true)
  }

  const handleAction = (type: string) => {
    stopRedirect()
    trackClick(type)
  }

  // Countdown timer logic
  useEffect(() => {
    if (redirectStopped) return

    if (timeLeft <= 0) {
      window.location.href = 'https://wa.me/2348032476476'
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, redirectStopped])

  // Legacy Particle Background translated to React hook
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number

      constructor() {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
      }

      move() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > w) this.vx *= -1
        if (this.y < 0 || this.y > h) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = 'rgba(34, 211, 238, 0.5)'
        ctx.fillRect(this.x, this.y, 2, 2)
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle())
    }

    let animId: number
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.move()
        p.draw()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-t from-slate-950 via-zinc-900 to-slate-950 text-white flex items-center justify-center px-4 relative overflow-hidden font-sans">
      
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />

      {/* Decorative Blur Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-md w-full text-center relative z-10 py-12">
        
        {/* LOGO */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-8 flex justify-center items-center gap-2.5 cursor-pointer"
          onClick={() => (window.location.href = '/')}
        >
          <img 
            src="/assets/baytlogic-icon-cyan.png" 
            alt="BaytLogic Logo" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]" 
          />
          <div className="text-left">
            <span className="font-extrabold text-white text-lg tracking-tight block leading-none">BAYTLOGIC</span>
            <span className="text-[10px] text-cyan-400 tracking-widest uppercase font-bold font-mono">TECHNOLOGIES</span>
          </div>
        </motion.div>

        {/* PROFILE CARD */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-3xl shadow-2xl relative">
          
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">Yahaya Sulaiman Abdullahi</h1>
          <p className="text-cyan-400 text-sm font-semibold tracking-wide uppercase font-mono mb-8">AI • Robotics • Smart Home Engineer</p>

          {/* ACTION BUTTONS */}
          <div className="space-y-4">
            <a
              href="tel:+2348032476476"
              onClick={() => handleAction('call')}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-750 text-white font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/5 group"
            >
              <Phone className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" /> Call Now
            </a>

            <a
              href="https://wa.me/2348032476476"
              onClick={() => handleAction('whatsapp')}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-450 text-zinc-950 font-extrabold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4 fill-current text-zinc-950" /> Chat on WhatsApp
            </a>

            <a
              href="/"
              onClick={() => handleAction('website')}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-extrabold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20"
            >
              <Globe className="w-4 h-4 text-zinc-950" /> Visit Website
            </a>

            {/* REGISTER BUTTON */}
            <a
              href="https://forms.gle/ykDWvtjZtjjbKkES8"
              onClick={() => handleAction('form')}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-purple-500 hover:bg-purple-450 text-white font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20"
            >
              <FileInput className="w-4 h-4" /> Register for Training
              {/* Outer pulsing ring representation in tailwind */}
              <span className="absolute inset-0 rounded-2xl border border-purple-400/30 animate-pulse pointer-events-none" />
            </a>
          </div>

          {/* REDIRECT COUNTDOWN */}
          <div className="mt-8 pt-6 border-t border-zinc-850">
            {redirectStopped ? (
              <p className="text-xs text-zinc-500 font-mono tracking-wide uppercase">Redirect cancelled</p>
            ) : (
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Redirecting to WhatsApp in <span className="text-cyan-400 font-bold font-mono text-sm">{timeLeft}</span>s...
              </p>
            )}
          </div>
        </div>

        {/* SERVICES CHECKLIST */}
        <div className="mt-10 grid grid-cols-2 gap-4 text-xs font-mono text-zinc-500 tracking-wider">
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <Check className="w-3.5 h-3.5 text-cyan-500" /> CCTV INSTALLATION
          </div>
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <Check className="w-3.5 h-3.5 text-cyan-500" /> SMART HOME AUTO
          </div>
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <Check className="w-3.5 h-3.5 text-cyan-500" /> EMBEDDED AI SYSTEMS
          </div>
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <Check className="w-3.5 h-3.5 text-cyan-500" /> ROBOTICS TRAINING
          </div>
          <div className="col-span-2 flex items-center gap-1.5 justify-center">
            <Check className="w-3.5 h-3.5 text-cyan-500" /> EDTECH & SCHOOL LMS
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
          © 2026 BAYTLOGIC TECHNOLOGIES
        </div>

      </div>
    </div>
  )
}
