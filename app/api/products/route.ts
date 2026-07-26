import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

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

export async function GET() {
  try {
    const products = await client.fetch(
      `*[_type == "product"] | order(category asc, title asc) {
        _id,
        title,
        sku,
        price,
        category,
        description
      }`
    )
    
    // If no products exist in the database, return our default hardware list
    if (!products || products.length === 0) {
      return NextResponse.json(FALLBACK_PRODUCTS)
    }

    return NextResponse.json(products)
  } catch (err) {
    console.warn('Sanity query failed, returning local fallback products list:', err)
    return NextResponse.json(FALLBACK_PRODUCTS)
  }
}
