import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { description } = await request.json().catch(() => ({}))

    if (!description || description.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a property description of at least 5 characters.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY

    // If API key is not configured locally, return an intelligent architectural blueprint template
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. Generating high-fidelity blueprint fallback.')
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      
      const generatedPlan = `### 🏢 BaytLogic Security Architecture Blueprint
**Generated Date:** ${today}
**Property Scope:** "${description}"

---

#### 1. 🛡️ Vulnerability & Perimeter Assessment
- **Entry Points:** Main gates, rear access points, boundary walls, and setback blindspots identified.
- **Perimeter Lighting:** Infrared/white-light smart illuminators required for low-light deterrence.
- **Power Risk:** Vulnerable to grid instability and low-voltage surges; dedicated inverter backup required.

#### 2. 📹 Recommended CCTV Surveillance Setup
- **Perimeter & Gate:** 4K Ultra HD AI Outdoor Bullet Cameras (Hikvision/EZVIZ) with human/vehicle classification and line-crossing alerts.
- **Courtyard & Parking:** 1080p Smart WiFi PTZ Cameras with auto-tracking and active siren deterrence.
- **Interior & Corridors:** 4MP Smart IR Dome Cameras with discreet wide-angle viewing.
- **Recording & Storage:** 8-Channel / 16-Channel H.265+ PoE NVR equipped with 4TB/8TB Surveillance-Grade Western Digital Purple HDD (30+ days continuous retention).
- **Remote Access:** Encrypted P2P mobile live feeds via EZVIZ / Hik-Connect with multi-device authorization.

#### 3. ⚡ IoT Automation & Sensor Matrix
- **Access Control:** Smart Fingerprint & Keypad Biometric Door Locks with emergency mechanical keys and anti-tamper alarms.
- **Intrusion Sensors:** Zigbee wireless door/window magnetic contact sensors linked to a centralized smart hub.
- **Smart Lighting Automation:** Tuya Zigbee Touch Relay switches scheduled to simulate occupancy during travel.

#### 4. 🔒 Network Segmentation & Cyber Hardening
- **VLAN Isolation:** Dedicated CCTV/IoT Subnet isolated from primary guest/office WiFi networks to prevent lateral movement.
- **Credentials:** Strict alphanumeric password policy, non-standard management ports, and disabled default UPnP.

#### 5. ☀️ Power Reliability & Solar Inverter Integration
- **Hybrid Power:** 3.5kVA / 24V Pure Sine Wave Solar Inverter kit with 2x 200Ah Deep Cycle Gel Batteries.
- **Autonomous Uptime:** Guaranteed continuous 24/7 recording during extended national grid blackouts.

#### 6. 📋 Next Steps for Implementation
1. **Physical Site Survey:** Coordinate physical on-site measurements and cable path mapping with BaytLogic Field Engineers.
2. **Bill of Quantities (BOQ):** Generate an itemized equipment quote in the BaytLogic BOQ Studio.
3. **Deployment Timeline:** Estimated 2 to 3 business days from component dispatch to full commissioning.`

      return NextResponse.json({ text: generatedPlan })
    }

    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const prompt = `You are the Principal Lead Security Engineer at BaytLogic Technologies (Nigeria).
Generate an authoritative, professional, and comprehensive SECURITY BLUEPRINT for a Nigerian residential or commercial facility.

Date of Plan: ${today}
Client Property Description: "${description}"

Required Markdown Sections:
1) 🛡️ Vulnerability & Perimeter Assessment
2) 📹 Recommended CCTV Setup (Channels, camera types, placement, retention calculation)
3) ⚡ IoT Sensors & Smart Access Control (Motion, door/window, biometric locks, relays)
4) 🔒 Network & Cyber Hardening (VLAN segmentation, firewall rules, encrypted remote mobile access)
5) ☀️ Power Reliability (Solar inverter kit, deep-cycle batteries, surge protection for Nigerian grid conditions)
6) 📋 Next Steps (Site survey, BOQ quote, deployment timeline)

Tone: Authoritative, engineering-focused, structured with clear Markdown headers, bold highlights, and bullet points.`

    // Try Gemini 2.0 Flash first, fallback to 1.5 Flash
    const models = ['gemini-2.0-flash', 'gemini-1.5-flash']
    let textResult = ''
    let lastError = null

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        })

        if (res.ok) {
          const data = await res.json()
          textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
          if (textResult) break
        } else {
          const errData = await res.json().catch(() => ({}))
          lastError = errData?.error?.message || 'Model call failed'
        }
      } catch (err: any) {
        lastError = err.message
      }
    }

    if (!textResult) {
      throw new Error(lastError || 'Failed to generate blueprint from Gemini API')
    }

    return NextResponse.json({ text: textResult })
  } catch (error: any) {
    console.error('Gemini Security Blueprint generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate security blueprint.' },
      { status: 500 }
    )
  }
}
