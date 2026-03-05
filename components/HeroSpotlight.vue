<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-24">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[120px]" />

    <div class="section relative z-10 w-full">
      <div ref="heroContent">
        <p class="text-sm font-medium text-accent-orange uppercase tracking-[0.2em] mb-6">
          The Creative Directory
        </p>
        <h1 class="font-display text-hero font-bold text-cream-50 leading-[1.05] tracking-tight mb-8 max-w-4xl">
          Where AI Meets<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-orange/60">
            Creative Vision
          </span>
        </h1>
        <p class="text-lg md:text-xl text-cream-200 max-w-2xl leading-relaxed mb-12">
          Discover the artists, designers, and builders pushing the boundaries of what's possible
          at the intersection of artificial intelligence and human creativity.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#directory" class="inline-flex items-center gap-2 px-6 py-3 bg-accent-orange text-dark-900 font-display font-semibold text-sm rounded-lg hover:bg-accent-orange-hover transition-colors">
            Explore Directory
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <NuxtLink to="/submit" class="inline-flex items-center gap-2 px-6 py-3 border border-cream-50/10 text-cream-100 font-display font-semibold text-sm rounded-lg hover:border-cream-50/20 hover:bg-cream-50/5 transition-all">
            Submit Your Work
          </NuxtLink>
        </div>
      </div>

      <!-- Featured creatives preview -->
      <div ref="featuredRow" class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <template v-if="status === 'pending'">
          <div v-for="i in 3" :key="i" class="glass rounded-xl p-5 animate-pulse">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-12 h-12 rounded-full bg-cream-50/5" />
              <div class="flex-1">
                <div class="h-4 w-24 bg-cream-50/5 rounded mb-2" />
                <div class="h-3 w-16 bg-cream-50/5 rounded" />
              </div>
            </div>
            <div class="h-3 w-full bg-cream-50/5 rounded mb-2" />
            <div class="h-3 w-2/3 bg-cream-50/5 rounded" />
          </div>
        </template>
        <template v-else-if="featured?.length">
          <NuxtLink
            v-for="creative in featured"
            :key="creative.slug"
            :to="`/creatives/${creative.slug}`"
            class="group glass rounded-xl p-5 hover:border-cream-50/10 transition-all duration-300"
          >
            <div class="flex items-center gap-4 mb-3">
              <img
                :src="creative.avatar"
                :alt="creative.name"
                class="w-12 h-12 rounded-full object-cover ring-2 ring-cream-50/10"
              />
              <div>
                <h3 class="font-display font-semibold text-cream-50 group-hover:text-accent-orange transition-colors">
                  {{ creative.name }}
                </h3>
                <p class="text-xs text-cream-300">{{ creative.title }}</p>
              </div>
            </div>
            <p class="text-sm text-cream-200/70 line-clamp-2">{{ creative.bio }}</p>
            <div class="flex gap-2 mt-3">
              <span
                v-for="tag in creative.tags.slice(0, 2)"
                :key="tag"
                class="text-[10px] uppercase tracking-wider text-cream-300/60 px-2 py-0.5 rounded-full border border-cream-50/5"
              >
                {{ tag }}
              </span>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Creative } from '~/data/creatives'

const { data: featured, status } = useFetch<Creative[]>('/api/creatives', {
  query: { featured: true },
})

const heroContent = ref<HTMLElement>()
const featuredRow = ref<HTMLElement>()

onMounted(() => {
  if (import.meta.client) {
    import('gsap').then(({ gsap }) => {
      if (heroContent.value) {
        gsap.from(heroContent.value.children, {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        })
      }
      if (featuredRow.value) {
        gsap.from(featuredRow.value.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.8,
        })
      }
    })
  }
})
</script>
