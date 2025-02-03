import CoreAuth from '@/services/CoreAuth'
import { type GeneratedAnswerResponse, type IGeneratedTextResponse } from '@/services/dto'
import { generateHmac } from '@/helpers'

// mostly used for testing or a fallback to keep the app working
const DEFAULT_SECRET_STRING_TO_MIX = 'HakunaMatata'
// paid plans will have more tokens
const DEFAULT_MAX_OUTPUT_TOKENS_QUESTIONS = 2048
const DEFAULT_MAX_OUTPUT_TOKENS_ANSWER = 1024

class LlmService extends CoreAuth {
  private readonly API_URL = process.env.API_URL ?? ''
  token: string

  constructor(token: string) {
    super(token)
    this.token = token
  }

  private generateHmac(): string {
    const today = new Date()
    const date = today.toISOString().slice(0, 10).replace(/-/g, '')
    return generateHmac(date + DEFAULT_SECRET_STRING_TO_MIX)
  }

  public async generateText(
    userMessage: string,
    maxQuestions: number,
  ): Promise<IGeneratedTextResponse> {
    const axios = this.getAxiosInstance()
    const apiUrl = process.env.API_TEXT_GENERATION ?? ''

    const payload = {
      user_message: userMessage,
      max_questions: maxQuestions,
      max_output_tokens: DEFAULT_MAX_OUTPUT_TOKENS_QUESTIONS,
    }

    const hmacSignature = this.generateHmac()

    return await axios.post(apiUrl, payload, {
      headers: {
        'X-HMAC-Signature': hmacSignature,
      },
    })
  }

  public async generateAnswer(userMessage: string): Promise<GeneratedAnswerResponse> {
    const axios = this.getAxiosInstance()
    const apiUrl = process.env.API_TEXT_ANSWER_GENERATION ?? ''

    const payload = {
      user_message: userMessage,
      max_output_tokens: DEFAULT_MAX_OUTPUT_TOKENS_ANSWER,
    }

    const hmacSignature = this.generateHmac()

    return await axios.post(apiUrl, payload, {
      headers: {
        'X-HMAC-Signature': hmacSignature,
      },
    })
  }
}

export default LlmService
