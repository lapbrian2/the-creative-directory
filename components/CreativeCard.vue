<template>
  <NuxtLink
    :to="`/creatives/${creative.slug}`"
    class="group block glass rounded-xl overflow-hidden hover:border-cream-50/10 transition-all duration-300"
  >
    <!-- Portfolio preview image -->
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="creative.portfolio[0]?.image"
        :alt="creative.portfolio[0]?.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />

      <!-- Category badge -->
      <span class="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full"
        :class="categoryClasses[creative.category]">
        {{ categoryLabels[creative.category] }}
      </span>
    </div>

    <!-- Info -->
    <div class="p-5">
      <div class="flex items-center gap-3 mb-3">
        <img
          :src="creative.avatar"
          :alt="creative.name"
          class="w-10 h-10 rounded-full object-cover ring-1 ring-cream-50/10"
        />
        <div>
          <h3 class="font-display font-semibold text-cream-50 group-hover:text-accent-orange transition-colors">
            {{ creative.name }}
          </h3>
          <p class="text-xs text-cream-300">{{ creative.title }}</p>
        </div>
      </div>

      <p class="text-sm text-cream-200/60 line-clamp-2 mb-4">{{ creative.bio }}</p>

      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <span
            v-for="tag in creative.tags.slice(0, 2)"
            :key="tag"
            class="text-[10px] uppercase tracking-wider text-cream-300/50 px-2 py-0.5 rounded-full border border-cream-50/5"
          >
            {{ tag }}
          </span>
        </div>
        <span class="text-xs text-cream-300/40">{{ creative.location }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Creative } from '~/data/creatives'

defineProps<{ creative: Creative }>()

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
</script>
