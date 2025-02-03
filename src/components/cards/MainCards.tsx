'use client'
import { ColorsSwatch } from '@/components/colorsSwatch'
import CardList from '@/components/cards/CardList'
import { type Card } from '@/components/cards/CardInterface'
import { useEffect, useState } from 'react'
import { ConfirmDialog } from '@/components/dialogs'
// TODO: remove sample data
// import questionsSamplePythonIfGemini from '@/sample/questionsSamplePythonIfGemini'

// TODO: replace with real data
// const jsonData: { content: Card[] } = questionsSamplePythonIfGemini
const MAX_POINTS_IN_PERCENTAGE = 100

interface MainCardsProps {
  jsonData: { content: Card[] }
  maxQuestions: number
  onChangeMessageButton: () => void
}

interface IndexedCardData {
  id: number
  answered: boolean
  answeredCorrectly: boolean
  correctAnswer: string
}

const MainCards: React.FC<MainCardsProps> = ({
  jsonData,
  maxQuestions,
  onChangeMessageButton,
}) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<string>('')
  const [selectedTextColor, setSelectedTextColor] = useState<string>('')
  const [displayAnswers, setDisplayAnswers] = useState<boolean>(false)
  const [points, setPoints] = useState<number>(0)
  const [totalQuestions, setTotalQuestions] = useState<number>(maxQuestions)
  const [openFinishDialog, setOpenFinishDialog] = useState<boolean>(false)
  const [resetCards, setResetCards] = useState<boolean>(false)
  const [indexedCards, setIndexedCards] = useState<IndexedCardData[]>()

  useEffect(() => {
    const data: any = []
    jsonData.content.forEach((card, index) => {
      data.push({
        id: card.id,
        answered: false,
        answeredCorrectly: false,
        correctAnswer: card.correctAnswer,
      })
    })
    setIndexedCards(data)
  }, [])

  // TODO: add redux store or context to manage state (it's a good to have)
  useEffect(() => {
    if (!indexedCards) return

    let wereAllQuestionsAnswered = true
    indexedCards?.forEach((card) => {
      if (!card.answered) {
        wereAllQuestionsAnswered = false
      }
    })

    if (wereAllQuestionsAnswered) {
      setOpenFinishDialog(true)
    }
  }, [indexedCards])

  const handleBackgroundColorChange = (hexColor: string) => {
    setSelectedBackgroundColor(hexColor)
  }

  const handleTextColorChange = (hexColor: string) => {
    setSelectedTextColor(hexColor)
  }

  const handleSelectAnswer = (answer: string, answeredCard: Card) => {
    if (!indexedCards) return
    const cardsIndexData: IndexedCardData[] = [...indexedCards]
    const currentCard = cardsIndexData.find((card) => card.id === answeredCard.id)

    if (currentCard) {
      currentCard.answered = true
      currentCard.answeredCorrectly = currentCard.correctAnswer === answer
      if (currentCard.answeredCorrectly) {
        setPoints(points + 1)
      }
    }

    if (currentCard && !currentCard.answered) {
      currentCard.answered = true
      setTotalQuestions(totalQuestions - 1)
    }
    setIndexedCards(cardsIndexData)
  }

  const handleFinish = () => {
    setDisplayAnswers(true)
    setOpenFinishDialog(false)
  }

  const handleReset = () => {
    resetAnsweredQuestions()
    setTotalQuestions(jsonData.content.length)
    setDisplayAnswers(false)
    setOpenFinishDialog(false)
    setResetCards(true)
    setPoints(0)

    setTimeout(() => {
      setResetCards(false)
    }, 400)
  }

  const resetAnsweredQuestions = () => {
    if (!indexedCards) return
    const cardsIndexData: IndexedCardData[] = [...indexedCards]
    cardsIndexData.forEach((card) => {
      card.answered = false
      card.answeredCorrectly = false
    })
    setIndexedCards(cardsIndexData)
  }

  return (
    <>
      <div className="py-2 flex justify-end items-end px-3">
        <span className="px-2">card color:</span>
        <ColorsSwatch
          key={1}
          colors={[
            '#CAE5FF',
            '#D0E8D0',
            '#FFF8E1',
            '#FFFACD',
            '#E6E6FA',
            '#F5FFFA',
            '#87CEEB',
            '#B0E0E6',
            '#FFFFF0',
            '#FFE5B4',
          ]}
          onSelect={handleBackgroundColorChange}
        />
      </div>
      <div className="flex justify-end items-end px-3 mb-4">
        <span className="px-2">text color:</span>
        <ColorsSwatch
          key={2}
          colors={[
            '#003366',
            '#36454F',
            '#228B22',
            '#708090',
            '#191970',
            '#556B2F',
            '#2A3439',
            '#4B0082',
            '#483D8B',
            '#008080',
          ]}
          onSelect={handleTextColorChange}
        />
      </div>

      <div className="flex flex-row justify-end">
        <div className="mb-6 flex justify-end items-end lg:pl-14 px-3 py-2 gap-x-4">
          {displayAnswers && (
            <button
              type="button"
              className="bg-indigo-500 border-2 border-indigo-500 rounded-md active:border-slate-900  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleReset}
            >
              Reset and try again
            </button>
          )}
          <button
            type="button"
            className="bg-slate-900 border-2 border-indigo-500 rounded-md active:border-slate-900  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => setDisplayAnswers(!displayAnswers)}
          >
            {displayAnswers ? 'Hide' : 'Show'} answers
          </button>
        </div>
      </div>

      <div>
        <CardList
          jsonData={jsonData.content}
          cardColor={selectedBackgroundColor}
          textColor={selectedTextColor}
          selectedCard={selectedCard}
          onSelectAnswer={handleSelectAnswer}
          onSelectCard={setSelectedCard}
          displayAnswers={displayAnswers}
          resetCards={resetCards}
        />
      </div>
      <ConfirmDialog
        open={openFinishDialog}
        setOpen={() => {}}
        title="You answered all questions!"
        message="That's it! You answered all questions. Would you like to finish and see the correct answers or reset and try again?"
        onConfirm={handleFinish}
        onCancel={handleReset}
        cancelButtonLabel="Reset"
        confirmButtonLabel="Finish"
        largeTitleText={`Score: ${points}/${maxQuestions}`}
        percentage={(points / maxQuestions) * MAX_POINTS_IN_PERCENTAGE}
      />
    </>
  )
}

export default MainCards
