'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Loading = () => {
  const [message, setMessage] = useState<string>('Loading...')

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage((prev) => {
        if (prev === 'Loading...') {
          return 'Loading'
        } else {
          return prev + '.'
        }
      })
    }, 500)

    setTimeout(() => {
      setMessage('Almost there... 🚀')
    }, 6000)

    setTimeout(() => {
      setMessage('Something is taking longer than expected... 🐢')
    }, 20000)

    setTimeout(() => {
      setMessage('Something wrong happened, please refresh the page and try again... 😢')
    }, 30000)
    return () => clearInterval(interval)
  })

  return (
    <div className="flex flex-col items-center">
      <div>
        <Image src="/loading.gif" alt="Loading" width={512} height={256} priority />
      </div>
      <div>
        <span className="relative flex items-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          <p className="text-white mx-5">{message}</p>
        </span>
      </div>
    </div>
  )
}

export default Loading
