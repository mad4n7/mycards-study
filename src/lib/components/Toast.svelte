<script lang="ts" context="module">
  import { writable } from 'svelte/store'

  interface ToastMessage {
    id: number
    message: string
    type: 'success' | 'error' | 'info'
  }

  export const toasts = writable<ToastMessage[]>([])

  let toastId = 0

  export function toast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = toastId++
    toasts.update((t) => [...t, { id, message, type }])
    setTimeout(() => {
      toasts.update((t) => t.filter((toast) => toast.id !== id))
    }, 4000)
  }

  toast.error = (message: string) => toast(message, 'error')
  toast.success = (message: string) => toast(message, 'success')
</script>

<script lang="ts">
  import { fly } from 'svelte/transition'
</script>

<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
  {#each $toasts as t (t.id)}
    <div
      transition:fly={{ y: 50, duration: 300 }}
      class="px-4 py-3 rounded-lg shadow-lg text-white text-sm max-w-sm {t.type === 'error'
        ? 'bg-red-600'
        : t.type === 'success'
          ? 'bg-green-600'
          : 'bg-gray-700'}"
    >
      {t.message}
    </div>
  {/each}
</div>
