import { describe, it, expect } from 'vitest'
import { CERTIFICATE_REGISTRY, normalizeCertificateId, lookupCertificate, formatSponsors } from '../lib/certificates'

describe('Certificate Registry & Normalization Tests', () => {
  it('should have all 26 official graduate certificates registered', () => {
    const certCount = Object.keys(CERTIFICATE_REGISTRY).length
    expect(certCount).toBe(26)
  })

  it('should normalize ID variations (spaces, lowercase, missing hyphen, zero-padding)', () => {
    expect(normalizeCertificateId('blt-2026-001')).toBe('BLT-2026-001')
    expect(normalizeCertificateId('BLT2026001')).toBe('BLT-2026-001')
    expect(normalizeCertificateId('  BLT-2026-1 ')).toBe('BLT-2026-001')
    expect(normalizeCertificateId('blt-2026-20')).toBe('BLT-2026-020')
    expect(normalizeCertificateId('BLT-2026-026')).toBe('BLT-2026-026')
  })

  it('should correctly lookup graduate records', () => {
    const cert1 = lookupCertificate('BLT-2026-001')
    expect(cert1).not.toBeNull()
    expect(cert1?.name).toBe('Ahmad Adamu Zakari')
    expect(cert1?.status).toBe('Valid')
    expect(cert1?.showSponsor).toBe(true)
    expect(cert1?.partners).toContain('NURTUREROOTS FOUNDATION')
    expect(cert1?.partners).toContain('NASCOMSOFT EMBEDDED')

    const cert20 = lookupCertificate('BLT-2026-020')
    expect(cert20).not.toBeNull()
    expect(cert20?.name).toBe('Muhammad Ukasha Abdullahi')
    expect(cert20?.course).toBe('Smart Home Automation & CCTV Master Class')

    const cert26 = lookupCertificate('BLT-2026-026')
    expect(cert26).not.toBeNull()
    expect(cert26?.name).toBe('Salihu Adamu Deba')
  })

  it('should return null for non-existent certificate numbers (e.g. removed certs 027 to 067)', () => {
    expect(lookupCertificate('BLT-2026-027')).toBeNull()
    expect(lookupCertificate('BLT-2026-067')).toBeNull()
    expect(lookupCertificate('BLT-2026-999')).toBeNull()
    expect(lookupCertificate('INVALID_ID')).toBeNull()
  })

  it('should verify partnership configuration on certificates 001 to 017', () => {
    for (let i = 1; i <= 17; i++) {
      const id = `BLT-2026-${String(i).padStart(3, '0')}`
      const cert = lookupCertificate(id)
      expect(cert?.showSponsor).toBe(true)
      expect(cert?.partners).toContain('NURTUREROOTS FOUNDATION')
      expect(cert?.partners).toContain('NASCOMSOFT EMBEDDED')
    }
  })

  it('should format sponsors with commas and ampersand before the last item', () => {
    expect(formatSponsors('HAMJIK CARE INITIATIVE')).toBe('HAMJIK CARE INITIATIVE')
    expect(formatSponsors('HAMJIK CARE INITIATIVE, NURTUREROOTS FOUNDATION')).toBe('HAMJIK CARE INITIATIVE & NURTUREROOTS FOUNDATION')
    expect(formatSponsors('HAMJIK CARE INITIATIVE, NURTUREROOTS FOUNDATION, NASCOMSOFT EMBEDDED')).toBe('HAMJIK CARE INITIATIVE, NURTUREROOTS FOUNDATION & NASCOMSOFT EMBEDDED')
    expect(formatSponsors(['A', 'B', 'C', 'D'])).toBe('A, B, C & D')
  })
})
