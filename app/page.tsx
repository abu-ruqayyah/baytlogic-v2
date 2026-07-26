import { client } from '@/sanity/lib/client'
import PortfolioGrid from '@/components/PortfolioGrid'
import CertificateVerifier from '@/components/CertificateVerifier'
import NeuralNetworkCanvas from '@/components/NeuralNetworkCanvas'
import StatsSection from '@/components/StatsSection'
import AIArchitect from '@/components/AIArchitect'
import ContactForm from '@/components/ContactForm'

import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Globe, 
  Zap, 
  ClipboardCheck, 
  Network, 
  Building2, 
  Cctv, 
  Bot, 
  GraduationCap 
} from 'lucide-react'

// Revalidate page data every 10 seconds to show newly published projects immediately
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
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-black/75 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="w-5 h-5 text-zinc-950 stroke-[2]" />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight">BAYTLOGIC</span>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="text-[10px] text-cyan-400 tracking-widest uppercase font-bold font-mono">TECHNOLOGIES</span>
                <span className="inline-flex items-center px-1 rounded text-[8px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                  NATIONWIDE
                </span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Home</a>
            <a href="#services" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Solutions</a>
            <a href="#projects" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Portfolio</a>
            <a href="#training" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Academy</a>
            <a href="#ai-planner" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Architect
            </a>
            <a href="#contact" className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-sm font-bold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20">
              Get a Quote
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 max-w-5xl mx-auto px-6 text-center overflow-hidden min-h-[75vh] flex flex-col justify-center items-center">
        {/* Animated Canvas */}
        <NeuralNetworkCanvas />

        <div className="relative z-10 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/20 text-cyan-300 text-xs font-semibold backdrop-blur-sm">
            🛡️ Engineering-Grade Security Solutions
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Advanced Surveillance & <br/> <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">Embedded AI Systems</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We don't just install cameras; we engineer safety. From our HQ in Bauchi to deployments in Abuja and nationwide, we secure what matters most.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="#contact" className="px-8 py-4 bg-cyan-500 text-zinc-950 font-bold rounded-xl shadow-lg shadow-cyan-500/10 hover:bg-cyan-450 transition duration-300 flex items-center justify-center gap-2 group hover:scale-105 active:scale-98">
              Request Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/docs/BaytLogic_Technologies_Corporate_Profile_V2.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 bg-transparent border border-zinc-800 text-white font-bold rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 flex items-center justify-center">
              Download Company Profile
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 text-zinc-500 text-xs font-semibold font-mono">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> ENGINEERING-LED DEPLOYMENTS</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> NATIONWIDE LOGISTICS</span>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <StatsSection />

      {/* Why Choose Us (Advantage) */}
      <section id="services" className="py-24 bg-zinc-950 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">The BaytLogic Advantage</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">Why Business Leaders Choose Us</h2>
            <p className="mt-4 max-w-2xl text-zinc-400 text-sm mx-auto leading-relaxed">
              Bridging the gap between theoretical AI research and practical field security across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/40 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Expert Led Engineering</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Projects delivered by an engineering-led team with strong **Embedded AI** and field deployment experience. We understand the code behind the camera.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Remote & Cloud Viewing</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Whether you are in Lagos, London, or Dubai, monitor your assets in real-time via secure cloud applications with multi-factor authentication.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-850 hover:border-zinc-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Optimized for Nigeria</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our systems are engineered for local conditions, designed to be fully compatible with rugged solar setups and smart inverter topologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Government & Institutional Capability */}
      <section id="government" className="py-24 border-t border-zinc-900 bg-black relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">Institutional Capability</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white tracking-tight">Government & Institutional Deployments</h2>
            <p className="mt-4 max-w-2xl text-zinc-400 text-sm mx-auto leading-relaxed">
              BaytLogic designs and deploys engineering-grade surveillance and smart infrastructure systems for ministries, universities, hospitals, and public facilities across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-cyan-400 mb-5">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Structured Delivery</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Strict compliance framework: Site Survey → System Design → Deployment → Commissioning → Training → Maintenance (SLA).
              </p>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-cyan-400 mb-5">
                <Network className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Engineering-Grade Systems</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Structured IP CCTV/NVR nodes, control room setups, biometric access control integrations, and network hardening schemes.
              </p>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-900 p-8 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-cyan-400 mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Verified Institutional Experience</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Institutional CCTV infrastructure deployed and running at the **ATBU – Department of Computer & Communications Engineering Laboratory**.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-6 py-3 bg-zinc-900 hover:bg-zinc-850 text-white font-bold border border-zinc-800 rounded-xl transition duration-350 text-sm flex items-center justify-center">
              Request Institutional Proposal
            </a>
            <a href="/docs/BaytLogic_Technologies_Corporate_Profile_V2.pdf" target="_blank" rel="noreferrer" className="px-6 py-3 bg-transparent border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition duration-300 text-sm flex items-center justify-center">
              Download Company Profile
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects (Portfolio) */}
      <section id="projects" className="py-24 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">Portfolio</span>
              <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight">Featured Installations</h2>
              <p className="mt-2 text-zinc-400 text-sm leading-relaxed max-w-md">
                From high-security institutional research laboratories to residential automation estates in Bauchi, Abuja, and beyond.
              </p>
            </div>
            <a
              href="/studio"
              target="_blank"
              rel="noreferrer"
              className="self-start md:self-end px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold border border-zinc-800 transition-all duration-300 text-sm flex items-center gap-2"
            >
              + Studio Dashboard
            </a>
          </div>

          <PortfolioGrid initialProjects={projects} />
        </div>
      </section>

      {/* Academy & Training Bootcamps */}
      <section id="training" className="py-24 border-t border-zinc-900 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4 uppercase tracking-wider font-mono">
              <GraduationCap className="w-3.5 h-3.5" /> BaytLogic Academy
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Upcoming Training & Bootcamps</h2>
            <p className="mt-4 max-w-2xl text-zinc-400 text-sm mx-auto leading-relaxed">
              Empowering local developers, network engineers, and students with practical hands-on technical instruction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Course 1: Smart Home & CCTV */}
            <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-cyan-500 text-zinc-950 text-[10px] font-bold px-4 py-1 rounded-bl-xl font-mono uppercase tracking-wider">
                Starts March 28
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-cyan-500/10 border border-cyan-500/20 p-3.5 rounded-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all duration-300">
                  <Cctv className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Smart Home & CCTV</h3>
                  <p className="text-cyan-400 font-semibold text-xs tracking-wider uppercase font-mono">Professional Class</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Master the layout design, sensor placement, network cabling, NVR port forwarding, and remote application sync of modern IP surveillance.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://forms.gle/3o4bD2jJa5Tx9eCLA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 rounded-lg transition-all duration-300">
                  Register Now <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </a>
                <a href="#verification" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors uppercase tracking-wider font-mono">
                  Verify Student Certificate
                </a>
              </div>
            </div>

            {/* Course 2: Kids Robotics */}
            <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl font-mono uppercase tracking-wider animate-pulse">
                April 6 - April 24
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-500/10 border border-purple-500/20 p-3.5 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-zinc-950 transition-all duration-300">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Robotics Bootcamp</h3>
                  <p className="text-purple-400 font-semibold text-xs tracking-wider uppercase font-mono">Kids & Teens Class</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                A hands-on electronics class covering loop logic, sensor configurations, and micro-controller assembly in a child-friendly curriculum.
              </p>
              <a href="https://wa.me/2348032476476?text=Hello%20BaytLogic,%20I%20am%20interested%20in%20pre-registering%20my%20child%20for%20the%20Kids%20Robotics%20Bootcamp." target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold px-4 py-2.5 border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-zinc-950 rounded-lg transition-all duration-300">
                Pre-Register <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI Security Planner (Architect) */}
      <section id="ai-planner" className="py-24 border-t border-zinc-950 bg-zinc-950/40 relative">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> BaytLogic Architect
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">AI Security Blueprint Architect</h2>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Describe your property layout. Our integrated intelligence system will draft a technical blueprint recommendation for surveillance nodes and automation zones.
            </p>
          </div>

          <AIArchitect />
        </div>
      </section>

      {/* Certificate Verification Section */}
      <section id="verification" className="py-24 border-t border-zinc-900 bg-black relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">Registry Certificate Verification</h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Verify student records and professional qualifications issued by BaytLogic Academy against our secure repository.
            </p>
          </div>

          <CertificateVerifier />
        </div>
      </section>

      {/* Trusted Partners Grid */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-zinc-500 tracking-widest uppercase font-mono mb-8">Trusted By & Partnered With</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
            {/* Nurture Roots */}
            <div className="text-lg font-extrabold tracking-widest text-zinc-400 font-mono hover:text-white transition duration-300">
              NURTURE ROOTS FOUNDATION
            </div>
            
            {/* Nasscomsoft Embedded */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-left pl-3 border-l-2 border-zinc-800">
                <span className="text-xl font-black text-zinc-400 tracking-tighter">NASSCOMSOFT</span>
                <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase font-mono -mt-1">EMBEDDED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Headquarters Section */}
      <section className="py-20 bg-black border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Headquarters & Logistics Hub</h2>
          <p className="text-zinc-400 text-sm mb-12 max-w-md mx-auto">Coordinating installations and training bootcamps nationwide from our main Bauchi center.</p>
          <div className="bg-zinc-900 p-2 rounded-3xl border border-zinc-800 inline-block w-full max-w-4xl shadow-2xl">
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
      <section id="contact" className="py-24 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/2348032476476?text=Hello%20BaytLogic,%20I%20want%20to%20inquire%20about%20security%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-450 text-zinc-950 p-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-110 z-50 flex items-center justify-center animate-bounce shadow-emerald-500/20"
      >
        {/* WhatsApp Icon representation using simple SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 bg-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-zinc-500 font-mono">
          <p>© 2026 BaytLogic Technologies. Engineered in Bauchi, Serving Nigeria.</p>
          <div className="flex gap-6">
            <a href="/studio" className="hover:text-zinc-300 transition-colors">Sanity Studio</a>
            <a href="https://nextjs.org" className="hover:text-zinc-300 transition-colors">Next.js Turbopack</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
