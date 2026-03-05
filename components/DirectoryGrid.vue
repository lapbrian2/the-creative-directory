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

    <div ref="gridEl" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <CreativeCard
        v-for="creative in filtered"
        :key="creative.slug"
        :creative="creative"
      />
    </div>

    <p v-if="filtered.length === 0" class="text-center text-cream-300/50 py-20 text-lg">
      No creatives found matching your criteria.
    </p>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { creatives, type Category } from '~/data/creatives'

const activeCategory = ref<Category | 'all'>('all')
const searchQuery = ref('')
const sectionHeader = ref<HTMLElement>()
const gridEl = ref<HTMLElement>()

const filtered = computed(() => {
  return creatives.filter(c => {
    const matchesCategory = activeCategory.value === 'all' || c.category === activeCategory.value
    const matchesSearch = !searchQuery.value ||
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase()))
    return matchesCategory && matchesSearch
  })
})

onMounted(() => {
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

watch(filtered, async () => {
  await nextTick()
  if (gridEl.value) {
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
