<template>
  <main>
    <HeroSpotlight />
    <DirectoryGrid />
  </main>
</template>

<script setup lang="ts">
useDirectoryJsonLd()
useHead({
  title: 'The Creative Directory — AI Artists, Designers & Builders',
})
</script>
