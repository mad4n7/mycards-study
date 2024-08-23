'use client'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AvailableLanguages } from '@/components/info'
import Link from 'next/link'

const DEFAULT_MAX_QUESTIONS = 6
const MAX_PROMPT_LENGTH = 4080

interface PromptProps {
  onSubmit: (userMessage: string, maxQuestions: number) => void
  lastUserMessage?: string
}

const Prompt: React.FC<PromptProps> = ({ onSubmit, lastUserMessage }) => {
  const [userMessage, setUserMessage] = useState<string>('')
  const [maxQuestions, setMaxQuestions] = useState<number>(DEFAULT_MAX_QUESTIONS)

  useEffect(() => {
    document.getElementById('prompt')?.focus()
  }, [])

  useEffect(() => {
    if (lastUserMessage) {
      setUserMessage(lastUserMessage)
    }
  }, [lastUserMessage])

  const numberQuestionOptions = () => {
    const options = []
    for (let i = 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i} defaultValue={6}>
          {i}
        </option>,
      )
    }
    return options
  }

  const handleSubmit = () => {
    // check if userMessage has at least 3 words
    if (userMessage.split(' ').length < 1 || userMessage.length < 30) {
      toast('Your note or question is too short. Please try again.', {
        type: 'error',
      })
      return
    }
    onSubmit(userMessage, maxQuestions)
  }

  return (
    <form>
      <div className="space-y-9 px-9">
        <div className="border-white/10">
          {/* <h2 className="text-base font-semibold leading-7 text-white">Profile</h2> */}
          {/* <p className="mt-1 text-sm leading-6 text-gray-400"> */}
          {/*  Hi! I'm here to help you to study more and have some fun. You can either paste */}
          {/*  your notes or tell me what subjects you want to study today. I'll generate */}
          {/*  some questions for you. */}
          {/* </p> */}

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium leading-6 text-white"
              >
                Copy and paste your study notes or ask a question
              </label>
              <div className="mt-2">
                <textarea
                  tabIndex={1}
                  id="prompt"
                  name="prompt"
                  rows={9}
                  maxLength={MAX_PROMPT_LENGTH}
                  className="px-4 block w-full rounded-md border-2 border-slate-600 bg-slate-500/30 py-1.5 text-white shadow-sm ring-1 ring-inset ring-slate-600/10 focus:ring-2 focus:ring-inset focus:ring-slate-700 sm:text-sm sm:leading-6"
                  placeholder={
                    'What do you want to study today? Type some notes or subjects you want to study.'
                  }
                  onChange={(e) => setUserMessage(e.target.value)}
                  value={userMessage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-6">
          <Link href={'/cheat-mode'}>
            <button
              tabIndex={4}
              type="button"
              className="text-xs font-semibold leading-6 text-lime-400 rounded-md bg-slate-500 px-3 py-2 shadow-sm hover:bg-slate-400 focus-visible:outline hover:text-lime-800"
            >
              Cheat Mode
            </button>
          </Link>
          <button
            tabIndex={2}
            disabled={!userMessage}
            onClick={handleSubmit}
            type="button"
            className={`${!userMessage ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-500'} rounded-md active:border-slate-900  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            Generate Questions
          </button>
        </div>
        <div className="mt-1 space-y-1">
          <fieldset>
            {/* <legend className="text-sm font-semibold leading-6 text-white"> */}
            {/*  Customize */}
            {/* </legend> */}
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3 items-center">
                <div className="flex h-6 items-center">
                  <label
                    htmlFor="questions_number"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Number of Questions
                  </label>
                </div>
                <div className="text-sm leading-6">
                  {/* <label htmlFor="comments" className="font-medium text-white"> */}
                  {/*  Generate new questions */}
                  {/* </label> */}

                  <select
                    tabIndex={3}
                    id="questions_number"
                    name="questions_number"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    defaultValue={6}
                    onChange={(e) => setMaxQuestions(Number(e.target.value))}
                  >
                    {numberQuestionOptions()}
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-1 space-y-1 bg-slate-800 rounded-md p-6">
          <h4 className="text-white">Examples:</h4>
          <blockquote className="text-sm leading-6 text-white">
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "How do I use 'if' statements in Python?" -{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) => setUserMessage("How do I use 'if' statements in Python?")}
              >
                try it
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "I want to study some basic Portuguese words for when I'm at the airport."-{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) =>
                  setUserMessage(
                    "I want to study some basic Portuguese words for when I'm at the airport.",
                  )
                }
              >
                try it
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "I need to study the most important organs of the human body."-{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) =>
                  setUserMessage(
                    'I need to study the most important organs of the human body.',
                  )
                }
              >
                try it
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "Quais são os principais conceitos de inteligência artificial?"-{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) =>
                  setUserMessage(
                    'Quais são os principais conceitos de inteligência artificial?',
                  )
                }
              >
                try it
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "¿Cuáles son los conceptos principales de la Ingeniería Biomédica?"-{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) =>
                  setUserMessage(
                    '¿Cuáles son los conceptos principales de la Ingeniería Biomédica?',
                  )
                }
              >
                try it
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "ความหมายหลักของการตลาดคืออะไร?"-{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) => setUserMessage('ความหมายหลักของการตลาดคืออะไร?')}
              >
                try it
              </a>
            </p>
          </blockquote>
        </div>
        <div className="mt-1 space-y-1 bg-slate-800 rounded-md p-6">
          <AvailableLanguages />
        </div>
      </div>
    </form>
  )
}

export default Prompt
