'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface CounterProps {
  end: number
  suffix?: string
  duration?: number
}

function Counter({ end, suffix = '', duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsSection() {
  const stats = [
    { label: 'Projects Delivered', value: <Counter end={150} suffix="+" /> },
    { label: 'Uptime Target', value: <Counter end={99} suffix="%" /> },
    { label: 'States Served', value: <Counter end={12} suffix="+" /> },
    { label: 'Support SLA', value: '24/7' }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  }

  return (
    <div className="bg-zinc-950 py-16 border-y border-zinc-900 relative overflow-hidden">
      {/* Subtle lines */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '100% 40px'
      }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-mono tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
