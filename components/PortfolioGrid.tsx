'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageSource } from '@sanity/image-url'

interface CategoryStyles {
  badge: string
  gradient: string
  glow: string
  pattern: string
}

interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  category: 'Surveillance' | 'Automation' | 'AI' | 'EdTech'
  image?: SanityImageSource
  images?: SanityImageSource[]
  description?: string
}

// Premium mock projects used as a fallback if Sanity is empty
const MOCK_PROJECTS: SanityProject[] = [
  {
    _id: 'mock-1',
    title: 'Cognitive Perimeter Guard',
    slug: { current: 'cognitive-perimeter-guard' },
    category: 'Surveillance',
    description: 'AI-driven multi-camera anomaly detection and tracking system designed for high-security industrial facilities.',
  },
  {
    _id: 'mock-2',
    title: 'Smart Grid Synchronizer',
    slug: { current: 'smart-grid-synchronizer' },
    category: 'Automation',
    description: 'Sub-millisecond automation and orchestration engine managing micro-grid power distributions with zero downtime.',
  },
  {
    _id: 'mock-3',
    title: 'Neural Predictive Pipeline',
    slug: { current: 'neural-predictive-pipeline' },
    category: 'AI',
    description: 'Predictive anomaly model forecast leveraging deep-temporal learning to optimize machinery maintenance intervals.',
  },
  {
    _id: 'mock-4',
    title: 'BaytLogic Sandtable',
    slug: { current: 'baytlogic-sandtable' },
    category: 'EdTech',
    description: 'Advanced hardware-in-the-loop virtualization platform for real-time surveillance and robotics instruction.',
  }
]

const CATEGORIES = ['All', 'Surveillance', 'Automation', 'AI', 'EdTech'] as const

function ProjectImageGallery({ project, styles }: { project: SanityProject; styles: CategoryStyles }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Retrieve images array. Fall back to project.image if project.images is empty or doesn't exist
  const images = project.images && project.images.length > 0 
    ? project.images 
    : project.image 
      ? [project.image] 
      : []

  if (images.length === 0) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-zinc-850 flex items-center justify-center">
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} transition-transform duration-500 group-hover:scale-105 flex items-center justify-center`}
          style={{ backgroundImage: styles.pattern }}
        >
          {/* Abstract grid lines representing tech */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          <span className="text-zinc-700 font-mono text-xs uppercase tracking-widest select-none">No preview asset</span>
        </div>
      </div>
    )
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-zinc-850 group/gallery flex items-center justify-center">
      {/* Slider / Image Viewer */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={urlFor(images[currentIndex]).url()}
            alt={`${project.title} - Image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Only if multiple images) */}
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-3 p-2 rounded-full bg-zinc-950/60 hover:bg-zinc-950/90 text-white border border-zinc-800 backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/gallery:translate-x-0 z-10 focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-3 p-2 rounded-full bg-zinc-950/60 hover:bg-zinc-950/90 text-white border border-zinc-800 backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/gallery:translate-x-0 z-10 focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10 bg-zinc-950/40 px-3 py-1 rounded-full backdrop-blur-md border border-zinc-850/50">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleDotClick(e, idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-cyan-400 w-3' : 'bg-zinc-500 hover:bg-zinc-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

interface PortfolioGridProps {
  initialProjects?: SanityProject[]
}


export default function PortfolioGrid({ initialProjects = [] }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  // Use Sanity projects if available, otherwise fallback to our beautiful mock projects
  const projects = initialProjects.length > 0 ? initialProjects : MOCK_PROJECTS

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'All') return true
    return project.category === selectedCategory
  })

  // Returns unique styling gradients/patterns for cards depending on category
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Surveillance':
        return {
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          gradient: 'from-purple-600/20 via-zinc-950 to-zinc-950',
          glow: 'group-hover:shadow-purple-500/10',
          pattern: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 60%)'
        }
      case 'Automation':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          gradient: 'from-emerald-600/20 via-zinc-950 to-zinc-950',
          glow: 'group-hover:shadow-emerald-500/10',
          pattern: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 60%)'
        }
      case 'AI':
        return {
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          gradient: 'from-cyan-600/20 via-zinc-950 to-zinc-950',
          glow: 'group-hover:shadow-cyan-500/10',
          pattern: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)'
        }
      case 'EdTech':
        return {
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          gradient: 'from-indigo-600/20 via-zinc-950 to-zinc-950',
          glow: 'group-hover:shadow-indigo-500/10',
          pattern: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)'
        }
      default:
        return {
          badge: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
          gradient: 'from-zinc-600/20 via-zinc-950 to-zinc-950',
          glow: 'group-hover:shadow-zinc-500/10',
          pattern: 'radial-gradient(circle at 50% 50%, rgba(113, 113, 122, 0.1) 0%, transparent 60%)'
        }
    }
  }

  return (
    <div className="w-full">
      {/* Category Pills Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none"
              style={{ color: isActive ? '#09090b' : '#a1a1aa' }}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          )
        })}
      </div>

      {/* Grid of Projects */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const styles = getCategoryStyles(project.category)

            return (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-700/60 shadow-xl ${styles.glow}`}
              >
                <div>
                  {/* Card Visual / Image Section */}
                  <ProjectImageGallery project={project} styles={styles} />

                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles.badge}`}>
                      {project.category}
                    </span>
                    <a
                      href={`/studio/structure/project;${project._id}`}
                      className="text-zinc-500 hover:text-white transition-colors p-1"
                      title="Edit in Sanity Studio"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description || 'No description provided.'}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
