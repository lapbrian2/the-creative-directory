<template>
  <header class="fixed top-0 left-0 w-full z-40 transition-all duration-300"
    :class="scrolled ? 'glass py-3' : 'py-6'" data-allow-mismatch>
    <div class="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
      <NuxtLink to="/" class="font-display text-xl font-bold text-cream-50 tracking-tight hover:text-accent-orange transition-colors">
        TCD<span class="text-accent-orange">.</span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink to="/" class="text-sm text-cream-200 hover:text-cream-50 transition-colors font-medium">
          Directory
        </NuxtLink>
        <NuxtLink to="/submit" class="text-sm text-cream-200 hover:text-cream-50 transition-colors font-medium">
          Submit
        </NuxtLink>
        <a href="#about" class="text-sm text-cream-200 hover:text-cream-50 transition-colors font-medium">
          About
        </a>
      </nav>

      <!-- Mobile menu button -->
      <button
        class="md:hidden text-cream-200 hover:text-cream-50 transition-colors"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" id="mobile-nav" class="md:hidden glass mt-2 mx-4 rounded-lg p-4">
        <nav class="flex flex-col gap-4">
          <NuxtLink to="/" class="text-sm text-cream-200 hover:text-cream-50 transition-colors" @click="mobileOpen = false">
            Directory
          </NuxtLink>
          <NuxtLink to="/submit" class="text-sm text-cream-200 hover:text-cream-50 transition-colors" @click="mobileOpen = false">
            Submit
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const mobileOpen = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 50 }

onMounted(() => {
  scrolled.value = window.scrollY > 50
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
