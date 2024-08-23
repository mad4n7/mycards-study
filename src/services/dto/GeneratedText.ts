interface IGeneratedText {
  content: IText[]
}

interface IText {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

interface IGeneratedTextResponse {
  data: IGeneratedText
}

export type { IGeneratedText, IText, IGeneratedTextResponse }
