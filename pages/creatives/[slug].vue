<template>
  <main v-if="creative" class="pt-28 pb-20">
    <div class="section">
      <!-- Back link -->
      <NuxtLink to="/#directory" class="inline-flex items-center gap-2 text-sm text-cream-300 hover:text-cream-50 transition-colors mb-10">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Directory
      </NuxtLink>

      <!-- Profile header -->
      <div ref="profileHeader" class="flex flex-col md:flex-row items-start gap-8 mb-16">
        <img
          :src="creative.avatar"
          :alt="creative.name"
          class="w-28 h-28 rounded-2xl object-cover ring-2 ring-cream-50/10"
        />
        <div class="flex-1">
          <span class="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full mb-4 inline-block"
            :class="categoryClasses[creative.category]">
            {{ categoryLabels[creative.category] }}
          </span>
          <h1 class="font-display text-heading font-bold text-cream-50 mt-2">{{ creative.name }}</h1>
          <p class="text-lg text-cream-200/70 mt-1">{{ creative.title }}</p>
          <p class="text-cream-200/50 text-sm mt-1">{{ creative.location }}</p>
          <p class="text-cream-200 leading-relaxed mt-4 max-w-2xl">{{ creative.bio }}</p>

          <div class="flex flex-wrap gap-2 mt-5">
            <span
              v-for="tag in creative.tags"
              :key="tag"
              class="text-xs text-cream-300/60 px-3 py-1 rounded-full border border-cream-50/8"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex gap-3 mt-6">
            <a
              v-for="link in creative.links"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener"
              class="text-sm text-accent-orange hover:text-accent-orange-hover transition-colors font-medium"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>

      <!-- Portfolio grid -->
      <div class="mb-8">
        <h2 class="font-display text-xl font-semibold text-cream-50 mb-6">Portfolio</h2>
      </div>
      <div ref="portfolioGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in creative.portfolio"
          :key="i"
          class="group glass rounded-xl overflow-hidden cursor-pointer"
          @click="openLightbox(i)"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div class="p-5">
                <h3 class="font-display text-sm font-semibold text-cream-50">{{ item.title }}</h3>
                <p class="text-xs text-cream-200/70 mt-1">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="lightbox">
      <div
        v-if="lightboxIndex !== null"
        class="fixed inset-0 z-[200] bg-dark-900/95 flex items-center justify-center p-8"
        @click.self="lightboxIndex = null"
      >
        <button
          class="absolute top-6 right-6 text-cream-200 hover:text-cream-50 transition-colors"
          aria-label="Close lightbox"
          @click="lightboxIndex = null"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          v-if="lightboxIndex !== null"
          :src="creative.portfolio[lightboxIndex].image"
          :alt="creative.portfolio[lightboxIndex].title"
          class="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </Transition>
  </main>

  <main v-else class="pt-28 pb-20">
    <div class="section text-center">
      <h1 class="font-display text-heading font-bold text-cream-50 mb-4">Creative Not Found</h1>
      <p class="text-cream-200/60 mb-8">This profile doesn't exist or has been removed.</p>
      <NuxtLink to="/" class="text-accent-orange hover:text-accent-orange-hover transition-colors font-medium">
        Back to Directory
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { creatives } from '~/data/creatives'

const route = useRoute()
const creative = computed(() => creatives.find(c => c.slug === route.params.slug))

const lightboxIndex = ref<number | null>(null)
const profileHeader = ref<HTMLElement>()
const portfolioGrid = ref<HTMLElement>()

function openLightbox(index: number) {
  lightboxIndex.value = index
}

useHead({
  title: computed(() => creative.value ? `${creative.value.name} — The Creative Directory` : 'Not Found'),
})

const categoryLabels: Record<string, string> = {
  'ai-artist': 'AI Artist',
  designer: 'Designer',
  builder: 'Builder',
}
const categoryClasses: Record<string, string> = {
  'ai-artist': 'bg-purple-500/20 text-purple-300 border border-purple-500/20',
  designer: 'bg-blue-500/20 text-blue-300 border border-blue-500/20',
  builder: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20',
}

onMounted(() => {
  if (profileHeader.value) {
    gsap.from(profileHeader.value.children, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.1,
    })
  }
  if (portfolioGrid.value) {
    gsap.from(portfolioGrid.value.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.3,
    })
  }
})
</script>

<style scoped>
.lightbox-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.lightbox-leave-active { transition: all 0.3s ease; }
.lightbox-enter-from { opacity: 0; transform: scale(0.95); }
.lightbox-leave-to { opacity: 0; transform: scale(0.98); }
</style>
