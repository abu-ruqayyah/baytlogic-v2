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
  // Cohort 1: Smart Home Automation & CCTV Master Class (April 2, 2026)
  "BLT-2026-001": {
    id: "BLT-2026-001",
    name: "Ahmad Adamu Zakari",
    course: "Smart Home Automation & CCTV Master Class",
    cohort: "Cohort 1 - Jan/April 2026",
    issueDate: "April 2, 2026",
    status: "Valid",
    showSponsor: false,
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
    showSponsor: false,
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
    showSponsor: false,
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
    showSponsor: false,
    location: "Ibrahim Bako, Bauchi",
    director: "Yahaya Sulaiman Abdullahi"
  },

  // Cohort 2: Young Innovators Robotics Bootcamp - Level 1 (April 24, 2026)
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
    partners: ["NURTUREROOTS FOUNDATION"],
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
  },

  // Cohort 4: Young Innovators STEM & Robotics Level 2 (July 2026)
  "BLT-2026-027": { id: "BLT-2026-027", name: "Mustapha Ibrahim", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-028": { id: "BLT-2026-028", name: "Fatima Aliyu", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-029": { id: "BLT-2026-029", name: "Usman Danladi", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-030": { id: "BLT-2026-030", name: "Khadijah Abubakar", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-031": { id: "BLT-2026-031", name: "Zainab Kabir", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-032": { id: "BLT-2026-032", name: "Haruna Faruk", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-033": { id: "BLT-2026-033", name: "Sadiq Umar", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-034": { id: "BLT-2026-034", name: "Bilkisu Salisu", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-035": { id: "BLT-2026-035", name: "Amina Jibrin", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-036": { id: "BLT-2026-036", name: "Al-Amin Bashir", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-037": { id: "BLT-2026-037", name: "Aisha Mahmud", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-038": { id: "BLT-2026-038", name: "Umar Faruq", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-039": { id: "BLT-2026-039", name: "Hauwa Bello", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-040": { id: "BLT-2026-040", name: "Mahmud Idris", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-041": { id: "BLT-2026-041", name: "Halima Sanusi", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-042": { id: "BLT-2026-042", name: "Abdulmalik Gambo", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-043": { id: "BLT-2026-043", name: "Zubaida Nuhu", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-044": { id: "BLT-2026-044", name: "Ruqayyah Yahaya", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-045": { id: "BLT-2026-045", name: "Idris Muhammad", course: "Young Innovators Robotics & STEM Bootcamp", cohort: "Robotics Cohort 2", issueDate: "July 28, 2026", status: "Valid", showSponsor: true, partners: ["NURTUREROOTS FOUNDATION"], location: "BaytLogic Hub, Bauchi", director: "Yahaya Sulaiman Abdullahi" },

  // Cohort 5: Embedded AI, IoT & Smart Surveillance Professional Diploma (August 2026)
  "BLT-2026-046": { id: "BLT-2026-046", name: "Engr. Babangida Tukur", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)", "NASCOMSOFT EMBEDDED"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-047": { id: "BLT-2026-047", name: "Abubakar Sani Gidado", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-048": { id: "BLT-2026-048", name: "Mansur Danjuma", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-049": { id: "BLT-2026-049", name: "Fatima Zahra Kassim", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-050": { id: "BLT-2026-050", name: "Mubarak Aliyu", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-051": { id: "BLT-2026-051", name: "Shamsuddeen Garba", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-052": { id: "BLT-2026-052", name: "Safiya Mohammed", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-053": { id: "BLT-2026-053", name: "Yakubu Inuwa", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-054": { id: "BLT-2026-054", name: "Maryam Abdullahi", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-055": { id: "BLT-2026-055", name: "Ibrahim Kabir", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-056": { id: "BLT-2026-056", name: "Aminu Bello", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-057": { id: "BLT-2026-057", name: "Nafisa Shehu", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-058": { id: "BLT-2026-058", name: "Bello Mustapha", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-059": { id: "BLT-2026-059", name: "Aisha Dahiru", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-060": { id: "BLT-2026-060", name: "Lawal Ahmed", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-061": { id: "BLT-2026-061", name: "Hadiza Lawan", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-062": { id: "BLT-2026-062", name: "Hassan Danladi", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-063": { id: "BLT-2026-063", name: "Jamila Suleiman", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-064": { id: "BLT-2026-064", name: "Garba Yunusa", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-065": { id: "BLT-2026-065", name: "Rahma Sani", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-066": { id: "BLT-2026-066", name: "Yahaya Muhammad", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
  "BLT-2026-067": { id: "BLT-2026-067", name: "Aliyu Zubairu", course: "Embedded AI, IoT & Smart Surveillance Diploma", cohort: "Advanced Engineering Cohort 2026", issueDate: "August 20, 2026", status: "Valid", showSponsor: true, partners: ["CENTER FOR EMBEDDED AI (ATBU)", "NASCOMSOFT EMBEDDED"], location: "ATBU - CCE Lab, Bauchi", director: "Yahaya Sulaiman Abdullahi" },
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
