import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import LlmService from '$lib/services/LlmService'

const DEFAULT_MAX_QUESTIONS = 9

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { userMessage, maxQuestions } = await request.json()

    if (!userMessage) {
      return json({ message: 'Prompt is required' }, { status: 400 })
    }

    const authHeader = request.headers.get('authorization') ?? ''
    const llmService = new LlmService(authHeader)
    const response = await llmService.generateText(
      userMessage,
      maxQuestions ?? DEFAULT_MAX_QUESTIONS
    )

    return json(response.data)
  } catch (error: any) {
    const errorCode = error?.status ?? 400
    return json({ message: error.message }, { status: errorCode })
  }
}
