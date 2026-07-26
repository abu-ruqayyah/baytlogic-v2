import React from 'react'

interface InvoiceItem {
  id: string
  title: string
  sku: string
  price: number
  quantity: number
}

interface InvoiceTemplateProps {
  invoiceNumber: string
  clientName: string
  clientPhone: string
  clientAddress: string
  items: InvoiceItem[]
  taxRate: number
  discount: number
  staffName: string
  docType: 'Invoice' | 'Receipt'
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial'
}

export default function InvoiceTemplate({
  invoiceNumber,
  clientName,
  clientPhone,
  clientAddress,
  items,
  taxRate,
  discount,
  staffName,
  docType,
  paymentStatus
}: InvoiceTemplateProps) {
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount - discount

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div id="invoice-print-area" className="w-full max-w-[210mm] mx-auto bg-white text-zinc-950 p-[15mm] border border-zinc-100 shadow-sm print:shadow-none print:border-none print:p-0 print:m-0 font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start border-b-2 border-zinc-900 pb-8 mb-8">
        <div>
          {/* BRAND LOGO */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight block leading-none text-zinc-950">BAYTLOGIC</span>
              <span className="text-[9px] text-zinc-600 tracking-widest uppercase font-bold font-mono">TECHNOLOGIES</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 leading-relaxed font-mono">
            <p className="font-semibold text-zinc-800 uppercase">BaytLogic Technologies Ltd.</p>
            <p>NITEL T-Junction, Atiku Abubakar Road,</p>
            <p>Ibrahim Bako, Bauchi, Bauchi State, Nigeria.</p>
            <p>Tel: +234 803 247 6476 | Email: info@baytlogic.com.ng</p>
            <p className="mt-1 font-bold text-zinc-700">CAC Reg No: 8509421 | Tax TIN: 33220276-0001</p>
          </div>
        </div>

        {/* INVOICE INFO */}
        <div className="text-right">
          <h1 className="text-4xl font-black text-zinc-900 uppercase tracking-tight mb-2">{docType}</h1>
          <div className="text-xs font-mono text-zinc-600 space-y-1">
            <p><span className="font-bold text-zinc-800">Doc Number:</span> {invoiceNumber}</p>
            <p><span className="font-bold text-zinc-800">Date Generated:</span> {currentDate}</p>
            <p>
              <span className="font-bold text-zinc-800">Payment Status:</span>{' '}
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                paymentStatus === 'Partial' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {paymentStatus}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* BILLING DETAILS */}
      <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-zinc-100">
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">Client Details</span>
          <div className="text-xs text-zinc-800 space-y-1">
            <p className="font-bold text-sm text-zinc-900">{clientName || 'N/A'}</p>
            {clientPhone && <p className="font-mono">{clientPhone}</p>}
            {clientAddress && <p className="whitespace-pre-line leading-relaxed">{clientAddress}</p>}
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">Official Bank Coordinates</span>
          <div className="text-xs text-zinc-800 space-y-1">
            <p className="font-bold text-zinc-900">Stanbic IBTC</p>
            <p className="font-mono font-bold text-sm tracking-wide text-zinc-900">0072236937</p>
            <p className="font-semibold text-zinc-700">BaytLogic Technologies</p>
            <p className="text-[10px] text-zinc-500 italic mt-2 leading-tight">Please include the Document Number as the payment narration.</p>
          </div>
        </div>
      </div>

      {/* LINE ITEMS TABLE */}
      <div className="mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950 text-white text-[10px] font-bold font-mono uppercase tracking-wider">
              <th className="py-3 px-4 rounded-l-md">S/N</th>
              <th className="py-3 px-4">Item & Model</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-right">Unit Price</th>
              <th className="py-3 px-4 text-right rounded-r-md">Total Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map((item, index) => (
              <tr key={item.id} className="text-xs text-zinc-800">
                <td className="py-4 px-4 font-mono">{index + 1}</td>
                <td className="py-4 px-4">
                  <p className="font-bold text-zinc-950">{item.title}</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.sku}</p>
                </td>
                <td className="py-4 px-4 text-center font-mono">{item.quantity}</td>
                <td className="py-4 px-4 text-right font-mono">{formatNaira(item.price)}</td>
                <td className="py-4 px-4 text-right font-mono font-bold text-zinc-950">{formatNaira(item.price * item.quantity)}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-zinc-400 italic">No items added to this document.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TOTALS SECTION */}
      <div className="flex justify-between items-start mb-12">
        <div className="text-xs font-mono text-zinc-500 max-w-sm">
          <p className="font-bold text-zinc-700 uppercase mb-1">Standard Terms & Conditions</p>
          <p className="leading-relaxed">All products carry a manufacturer warranty. Physical damage, voltage surges, or lightning strikes invalidate the warranty. Goods remain the property of BaytLogic Technologies until payment is completed.</p>
        </div>

        <div className="w-80 font-mono text-xs">
          <div className="space-y-2.5">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal:</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            {taxRate > 0 && (
              <div className="flex justify-between text-zinc-600">
                <span>VAT ({taxRate}%):</span>
                <span>{formatNaira(taxAmount)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Discount / Deduction:</span>
                <span>-{formatNaira(discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-zinc-900 pt-2.5 text-sm font-black text-zinc-950">
              <span>Grand Total:</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNATURE SECTION */}
      <div className="grid grid-cols-2 gap-12 mt-12 pt-12 border-t border-zinc-100">
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-12 font-mono">Issued By</span>
          <div className="text-xs text-zinc-800">
            <p className="font-bold text-zinc-950">{staffName}</p>
            <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">Authorised Staff Representative</p>
            <div className="w-40 border-b border-zinc-300 mt-6" />
          </div>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-12 font-mono">Client Acknowledgment</span>
          <div className="text-xs text-zinc-800">
            <p className="italic text-zinc-400">Signature \& Date</p>
            <div className="w-40 border-b border-zinc-300 mt-10" />
          </div>
        </div>
      </div>

    </div>
  )
}
