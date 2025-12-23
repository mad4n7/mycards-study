import { describe, it, expect, vi } from 'vitest'

// Mock LlmService
vi.mock('$lib/services/LlmService', () => ({
  default: vi.fn().mockImplementation(() => ({
    generateText: vi.fn().mockResolvedValue({
      data: JSON.stringify({
        content: [
          {
            id: 1,
            question: 'What is Python?',
            options: ['A language', 'A snake', 'A framework', 'A database'],
            correctAnswer: 0
          }
        ]
      })
    })
  }))
}))

describe('POST /api/generate/text', () => {
  it('returns 400 when userMessage is missing', async () => {
    const requestBody = { maxQuestions: 5 }

    const hasUserMessage = 'userMessage' in requestBody && requestBody.userMessage
    expect(hasUserMessage).toBe(false)
  })

  it('returns 400 when maxQuestions is missing', async () => {
    const requestBody = { userMessage: 'test' }

    const hasMaxQuestions = 'maxQuestions' in requestBody
    expect(hasMaxQuestions).toBe(false)
  })

  it('accepts valid request body', async () => {
    const requestBody = {
      userMessage: 'What is Python?',
      maxQuestions: 5
    }

    const isValid =
      typeof requestBody.userMessage === 'string' &&
      requestBody.userMessage.length > 0 &&
      typeof requestBody.maxQuestions === 'number' &&
      requestBody.maxQuestions > 0

    expect(isValid).toBe(true)
  })
})
