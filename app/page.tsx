import { client } from '@/sanity/lib/client'
import AIArchitect from '@/components/AIArchitect'
import ContactForm from '@/components/ContactForm'
import StatsSection from '@/components/StatsSection'
import CertificateVerifier from '@/components/CertificateVerifier'
import NeuralNetworkCanvas from '@/components/NeuralNetworkCanvas'
import AlumniVideoShowcase from '@/components/AlumniVideoShowcase'
import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  CheckCircle2, 
  Bot, 
  Laptop, 
  Users, 
  BookOpen, 
  HeartHandshake, 
  LineChart, 
  Check, 
  Cpu, 
  Video, 
  Wrench, 
  Star, 
  PlayCircle, 
  FileText, 
  Phone, 
  Mail, 
  Globe, 
  Building2, 
  Award, 
  Zap, 
  BarChart3, 
  FileCheck, 
  MessageSquare, 
  Lock, 
  ShieldCheck,
  ExternalLink,
  GraduationCap,
  ClipboardCheck,
  Network
} from 'lucide-react'

export const revalidate = 10

export default async function Home() {
  let projects = []
  try {
    projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      category,
      image,
      images,
      description
    }`)
  } catch (error) {
    console.error('Failed to fetch projects from Sanity:', error)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300 font-sans">
      
      {/* Ambient background glows - Navy Theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Navigation Header - Glass Navy Theme */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-900/85 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/assets/baytlogic-icon-cyan.png" 
              alt="BaytLogic Logo" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-xl tracking-wider">BAYTLOGIC</span>
              <div className="flex items-center gap-1.5 -mt-0.5">
                <span className="text-[10px] text-cyan-400 tracking-widest uppercase font-bold font-mono">TECHNOLOGIES</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                  Nationwide Service
                </span>
              </div>
            </div>
          </a>

          {/* Navigation Links - Image 2 Exact Header Layout */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors">Home</a>
            <a href="#services" className="text-slate-300 hover:text-cyan-400 transition-colors">Solutions</a>
            <a href="#projects" className="text-slate-300 hover:text-cyan-400 transition-colors">Portfolio</a>
            <a href="#training" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">Academy</a>
            <a href="#alumni-showcase" className="text-slate-300 hover:text-cyan-400 transition-colors">Alumni Videos</a>
            <a href="/boq" className="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-xs font-semibold px-2 py-1 rounded bg-slate-800/80 border border-slate-700">BOQ Estimator</a>
            <a href="/verify" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Verify Cert
            </a>
            <a href="/dashboard/login" className="px-3.5 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold rounded-full transition flex items-center gap-1.5 shadow-md">
              <Lock className="w-3.5 h-3.5 text-cyan-400" /> Staff Portal
            </a>
            <a href="#contact" className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5">
              Get a Quote
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Image 2 Navy Theme */}
      <header className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">
        <NeuralNetworkCanvas />

        <div className="relative z-10 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/30 text-cyan-300 text-sm font-semibold backdrop-blur-sm shadow-md">
            🛡️ Engineering-Grade Security Solutions
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Advanced Surveillance & <br/> <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">Embedded AI Systems</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            We don't just install cameras; we engineer safety and empower education. From advanced surveillance to school LMS deployments across Nigeria, we build what matters most.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <a href="#contact" className="px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition duration-300 flex items-center justify-center gap-2 group transform hover:scale-105 active:scale-95">
              Request Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/docs/BaytLogic_Technologies_Corporate_Profile_V2.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 bg-slate-900/80 border border-slate-700 text-white font-bold rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center shadow-md">
              Download Company Profile
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm font-medium">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-400" /> Engineering-led deployments</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-400" /> Nationwide logistics</span>
          </div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section id="services" className="py-20 bg-slate-900/60 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-cyan-400 font-semibold tracking-wide uppercase text-xs font-mono">The BaytLogic Advantage</h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Why Business Leaders Choose Us
            </h3>
            <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">
              Bridging the gap between theoretical AI research and practical field security across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/90 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/40 transition duration-300 hover:-translate-y-1.5 group shadow-xl">
              <div className="bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400">
                <Award className="h-8 w-8 transition" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Led Engineering</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Projects delivered by an engineering-led team with strong <strong className="text-cyan-300">Embedded AI</strong> and field deployment experience. We understand the code behind the camera.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/40 transition duration-300 hover:-translate-y-1.5 group shadow-xl">
              <div className="bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400">
                <Globe className="h-8 w-8 transition" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Remote & Cloud Viewing</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you are in Lagos, London, or Dubai, monitor your assets in real-time via secure cloud applications.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/40 transition duration-300 hover:-translate-y-1.5 group shadow-xl">
              <div className="bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400">
                <Zap className="h-8 w-8 transition" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Optimized for Nigeria</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our systems are designed for the Nigerian environment, fully compatible with rugged solar setups and inverter systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Government & Institutional Deployments */}
      <section id="government" className="py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-cyan-400 font-semibold tracking-wide uppercase text-xs font-mono">Institutional Capability</h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Government & Institutional Deployments
            </h3>
            <p className="mt-4 max-w-3xl text-lg text-slate-300 mx-auto">
              BaytLogic designs and deploys engineering-grade surveillance and smart infrastructure systems for ministries, schools, hospitals, and public facilities across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 rounded-2xl p-8 border border-slate-800 shadow-lg">
              <div className="bg-cyan-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-cyan-400 border border-cyan-500/20">
                <ClipboardCheck className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Structured Delivery</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Site Survey &rarr; System Design &rarr; Deployment &rarr; Commissioning &rarr; Training &rarr; Maintenance (SLA).
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-8 border border-slate-800 shadow-lg">
              <div className="bg-cyan-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-cyan-400 border border-cyan-500/20">
                <Network className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Engineering-Grade Systems</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                IP CCTV/NVR, monitoring rooms, access control integration, remote viewing, network hardening, and power backup planning.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-8 border border-slate-800 shadow-lg">
              <div className="bg-cyan-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-cyan-400 border border-cyan-500/20">
                <Building2 className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Verified Institutional Experience</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                CCTV installation completed at <strong className="text-cyan-300">ATBU - Department of Computer & Communications Engineering Laboratory</strong>.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-3.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20 text-center">
              Request Institutional Proposal
            </a>
            <a href="/docs/BaytLogic_Technologies_Corporate_Profile_V2.pdf" target="_blank" rel="noreferrer" className="px-8 py-3.5 bg-slate-900 border border-slate-700 text-white font-bold rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition flex items-center justify-center gap-2 shadow-md">
              <Building2 className="w-4 h-4 text-cyan-400" /> View Company Profile
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <StatsSection />

      {/* Featured Projects Portfolio Grid Section */}
      <section id="projects" className="py-20 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-4 px-4 border border-blue-500/30">
              <Video className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-blue-400 text-xs font-bold tracking-widest uppercase font-mono">PORTFOLIO</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Featured Installations</h2>
            <p className="mt-4 text-lg text-slate-400">From private residences in Bauchi to institutional facilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border border-slate-800">
              <img src="/assets/new_projects/center_for_embedded_ai_atbu.jpeg" alt="ATBU CCE Lab" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                <div className="flex items-center text-cyan-400 text-xs font-semibold mb-2 font-mono">
                  <Globe className="w-3.5 h-3.5 mr-1" /> ATBU, Bauchi
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Center for Embedded AI Laboratory</h3>
                <p className="text-slate-300 text-xs leading-relaxed">Full IP surveillance system installed at ATBU Computer & Communications Engineering Lab.</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border border-slate-800">
              <img src="/assets/new_projects/shopping_mall_at_gra.jpeg" alt="Commercial Mall" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                <div className="flex items-center text-cyan-400 text-xs font-semibold mb-2 font-mono">
                  <Globe className="w-3.5 h-3.5 mr-1" /> G.R.A, Bauchi
                </div>
                <h3 className="text-xl font-bold text-white mb-2">GRA Shopping Mall Security</h3>
                <p className="text-slate-300 text-xs leading-relaxed">Structured HD CCTV monitoring for checkout registers and perimeter safety.</p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border border-slate-800">
              <img src="/assets/new_projects/fadaman_mada_street.jpeg" alt="Street Surveillance" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                <div className="flex items-center text-cyan-400 text-xs font-semibold mb-2 font-mono">
                  <Globe className="w-3.5 h-3.5 mr-1" /> Fadaman Mada, Bauchi
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Fadaman Mada Street Surveillance</h3>
                <p className="text-slate-300 text-xs leading-relaxed">Pole-mounted street coverage providing public security monitoring.</p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border border-slate-800">
              <img src="/assets/new_projects/sbn_street_cctv.jpeg" alt="SBN Street CCTV" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                <div className="flex items-center text-cyan-400 text-xs font-semibold mb-2 font-mono">
                  <Globe className="w-3.5 h-3.5 mr-1" /> SBN Area, Bauchi
                </div>
                <h3 className="text-xl font-bold text-white mb-2">SBN Street Traffic & Security</h3>
                <p className="text-slate-300 text-xs leading-relaxed">Weatherproof IP cameras with remote mobile app live viewing.</p>
              </div>
            </div>

            {/* Project 5 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border border-slate-800">
              <img src="/assets/new_projects/ezviz_shakatafi_intercom.jpeg" alt="Commercial Intercom" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                <div className="flex items-center text-cyan-400 text-xs font-semibold mb-2 font-mono">
                  <Globe className="w-3.5 h-3.5 mr-1" /> Shakatafi Commercial
                </div>
                <h3 className="text-xl font-bold text-white mb-2">EZVIZ Smart Intercom Setup</h3>
                <p className="text-slate-300 text-xs leading-relaxed">Smart video intercom and door entry control integrated with mobile unlocking.</p>
              </div>
            </div>

            {/* Project 6 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer h-96 border border-slate-800">
              <img src="/assets/new_projects/server_rack_cabling.jpeg" alt="Server Racks" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                <div className="flex items-center text-cyan-400 text-xs font-semibold mb-2 font-mono">
                  <Network className="w-3.5 h-3.5 mr-1" /> IT Infrastructure
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Server Room Rack Cabling</h3>
                <p className="text-slate-300 text-xs leading-relaxed">Structured Cat6 cabling, PoE switch patching, and network cabinet installation.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-14 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase font-mono mb-8">Trusted By & Partnered With</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-75">
            <div className="text-lg font-black tracking-widest text-slate-300 font-mono hover:text-white transition duration-300">
              NURTURE ROOTS FOUNDATION
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-left pl-3 border-l-2 border-slate-700">
                <span className="text-xl font-black text-slate-200 tracking-tighter">NASSCOMSOFT</span>
                <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase font-mono -mt-1">EMBEDDED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EdTech & Enterprise LMS Section */}
      <section id="edtech" className="py-20 bg-slate-900/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-emerald-500/10 rounded-full mb-4 px-4 border border-emerald-500/30">
              <BookOpen className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase font-mono">EDTECH & INNOVATION</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Empowering Education with Technology</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">
              Transforming learning environments through robust School Management Systems, teacher upskilling, and engaging STEM programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LMS Enterprise */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-emerald-500/40 transition shadow-lg flex flex-col justify-between group">
              <div>
                <div className="bg-emerald-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                  <Laptop className="h-8 w-8 transition" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Enterprise LMS & Portals</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Custom-built Learning Management Systems (LMS) and school portals designed to streamline administration, grading, and student engagement.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">Featured Deployment</p>
                <a href="https://minaret.sch.ng" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3.5 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-slate-950 transition">
                  <Globe className="w-3.5 h-3.5 mr-1.5" /> Minaret Int'l School
                </a>
              </div>
            </div>

            {/* Teacher Training */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-blue-500/40 transition shadow-lg group">
              <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-slate-950 transition">
                <Users className="h-8 w-8 transition" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Digital Skills for Educators</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Comprehensive training programs equipping teachers with modern digital tools, software proficiency, and pedagogical strategies needed for 21st-century classrooms.
              </p>
            </div>

            {/* Kids Robotics */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-purple-500/40 transition shadow-lg group">
              <div className="bg-purple-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-slate-950 transition">
                <Bot className="h-8 w-8 transition" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Kids Robotics & STEM</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Interactive bootcamps and school curriculum integration for robotics, coding, and electronics, preparing young minds for the future of technology and AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academy & Training Section */}
      <section id="training" className="py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4 px-4 border border-purple-500/30">
              <GraduationCap className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-400 text-xs font-bold tracking-widest uppercase font-mono">BAYTLOGIC ACADEMY</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Upcoming Training & Bootcamps</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">
              Empowering the next generation with practical, hands-on engineering and technology skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course 1: Smart Home & CCTV */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/40 transition shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl font-mono uppercase tracking-wider shadow-sm">
                Starts March 28
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-cyan-500/10 p-4 rounded-xl text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
                  <Video className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Smart Home Automation & CCTV</h3>
                  <p className="text-cyan-400 font-semibold text-xs tracking-wider uppercase font-mono">Professional Class</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Master the installation, configuration, and remote networking of modern IP surveillance systems and smart home integrations in a fully hands-on environment.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://forms.gle/3o4bD2jJa5Tx9eCLA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition shadow-md">
                  Register Now <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a href="#verification" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verify Certificate
                </a>
              </div>
            </div>

            {/* Course 2: Kids Robotics */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-purple-500/40 transition shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl font-mono uppercase tracking-wider shadow-sm animate-pulse">
                April 6 - April 24
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-500/10 p-4 rounded-xl text-purple-400 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-slate-950 transition">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Kids Robotics Bootcamp</h3>
                  <p className="text-purple-400 font-semibold text-xs tracking-wider uppercase font-mono">Interactive Learning</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                A hands-on robotics bootcamp running from April 6 to April 24, designed to introduce children to robotics, coding, and electronics in a fun, practical way.
              </p>
              <a href="https://wa.me/2348032476476?text=Hello%20BaytLogic,%20I%20am%20interested%20in%20pre-registering%20my%20child%20for%20the%20Kids%20Robotics%20Bootcamp." target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 border border-purple-500/40 text-purple-400 font-bold rounded-lg hover:bg-purple-500 hover:text-slate-950 transition shadow-md">
                Pre-Register <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NGO & Institutional Youth Sponsorship Hub */}
      <section id="sponsorship" className="py-20 bg-slate-900/90 text-white border-t border-slate-800/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-cyan-500/10 rounded-full mb-6 px-4 border border-cyan-500/30">
              <HeartHandshake className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase font-mono">Institutional Youth Sponsorship</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              Invest in Youth. Build Practical Technology Skills. Create Opportunity.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
              BaytLogic Technologies provides practical, hands-on technology training designed to help young people develop marketable technical skills, pursue employment opportunities and build technology-based businesses.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="https://wa.me/2348032476476?text=Hello%20BaytLogic,%20we%20are%20an%20NGO/Institution%20interested%20in%20sponsoring%20youth%20technology%20training." target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5" /> Sponsor Youth Training
              </a>
              <a href="#sponsorship-impact" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition flex items-center gap-2">
                <LineChart className="w-5 h-5 text-cyan-400" /> View Our Impact
              </a>
            </div>

            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-6 py-2.5 bg-slate-800/60 rounded-full border border-slate-700/80 text-xs sm:text-sm text-slate-300 font-medium">
              <span>Practical training</span> <span className="text-slate-600">•</span>
              <span>Real devices</span> <span className="text-slate-600">•</span>
              <span>Documented outcomes</span> <span className="text-slate-600">•</span>
              <span>Verifiable certificates</span>
            </div>
          </div>

          {/* 5-Step Programme Model */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white">The Five-Step Programme Model</h3>
              <p className="text-sm text-slate-400 mt-2">A structured pathway from institutional sponsorship to tangible post-training outcomes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-sm mb-4 font-mono">01</div>
                <h4 className="text-lg font-bold text-white mb-2">SPONSOR</h4>
                <p className="text-xs text-slate-300 leading-relaxed">An NGO or institution sponsors selected young people for technical skills training.</p>
              </div>

              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-sm mb-4 font-mono">02</div>
                <h4 className="text-lg font-bold text-white mb-2">TRAIN</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Participants receive structured practical training delivered by experienced technicians.</p>
              </div>

              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-sm mb-4 font-mono">03</div>
                <h4 className="text-lg font-bold text-white mb-2">PRACTICE</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Participants work directly with real smart-home, CCTV, networking and automation equipment.</p>
              </div>

              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-sm mb-4 font-mono">04</div>
                <h4 className="text-lg font-bold text-white mb-2">CERTIFY</h4>
                <p className="text-xs text-slate-300 leading-relaxed">Successful participants receive a BaytLogic certificate with a verifiable certificate ID.</p>
              </div>

              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold text-sm mb-4 font-mono">05</div>
                <h4 className="text-lg font-bold text-white mb-2">PROGRESS</h4>
                <p className="text-xs text-slate-300 leading-relaxed">BaytLogic tracks available post-training outcomes such as employment & entrepreneurship.</p>
              </div>
            </div>
          </div>

          {/* What Sponsored Trainees Receive */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white">What Sponsored Trainees Receive</h3>
              <p className="text-sm text-slate-400 mt-2">Comprehensive hands-on training built around commercial industry standards</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 rounded-2xl p-7 border border-slate-700/80">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Smart Home Automation</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Tuya / Smart Life Ecosystem</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Zigbee Hub & Smart Gateway Setup</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Smart Switch & Relay Wiring</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Door/Window Motion Sensors</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Mobile & Voice Automation Rules</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-7 border border-slate-700/80">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                  <Video className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Professional CCTV Systems</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> IP Cameras & NVR Configurations</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> PoE Switches & IP Subnetting</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> RJ45 Cable Termination & Crimping</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Mobile Remote View Setup</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Hardware Brands: EZVIZ, Reolink, Hikvision</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-7 border border-slate-700/80">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                  <Wrench className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Field Practice & Certification</h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Practical Fault Troubleshooting</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Real-World Site Installation Exercises</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Performance Assessment</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Official Certificate of Completion</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> Online Verifiable Certificate ID</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learner Profile */}
          <div className="mb-24 bg-slate-800/40 rounded-3xl p-8 sm:p-10 border border-slate-700/80">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
                <Users className="w-4 h-4" /> Learner Profile
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Who Our Trainees Are</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Our training programmes attract serious technology learners committed to gaining real technical skills. Participants come from diverse educational backgrounds:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <li className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>University graduates seeking job-ready practical engineering skills.</span>
                </li>
                <li className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Postgraduate students deepening applied technical proficiency.</span>
                </li>
                <li className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700 border-cyan-500/40">
                  <Star className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Four participants are Master's students studying Embedded AI.</strong></span>
                </li>
                <li className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Learners passionate about practical IoT, security, and smart automation.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Proven Impact */}
          <div id="sponsorship-impact" className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">From Training to Real-World Outcomes</h3>
              <p className="text-sm text-slate-400 mt-2">Documented examples of alumni progression following practical training cohorts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/70 rounded-2xl p-8 border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-bold mb-4 font-mono">
                    Internal Employment Outcome
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">8 Graduates Hired as BaytLogic Technical Staff</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    8 graduates from Cohorts 1 & 2 are now working as staff with BaytLogic Technologies. High-performing graduates progressed into technical roles, creating a direct example of how practical training develops talent.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Direct Staff Recruitment</span>
                  <span className="text-cyan-400 font-semibold">Cohorts 1 & 2</span>
                </div>
              </div>

              <div className="bg-slate-800/70 rounded-2xl p-8 border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold mb-4 font-mono">
                    Entrepreneurship Outcome
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">Kareem Shaheed - Kwara State</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    Kareem Shaheed is an alumnus who established his own startup in Kwara State, applying practical smart automation and security installation skills gained during training.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Independent Venture Launch</span>
                  <button type="button" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow">
                    <PlayCircle className="w-3.5 h-3.5" /> Watch Story
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsorship Calculator */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-700 mb-20">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Sponsorship Model</h3>
              <p className="text-sm text-slate-300 mt-2">Clear, predictable per-trainee structure for institutional budgeting</p>
              <div className="mt-4 inline-block px-4 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-full font-extrabold text-sm border border-cyan-500/40 font-mono">
                Base Training Fee: ₦30,000 per trainee
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">10 Trainees</span>
                <div className="text-2xl font-extrabold text-white my-2 font-mono">₦300,000</div>
                <p className="text-[11px] text-slate-400">Illustrative sponsorship amount</p>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/50 text-center shadow-lg relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-[10px] font-bold px-3 py-0.5 rounded-full uppercase font-mono">Popular Cohort</div>
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">25 Trainees</span>
                <div className="text-2xl font-extrabold text-cyan-400 my-2 font-mono">₦750,000</div>
                <p className="text-[11px] text-slate-400">Illustrative sponsorship amount</p>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">50 Trainees</span>
                <div className="text-2xl font-extrabold text-white my-2 font-mono">₦1,500,000</div>
                <p className="text-[11px] text-slate-400">Illustrative sponsorship amount</p>
              </div>
            </div>

            <div className="text-center">
              <a href="https://wa.me/2348032476476?text=Hello%20BaytLogic,%20we%20would%20like%20to%20discuss%20an%20institutional%20sponsorship%20package." target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg transition inline-flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4" /> Discuss Sponsorship
              </a>
            </div>
          </div>

          {/* Donor CTA */}
          <div className="bg-slate-800/80 rounded-3xl p-8 sm:p-12 border border-slate-700 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Help a Young Person Move From Learning to Earning.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              Partner with BaytLogic Technologies to sponsor practical technology training for young people and help expand access to skills, employment pathways and entrepreneurship opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-bold">
              <a href="https://wa.me/2348032476476?text=Hello%20BaytLogic,%20I%20want%20to%20sponsor%20youth%20training." target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl shadow-lg transition flex items-center gap-2">
                <HeartHandshake className="w-4 h-4" /> Sponsor Youth Training
              </a>
              <a href="#contact" className="px-6 py-3.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl border border-slate-600 transition flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" /> Talk to BaytLogic
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Alumni Video Showcase Component */}
      <AlumniVideoShowcase />

      {/* AI Security Planner (Architect) */}
      <section id="ai-planner" className="py-24 border-t border-slate-800/80 bg-slate-950 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> BaytLogic AI Architect
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">BaytLogic AI Security Architect</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Describe your property below. Our team uses an AI-assisted workflow to produce a preliminary security blueprint recommendation.
            </p>
          </div>

          <AIArchitect />
        </div>
      </section>

      {/* Certificate Verification Section */}
      <section id="verification" className="py-24 border-t border-slate-800/80 bg-slate-900/40 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">Registry Certificate Verification</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Verify student records and professional qualifications issued by BaytLogic Academy against our secure repository.
            </p>
          </div>

          <CertificateVerifier />
        </div>
      </section>

      {/* Map Headquarters Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Headquarters & Logistics Hub</h2>
          <p className="text-slate-400 text-sm mb-12 max-w-md mx-auto">Coordinating installations across the region from our Bauchi Center.</p>
          <div className="bg-slate-900 p-2 rounded-3xl border border-slate-800 inline-block w-full max-w-4xl shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.569426362703!2d9.816654874075196!3d10.31602336829705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11001484690e2991%3A0xda59505e27eff7d9!2sBaytLogic%20Technologies!5e0!3m2!1sen!2sng!4v1704664800000!5m2!1sen!2sng"
              width="100%" 
              height="450" 
              style={{ border: 0, borderRadius: '1.25rem' }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-slate-800/80 bg-slate-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/2348032476476?text=Hello%20BaytLogic,%20I%20want%20to%20inquire%20about%20security%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-110 z-50 flex items-center justify-center animate-bounce shadow-emerald-500/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>

      {/* Footer with Bank Details */}
      <footer className="bg-slate-950 py-12 text-center text-slate-400 text-sm border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-4">
          <a href="#" className="inline-block hover:opacity-90 transition">
            <img 
              src="/assets/baytlogic-logo-cyan.png" 
              alt="BaytLogic Technologies - Where Intelligence Meets Security" 
              className="h-16 w-auto object-contain mx-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]" 
            />
          </a>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-semibold pt-2">
            <a href="/verify" className="hover:text-cyan-400 transition flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verify Certificate</a>
            <a href="/boq" className="hover:text-cyan-400 transition flex items-center gap-1">Smart BOQ Estimator</a>
            <a href="/certificate" className="hover:text-cyan-400 transition flex items-center gap-1">Certificate Engine</a>
            <a href="/dashboard/login" className="hover:text-slate-200 transition flex items-center gap-1 opacity-70 hover:opacity-100"><Lock className="w-3 h-3 text-cyan-400" /> Staff Portal</a>
            <a href="/admin" className="hover:text-slate-200 transition flex items-center gap-1 opacity-70 hover:opacity-100">Admin Studio</a>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 font-mono shadow-md">
            Bank Transfer: <strong className="text-slate-200">Stanbic IBTC</strong> • Account: <strong className="text-cyan-400">0072236937</strong> • Name: <strong className="text-slate-200">BaytLogic Technologies</strong>
          </div>

          <p className="text-slate-500 text-xs font-mono">&copy; 2026 BaytLogic Technologies. Engineered in Bauchi, Serving Nigeria.</p>
        </div>
      </footer>

    </div>
  )
}
