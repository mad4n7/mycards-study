import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

import neutralJson from '@/animations/neutral.json'
import winnerJson from '@/animations/winner.json'
import loserJson from '@/animations/loser.json'

interface IConfirmDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  cancelButtonLabel?: string
  confirmButtonLabel?: string
  largeTitleText?: string
  percentage?: number
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  open,
  setOpen,
  title,
  message,
  onConfirm,
  onCancel,
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel = 'Confirm',
  largeTitleText = '',
  percentage,
}) => {
  const cancelButtonRef = useRef(null)
  const [animationIcon, setAnimationIcon] = useState<any>('')
  const [animationIconSize, setAnimationIconSize] = useState('200px')

  useEffect(() => {
    if (percentage === 100) {
      setAnimationIcon(winnerJson)
    } else if (percentage === 0) {
      setAnimationIcon(loserJson)
      setAnimationIconSize('90px')
    } else {
      setAnimationIconSize('150px')
      setAnimationIcon(neutralJson)
    }
  }, [percentage])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center">
                    {/* <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" /> */}
                    <Player
                      autoplay
                      loop
                      src={animationIcon}
                      style={{
                        height: animationIconSize,
                        width: animationIconSize,
                      }}
                    >
                      <Controls visible={false} />
                    </Player>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      <div>
                        <div>{title}</div>
                        {largeTitleText && <h1 className="text-6xl">{largeTitleText}</h1>}
                      </div>
                    </Dialog.Title>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={onConfirm}
                  >
                    {confirmButtonLabel}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={onCancel}
                    ref={cancelButtonRef}
                  >
                    {cancelButtonLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ConfirmDialog
