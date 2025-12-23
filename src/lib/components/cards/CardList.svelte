<script lang="ts">
  import Card from './Card.svelte'
  import type { CardData } from './types'

  interface Props {
    jsonData: CardData[]
    cardColor: string
    textColor: string
    selectedCard: CardData | null
    onSelectAnswer: (answer: string, card: CardData) => void
    onSelectCard: (card: CardData | null) => void
    displayAnswers: boolean
    resetCards: boolean
  }

  let {
    jsonData,
    cardColor,
    textColor,
    selectedCard,
    onSelectAnswer,
    onSelectCard,
    displayAnswers,
    resetCards
  }: Props = $props()
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[30em]">
  {#each jsonData as card, index}
    <Card
      {...card}
      {cardColor}
      {textColor}
      tabindex={index}
      displayAnswer={displayAnswers}
      resetCard={resetCards}
      onSelect={() => onSelectCard(card)}
      onSelectAnswer={(answer) => onSelectAnswer(answer, card)}
    />
  {/each}
</div>
