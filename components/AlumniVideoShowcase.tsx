'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Award, Sparkles, CheckCircle2, Video, GraduationCap } from 'lucide-react'

export interface AlumniVideo {
  id: number
  name: string
  program: string
  cohort: string
  title: string
  desc: string
  videoUrl: string
  thumbnailUrl: string
  tags: string[]
}

export const ALUMNI_VIDEOS: AlumniVideo[] = [
  {
    id: 1,
    name: "Kareem Saheed Adeniyi",
    program: "Kids Robotics & STEM",
    cohort: "Cohort 1 - 2026",
    title: "Autonomous Obstacle-Avoiding Mobile Robot",
    desc: "Kareem demonstrates his custom-programmed ultrasonic sensor robot built from scratch at BaytLogic Innovation Hub, successfully navigating complex obstacle courses.",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/assets/training/lv_0_20260312113248.png",
    tags: ["Arduino", "Ultrasonic", "Motor Driver", "Robotics"]
  },
  {
    id: 2,
    name: "Muhammad Ukasha Abdullahi",
    program: "Smart Home Automation",
    cohort: "Masterclass June 2026",
    title: "Tuya Zigbee Touch Relay & IP CCTV Integration",
    desc: "Ukasha presents his live smart home setup with scheduled multi-gang touch switches, PIR motion sensors, and automated CCTV trigger notifications.",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/assets/training/lv_0_20260313052524.jpg",
    tags: ["Tuya Zigbee", "Smart Relay", "PIR Sensors", "CCTV"]
  },
  {
    id: 3,
    name: "Ahmad Adamu Zakari",
    program: "CCTV & Security",
    cohort: "Cohort 1 - April 2026",
    title: "8-Channel PoE NVR Commercial Deployment",
    desc: "Ahmad showcases the complete physical termination, VLAN subnet configuration, and remote P2P smartphone streaming for a commercial building.",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/assets/projects/cctv-remote-viewing-01.jpg",
    tags: ["PoE NVR", "4K IP Camera", "VLAN", "P2P Remote"]
  },
  {
    id: 4,
    name: "Maryam Muhammad Ahmad & Toyyibat Shittu",
    program: "Kids Robotics & STEM",
    cohort: "Robotics Cohort 1",
    title: "Scratch-Programmed Smart Home Lighting Simulator",
    desc: "Maryam and Toyyibat demonstrate interactive block coding that simulates automated home energy saving with light sensors and smart LEDs.",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/assets/training/lv_0_20260312113248.png",
    tags: ["Scratch 3.0", "LDR Sensors", "STEM", "Coding"]
  },
  {
    id: 5,
    name: "Engr. Babangida Tukur",
    program: "Embedded AI & Edge",
    cohort: "Advanced Engineering 2026",
    title: "Edge Computer Vision & Facial Recognition Gateway",
    desc: "Babangida presents an edge AI system running on Raspberry Pi and Jetson Nano, performing real-time facial recognition and automated gate opening.",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/assets/projects/atbu-cce-lab-cctv-01.jpg",
    tags: ["Jetson Nano", "OpenCV", "Edge AI", "Access Control"]
  },
  {
    id: 6,
    name: "Moshood Lukman Sekoni",
    program: "Smart Home Automation",
    cohort: "Masterclass June 2026",
    title: "Biometric Door Entry & Smart Siren Matrix",
    desc: "Moshood demonstrates how fingerprint lock attempts trigger immediate silent mobile alerts, floodlight activation, and siren alarms for maximum property defense.",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/assets/projects/ip-camera-installation-01.jpg",
    tags: ["Biometric Lock", "Smart Siren", "Intrusion Alert"]
  },
  {
    id: 7,
    name: "Young Innovators Robotics Team",
    program: "Kids Robotics & STEM",
    cohort: "Cohort 2 - July 2026",
    title: "Line-Following Robotic Rover Team Challenge",
    desc: "Collaborative project presentation by Level 2 trainees showcasing PID algorithm tuning and precision infrared line-following navigation.",
    videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/assets/training/lv_0_20260313052524.jpg",
    tags: ["PID Control", "IR Sensor Array", "Robotics Rover"]
  }
]

const CATEGORIES = [
  "All Projects",
  "Kids Robotics & STEM",
  "Smart Home Automation",
  "CCTV & Security",
  "Embedded AI & Edge"
]

export default function AlumniVideoShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All Projects")
  const [activeVideo, setActiveVideo] = useState<AlumniVideo | null>(null)

  const filteredVideos = selectedCategory === "All Projects"
    ? ALUMNI_VIDEOS
    : ALUMNI_VIDEOS.filter(v => v.program === selectedCategory)

  return (
    <section id="alumni-showcase" className="py-24 relative overflow-hidden bg-slate-950/80 border-t border-slate-800/60">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <GraduationCap className="w-4 h-4" /> Trainee Project Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proven Alumni <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">Practical Outcomes</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Documented video demonstrations of working hardware prototypes, smart home setups, and robotics systems built by BaytLogic Academy trainees.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Container with Play Overlay */}
                  <div 
                    onClick={() => setActiveVideo(video)}
                    className="relative h-48 w-full bg-slate-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-cyan-500/90 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                      </div>
                    </div>

                    {/* Program Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {video.program}
                      </span>
                    </div>

                    {/* Cohort Badge */}
                    <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 font-mono">
                      {video.cohort}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                      <Award className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{video.name}</span>
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {video.desc}
                    </p>
                  </div>
                </div>

                {/* Footer with Tags and Action */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {video.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveVideo(video)}
                    className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 border border-slate-700 hover:border-cyan-500"
                  >
                    <Video className="w-3.5 h-3.5" /> Watch Video Story
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
                    <span>{activeVideo.program}</span>
                    <span>•</span>
                    <span className="text-slate-400">{activeVideo.cohort}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="px-4 sm:px-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
                  <iframe
                    src={activeVideo.videoUrl}
                    title={activeVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-6 pt-0 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Presented by:</span>
                  <span className="text-xs font-semibold text-cyan-400">{activeVideo.name}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeVideo.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
