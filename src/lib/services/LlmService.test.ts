import { describe, it, expect, vi, beforeEach } from 'vitest'
import LlmService from './LlmService'

const mockPost = vi.fn().mockResolvedValue({ data: '{"content": []}' })

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: () => ({
      post: mockPost
    })
  }
}))

describe('LlmService', () => {
  let service: LlmService

  beforeEach(() => {
    mockPost.mockClear()
    service = new LlmService('test-token')
  })

  it('creates instance with token', () => {
    expect(service).toBeInstanceOf(LlmService)
  })

  it('generateText calls API and returns response', async () => {
    const userMessage = 'What is Python?'
    const maxQuestions = 5

    const result = await service.generateText(userMessage, maxQuestions)

    expect(result).toBeDefined()
    expect(mockPost).toHaveBeenCalled()
  })

  it('generateAnswer calls API and returns response', async () => {
    const userMessage = 'What is 2+2?'

    const result = await service.generateAnswer(userMessage)

    expect(result).toBeDefined()
    expect(mockPost).toHaveBeenCalled()
  })
})
