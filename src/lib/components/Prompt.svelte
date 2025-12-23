<script lang="ts">
  import { onMount } from 'svelte'
  import { toast } from './Toast.svelte'
  import AvailableLanguages from './info/AvailableLanguages.svelte'
  import PrimaryButton from './buttons/PrimaryButton.svelte'
  import { DEFAULT_MAX_QUESTIONS, MAX_PROMPT_LENGTH } from '$lib/contants'

  interface Props {
    onSubmit: (userMessage: string, maxQuestions: number) => void
    lastUserMessage?: string
  }

  let { onSubmit, lastUserMessage = '' }: Props = $props()

  let userMessage = $state('')
  let maxQuestions = $state(DEFAULT_MAX_QUESTIONS)

  onMount(() => {
    document.getElementById('prompt')?.focus()
  })

  $effect(() => {
    if (lastUserMessage) {
      userMessage = lastUserMessage
    }
  })

  function numberQuestionOptions() {
    return Array.from({ length: 10 }, (_, i) => i + 1)
  }

  function handleSubmit() {
    if (userMessage.split(' ').length < 1 || userMessage.length < 30) {
      toast.error('Your note or question is too short. Please try again.')
      return
    }
    onSubmit(userMessage, maxQuestions)
  }

  function setExample(text: string) {
    userMessage = text
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
            Copy and paste your study notes or ask a question
          </label>
          <div class="mt-2">
            <textarea
              tabindex={1}
              id="prompt"
              name="prompt"
              rows={9}
              maxlength={MAX_PROMPT_LENGTH}
              class="px-4 block w-full rounded-md border-2 border-slate-600 bg-slate-500/30 py-1.5 text-white shadow-sm ring-1 ring-inset ring-slate-600/10 focus:ring-2 focus:ring-inset focus:ring-slate-700 sm:text-sm sm:leading-6"
              placeholder="What do you want to study today? Type some notes or subjects you want to study."
              bind:value={userMessage}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between gap-x-6">
      <a href="/cheat-mode">
        <button
          tabindex={4}
          type="button"
          class="text-xs font-semibold leading-6 text-lime-400 rounded-md bg-slate-500 px-3 py-2 shadow-sm hover:bg-slate-400 focus-visible:outline hover:text-lime-800"
        >
          Cheat Mode
        </button>
      </a>
      <PrimaryButton onclick={handleSubmit} tabindex={2} disabled={!userMessage} highlight>
        Generate Questions
      </PrimaryButton>
    </div>
    <div class="mt-1 space-y-1">
      <fieldset>
        <div class="mt-6 space-y-6">
          <div class="relative flex gap-x-3 items-center">
            <div class="flex h-6 items-center">
              <label for="questions_number" class="block text-sm font-medium leading-6 text-white">
                Number of Questions
              </label>
            </div>
            <div class="text-sm leading-6">
              <select
                tabindex={3}
                id="questions_number"
                name="questions_number"
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white
                    shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500
                    sm:text-sm sm:leading-6 [&_*]:text-black"
                bind:value={maxQuestions}
              >
                {#each numberQuestionOptions() as num}
                  <option value={num}>{num}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="mt-1 space-y-1 bg-slate-800 rounded-md p-6">
      <h4 class="text-white">Examples:</h4>
      <blockquote class="text-sm leading-6 text-white">
        <p>
          "How do I use 'if' statements in Python?" -
          <button
            type="button"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onclick={() => setExample("How do I use 'if' statements in Python?")}
          >
            try it
          </button>
        </p>
        <p>
          "I want to study some basic Portuguese words for when I'm at the airport." -
          <button
            type="button"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onclick={() =>
              setExample(
                "I want to study some basic Portuguese words for when I'm at the airport."
              )}
          >
            try it
          </button>
        </p>
        <p>
          "I need to study the most important organs of the human body." -
          <button
            type="button"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onclick={() =>
              setExample('I need to study the most important organs of the human body.')}
          >
            try it
          </button>
        </p>
        <p>
          "Quais são os principais conceitos de inteligência artificial?" -
          <button
            type="button"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onclick={() =>
              setExample('Quais são os principais conceitos de inteligência artificial?')}
          >
            try it
          </button>
        </p>
        <p>
          "¿Cuáles son los conceptos principales de la Ingeniería Biomédica?" -
          <button
            type="button"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onclick={() =>
              setExample('¿Cuáles son los conceptos principales de la Ingeniería Biomédica?')}
          >
            try it
          </button>
        </p>
        <p>
          "ความหมายหลักของการตลาดคืออะไร?" -
          <button
            type="button"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onclick={() => setExample('ความหมายหลักของการตลาดคืออะไร?')}
          >
            try it
          </button>
        </p>
      </blockquote>
    </div>
    <div class="mt-1 space-y-1 bg-slate-800 rounded-md p-6">
      <AvailableLanguages />
    </div>
  </div>
</form>
