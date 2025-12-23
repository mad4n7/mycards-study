import CoreAuth from './CoreAuth'
import { generateHmac } from '$lib/helpers/hmac'
import { API_TEXT_GENERATION, API_TEXT_ANSWER_GENERATION } from '$env/static/private'
import { DEFAULT_SECRET_STRING_TO_MIX } from '$lib/contants'

const DEFAULT_MAX_OUTPUT_TOKENS_QUESTIONS = 2048
const DEFAULT_MAX_OUTPUT_TOKENS_ANSWER = 1024

export interface IGeneratedTextResponse {
  data: string
}

export interface GeneratedAnswerResponse {
  data: string
}

class LlmService extends CoreAuth {
  constructor(token: string) {
    super(token)
  }

  private generateHmacSignature(): string {
    const today = new Date()
    const date = today.toISOString().slice(0, 10).replace(/-/g, '')
    return generateHmac(date + DEFAULT_SECRET_STRING_TO_MIX)
  }

  public async generateText(
    userMessage: string,
    maxQuestions: number
  ): Promise<IGeneratedTextResponse> {
    const axios = this.getAxiosInstance()
    const apiUrl = API_TEXT_GENERATION ?? ''

    const payload = {
      user_message: userMessage,
      max_questions: maxQuestions,
      max_output_tokens: DEFAULT_MAX_OUTPUT_TOKENS_QUESTIONS
    }

    const hmacSignature = this.generateHmacSignature()

    return await axios.post(apiUrl, payload, {
      headers: {
        'X-HMAC-Signature': hmacSignature
      }
    })
  }

  public async generateAnswer(userMessage: string): Promise<GeneratedAnswerResponse> {
    const axios = this.getAxiosInstance()
    const apiUrl = API_TEXT_ANSWER_GENERATION ?? ''

    const payload = {
      user_message: userMessage,
      max_output_tokens: DEFAULT_MAX_OUTPUT_TOKENS_ANSWER
    }

    const hmacSignature = this.generateHmacSignature()

    return await axios.post(apiUrl, payload, {
      headers: {
        'X-HMAC-Signature': hmacSignature
      }
    })
  }
}

export default LlmService
