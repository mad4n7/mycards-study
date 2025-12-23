<script lang="ts">
  import Layout from '$lib/components/Layout.svelte'
  import Entry from '$lib/components/Entry.svelte'
</script>

<svelte:head>
  <title>MyCards.study</title>
  <meta
    name="description"
    content="Study online with virtual cards, ask questions, paste notes, and receive study materials. Create study materials using AI."
  />
  <meta
    name="keywords"
    content="mycards.study, study with ai, study online, study with flashcards, flashcards, study, online study, study app, flashcard app"
  />
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-900">
  <Layout>
    <Entry />
  </Layout>
</main>
