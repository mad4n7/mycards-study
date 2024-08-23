'use client'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AvailableLanguages } from '@/components/info'

const MAX_PROMPT_LENGTH = 4080

interface PromptProps {
  onSubmit: (userMessage: string) => void
  lastUserMessage?: string
}

const PromptCheatMode: React.FC<PromptProps> = ({ onSubmit, lastUserMessage }) => {
  const [userMessage, setUserMessage] = useState<string>('')

  useEffect(() => {
    document.getElementById('prompt')?.focus()
  }, [])

  useEffect(() => {
    if (lastUserMessage) {
      setUserMessage(lastUserMessage)
    }
  }, [lastUserMessage])

  const handleSubmit = () => {
    // check if userMessage has at least 3 words
    if (userMessage.split(' ').length < 1 || userMessage.length < 30) {
      toast('Your question is too short. Please try again.', {
        type: 'error',
      })
      return
    }
    onSubmit(userMessage)
  }

  return (
    <form>
      <div className="space-y-9 px-9">
        <div className="border-white/10 bg-green-950 rounded-md px-3 py-3">
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium leading-6 text-lime-400"
              >
                Copy and paste your question
              </label>
              <div className="mt-2">
                <textarea
                  tabIndex={1}
                  id="prompt"
                  name="prompt"
                  rows={9}
                  maxLength={MAX_PROMPT_LENGTH}
                  className="px-4 block w-full rounded-md border-2 border-lime-600 bg-slate-500/30 py-1.5 text-lime-400 shadow-sm ring-1 ring-inset ring-slate-600/10 focus:ring-2 focus:ring-inset focus:ring-slate-700 sm:text-sm sm:leading-6"
                  placeholder={'What do you want to know?'}
                  onChange={(e) => setUserMessage(e.target.value)}
                  value={userMessage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6">
          <button
            tabIndex={2}
            disabled={!userMessage}
            onClick={handleSubmit}
            type="button"
            className={`${!userMessage ? 'cursor-not-allowed bg-orange-800' : 'bg-orange-600'} rounded-md active:border-slate-900  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            Generate Answer
          </button>
        </div>
        <div className="mt-1 space-y-1 bg-slate-800 rounded-md p-6">
          <h4 className="text-white">Question Samples:</h4>
          <blockquote className="text-sm leading-6 text-white">
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "What is the capital of California?" -{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) => setUserMessage('What is the capital of California?')}
              >
                try it
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "Qual a cor do céu? Verde, Amarelo, Azul, Branco"-{' '}
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) =>
                  setUserMessage('Qual a cor do céu?\n Verde\n Amarelo\n Azul\n Branco')
                }
              >
                use este exemplo
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

export default PromptCheatMode
