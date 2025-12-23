<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    onclick: () => void
    tabindex?: number
    disabled?: boolean
    highlight?: boolean
    children: Snippet
  }

  let { onclick, tabindex = 0, disabled = false, highlight = false, children }: Props = $props()
</script>

<button
  type="button"
  {tabindex}
  {disabled}
  class="rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 {highlight
    ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
    : 'bg-slate-500 text-white hover:bg-slate-400'} disabled:opacity-50 disabled:cursor-not-allowed"
  {onclick}
>
  {@render children()}
</button>
