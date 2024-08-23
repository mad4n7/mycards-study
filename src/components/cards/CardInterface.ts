interface ICard {
  id: number
  question: string
  code?: string | null | undefined
  options: string[]
  correctAnswer: string
  cardColor?: string
  textColor?: string
}

interface ICardProps extends ICard {
  onSelect: () => void
  onSelectAnswer: (answer: string) => void
  tabIndex: number
  displayAnswer: boolean
  resetCard: boolean
}

interface ICardListProps {
  cardColor: string
  textColor: string
  onSelectAnswer: (answer: string, card: ICard) => void
  onSelectCard: (card: ICard) => void
  jsonData: ICard[]
  selectedCard: ICard | null
  displayAnswers: boolean
  resetCards: boolean
}

interface IIndexedCardData {
  id: number
  answered: boolean
  answeredCorrectly: boolean
  correctAnswer: string
}

export type { ICard, ICardProps, ICardListProps, IIndexedCardData }
