import Layout from '@/components/Layout'
import { type Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import EntryCheatMode from '@/components/EntryCheatMode'

export const metadata: Metadata = {
  title: 'MyCards.study - Cheat Mode',
  description:
    'Study online with cards, create your own content and study online with them. Create study material with AI.',
  icons: [
    {
      url: '/favicon.png',
      sizes: '64x64',
      type: 'image/png',
    },
  ],
  metadataBase: new URL('https://mycards.study/cheat-mode'),
  openGraph: {
    title: 'MyCards.study - Cheat Mode',
    description:
      'Study online with cards, create your own content and study online with them. Create study material with AI.',
    images: [
      {
        url: '/favicon.png',
        width: 64,
        height: 64,
        alt: 'MyCards.study',
      },
      {
        url: '/logo-icon.png',
        width: 1200,
        height: 630,
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
        <EntryCheatMode />
        <ToastContainer position="bottom-right" theme="light" />
      </Layout>
    </main>
  )
}
