<script lang="ts">
  interface Props {
    colors: string[]
    onSelect: (color: string) => void
  }

  let { colors, onSelect }: Props = $props()
  let selectedColor = $state('')

  function handleSelect(color: string) {
    selectedColor = color
    onSelect(color)
  }
</script>

<div class="flex gap-1">
  {#each colors as color}
    <button
      type="button"
      class="w-5 h-5 rounded-sm border-2 {selectedColor === color
        ? 'border-white'
        : 'border-transparent'}"
      style="background-color: {color}"
      onclick={() => handleSelect(color)}
      aria-label="Select color {color}"
    ></button>
  {/each}
</div>
