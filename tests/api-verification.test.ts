import { describe, it, expect } from 'vitest'
import { GET } from '../app/api/verify-cert/route'
import fs from 'fs'
import path from 'path'

const LOG_DIR = path.join(__dirname, '../logs')
const LOG_FILE = path.join(LOG_DIR, 'test-failures.log')

function logFailure(message: string) {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true })
  }
  const timestamp = new Date().toISOString()
  fs.appendFileSync(LOG_FILE, `[${timestamp}] TEST FAILURE: ${message}\n`)
}

describe('API Verification Endpoint', () => {
  it('should verify certificate format using route handler', async () => {
    try {
      const request = new Request('http://localhost:3000/api/verify-cert?id=BLT-2026-002')
      const response = await GET(request)
      
      expect(response.status).toBe(200)
      const data = await response.json()
      
      expect(data).toBeTypeOf('object')
      expect(data).toHaveProperty('valid')
      expect(typeof data.valid).toBe('boolean')
      
      if (data.valid) {
        expect(data).toHaveProperty('certificate')
        expect(data.certificate).toBeTypeOf('object')
        expect(data.certificate).toHaveProperty('certificateId')
        expect(typeof data.certificate.certificateId).toBe('string')
        expect(data.certificate).toHaveProperty('studentName')
        expect(typeof data.certificate.studentName).toBe('string')
        expect(data.certificate).toHaveProperty('issueDate')
        expect(typeof data.certificate.issueDate).toBe('string')
        expect(data.certificate).toHaveProperty('courseName')
        expect(typeof data.certificate.courseName).toBe('string')
      } else {
        expect(data).toHaveProperty('error')
        expect(typeof data.error).toBe('string')
      }
    } catch (error: any) {
      logFailure(error?.message || String(error))
      throw error
    }
  })

  it('should verify real graduate certificate from 67-cert database', async () => {
    const request = new Request('http://localhost:3000/api/verify-cert?id=BLT-2026-001')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.valid).toBe(true)
    expect(data.certificate.studentName).toBe('Ahmad Adamu Zakari')
  })
})
