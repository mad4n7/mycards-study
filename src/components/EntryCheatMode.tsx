'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '@/components/Loading'
import PromptCheatMode from '@/components/PromptCheatMode'
import BackButton from '@/components/BackButton'
import { useRouter } from 'next/navigation'

import Image from 'next/image'

const DEFAULT_ERROR_MESSAGE =
  'There was an error generating the answer. Please try again.'

const Entry: React.FC = () => {
  const router = useRouter()
  const [lastUserMessage, setLastUserMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [displayAnswer, setDisplayAnswer] = useState<boolean>(false)
  const [answer, setAnswer] = useState<any>()
  const [animationIcon, setAnimationIcon] = useState<any>('')

  useEffect(() => {
    const animations = ['/animations/cheat1.gif', '/animations/cheat2.gif']
    setAnimationIcon(animations[Math.floor(Math.random() * animations.length)])
  }, [displayAnswer])

  const generateAnswer = async (userMessage: string) => {
    const AUTH_TOKEN = 'guest'
    setLoading(true)

    // TODO: the auth token is being used here for future use (Paid plans)
    const response = await fetch('/api/generate/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        userMessage,
      }),
    })

    const data = await response.json()
    const formatted = data.replace(/```json/g, '').replace(/```/g, '')

    try {
      const parsedData = JSON.parse(formatted)
      setAnswer(parsedData)
      setLoading(false)

      if (!parsedData?.answer && parsedData.answer.length === 0) {
        setDisplayAnswer(true)
        toast(DEFAULT_ERROR_MESSAGE, {
          type: 'error',
        })
        return
      }
      setDisplayAnswer(true)
    } catch (error) {
      setDisplayAnswer(false)
      setLoading(false)
      toast(DEFAULT_ERROR_MESSAGE, {
        type: 'error',
      })
    }
  }

  const handleSubmit = (prompt: string) => {
    setLastUserMessage(prompt)
    generateAnswer(prompt)
      .then((r: any) => {
        // console.log(r)
      })
      .catch((e) => {
        // console.log(e)
      })
  }

  const handleBackButtonClick = () => {
    if (displayAnswer) {
      setDisplayAnswer(false)
      return
    }

    router.push('/')
  }

  return (
    <>
      <div className="space-y-9 px-9 py-4">
        <BackButton onClick={handleBackButtonClick} />
      </div>
      <div className="space-y-9 px-9 py-4">
        <h1 className="font-extrabold text-white">Cheat Mode 😒...</h1>
      </div>
      {/* TODO: need to improve accessibility and then remove the following message or replace */}
      {/* Message for screen readers only */}
      <span className="sr-only">
        Hey there! We just wanted to drop a quick note to say we’re really sorry that our
        web app isn’t as accessible as it should be right now. We totally get how
        important it is for everyone to be able to use our stuff, no matter what. Here’s
        the deal: We’re on it. Making our app more accessible is high on our to-do list,
        and we’re figuring out the best ways to make things better for everyone. Got any
        tips or things you’ve noticed that we could fix? We’d love to hear from you. Just
        shoot us a message at support@udooku.com, and let’s chat. Thanks for sticking with
        us while we sort this out. We’re all about making our app better for you.
      </span>
      {loading && <Loading />}
      {!displayAnswer && !loading && (
        <PromptCheatMode lastUserMessage={lastUserMessage} onSubmit={handleSubmit} />
      )}
      {displayAnswer && answer.answer && answer.answer.length > 0 && (
        <div className="space-y-9 px-9 py-4">
          <div className="flex justify-between items-end px-3 gap-x-4">
            <div>
              <h1 className="text-white">Answer:</h1>
            </div>
          </div>
          <div className="mt-1 space-y-1 bg-slate-800 rounded-md p-6">
            <div className=" text-white">{answer.answer}</div>
          </div>
          <div className="mt-1 space-y-1 rounded-md p-6 items-center justify-center flex">
            <Image
              className="h-40 w-auto"
              src={animationIcon}
              alt="Funny Animation"
              width={300}
              height={80}
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Entry
