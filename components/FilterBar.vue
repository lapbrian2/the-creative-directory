<template>
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
    <!-- Category filters -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-orange/50 focus-visible:outline-none"
        :class="modelValue === cat.value
          ? 'bg-accent-orange text-dark-900'
          : 'text-cream-200 border border-cream-50/8 hover:border-cream-50/15 hover:bg-cream-50/5'"
        @click="$emit('update:modelValue', cat.value)"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Search -->
    <div class="relative w-full sm:w-64">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        :value="search"
        type="text"
        placeholder="Search creatives..."
        class="w-full pl-10 pr-4 py-2.5 bg-dark-700/50 border border-cream-50/8 rounded-lg text-sm text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
        @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from '~/data/creatives'

defineProps<{
  modelValue: string
  search: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'update:search': [value: string]
}>()
</script>
