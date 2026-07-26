import { describe, it, expect } from 'vitest'
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
  it('should verify certificate format', async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api/verify-cert?id=MOCK123', {
        signal: AbortSignal.timeout(15000),
      })
      
      if (response.status !== 200) {
        throw new Error(`Endpoint returned status ${response.status}`)
      }
      
      const data = await response.json() as any
      
      // Assert format matches expected ApiResponse schema
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
  }, 15000)
})
