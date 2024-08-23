import type { NextApiRequest, NextApiResponse } from 'next'
import LlmService from '@/services/LlmService'
import { type IGeneratedText, type IGeneratedTextResponse } from '@/services/dto'

const DEFAULT_MAX_QUESTIONS = 9

interface ErrorMessage {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGeneratedText | ErrorMessage>,
) {
  if (req.method === 'POST') {
    try {
      const { userMessage, maxQuestions } = req.body
      if (!userMessage) {
        return res.status(400).json({ message: 'Prompt is required' })
      }

      const llmService = new LlmService(req.headers.authorization ?? '')
      const response: IGeneratedTextResponse = await llmService.generateText(
        userMessage,
        maxQuestions ?? DEFAULT_MAX_QUESTIONS,
      )

      res.status(200).json(response.data)
    } catch (error: any) {
      const errorCode = error?.status ?? 400
      res.status(errorCode).json({ message: error.message })
    }
  }
}
