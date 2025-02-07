'use client'

import React, { useState } from 'react'
import { Prompt } from '@/components/index'
import { MainCards } from '@/components/cards'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/components/Loading'
import { BackButton } from '@/components/buttons'

const DEFAULT_MAX_QUESTIONS = 6
const DEFAULT_ERROR_MESSAGE =
  "I'm sorry, there was an error generating the cards. Please try again."

const Entry: React.FC = () => {
  const [lastUserMessage, setLastUserMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [displayCards, setDisplayCards] = useState<boolean>(false)
  const [maxQuestions, setMaxQuestions] = useState<number>(DEFAULT_MAX_QUESTIONS)
  const [cards, setCards] = useState<any>()

  const generateTextCards = async (userMessage: string, maxQuestions: number) => {
    setLoading(true)

    const response = await fetch('/api/generate/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage,
        maxQuestions,
      }),
    })

    const data = await response.json()
    const formatted = data.replace(/```json/g, '').replace(/```/g, '')
    try {
      const parsedData = JSON.parse(formatted)
      setCards(parsedData)
      setLoading(false)

      if (!parsedData?.content && parsedData.content.length === 0) {
        setDisplayCards(true)
        toast(DEFAULT_ERROR_MESSAGE, {
          type: 'error',
        })
        return
      }
      setDisplayCards(true)
    } catch (error) {
      setDisplayCards(false)
      setLoading(false)
      toast(DEFAULT_ERROR_MESSAGE, {
        type: 'error',
      })
    }
  }

  const handleSubmit = (prompt: string, maxQuestions: number) => {
    setLastUserMessage(prompt)
    setMaxQuestions(maxQuestions)
    generateTextCards(prompt, maxQuestions)
      .then((r: any) => {
        // TODO: add toast
        // console.log(r)
      })
      .catch((e) => {
        // TODO: add toast
        // console.log(e)
      })
  }

  const handleOnChangeButton = () => {
    setDisplayCards(false)
  }

  const handleBackButtonClick = () => {
    if (displayCards) {
      setDisplayCards(false)
    }
  }

  return (
    <>
      {displayCards && (
        <div className="space-y-9 py-4">
          <BackButton onClick={handleBackButtonClick} />
        </div>
      )}
      {/* TODO: need to improve accessibility and then remove the following message or replace */}
      {/* Message for screen readers only */}
      <span className="sr-only">
        Hey there! We just wanted to drop a quick note to say we’re really sorry that our
        web app isn’t as accessible as it should be right now. We totally get how
        important it is for everyone to be able to use our stuff, no matter what. Here’s
        the deal: We’re on it. Making our app more accessible is high on our to-do list,
        and we’re figuring out the best ways to make things better for everyone. Got any
        tips or things you’ve noticed that we could fix? We’d love to hear from you. Just
        shoot us a message at contact@arthurbsilva.com, and let’s chat. Thanks for
        sticking with us while we sort this out. We’re all about making our app better for
        you.
      </span>
      {loading && <Loading />}
      {!displayCards && !loading && (
        <Prompt lastUserMessage={lastUserMessage} onSubmit={handleSubmit} />
      )}
      {displayCards && cards.content && cards.content.length > 0 && (
        <MainCards
          jsonData={cards}
          maxQuestions={maxQuestions}
          onChangeMessageButton={handleOnChangeButton}
        />
      )}
    </>
  )
}

export default Entry
