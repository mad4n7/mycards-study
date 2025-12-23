<script lang="ts">
  import { goto } from '$app/navigation'
  import { toast } from './Toast.svelte'
  import Loading from './Loading.svelte'
  import PromptCheatMode from './PromptCheatMode.svelte'
  import BackButton from './buttons/BackButton.svelte'

  const DEFAULT_ERROR_MESSAGE = 'There was an error generating the answer. Please try again.'

  let lastUserMessage = $state('')
  let loading = $state(false)
  let displayAnswer = $state(false)
  let answer = $state<any>(null)
  let animationIcon = $state('')

  const animations = ['/animations/cheat1.gif', '/animations/cheat2.gif']

  $effect(() => {
    if (displayAnswer) {
      animationIcon = animations[Math.floor(Math.random() * animations.length)]
    }
  })

  async function generateAnswer(userMessage: string) {
    const AUTH_TOKEN = 'guest'
    loading = true

    try {
      const response = await fetch('/api/generate/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`
        },
        body: JSON.stringify({ userMessage })
      })

      const data = await response.json()
      const formatted = data.replace(/```json/g, '').replace(/```/g, '')

      const parsedData = JSON.parse(formatted)
      answer = parsedData
      loading = false

      if (!parsedData?.answer || parsedData.answer.length === 0) {
        displayAnswer = true
        toast.error(DEFAULT_ERROR_MESSAGE)
        return
      }
      displayAnswer = true
    } catch (error) {
      displayAnswer = false
      loading = false
      toast.error(DEFAULT_ERROR_MESSAGE)
    }
  }

  function handleSubmit(prompt: string) {
    lastUserMessage = prompt
    generateAnswer(prompt)
  }

  function handleBackButtonClick() {
    if (displayAnswer) {
      displayAnswer = false
      return
    }
    goto('/')
  }
</script>

<div class="space-y-9 px-9 py-4">
  <BackButton onclick={handleBackButtonClick} />
</div>
<div class="space-y-9 px-9 py-4">
  <h1 class="font-extrabold text-white">Cheat Mode 😒...</h1>
</div>

<span class="sr-only">
  Hey there! We just wanted to drop a quick note to say we're really sorry that our web app isn't as
  accessible as it should be right now. We totally get how important it is for everyone to be able
  to use our stuff, no matter what. Here's the deal: We're on it. Making our app more accessible is
  high on our to-do list, and we're figuring out the best ways to make things better for everyone.
  Got any tips or things you've noticed that we could fix? We'd love to hear from you. Just shoot us
  a message at contact@arthursilva.com, and let's chat. Thanks for sticking with us while we sort
  this out. We're all about making our app better for you.
</span>

{#if loading}
  <Loading />
{/if}

{#if !displayAnswer && !loading}
  <PromptCheatMode {lastUserMessage} onSubmit={handleSubmit} />
{/if}

{#if displayAnswer && answer?.answer && answer.answer.length > 0}
  <div class="space-y-9 px-9 py-4">
    <div class="flex justify-between items-end px-3 gap-x-4">
      <div>
        <h1 class="text-white">Answer:</h1>
      </div>
    </div>
    <div class="mt-1 space-y-1 bg-slate-800 rounded-md p-6">
      <div class="text-white">{answer.answer}</div>
    </div>
    <div class="mt-1 space-y-1 rounded-md p-6 items-center justify-center flex">
      <img class="h-40 w-auto" src={animationIcon} alt="Funny Animation" width="300" height="80" />
    </div>
  </div>
{/if}
