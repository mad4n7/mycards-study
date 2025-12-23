<script lang="ts">
  interface Props {
    onclick: () => void
  }

  let { onclick }: Props = $props()
</script>

<button
  type="button"
  class="text-sm font-semibold leading-6 text-white hover:text-gray-300"
  {onclick}
>
  ← Back
</button>
