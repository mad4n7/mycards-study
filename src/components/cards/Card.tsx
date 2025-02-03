'use client'
import React, { useEffect } from 'react'
import './Card.css'
import { type Card as CardInterface } from '@/components/cards/CardInterface'

interface CardProps extends CardInterface {
  onSelect: () => void
  onSelectAnswer: (answer: string) => void
  tabIndex: number
  displayAnswer: boolean
  resetCard: boolean
}

const Card: React.FC<CardProps> = ({
  question,
  code,
  options,
  displayAnswer,
  correctAnswer,
  onSelect,
  onSelectAnswer,
  cardColor = '',
  textColor = '',
  tabIndex = 0,
  resetCard = false,
}) => {
  const [overlayVisible, setOverlayVisible] = React.useState(true)
  const [canClick, setCanClick] = React.useState(true)

  useEffect(() => {
    if (resetCard) {
      setOverlayVisible(true)
      setCanClick(true)
      clearSelection()
    }
  }, [resetCard])

  const handleClicked = () => {
    if (canClick) {
      setOverlayVisible(!overlayVisible)
      onSelect()
      setCanClick(false)
    }
  }

  const clearSelection = () => {
    options.forEach((_, index) => {
      const radioElement = document.getElementById(
        `${index.toString()}-${tabIndex}`,
      ) as HTMLInputElement
      if (radioElement) {
        radioElement.checked = false
      }
    })
  }

  function handleSelectedAnswer(option: string) {
    onSelectAnswer(option)
    onSelect()
  }

  return (
    <div
      className={`card p-4 rounded-lg shadow-lg border-white border-4 ${canClick ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ backgroundColor: cardColor }}
      onClick={handleClicked}
    >
      {overlayVisible && (
        <>
          <div className="overlay flex justify-center">
            <h2
              className="sm:text-2xl md:text-2xl font-bold mb-6 px-6 py-14"
              style={{ color: textColor }}
            >
              {question}
            </h2>
          </div>
          <div className="overlay flex justify-center">
            <h3
              className="flex questionMark align-middle items-center text-xl font-bold mb-2"
              style={{ color: textColor }}
            >
              ?
            </h3>
          </div>
        </>
      )}
      <div className={`content ${overlayVisible ? 'hidden' : ''}`}>
        <h2
          className="sm:text-2xl md:text-xl font-bold mb-6"
          style={{ color: textColor }}
        >
          {question}
        </h2>
        <p className="text-sm mb-2" style={{ color: textColor }}>
          {code}
        </p>
        <ul>
          {options.map((option, index) => (
            <li key={index} className="text-sm py-1" style={{ color: textColor }}>
              <span
                key={index.toString()}
                className="flex items-center"
                style={{
                  backgroundColor:
                    option === correctAnswer && displayAnswer ? 'lightgreen' : '',
                  border:
                    option === correctAnswer && displayAnswer ? '1px solid green' : '',
                  borderRadius: option === correctAnswer && displayAnswer ? '5px' : '',
                  padding: option === correctAnswer && displayAnswer ? '5px' : '',
                }}
              >
                <input
                  id={`${index.toString()}-${tabIndex}`}
                  name={`question-${tabIndex}`}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onClick={() => handleSelectedAnswer(option)}
                />
                <label
                  htmlFor={`${index.toString()}-${tabIndex}`}
                  className="ml-3 block text-sm font-medium leading-6"
                >
                  {option}
                </label>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Card
