<template>
  <div class="grain-overlay vignette min-h-screen bg-dark-900">
    <!-- Scroll progress bar -->
    <div class="fixed top-0 left-0 w-full h-[2px] z-50 origin-left scale-x-0 bg-accent-orange scroll-progress" />

    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  })
})
</script>
