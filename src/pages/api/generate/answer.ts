import type { NextApiRequest, NextApiResponse } from 'next'
import LlmService from '@/services/LlmService'
import { type IGeneratedAnswer, type IGeneratedAnswerResponse } from '@/services/dto'

interface ErrorMessage {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGeneratedAnswer | ErrorMessage>,
) {
  if (req.method === 'POST') {
    try {
      const { userMessage } = req.body
      if (!userMessage) {
        return res.status(400).json({ message: 'Prompt is required' })
      }

      const llmService = new LlmService(req.headers.authorization ?? '')
      const response: IGeneratedAnswerResponse =
        await llmService.generateAnswer(userMessage)

      res.status(200).json(response.data)
    } catch (error: any) {
      const errorCode = error?.status ?? 400
      res.status(errorCode).json({ message: error.message })
    }
  }
}
