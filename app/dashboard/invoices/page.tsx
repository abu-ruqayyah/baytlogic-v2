'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import InvoiceDashboardClient from './InvoiceDashboardClient'

export default function InvoicePage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Check local storage for authorization instead of cookies (which require a server)
    const isAuthenticated = localStorage.getItem('baytlogic_staff_authenticated')
    if (isAuthenticated !== 'true') {
      router.push('/dashboard/login')
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono text-xs">
        Verifying authorization...
      </div>
    )
  }

  return <InvoiceDashboardClient />
}
