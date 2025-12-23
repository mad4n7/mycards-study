import { describe, it, expect } from 'vitest'
import { generateHmac, verifyHmac } from './hmac'

describe('HMAC Helper', () => {
  it('generates equal hash for same input', () => {
    const data = 'test-data'
    const hash1 = generateHmac(data)
    const hash2 = generateHmac(data)

    expect(hash1).toBe(hash2)
    expect(hash1).toHaveLength(64) // SHA256 hex length
  })

  it('generates different hash for different input', () => {
    const hash1 = generateHmac('data1')
    const hash2 = generateHmac('data2')

    expect(hash1).not.toBe(hash2)
  })

  it('handles object input', () => {
    const data = { key: 'value', num: 123 }
    const hash = generateHmac(data)

    expect(hash).toHaveLength(64)
  })

  it('verifyHmac returns true for valid signature', () => {
    const data = 'test-data'
    const signature = generateHmac(data)

    expect(verifyHmac(data, signature)).toBe(true)
  })

  it('verifyHmac returns false for invalid signature', () => {
    const data = 'test-data'
    const invalidSignature = 'invalid-signature'

    expect(verifyHmac(data, invalidSignature)).toBe(false)
  })
})
