export interface CardData {
  id: number
  question: string
  code?: string
  options: string[]
  correctAnswer: string
  cardColor?: string
  textColor?: string
}

export interface IndexedCardData {
  id: number
  answered: boolean
  answeredCorrectly: boolean
  correctAnswer: string
}
