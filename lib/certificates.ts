export interface CertificateRecord {
  id: string
  name: string
  course: string
  cohort: string
  issueDate: string
  status: 'Valid' | 'Revoked' | 'Suspended'
  showSponsor?: boolean
  partners?: string[]
  location?: string
  director?: string
}

export const CERTIFICATE_REGISTRY: Record<string, CertificateRecord> = {
  // Cohort 1: Smart Home Automation & CCTV Master Class (Partnership with NurtureRoots & NASCOMSOFT Embedded)
  "BLT-2026-001": {
    id: "BLT-2026-001",
    name: "Ahmad Adamu Zakari",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Cohort 1 - Jan/April 2026",
    issueDate: "April 2, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-002": {
    id: "BLT-2026-002",
    name: "Abdulkadir Ahmed Tataru",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Cohort 1 - Jan/April 2026",
    issueDate: "April 2, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-003": {
    id: "BLT-2026-003",
    name: "Sulaiman Jibril Babayo",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Cohort 1 - Jan/April 2026",
    issueDate: "April 2, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-004": {
    id: "BLT-2026-004",
    name: "Dahiru Adamu",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Cohort 1 - Jan/April 2026",
    issueDate: "April 2, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },

  // Cohort 2: Young Innovators Robotics Bootcamp (Partnership with NurtureRoots & NASCOMSOFT Embedded)
  "BLT-2026-005": {
    id: "BLT-2026-005",
    name: "Saeed Haruna Saeed",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-006": {
    id: "BLT-2026-006",
    name: "Maryam Muhammad Ahmad",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-007": {
    id: "BLT-2026-007",
    name: "Toyyibat Abiola Shittu",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-008": {
    id: "BLT-2026-008",
    name: "Abdulshaheed Umar Chinade",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-009": {
    id: "BLT-2026-009",
    name: "Muhammad Bello Abubakar",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-010": {
    id: "BLT-2026-010",
    name: "Muhammad Ballo Mufty",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-011": {
    id: "BLT-2026-011",
    name: "Niimatullah Abimbola Shittu",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-012": {
    id: "BLT-2026-012",
    name: "Haleemat Suad Muhammad Ballo",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-013": {
    id: "BLT-2026-013",
    name: "Shamsuddeen Muhammad Ishaq",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-014": {
    id: "BLT-2026-014",
    name: "Ibrahim Muhammad Ballo",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-015": {
    id: "BLT-2026-015",
    name: "Na'ima Muhammad Ishaq",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-016": {
    id: "BLT-2026-016",
    name: "Abdullahi Rabi'u Muhammad",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-017": {
    id: "BLT-2026-017",
    name: "Abubakar Muhammad Chinade",
    course: "Young Innovators Robotics Bootcamp - Level 1",
    cohort: "Robotics Cohort 1",
    issueDate: "April 24, 2026",
    status: "Valid",
    showSponsor: true,
    partners: ["NURTUREROOTS FOUNDATION", "NASCOMSOFT EMBEDDED"],
    location: "BaytLogic Innovation Hub, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },

  // Cohort 3: June 17, 2026 Masterclass
  "BLT-2026-018": {
    id: "BLT-2026-018",
    name: "Moshood Lukman Sekoni",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-019": {
    id: "BLT-2026-019",
    name: "Ismail Abdullahi",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-020": {
    id: "BLT-2026-020",
    name: "Muhammad Ukasha Abdullahi",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-021": {
    id: "BLT-2026-021",
    name: "Abdulquadir Folorunso Adeshina",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-022": {
    id: "BLT-2026-022",
    name: "Auwal Yahaya",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-023": {
    id: "BLT-2026-023",
    name: "Abdullahi Yusuf Umar",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-024": {
    id: "BLT-2026-024",
    name: "Fasilat Olopade Olawunmi",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-025": {
    id: "BLT-2026-025",
    name: "Kareem Saheed Adeniyi",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },
  "BLT-2026-026": {
    id: "BLT-2026-026",
    name: "Salihu Adamu Deba",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Masterclass June 2026",
    issueDate: "June 17, 2026",
    status: "Valid",
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  }
}

export function normalizeCertificateId(rawId: string): string {
  if (!rawId) return ''
  let clean = rawId.replace(/\s+/g, '').toUpperCase()
  
  if (clean.startsWith('BLT2026')) {
    clean = 'BLT-2026-' + clean.substring(7)
  }
  
  const match = clean.match(/^(BLT-2026-)(\d+)$/)
  if (match) {
    clean = match[1] + match[2].padStart(3, '0')
  }
  
  return clean
}

export function lookupCertificate(id: string): CertificateRecord | null {
  const normalized = normalizeCertificateId(id)
  return CERTIFICATE_REGISTRY[normalized] || null
}
