'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { TextInfoDialog } from '@/components/dialogs'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

interface FeatureProps {
  children: React.ReactNode
}

export default function Layout({ children }: FeatureProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [termsOfUseOpen, setTermsOfUseOpen] = useState(false)
  const [contactUsOpen, setContactUsOpen] = useState(false)

  return (
    <div className="bg-slate-900 w-screen px-6 lg:px-36 md:px-24">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="https://mycards.study" className="-m-1.5 p-1.5">
              <span className="sr-only">mycards.study</span>
              <Image
                className="h-8 w-auto"
                src={'/mycards-study-logo.png'}
                alt="MyCards.Study Logo"
                width={300}
                height={80}
                priority
              />
            </a>
          </div>
          {/* <div className="flex lg:hidden"> */}
          {/*  <button */}
          {/*    type="button" */}
          {/*    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400" */}
          {/*    onClick={() => setMobileMenuOpen(true)} */}
          {/*  > */}
          {/*    <span className="sr-only">Open main menu</span> */}
          {/*    <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
          {/*  </button> */}
          {/* </div> */}
          {/* <div className="hidden lg:flex lg:gap-x-12"> */}
          {/*  {navigation.map((item) => ( */}
          {/*    <a */}
          {/*      key={item.name} */}
          {/*      href={item.href} */}
          {/*      className="text-sm font-semibold leading-6 text-white" */}
          {/*    > */}
          {/*      {item.name} */}
          {/*    </a> */}
          {/*  ))} */}
          {/* </div> */}
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end"> */}
          {/*  <a href="#" className="text-sm font-semibold leading-6 text-white"> */}
          {/*    Log in <span aria-hidden="true">&rarr;</span> */}
          {/*  </a> */}
          {/* </div> */}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="https://mycards.study" className="-m-1.5 p-1.5">
                <span className="sr-only">mycards.study</span>
                <Image
                  className="h-8 w-auto"
                  src={'/mycards-study-logo.png'}
                  alt="MyCards.Study Logo"
                  width={300}
                  height={80}
                  priority
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden pb-4 pt-4 sm:pb-20">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 bg-gray-900 sm:mt-56" aria-labelledby="footer-heading">
        <a
          href="#"
          className="text-xs text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => setTermsOfUseOpen(true)}
        >
          Terms of Use
        </a>
        <a
          href="#"
          className="pl-4 text-xs text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => setContactUsOpen(true)}
        >
          Contact
        </a>
        <a
          href="https://udooku.com"
          target={'_new'}
          className="pl-4 text-xs text-blue-600 dark:text-blue-500 hover:underline"
        >
          A Udooku LLC Product
        </a>
      </footer>
      <TextInfoDialog
        key="contact-us"
        open={contactUsOpen}
        setOpen={setContactUsOpen}
        title="Hi there!"
        onClose={() => setContactUsOpen(false)}
      >
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Contact</h1>
          <p className="mb-2">
            {`Hi there! We hope you are enjoying the web application. We always looking for ways to improve it.`}
          </p>
          <p className="mb-2">
            If you have any questions, suggestions, or concerns, please feel free to
            contact us at <strong>hello@udooku.com</strong>.
          </p>
        </div>
      </TextInfoDialog>
      <TextInfoDialog
        key="terms-of-use"
        open={termsOfUseOpen}
        setOpen={setTermsOfUseOpen}
        title="Using mycards.study"
        onClose={() => setTermsOfUseOpen(false)}
      >
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
          <p className="mb-2">
            Welcome to <strong>mycards.study</strong>. By accessing and using our
            services, you agree to comply with the following terms and conditions. Please
            read them carefully.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">AI-Generated Content</h2>
          <p className="mb-2">
            The content provided on <strong>mycards.study</strong> is generated by
            artificial intelligence (AI). <strong>Udooku LLC</strong> does not guarantee
            the accuracy, reliability, or appropriateness of the AI-generated content.
            Users acknowledge that by using the service, they may encounter content that
            could be incorrect, misleading, or offensive. <strong>Udooku LLC</strong>{' '}
            disclaims all liability related to the use of or reliance on any AI-generated
            content posted on <strong>mycards.study</strong>.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Prohibited Use</h2>
          <p className="mb-2">
            Users are strictly prohibited from using <strong>mycards.study</strong> to
            generate or disseminate any illegal content. This includes, but is not limited
            to, content that is defamatory, obscene, abusive, that infringes on
            intellectual property rights, or that promotes illegal activities.{' '}
            <strong>Udooku LLC</strong> reserves the right to remove such content and take
            appropriate actions against the responsible users, which may include reporting
            to law enforcement authorities and banning from the service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Misleading Information</h2>
          <p className="mb-2">
            <strong>Udooku LLC</strong> is not responsible for any misleading or incorrect
            information generated by AI on <strong>mycards.study</strong>. Users should
            exercise caution and use their judgment when interacting with AI-generated
            content on the platform.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Reporting Violations</h2>
          <p className="mb-2">
            If you encounter any content that violates these Terms of Use, please report
            it to us immediately at <strong>support@udooku.com</strong>.{' '}
            <strong>Udooku LLC</strong> is committed to maintaining a safe and respectful
            community and appreciates your cooperation in upholding these standards.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Changes to Terms of Use</h2>
          <p className="mb-2">
            <strong>Udooku LLC</strong> reserves the right to modify these Terms of Use at
            any time. Any changes will be effective immediately upon posting on{' '}
            <strong>mycards.study</strong>. Your continued use of the service constitutes
            your agreement to be bound by such modifications to the Terms of Use.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p className="mb-2">
            For any questions or concerns regarding these Terms of Use, please contact us
            at <strong>support@udooku.com</strong>.
          </p>

          <p className="mt-6">
            Thank you for choosing <strong>mycards.study</strong>. We are committed to
            providing a quality service and appreciate your adherence to these Terms of
            Use.
          </p>
        </div>
      </TextInfoDialog>
    </div>
  )
}
