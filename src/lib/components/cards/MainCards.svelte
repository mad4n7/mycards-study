<script lang="ts">
  import ColorsSwatch from '../colorsSwatch/ColorsSwatch.svelte'
  import CardList from './CardList.svelte'
  import ConfirmDialog from '../dialogs/ConfirmDialog.svelte'
  import PrimaryButton from '../buttons/PrimaryButton.svelte'
  import type { CardData, IndexedCardData } from './types'

  const MAX_POINTS_IN_PERCENTAGE = 100

  interface Props {
    jsonData: { content: CardData[] }
    maxQuestions: number
    onChangeMessageButton: () => void
  }

  let { jsonData, maxQuestions, onChangeMessageButton }: Props = $props()

  let selectedCard = $state<CardData | null>(null)
  let selectedBackgroundColor = $state('')
  let selectedTextColor = $state('')
  let displayAnswers = $state(false)
  let points = $state(0)
  let totalQuestions = $derived(maxQuestions)
  let openFinishDialog = $state(false)
  let resetCards = $state(false)
  let indexedCards = $state<IndexedCardData[]>([])

  $effect(() => {
    const data: IndexedCardData[] = []
    jsonData.content.forEach((card) =>{
      data.push({
        id: card.id,
        answered: false,
        answeredCorrectly: false,
        correctAnswer: card.correctAnswer
      })
    })
    indexedCards = data
  })

  $effect(() => {
    if (indexedCards.length === 0) return

    let wereAllQuestionsAnswered = true
    indexedCards.forEach((card) => {
      if (!card.answered) {
        wereAllQuestionsAnswered = false
      }
    })

    if (wereAllQuestionsAnswered) {
      openFinishDialog = true
    }
  })

  function handleBackgroundColorChange(hexColor: string) {
    selectedBackgroundColor = hexColor
  }

  function handleTextColorChange(hexColor: string) {
    selectedTextColor = hexColor
  }

  function handleSelectAnswer(answer: string, answeredCard: CardData) {
    if (indexedCards.length === 0) return
    const cardsIndexData = [...indexedCards]
    const currentCard = cardsIndexData.find((card) => card.id === answeredCard.id)

    if (currentCard) {
      currentCard.answered = true
      currentCard.answeredCorrectly = currentCard.correctAnswer === answer
      if (currentCard.answeredCorrectly) {
        points = points + 1
      }
    }

    if (currentCard && !currentCard.answered) {
      currentCard.answered = true
      totalQuestions = totalQuestions - 1
    }
    indexedCards = cardsIndexData
  }

  function handleFinish() {
    displayAnswers = true
    openFinishDialog = false
  }

  function handleReset() {
    resetAnsweredQuestions()
    totalQuestions = jsonData.content.length
    displayAnswers = false
    openFinishDialog = false
    resetCards = true
    points = 0

    setTimeout(() => {
      resetCards = false
    }, 400)
  }

  function resetAnsweredQuestions() {
    if (indexedCards.length === 0) return
    const cardsIndexData = [...indexedCards]
    cardsIndexData.forEach((card) => {
      card.answered = false
      card.answeredCorrectly = false
    })
    indexedCards = cardsIndexData
  }
</script>

<div class="py-2 flex justify-end items-end px-3">
  <span class="px-2">card color:</span>
  <ColorsSwatch
    colors={[
      '#CAE5FF',
      '#D0E8D0',
      '#FFF8E1',
      '#FFFACD',
      '#E6E6FA',
      '#F5FFFA',
      '#87CEEB',
      '#B0E0E6',
      '#FFFFF0',
      '#FFE5B4'
    ]}
    onSelect={handleBackgroundColorChange}
  />
</div>
<div class="flex justify-end items-end px-3 mb-4">
  <span class="px-2">text color:</span>
  <ColorsSwatch
    colors={[
      '#003366',
      '#36454F',
      '#228B22',
      '#708090',
      '#191970',
      '#556B2F',
      '#2A3439',
      '#4B0082',
      '#483D8B',
      '#008080'
    ]}
    onSelect={handleTextColorChange}
  />
</div>

<div class="flex flex-row justify-end">
  <div class="mb-6 flex justify-end items-end lg:pl-14 px-3 py-2 gap-x-4">
    {#if displayAnswers}
      <PrimaryButton onclick={handleReset} highlight>Reset and try again</PrimaryButton>
    {/if}
    <PrimaryButton onclick={() => (displayAnswers = !displayAnswers)}>
      {displayAnswers ? 'Hide' : 'Show'} answers
    </PrimaryButton>
  </div>
</div>

<div>
  <CardList
    jsonData={jsonData.content}
    cardColor={selectedBackgroundColor}
    textColor={selectedTextColor}
    {selectedCard}
    onSelectAnswer={handleSelectAnswer}
    onSelectCard={(card) => (selectedCard = card)}
    {displayAnswers}
    {resetCards}
  />
</div>

<ConfirmDialog
  bind:open={openFinishDialog}
  title="You answered all questions!"
  message="That's it! You answered all questions. Would you like to finish and see the correct answers or reset and try again?"
  onConfirm={handleFinish}
  onCancel={handleReset}
  cancelButtonLabel="Reset"
  confirmButtonLabel="Finish"
  largeTitleText="Score: {points}/{maxQuestions}"
  percentage={(points / maxQuestions) * MAX_POINTS_IN_PERCENTAGE}
/>
