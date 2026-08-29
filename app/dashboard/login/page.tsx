'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, KeyRound, User, AlertCircle } from 'lucide-react'
import { client } from '@/sanity/lib/client'

export default function StaffLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let authenticated = false
      let staffName = 'Yahaya Sulaiman Abdullahi'

      // 1. Check credentials against Sanity Studio records
      try {
        const staffDoc = await client.fetch(
          `*[_type == "staff" && username == $username][0] {
            name,
            username,
            password
          }`,
          { username: username.trim().toLowerCase() }
        )

        if (staffDoc && staffDoc.password === password) {
          staffName = staffDoc.name
          authenticated = true
        }
      } catch (err) {
        console.warn('Sanity client check failed, using local configuration fallback:', err)
      }

      // 2. Local fallback credentials check
      if (!authenticated) {
        const correctUsername = 'admin'
        const correctPassword = 'baytlogic2026'

        if (username.trim() === correctUsername && password === correctPassword) {
          staffName = 'Yahaya Sulaiman Abdullahi'
          authenticated = true
        }
      }

      if (authenticated) {
        // Store session and staff name in browser LocalStorage
        localStorage.setItem('baytlogic_staff_authenticated', 'true')
        localStorage.setItem('baytlogic_staff_name', staffName)
        
        router.push('/dashboard/invoices')
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      setError('A connection error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-md w-full relative z-10">
        
        <div className="mb-8 flex justify-center items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Shield className="w-6 h-6 text-zinc-950 stroke-[2.5]" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-white text-xl tracking-tight block leading-none">BAYTLOGIC</span>
            <span className="text-[11px] text-cyan-400 tracking-widest uppercase font-bold font-mono">TECHNOLOGIES</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl"
        >
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">Staff Portal Access</h1>
            <p className="text-xs text-zinc-400 mt-1">Please log in to generate client invoices and receipts.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 font-mono uppercase tracking-wider">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-zinc-950/80 border border-zinc-850 focus:border-cyan-500/50 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 font-mono uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950/80 border border-zinc-850 focus:border-cyan-500/50 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-800 text-zinc-950 font-extrabold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-[0.98] disabled:scale-100 flex items-center justify-center"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </motion.div>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors duration-300 font-mono tracking-wider uppercase">
            ← Return to Home
          </a>
        </div>

      </div>
    </div>
  )
}
