import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import InvoiceDashboardClient from './InvoiceDashboardClient'

export const dynamic = 'force-dynamic'

export default async function InvoicePage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('baytlogic_staff_session')

  if (!session || session.value !== 'authenticated') {
    redirect('/dashboard/login')
  }

  return <InvoiceDashboardClient />
}
