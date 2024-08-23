import Layout from '@/components/Layout'
import { Entry } from '@/components'
import { type Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import React from 'react'

export const metadata: Metadata = {
  title: 'MyCards.study',
  description:
    'Study online with virtual cards, ask questions, paste notes, and receive study materials. Create study materials using AI.',
  icons: [
    {
      url: '/favicon.png',
      sizes: '64x64',
      type: 'image/png',
    },
  ],
  metadataBase: new URL('https://mycards.study'),
  openGraph: {
    title: 'MyCards.study',
    description:
      'Study online with virtual cards, ask questions, paste notes, and receive study materials. Create study materials using AI.',
    images: [
      {
        url: '/favicon.png',
        width: 64,
        height: 64,
        alt: 'MyCards.study',
      },
      {
        url: '/mycards-study-logo.png',
        width: 440,
        height: 90,
        alt: 'MyCards.study',
      },
    ],
    siteName: 'MyCards.study',
  },

  keywords: [
    'mycards.study',
    'study with ai',
    'study online',
    'study with flashcards',
    'flashcards',
    'study',
    'online study',
    'study app',
    'flashcard app',
    'flashcard study',
    'study flashcards',
    'study online flashcards',
    'study flashcards online',
    'study with flashcards online',
    'study online with flashcards',
    'study with flashcards online',
    'study online flashcard',
    'study flashcard online',
    'study online flashcard',
    'study flashcard',
  ],
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-900">
      <Layout>
        <Entry />
        <ToastContainer position="bottom-right" theme="light" />
      </Layout>
    </main>
  )
}
