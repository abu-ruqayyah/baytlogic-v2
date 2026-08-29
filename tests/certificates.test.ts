import { describe, it, expect } from 'vitest'
import { CERTIFICATE_REGISTRY, normalizeCertificateId, lookupCertificate } from '../lib/certificates'

describe('Certificate Registry & Normalization Tests', () => {
  it('should have all 67 graduate certificates registered', () => {
    const certCount = Object.keys(CERTIFICATE_REGISTRY).length
    expect(certCount).toBeGreaterThanOrEqual(67)
  })

  it('should normalize ID variations (spaces, lowercase, missing hyphen, zero-padding)', () => {
    expect(normalizeCertificateId('blt-2026-001')).toBe('BLT-2026-001')
    expect(normalizeCertificateId('BLT2026001')).toBe('BLT-2026-001')
    expect(normalizeCertificateId('  BLT-2026-1 ')).toBe('BLT-2026-001')
    expect(normalizeCertificateId('blt-2026-20')).toBe('BLT-2026-020')
    expect(normalizeCertificateId('BLT-2026-067')).toBe('BLT-2026-067')
  })

  it('should correctly lookup graduate records', () => {
    const cert1 = lookupCertificate('BLT-2026-001')
    expect(cert1).not.toBeNull()
    expect(cert1?.name).toBe('Ahmad Adamu Zakari')
    expect(cert1?.status).toBe('Valid')

    const cert20 = lookupCertificate('BLT-2026-020')
    expect(cert20).not.toBeNull()
    expect(cert20?.name).toBe('Muhammad Ukasha Abdullahi')
    expect(cert20?.course).toBe('Smart Home Automation & CCTV Master Class')

    const cert67 = lookupCertificate('BLT-2026-067')
    expect(cert67).not.toBeNull()
    expect(cert67?.name).toBe('Aliyu Zubairu')
    expect(cert67?.showSponsor).toBe(true)
    expect(cert67?.partners).toContain('CENTER FOR EMBEDDED AI (ATBU)')
  })

  it('should return null for non-existent certificate numbers', () => {
    expect(lookupCertificate('BLT-2026-999')).toBeNull()
    expect(lookupCertificate('INVALID_ID')).toBeNull()
  })

  it('should verify conditional sponsor hiding logic', () => {
    const cert1 = lookupCertificate('BLT-2026-001')
    expect(cert1?.showSponsor).toBe(false)

    const cert5 = lookupCertificate('BLT-2026-005')
    expect(cert5?.showSponsor).toBe(true)
    expect(cert5?.partners?.length).toBeGreaterThan(0)
  })
})
