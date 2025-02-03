'use client'
import React from 'react'
import Card from './Card'
import { type Card as CardInterface } from '@/components/cards/CardInterface'
import { motion } from 'framer-motion'
import './CardList.css'

interface CardListProps {
  cardColor: string
  textColor: string
  onSelectAnswer: (answer: string, card: CardInterface) => void
  onSelectCard: (card: CardInterface) => void
  jsonData: CardInterface[]
  selectedCard: CardInterface | null
  displayAnswers: boolean
  resetCards: boolean
}

const CardList: React.FC<CardListProps> = ({
  jsonData,
  cardColor,
  textColor,
  onSelectAnswer,
  onSelectCard,
  displayAnswers,
  resetCards,
}) => {
  const handleSelectCard = (card: CardInterface) => {
    onSelectCard(card)
  }

  const handleSelectAnswer = (answer: string, card: CardInterface) => {
    onSelectAnswer(answer, card)
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div>
      <motion.div
        className="cards-container grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-4 2xl:gap-3"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ gridAutoRows: '1fr' }}
      >
        {jsonData.map((card, index) => (
          <motion.div key={index} className="item" variants={item}>
            <Card
              key={index}
              {...card}
              cardColor={cardColor}
              textColor={textColor}
              onSelect={() => handleSelectCard(card)}
              onSelectAnswer={(answer) => handleSelectAnswer(answer, card)}
              tabIndex={index}
              displayAnswer={displayAnswers}
              resetCard={resetCards}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default CardList
