<script lang="ts">
  import { onMount } from 'svelte'
  import lottie from 'lottie-web'

  import neutralJson from '$lib/animations/neutral.json'
  import winnerJson from '$lib/animations/winner.json'
  import loserJson from '$lib/animations/loser.json'

  interface Props {
    open: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
    cancelButtonLabel?: string
    confirmButtonLabel?: string
    largeTitleText?: string
    percentage?: number
  }

  let {
    open = $bindable(),
    title,
    message,
    onConfirm,
    onCancel,
    cancelButtonLabel = 'Cancel',
    confirmButtonLabel = 'Confirm',
    largeTitleText = '',
    percentage = 50
  }: Props = $props()

  let animationContainer: HTMLDivElement | null = $state(null)
  let animationInstance: any = null

  $effect(() => {
    if (open && animationContainer) {
      if (animationInstance) {
        animationInstance.destroy()
      }

      let animationData
      if (percentage === 100) {
        animationData = winnerJson
      } else if (percentage === 0) {
        animationData = loserJson
      } else {
        animationData = neutralJson
      }

      animationInstance = lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData
      })
    }

    return () => {
      if (animationInstance) {
        animationInstance.destroy()
        animationInstance = null
      }
    }
  })

  function getAnimationSize() {
    if (percentage === 100) return '250px'
    if (percentage === 0) return '90px'
    return '150px'
  }
</script>

{#if open}
  <div class="relative z-10" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        >
          <div>
            <div class="mx-auto flex h-48 w-48 items-center justify-center">
              <div
                bind:this={animationContainer}
                style="height: {getAnimationSize()}; width: {getAnimationSize()};"
              ></div>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                <div>
                  <div>{title}</div>
                  {#if largeTitleText}
                    <span class="text-6xl block">{largeTitleText}</span>
                  {/if}
                </div>
              </h3>
              <div class="mt-4">
                <p class="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              onclick={onConfirm}
            >
              {confirmButtonLabel}
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              onclick={onCancel}
            >
              {cancelButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
