'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Plus, Trash2, Printer, LogOut, FileText, User, MapPin, Phone, Percent, Tag } from 'lucide-react'
import InvoiceTemplate from '@/components/InvoiceTemplate'
import { client } from '@/sanity/lib/client'

interface Product {
  _id: string
  title: string
  sku: string
  price: number
  category: string
  description?: string
}

interface InvoiceItem {
  id: string
  title: string
  sku: string
  price: number
  quantity: number
}

const FALLBACK_PRODUCTS = [
  { _id: 'fb-1', title: 'Hikvision 4MP Smart IR Dome Camera', sku: 'DS-2CD1143G0-I', price: 45000, category: 'cctv', description: '4MP Indoor/Outdoor Dome Network Camera with Smart IR' },
  { _id: 'fb-2', title: 'Hikvision 4MP Smart IR Bullet Camera', sku: 'DS-2CD1043G0-I', price: 48000, category: 'cctv', description: '4MP Weatherproof Bullet Network Camera' },
  { _id: 'fb-3', title: 'Hikvision 8-Channel PoE Network Video Recorder', sku: 'DS-7608NI-K1/8P', price: 95000, category: 'nvr', description: '8-Channel 4K NVR with 8 independent PoE ports' },
  { _id: 'fb-4', title: 'Hikvision 16-Channel PoE Network Video Recorder', sku: 'DS-7616NI-K2/16P', price: 165000, category: 'nvr', description: '16-Channel 4K NVR with 16 independent PoE ports' },
  { _id: 'fb-5', title: 'Seagate SkyHawk 4TB Surveillance Hard Drive', sku: 'ST4000VX016', price: 78000, category: 'nvr', description: '3.5-inch SATA 6Gb/s surveillance optimized storage' },
  { _id: 'fb-6', title: 'Seagate SkyHawk 8TB Surveillance Hard Drive', sku: 'ST8000VX004', price: 145000, category: 'nvr', description: 'Surveillance-grade high availability storage' },
  { _id: 'fb-7', title: 'D-Link Cat6 UTP Cable Box (305m)', sku: 'NCB-C6UGRYR-305', price: 65000, category: 'networking', description: 'Pure copper 23AWG Cat6 networking cable box' },
  { _id: 'fb-8', title: 'Ubiquiti UniFi U6 Lite Access Point', sku: 'U6-Lite', price: 110000, category: 'networking', description: 'Dual-band Wi-Fi 6 AP with 1.5 Gbps aggregate rate' },
  { _id: 'fb-9', title: 'Jinko Solar 450W Mono Half-Cell Panel', sku: 'JKM450M-72H', price: 120000, category: 'power', description: 'High efficiency Monocrystalline PV panel' },
  { _id: 'fb-10', title: 'Pragmatic 12V 200Ah Gel Deep Cycle Battery', sku: 'PR-200AH-GEL', price: 280000, category: 'power', description: 'Maintenance-free solar gel battery' },
  { _id: 'fb-11', title: 'System Installation, Configuration & Commissioning Fee', sku: 'SVC-INSTALL', price: 150000, category: 'other', description: 'Structured cabling, mounting, software setup, and user training service charge' }
]

