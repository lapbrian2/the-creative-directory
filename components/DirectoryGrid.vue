<template>
  <section id="directory" class="section">
    <div ref="sectionHeader" class="mb-12">
      <h2 class="font-display text-section font-bold text-cream-50 tracking-tight mb-4">
        The Directory
      </h2>
      <p class="text-cream-200/60 max-w-lg">
        Browse our curated collection of AI artists, designers, and builders.
      </p>
    </div>

    <FilterBar v-model="activeCategory" :search="searchQuery" @update:search="searchQuery = $event" />

    <!-- Loading skeleton -->
    <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div v-for="i in 6" :key="i" class="glass rounded-xl p-5 animate-pulse">
        <div class="aspect-[4/3] bg-cream-50/5 rounded-lg mb-4" />
        <div class="h-4 w-32 bg-cream-50/5 rounded mb-2" />
        <div class="h-3 w-24 bg-cream-50/5 rounded mb-4" />
        <div class="h-3 w-full bg-cream-50/5 rounded mb-2" />
        <div class="h-3 w-2/3 bg-cream-50/5 rounded" />
      </div>
    </div>

    <div v-else ref="gridEl" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <CreativeCard
        v-for="creative in creatives"
        :key="creative.slug"
        :creative="creative"
      />
    </div>

    <p v-if="status !== 'pending' && (!creatives || creatives.length === 0)" class="text-center text-cream-300/50 py-20 text-lg">
      No creatives found matching your criteria.
    </p>
  </section>
</template>

<script setup lang="ts">
import type { Creative, Category } from '~/data/creatives'

const activeCategory = ref<Category | 'all'>('all')
const searchQuery = ref('')
const sectionHeader = ref<HTMLElement>()
const gridEl = ref<HTMLElement>()

const queryParams = computed(() => ({
  category: activeCategory.value,
  search: searchQuery.value || undefined,
}))

const { data: creatives, status } = useFetch<Creative[]>('/api/creatives', {
  query: queryParams,
})

onMounted(() => {
  if (import.meta.client) {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        if (sectionHeader.value) {
          gsap.from(sectionHeader.value.children, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionHeader.value,
              start: 'top 85%',
              once: true,
            },
          })
        }
      })
    })
  }
})

watch(creatives, async () => {
  await nextTick()
  if (import.meta.client && gridEl.value) {
    const { gsap } = await import('gsap')
    gsap.from(gridEl.value.children, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
    })
  }
})
</script>
