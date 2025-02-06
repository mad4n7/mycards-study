import { generateHmac, verifyHmac } from '@/helpers/hmac'

describe('HMAC Helper Functions', () => {
  describe('generateHmac', () => {
    it('should generate a valid HMAC for a string input', () => {
      const testData = 'test-data'
      const hmac = generateHmac(testData)

      // HMAC should be a 64-character hex string (sha256 produces 32 bytes = 64 hex chars)
      expect(hmac).toMatch(/^[a-f0-9]{64}$/i)

      // Same input should produce same HMAC
      const hmac2 = generateHmac(testData)
      expect(hmac).toBe(hmac2)
    })

    it('should handle object input by converting to string', () => {
      const testObj = { key: 'value' }
      const hmac = generateHmac(testObj)

      // Should not throw and should produce a valid HMAC
      expect(hmac).toMatch(/^[a-f0-9]{64}$/i)
    })

    it('should generate different HMACs for different inputs', () => {
      const hmac1 = generateHmac('random-data1')
      const hmac2 = generateHmac('random-data2')

      expect(hmac1).not.toBe(hmac2)
    })
  })

  describe('verifyHmac', () => {
    it('should verify a valid HMAC', () => {
      const testData = 'test-data'
      const hmac = generateHmac(testData)

      expect(verifyHmac(testData, hmac)).toBe(true)
    })

    it('should reject an invalid HMAC', () => {
      const testData = 'test-data'
      const invalidHmac = 'a'.repeat(64)

      expect(verifyHmac(testData, invalidHmac)).toBe(false)
    })
  })
})
