<script lang="ts">
  import '../app.css'
  import 'vanilla-cookieconsent/dist/cookieconsent.css'
  import * as CookieConsent from 'vanilla-cookieconsent'
  import { onMount } from 'svelte'
  import Toast from '$lib/components/Toast.svelte'

  let { children } = $props()

  let enableGa4 = $state(true)
  const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID ?? ''

  onMount(() => {
    CookieConsent.run({
      onConsent: ({ cookie }) => {
        if (cookie.categories.includes('analytics')) {
          enableGa4 = true
          loadGoogleAnalytics()
        } else {
          enableGa4 = false
        }
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {
          enabled: true,
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: '_gid' }]
          },
          services: {
            ga: {
              label: 'Google Analytics',
              onAccept: () => {
                enableGa4 = true
                loadGoogleAnalytics()
              },
              onReject: () => {
                enableGa4 = false
              }
            }
          }
        }
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
              showPreferencesBtn: 'Manage Individual preferences'
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
                    'Please select the categories you want to enable. Keep in mind that some of them are mandatory for the website to work properly.'
                },
                {
                  title: 'Strictly Necessary cookies',
                  description:
                    'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Performance and Analytics',
                  description:
                    'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                  linkedCategory: 'analytics'
                }
              ]
            }
          }
        }
      }
    }).catch((e) => console.error('CookieConsent.run() failed:', e))
  })

  function loadGoogleAnalytics() {
    if (!googleAnalyticsId || typeof window === 'undefined') return

    const existingScript = document.querySelector(`script[src*="googletagmanager"]`)
    if (existingScript) return

    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      function gtag(...args: any[]) {
        ;(window as any).dataLayer.push(args)
      }
      gtag('js', new Date())
      gtag('config', googleAnalyticsId)
    }
  }
</script>

<svelte:head>
  <title>MyCards.study</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="font-['Inter']">
  {@render children()}
</div>

<Toast />
