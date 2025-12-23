<script lang="ts">
  import Layout from '$lib/components/Layout.svelte'
  import EntryCheatMode from '$lib/components/EntryCheatMode.svelte'
</script>

<svelte:head>
  <title>MyCards.study - Cheat Mode</title>
  <meta
    name="description"
    content="Study online with cards, create your own content and study online with them. Create study material with AI."
  />
  <meta
    name="keywords"
    content="mycards.study, study with ai, study online, study with flashcards, flashcards, study, online study, study app, flashcard app"
  />
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-900">
  <Layout>
    <EntryCheatMode />
  </Layout>
</main>
