import axios from 'axios'
import LlmService from '@/services/LlmService'
import { type GeneratedAnswerResponse } from '@/services/dto'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('LlmService', () => {
  let llmService: LlmService
  const testToken = 'test-token'

  beforeEach(() => {
    jest.clearAllMocks()
    llmService = new LlmService(testToken)
  })

  describe('generateAnswer', () => {
    const mockUserMessage = 'test message'
    const mockResponse: GeneratedAnswerResponse = {
      data: {
        answer:
          'The mind that opens to a new idea never comes back to its original size.',
      },
    }

    it('should make a POST request with correct parameters', async () => {
      // Mock the axios post method
      mockedAxios.post.mockResolvedValueOnce(mockResponse)
      const result = await llmService.generateAnswer(mockUserMessage)

      expect(result).toEqual(mockResponse)
      expect(mockedAxios.post).toHaveBeenCalledTimes(1)
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String), // API URL
        {
          user_message: mockUserMessage,
          max_output_tokens: 1024, // DEFAULT_MAX_OUTPUT_TOKENS_ANSWER
        },
        {
          headers: {
            'X-HMAC-Signature': expect.any(String),
          },
        },
      )
    })

    it('should set authorization header correctly', async () => {
      mockedAxios.post.mockResolvedValueOnce(mockResponse)
      await llmService.generateAnswer(mockUserMessage)
      expect(axios.defaults.headers.common.Authorization).toBe(`Bearer ${testToken}`)
    })

    it('should handle API errors', async () => {
      // Mock an API error
      const errorMessage = 'API Error'
      mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage))
      await expect(llmService.generateAnswer(mockUserMessage)).rejects.toThrow(
        errorMessage,
      )
    })

    it('should generate different HMAC signatures for different dates', async () => {
      // Mock the axios post method
      mockedAxios.post.mockResolvedValue(mockResponse)

      // Mock dates
      const realDate = Date
      const mockDate1 = new Date('2025-02-05')
      const mockDate2 = new Date('2025-02-06')

      // First call with mockDate1
      global.Date = class extends Date {
        constructor() {
          super()
          return mockDate1
        }
      } as typeof Date

      // date is being used to generate HMAC
      await llmService.generateAnswer(mockUserMessage)
      const firstCall = mockedAxios.post.mock.calls[0]
      const firstCallHmac = firstCall?.[2]?.headers?.['X-HMAC-Signature']

      // Second call with mockDate2
      global.Date = class extends Date {
        constructor() {
          super()
          return mockDate2
        }
      } as typeof Date

      // date is being used to generate HMAC
      await llmService.generateAnswer(mockUserMessage)
      const secondCall = mockedAxios.post.mock.calls[1]
      const secondCallHmac = secondCall?.[2]?.headers?.['X-HMAC-Signature']

      // Restore the real Date
      global.Date = realDate

      // Both HMACs should exist
      expect(firstCallHmac).toBeDefined()
      expect(secondCallHmac).toBeDefined()

      // HMACs should be different for different dates
      expect(firstCallHmac).not.toBe(secondCallHmac)
    })
  })
})
