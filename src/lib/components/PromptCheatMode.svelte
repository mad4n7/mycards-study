<script lang="ts">
  import { onMount } from 'svelte'
  import { toast } from './Toast.svelte'
  import PrimaryButton from './buttons/PrimaryButton.svelte'

  const MAX_PROMPT_LENGTH = 4080

  interface Props {
    onSubmit: (userMessage: string) => void
    lastUserMessage?: string
  }

  let { onSubmit, lastUserMessage = '' }: Props = $props()

  let userMessage = $state('')

  onMount(() => {
    document.getElementById('prompt')?.focus()
  })

  $effect(() => {
    if (lastUserMessage) {
      userMessage = lastUserMessage
    }
  })

  function handleSubmit() {
    if (userMessage.split(' ').length < 1 || userMessage.length < 10) {
      toast.error('Your question is too short. Please try again.')
      return
    }
    onSubmit(userMessage)
  }
</script>

<form
  onsubmit={(e) => {
    e.preventDefault()
    handleSubmit()
  }}
>
  <div class="space-y-9 px-9">
    <div class="border-white/10">
      <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="col-span-full">
          <label for="prompt" class="block text-sm font-medium leading-6 text-white">
            Ask your question
          </label>
          <div class="mt-2">
            <textarea
              tabindex={1}
              id="prompt"
              name="prompt"
              rows={5}
              maxlength={MAX_PROMPT_LENGTH}
              class="px-4 block w-full rounded-md border-2 border-slate-600 bg-slate-500/30 py-1.5 text-white shadow-sm ring-1 ring-inset ring-slate-600/10 focus:ring-2 focus:ring-inset focus:ring-slate-700 sm:text-sm sm:leading-6"
              placeholder="Type your question here..."
              bind:value={userMessage}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end gap-x-6">
      <PrimaryButton onclick={handleSubmit} tabindex={2} disabled={!userMessage} highlight>
        Get Answer
      </PrimaryButton>
    </div>
  </div>
</form>
