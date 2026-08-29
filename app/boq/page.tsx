'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calculator, 
  Printer, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Shield, 
  CheckCircle2, 
  UserCheck, 
  MapPin, 
  Phone, 
  FileText,
  DollarSign
} from 'lucide-react'

interface BOQItem {
  id: number
  name: string
  category: string
  unitPrice: number
  quantity: number
}

const DEFAULT_CATALOG = [
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
  { id: 12, name: "PVC Trunking, Conduits & Accessories Pack", price: 30000, category: "Cabling" },
  { id: 13, name: "Professional Installation, Cabling & Setup Labor", price: 50000, category: "Labor" },
  { id: 14, name: "Youth Training Masterclass Sponsorship Fee (Per Candidate)", price: 30000, category: "Sponsorship" }
]

export default function SmartBOQPage() {
  // Staff & Client Details
  const [staffName, setStaffName] = useState('Yahaya Abdullahi Sulaiman')
  const [staffRole, setStaffRole] = useState('Lead Security Engineer')
  const [boqDate, setBoqDate] = useState('')
  const [boqRef, setBoqRef] = useState('')
  const [clientName, setClientName] = useState('Alhaji Ibrahim Danfulani')
  const [clientPhone, setClientPhone] = useState('+234 802 345 6789')
  const [clientSite, setClientSite] = useState('Residential Duplex, New GRA, Bauchi')
  const [projectTitle, setProjectTitle] = useState('Perimeter Surveillance & Smart Security Installation')

  // Financial Variables
  const [vatPercent, setVatPercent] = useState(7.5)
  const [logisticsFee, setLogisticsFee] = useState(25000)
  const [contingencyFee, setContingencyFee] = useState(15000)

  // Items State
  const [items, setItems] = useState<BOQItem[]>([
    { id: 1, name: "4K AI Outdoor IP Bullet Camera (Hikvision/EZVIZ)", category: "CCTV", unitPrice: 45000, quantity: 4 },
    { id: 3, name: "8-Channel NVR System H.265+ PoE", category: "CCTV", unitPrice: 85000, quantity: 1 },
    { id: 5, name: "4TB Western Digital Purple Surveillance HDD", category: "CCTV", unitPrice: 95000, quantity: 1 },
    { id: 11, name: "Outdoor Weatherproof Cat6 Network Cable (305m)", category: "Cabling", unitPrice: 65000, quantity: 1 },
    { id: 13, name: "Professional Installation, Cabling & Setup Labor", category: "Labor", unitPrice: 50000, quantity: 1 }
  ])

  // New Item Form State
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>('1')
  const [customName, setCustomName] = useState('')
  const [customPrice, setCustomPrice] = useState<number>(0)
  const [customQty, setCustomQty] = useState<number>(1)
  const [isCustomMode, setIsCustomMode] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setBoqDate(today)
    const randomRef = Math.floor(100 + Math.random() * 900)
    setBoqRef(`BOQ-2026-${randomRef}`)
  }, [])

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
  const vatAmount = (subtotal * vatPercent) / 100
  const grandTotal = subtotal + vatAmount + Number(logisticsFee) + Number(contingencyFee)

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (isCustomMode) {
      if (!customName.trim() || customPrice <= 0) return
      const newItem: BOQItem = {
        id: Date.now(),
        name: customName.trim(),
        category: "Custom",
        unitPrice: customPrice,
        quantity: Math.max(1, customQty)
      }
      setItems([...items, newItem])
      setCustomName('')
      setCustomPrice(0)
      setCustomQty(1)
    } else {
      const catItem = DEFAULT_CATALOG.find(c => c.id === Number(selectedCatalogId))
      if (!catItem) return
      const newItem: BOQItem = {
        id: Date.now(),
        name: catItem.name,
        category: catItem.category,
        unitPrice: customPrice > 0 ? customPrice : catItem.price,
        quantity: Math.max(1, customQty)
      }
      setItems([...items, newItem])
      setCustomQty(1)
    }
  }

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleQtyChange = (id: number, qty: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(1, qty) } : item))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
      
      {/* Top Bar (Hidden on Print) */}
      <header className="no-print bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyan-400 flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider text-white">BAYTLOGIC</span>
              <span className="text-xs text-cyan-400 block font-semibold tracking-widest uppercase">Smart BOQ & Quotation Studio</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <Link href="/" className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition border border-slate-700 flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
            </Link>
            <Link href="/admin" className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition border border-slate-700">
              Admin Studio
            </Link>
            <button 
              onClick={() => window.print()} 
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition shadow-lg flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print / Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Controls (Hidden on Print) */}
        <div className="no-print lg:col-span-5 space-y-6">
          
          {/* Staff & Project Details */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <UserCheck className="w-4 h-4 text-cyan-400" /> Staff & Client Information
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Project Title / Scope</label>
                <input 
                  type="text" 
                  value={projectTitle} 
                  onChange={(e) => setProjectTitle(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Generating Engineer</label>
                  <input 
                    type="text" 
                    value={staffName} 
                    onChange={(e) => setStaffName(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Reference ID</label>
                  <input 
                    type="text" 
                    value={boqRef} 
                    onChange={(e) => setBoqRef(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 font-mono font-bold outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Client Full Name / Org</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Client Phone</label>
                  <input 
                    type="text" 
                    value={clientPhone} 
                    onChange={(e) => setClientPhone(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Date</label>
                  <input 
                    type="date" 
                    value={boqDate} 
                    onChange={(e) => setBoqDate(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Installation Site Address</label>
                <input 
                  type="text" 
                  value={clientSite} 
                  onChange={(e) => setClientSite(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Add Line Item Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" /> Add Equipment / Service Item
              </h3>
              <button 
                type="button" 
                onClick={() => setIsCustomMode(!isCustomMode)}
                className="text-[11px] text-cyan-400 hover:underline font-semibold"
              >
                {isCustomMode ? "Select from Catalog" : "+ Custom Item"}
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              {!isCustomMode ? (
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Catalog Item</label>
                  <select 
                    value={selectedCatalogId} 
                    onChange={(e) => {
                      setSelectedCatalogId(e.target.value)
                      const c = DEFAULT_CATALOG.find(x => x.id === Number(e.target.value))
                      if (c) setCustomPrice(c.price)
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400"
                  >
                    {DEFAULT_CATALOG.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        [{cat.category}] {cat.name} - ₦{cat.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Custom Item Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 10kVA Hybrid Solar Inverter"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Unit Price (₦)</label>
                  <input 
                    type="number" 
                    value={customPrice || ''}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    placeholder="Price per unit"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Quantity</label>
                  <input 
                    type="number" 
                    min="1"
                    value={customQty}
                    onChange={(e) => setCustomQty(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition shadow flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Append Item to BOQ
              </button>
            </form>
          </div>

          {/* Adjustments: VAT, Logistics, Contingency */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
              <Calculator className="w-4 h-4 text-cyan-400" /> Commercial Adjustments
            </h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">VAT (%)</label>
                <input 
                  type="number" 
                  value={vatPercent} 
                  onChange={(e) => setVatPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Logistics (₦)</label>
                <input 
                  type="number" 
                  value={logisticsFee} 
                  onChange={(e) => setLogisticsFee(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Contingency (₦)</label>
                <input 
                  type="number" 
                  value={contingencyFee} 
                  onChange={(e) => setContingencyFee(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Printable BOQ Document Preview */}
        <div className="lg:col-span-7">
          <div 
            id="boqPrintDocument" 
            className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8 border border-slate-200"
          >
            
            {/* Header / Institutional Branding */}
            <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white">
                    <Shield className="w-5 h-5 text-cyan-400 stroke-[2.5]" />
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-wider text-slate-950">BAYTLOGIC</h1>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 font-mono">
                  BaytLogic Technologies Ltd • RC: 7291048
                </p>
                <p className="text-xs text-slate-600">
                  Ibrahim Bako, Bauchi, Nigeria • +234 803 247 6476 • info@baytlogic.com.ng
                </p>
              </div>

              <div className="text-right space-y-1">
                <span className="inline-block px-3 py-1 bg-slate-950 text-white rounded font-mono font-bold text-xs">
                  BILL OF QUANTITIES
                </span>
                <p className="text-xs font-mono font-bold text-slate-900">Ref: {boqRef}</p>
                <p className="text-xs text-slate-600">Date: {boqDate}</p>
              </div>
            </div>

            {/* Client & Project Details Grid */}
            <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">PREPARED FOR:</span>
                <strong className="text-sm font-extrabold text-slate-900 block">{clientName}</strong>
                <p className="text-slate-600 font-medium">{clientPhone}</p>
                <p className="text-slate-600">{clientSite}</p>
              </div>

              <div className="space-y-1 text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">PROJECT SCOPE:</span>
                <strong className="text-xs font-bold text-slate-900 block">{projectTitle}</strong>
                <p className="text-slate-600">Engineer: <span className="font-semibold text-slate-900">{staffName}</span></p>
                <p className="text-[11px] text-slate-500 font-mono">BaytLogic Engineering Services</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-900 bg-slate-100 text-slate-700">
                    <th className="py-2.5 px-3 font-bold">#</th>
                    <th className="py-2.5 px-3 font-bold">Equipment & Description</th>
                    <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                    <th className="py-2.5 px-3 font-bold text-right">Rate (₦)</th>
                    <th className="py-2.5 px-3 font-bold text-right">Amount (₦)</th>
                    <th className="no-print py-2.5 px-2 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="py-2.5 px-3 text-slate-400 font-mono">{index + 1}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        {item.name}
                        <span className="text-[10px] block text-slate-500 font-normal">Category: {item.category}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <input 
                          type="number" 
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                          className="no-print w-12 text-center border border-slate-300 rounded px-1 py-0.5"
                        />
                        <span className="hidden print:inline font-bold">{item.quantity}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">{item.unitPrice.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {(item.unitPrice * item.quantity).toLocaleString()}
                      </td>
                      <td className="no-print py-2.5 px-2 text-center">
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="flex justify-end pt-4 border-t-2 border-slate-900">
              <div className="w-72 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Materials & Equipment:</span>
                  <span className="font-mono font-bold text-slate-900">₦{subtotal.toLocaleString()}</span>
                </div>
                {vatPercent > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>VAT ({vatPercent}%):</span>
                    <span className="font-mono text-slate-900">₦{vatAmount.toLocaleString()}</span>
                  </div>
                )}
                {logisticsFee > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Logistics & Transit:</span>
                    <span className="font-mono text-slate-900">₦{Number(logisticsFee).toLocaleString()}</span>
                  </div>
                )}
                {contingencyFee > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Site Contingency:</span>
                    <span className="font-mono text-slate-900">₦{Number(contingencyFee).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-slate-950 pt-2 border-t border-slate-300">
                  <span>TOTAL ESTIMATE:</span>
                  <span className="font-mono text-base text-cyan-800">₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Banking & Terms */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 text-[11px] text-slate-600">
              <div className="space-y-1">
                <strong className="text-slate-900 block font-bold uppercase text-[10px]">Payment Details:</strong>
                <p>Bank: <span className="font-semibold text-slate-900">Jaiz Bank / Moniepoint</span></p>
                <p>Account Name: <span className="font-semibold text-slate-900">BaytLogic Technologies</span></p>
                <p>Account Number: <span className="font-mono font-semibold text-slate-900">0014298412</span></p>
              </div>

              <div className="text-right space-y-3">
                <div className="h-10 border-b border-slate-400 inline-block w-40"></div>
                <p className="font-bold text-slate-900 text-xs">Authorizing Engineer Signature</p>
                <p className="text-[10px] text-slate-500">BaytLogic Engineering Directorate</p>
              </div>
            </div>

          </div>
        </div>

      </main>

      <style jsx global>{`
        @media print {
          .no-print, header { display: none !important; }
          body { background: white !important; color: black !important; padding: 0 !important; }
          #boqPrintDocument { box-shadow: none !important; border: none !important; padding: 0 !important; width: 100% !important; max-width: 100% !important; }
        }
      `}</style>
    </div>
  )
}