export default function InvoiceDashboardClient() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Invoice Document States
  const [docType, setDocType] = useState<'Invoice' | 'Receipt'>('Invoice')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [staffName, setStaffName] = useState('Yahaya Sulaiman Abdullahi')
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Unpaid' | 'Partial'>('Unpaid')
  const [taxRate, setTaxRate] = useState<number>(7.5) // Standard Nigerian VAT
  const [discount, setDiscount] = useState<number>(0)
  
  // Builder States
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [customPrice, setCustomPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)

  // Auto-generate invoice/receipt number on load
  useEffect(() => {
    const year = new Date().getFullYear()
    const rand = Math.floor(1000 + Math.random() * 9000)
    const code = docType === 'Invoice' ? 'INV' : 'REC'
    setInvoiceNumber(`BL-${year}-${code}-${rand}`)
    setPaymentStatus(docType === 'Invoice' ? 'Unpaid' : 'Paid')
  }, [docType])

  // Load authenticated staff name from localStorage on mount
  useEffect(() => {
    const name = localStorage.getItem('baytlogic_staff_name')
    if (name) {
      setStaffName(name)
    }
  }, [])

  // Fetch catalog from Sanity client-side
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product"] | order(category asc, title asc) {
            _id,
            title,
            sku,
            price,
            category,
            description
          }`
        )
        
        const activeProducts = data && data.length > 0 ? data : FALLBACK_PRODUCTS
        setProducts(activeProducts)
        if (activeProducts.length > 0) {
          setSelectedProductId(activeProducts[0]._id)
          setCustomPrice(activeProducts[0].price)
        }
      } catch (err) {
        console.error('Failed to load products from Sanity, using fallback:', err)
        setProducts(FALLBACK_PRODUCTS)
        if (FALLBACK_PRODUCTS.length > 0) {
          setSelectedProductId(FALLBACK_PRODUCTS[0]._id)
          setCustomPrice(FALLBACK_PRODUCTS[0].price)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Auto-fill price when product changes
  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId)
    const prod = products.find(p => p._id === productId)
    if (prod) {
      setCustomPrice(prod.price)
    }
  }

  // Add Item to list
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    const prod = products.find(p => p._id === selectedProductId)
    if (!prod) return

    const newItem: InvoiceItem = {
      id: `${prod._id}-${Date.now()}`,
      title: prod.title,
      sku: prod.sku,
      price: customPrice,
      quantity: quantity
    }

    setItems(prev => [...prev, newItem])
    // Reset quantity
    setQuantity(1)
  }

  // Remove Item from list
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  // Trigger browser A4 printing
  const handlePrint = () => {
    window.print()
  }

  // Log out staff session
  const handleLogout = async () => {
    localStorage.removeItem('baytlogic_staff_authenticated')
    localStorage.removeItem('baytlogic_staff_name')
    router.push('/dashboard/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      
      {/* Dynamic inline print style sheet overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body, html {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          #invoice-print-area {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 auto !important;
          }
        }
      `}} />

      {/* DASHBOARD HEADER */}
      <header className="no-print bg-zinc-900/80 border-b border-zinc-800 py-4 px-6 sticky top-0 backdrop-blur-md z-30 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center">
            <Shield className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight block leading-none">BAYTLOGIC</span>
            <span className="text-[8px] text-cyan-400 tracking-widest uppercase font-bold font-mono">STAFF PORTAL</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400 font-mono hidden md:inline">User: <strong className="text-white">{staffName}</strong></span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/10 hover:text-red-400 border border-zinc-700 hover:border-red-500/20 text-xs transition-all duration-300 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: CONFIGURATION FORM */}
          <div className="no-print lg:col-span-5 space-y-6">
            
            {/* DOCUMENT SELECTOR */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-4">Document Type</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDocType('Invoice')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all duration-300 ${
                    docType === 'Invoice'
                      ? 'bg-cyan-500 text-zinc-950 border-cyan-400'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <FileText className="w-4 h-4" /> Invoice
                </button>
                <button
                  onClick={() => setDocType('Receipt')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all duration-300 ${
                    docType === 'Receipt'
                      ? 'bg-cyan-500 text-zinc-950 border-cyan-400'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Shield className="w-4 h-4" /> Receipt
                </button>
              </div>
            </div>

            {/* CLIENT DETAILS */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono">Client Details</h2>
              
              <div>
                <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Client Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"><User className="w-3.5 h-3.5" /></span>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="E.g., John Doe"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Telephone Number</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"><Phone className="w-3.5 h-3.5" /></span>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="E.g., +234 803 123 4567"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Physical Address</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-zinc-500"><MapPin className="w-3.5 h-3.5" /></span>
                  <textarea
                    rows={2}
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    placeholder="E.g., 12 Gombe Road, Bauchi"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:border-cyan-500/50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT ADDER */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono">Add Line Items</h2>
              
              {loading ? (
                <p className="text-xs text-zinc-500 font-mono animate-pulse">Loading products database...</p>
              ) : (
                <form onSubmit={handleAddItem} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Select Product / Service</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => handleProductChange(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-500/50"
                    >
                      {products.map(p => (
                        <option key={p._id} value={p._id}>
                          [{p.category.toUpperCase()}] {p.title} ({p.sku})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Unit Price (NGN)</label>
                      <input
                        type="number"
                        min="0"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-500/50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-500/50 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" /> Add Item to Document
                  </button>
                </form>
              )}
            </div>

            {/* DEDUCTIONS & DISCOUNTS */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono">Deductions \& Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">VAT Tax Rate (%)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><Percent className="w-3.5 h-3.5" /></span>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 pl-8 pr-3 text-xs outline-none focus:border-cyan-500/50 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Discount (NGN)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><Tag className="w-3.5 h-3.5" /></span>
                    <input
                      type="number"
                      min="0"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 pl-8 pr-3 text-xs outline-none focus:border-cyan-500/50 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-500/50"
                  >
                    <option value="Unpaid">Unpaid / Pending</option>
                    <option value="Paid">Fully Paid</option>
                    <option value="Partial">Partially Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 mb-1.5 font-mono uppercase">Staff Name</label>
                  <input
                    type="text"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    placeholder="Staff Username"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: LIVE PREVIEW & CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* PRINT ACTION BAR */}
            <div className="no-print bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <h3 className="text-xs text-zinc-400 font-mono">LIVE PREVIEW SHEET</h3>
                <p className="text-xs font-bold text-white mt-0.5">Check spelling, products, and prices before compiling.</p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-extrabold text-xs shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Printer className="w-4 h-4" /> Download PDF / Print
              </button>
            </div>

            {/* RENDERED INVOICE TEMPLATE WITH ADDED ITEMS */}
            <div className="bg-zinc-900 border border-zinc-800 p-2 md:p-6 rounded-2xl overflow-x-auto">
              {/* CURRENTLY ADDED ITEMS LIST (Editable Overlay) */}
              <div className="no-print bg-zinc-950/50 p-4 rounded-xl mb-4 border border-zinc-850">
                <h4 className="text-xs font-bold text-zinc-400 mb-3 font-mono uppercase tracking-wider">Current items on draft ({items.length})</h4>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-zinc-900 rounded-lg border border-zinc-850 hover:border-zinc-800 text-xs">
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.sku} | Qty: {item.quantity} | Unit: ₦{item.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1.5 hover:bg-red-500/5 rounded-lg transition-all duration-300"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="text-xs text-zinc-600 italic py-2 text-center">Add hardware products or labor fees using the left builder panel.</p>
                  )}
                </div>
              </div>

              {/* PDF RENDER VIEW */}
              <div className="w-full min-w-[210mm] lg:min-w-0">
                <InvoiceTemplate
                  invoiceNumber={invoiceNumber}
                  clientName={clientName}
                  clientPhone={clientPhone}
                  clientAddress={clientAddress}
                  items={items}
                  taxRate={taxRate}
                  discount={discount}
                  staffName={staffName}
                  docType={docType}
                  paymentStatus={paymentStatus}
                />
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
