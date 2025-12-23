<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    open: boolean
    title: string
    children: Snippet
  }

  let { open = $bindable(), title, children }: Props = $props()

  function handleClose() {
    open = false
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      open = false
    }
  }
</script>

{#if open}
  <div class="relative z-10" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        onclick={handleBackdropClick}
        onkeydown={(e) => e.key === 'Escape' && handleClose()}
        role="button"
        tabindex="-1"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
        >
          <div>
            <div class="mt-3 sm:mt-5">
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                {title}
              </h3>
              <div class="mt-4 overflow-auto">
                <div class="text-sm text-gray-500">
                  {@render children()}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              onclick={handleClose}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
