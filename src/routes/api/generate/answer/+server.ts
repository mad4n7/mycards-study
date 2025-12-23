import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import LlmService from '$lib/services/LlmService'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { userMessage } = await request.json()

    if (!userMessage) {
      return json({ message: 'Prompt is required' }, { status: 400 })
    }

    const authHeader = request.headers.get('authorization') ?? ''
    const llmService = new LlmService(authHeader)
    const response = await llmService.generateAnswer(userMessage)

    return json(response.data)
  } catch (error: any) {
    const errorCode = error?.status ?? 400
    return json({ message: error.message }, { status: errorCode })
  }
}
