interface Card {
  id: number
  question: string
  code?: string | null | undefined
  options: string[]
  correctAnswer: string
  cardColor?: string
  textColor?: string
}

export type { Card }
