'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import 'vanilla-cookieconsent/dist/cookieconsent.css'
import * as CookieConsent from 'vanilla-cookieconsent'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [enableGa4, setEnableGa4] = useState(true)

  useEffect(() => {
    CookieConsent.run({
      onConsent: ({ cookie }) => {
        if (cookie.categories.includes('analytics')) {
          setEnableGa4(true)
        } else {
          setEnableGa4(false)
        }
      },
      categories: {
        necessary: {
          enabled: true, // this category is enabled by default
          readOnly: true, // this category cannot be disabled
        },
        analytics: {
          enabled: true,
          autoClear: {
            cookies: [
              {
                name: /^_ga/, // regex: match all cookies starting with '_ga'
              },
              {
                name: '_gid', // string: exact cookie name
              },
            ],
          },

          // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
          services: {
            ga: {
              label: 'Google Analytics',
              onAccept: () => {
                setEnableGa4(true)
              },
              onReject: () => {
                setEnableGa4(false)
              },
            },
          },
        },
      },
      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies',
              description:
                'We use cookies to enhance your experience. Please select the categories you want to enable.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage Individual preferences',
            },
            preferencesModal: {
              title: 'Manage cookie preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Accept current selection',
              closeIconLabel: 'Close modal',
              sections: [
                {
                  title: 'Cookies',
                  description:
                    'Please select the categories you want to enable. Keep in mind that some of them are mandatory for the website to work properly.',
                },
                {
                  title: 'Strictly Necessary cookies',
                  description:
                    'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                  // this field will generate a toggle linked to the 'necessary' category
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Performance and Analytics',
                  description:
                    'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                  linkedCategory: 'analytics',
                },
              ],
            },
          },
        },
      },
    }).catch((e) => console.error('CookieConsent.run() failed:', e))
  }, [])

  return (
    <html lang="en">
      <head>
        <title>MyCards.study</title>
        <meta property="og:url" content="https://mycards.study" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MyCards.study" />
        <meta name="author" content="arthursilva.com" />
        <meta
          property="og:description"
          content="Study online with virtual cards, ask questions, paste notes, and receive study materials. Create study materials using AI."
        />
        <meta property="og:image" content="https://mycards.study/logo-icon.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mycards.study" />
        <meta property="twitter:url" content="https://mycards.study" />
        <meta name="twitter:title" content="MyCards.study" />
        <meta
          name="twitter:description"
          content="Study online with virtual cards, ask questions, paste notes, and receive study materials. Create study materials using AI."
        />
        <meta name="twitter:image" content="https://mycards.study/logo-icon.png" />
      </head>
      <body className={`customBody ${inter.className}`}>{children}</body>
      {enableGa4 && <GoogleAnalytics gaId={googleAnalyticsId} />}
    </html>
  )
}
