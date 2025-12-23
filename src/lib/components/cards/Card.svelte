<script lang="ts">
  import type { CardData } from './types'

  interface Props extends CardData {
    onSelect: () => void
    onSelectAnswer: (answer: string) => void
    tabindex: number
    displayAnswer: boolean
    resetCard: boolean
  }

  let {
    question,
    code,
    options,
    displayAnswer,
    correctAnswer,
    onSelect,
    onSelectAnswer,
    cardColor = '',
    textColor = '',
    tabindex = 0,
    resetCard = false
  }: Props = $props()

  let overlayVisible = $state(true)
  let canClick = $state(true)

  $effect(() => {
    if (resetCard) {
      overlayVisible = true
      canClick = true
      clearSelection()
    }
  })

  function handleClicked() {
    if (canClick) {
      overlayVisible = !overlayVisible
      onSelect()
      canClick = false
    }
  }

  function clearSelection() {
    options.forEach((_, index) => {
      const radioElement = document.getElementById(`${index}-${tabindex}`) as HTMLInputElement
      if (radioElement) {
        radioElement.checked = false
      }
    })
  }

  function handleSelectedAnswer(option: string) {
    onSelectAnswer(option)
    onSelect()
  }
</script>

<div
  class="card p-4 rounded-lg shadow-lg border-white border-4 {canClick
    ? 'cursor-pointer'
    : 'cursor-default'}"
  style="background-color: {cardColor}"
  onclick={handleClicked}
  onkeydown={(e) => e.key === 'Enter' && handleClicked()}
  role="button"
  tabindex="0"
>
  {#if overlayVisible}
    <div class="overlay flex justify-center">
      <h2 class="sm:text-2xl md:text-2xl font-bold mb-6 px-6 py-14" style="color: {textColor}">
        {question}
      </h2>
    </div>
    <div class="overlay flex justify-center">
      <h3
        class="flex questionMark align-middle items-center text-xl font-bold mb-2"
        style="color: {textColor}"
      >
        ?
      </h3>
    </div>
  {/if}
  <div class="content {overlayVisible ? 'hidden' : ''}">
    <h2 class="sm:text-2xl md:text-xl font-bold mb-6" style="color: {textColor}">
      {question}
    </h2>
    <p class="text-sm mb-2" style="color: {textColor}">
      {code}
    </p>
    <ul>
      {#each options as option, index}
        <li class="text-sm py-1" style="color: {textColor}">
          <span
            class="flex items-center"
            style="background-color: {option === correctAnswer && displayAnswer
              ? 'lightgreen'
              : ''}; border: {option === correctAnswer && displayAnswer
              ? '1px solid green'
              : ''}; border-radius: {option === correctAnswer && displayAnswer
              ? '5px'
              : ''}; padding: {option === correctAnswer && displayAnswer ? '5px' : ''}"
          >
            <input
              id="{index}-{tabindex}"
              name="question-{tabindex}"
              type="radio"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onclick={() => handleSelectedAnswer(option)}
            />
            <label for="{index}-{tabindex}" class="ml-3 block text-sm font-medium leading-6">
              {option}
            </label>
          </span>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .card {
    min-height: 300px;
    position: relative;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .questionMark {
    font-size: 4rem;
    opacity: 0.3;
  }

  .content {
    position: relative;
    z-index: 1;
  }
</style>
