<script lang="ts">
  import { toast } from './Toast.svelte'
  import Prompt from './Prompt.svelte'
  import MainCards from './cards/MainCards.svelte'
  import Loading from './Loading.svelte'
  import BackButton from './buttons/BackButton.svelte'

  const DEFAULT_MAX_QUESTIONS = 6
  const DEFAULT_ERROR_MESSAGE =
    "I'm sorry, there was an error generating the cards. Please try again."

  let lastUserMessage = $state('')
  let loading = $state(false)
  let displayCards = $state(false)
  let maxQuestions = $state(DEFAULT_MAX_QUESTIONS)
  let cards = $state<any>(null)

  async function generateTextCards(userMessage: string, numQuestions: number) {
    const AUTH_TOKEN = 'guest'
    loading = true

    try {
      const response = await fetch('/api/generate/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`
        },
        body: JSON.stringify({
          userMessage,
          maxQuestions: numQuestions
        })
      })

      const data = await response.json()
      const formatted = data.replace(/```json/g, '').replace(/```/g, '')

      const parsedData = JSON.parse(formatted)

      cards = parsedData
      loading = false

      if (!parsedData?.content || parsedData.content.length === 0) {
        displayCards = true
        toast.error(DEFAULT_ERROR_MESSAGE)
        return
      }
      displayCards = true
    } catch (error) {
      displayCards = false
      loading = false
      toast.error(DEFAULT_ERROR_MESSAGE)
    }
  }

  function handleSubmit(prompt: string, numQuestions: number) {
    lastUserMessage = prompt
    maxQuestions = numQuestions
    generateTextCards(prompt, numQuestions)
  }

  function handleOnChangeButton() {
    displayCards = false
  }

  function handleBackButtonClick() {
    if (displayCards) {
      displayCards = false
    }
  }
</script>

{#if displayCards}
  <div class="space-y-9 py-4">
    <BackButton onclick={handleBackButtonClick} />
  </div>
{/if}

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

{#if !displayCards && !loading}
  <Prompt {lastUserMessage} onSubmit={handleSubmit} />
{/if}

{#if displayCards && cards?.content && cards.content.length > 0}
  <MainCards jsonData={cards} {maxQuestions} onChangeMessageButton={handleOnChangeButton} />
{/if}
