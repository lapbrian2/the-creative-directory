<template>
  <main class="pt-28 pb-20">
    <div class="section max-w-2xl">
      <div ref="formHeader">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-cream-300 hover:text-cream-50 transition-colors mb-10">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Directory
        </NuxtLink>

        <h1 class="font-display text-heading font-bold text-cream-50 mb-4">
          Submit Your Work
        </h1>
        <p class="text-cream-200/60 mb-12 max-w-lg">
          Join our curated directory of AI artists, designers, and builders. Fill out the form below and we'll review your submission.
        </p>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="submitted" class="glass rounded-xl p-12 text-center">
          <div class="w-16 h-16 rounded-full bg-accent-emerald/10 flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-accent-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="font-display text-xl font-semibold text-cream-50 mb-3">Submission Received</h2>
          <p class="text-cream-200/60 mb-8">We'll review your profile and get back to you soon.</p>
          <NuxtLink to="/" class="text-accent-orange hover:text-accent-orange-hover transition-colors font-medium">
            Back to Directory
          </NuxtLink>
        </div>

        <form v-else ref="formEl" class="space-y-8" @submit.prevent="handleSubmit">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-cream-100 mb-2">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-dark-700/50 border border-cream-50/8 rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              placeholder="Your full name"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-cream-100 mb-2">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-dark-700/50 border border-cream-50/8 rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              placeholder="your@email.com"
            />
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-cream-100 mb-2">Category</label>
            <select
              id="category"
              v-model="form.category"
              required
              class="w-full px-4 py-3 bg-dark-700/50 border border-cream-50/8 rounded-lg text-cream-100 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
            >
              <option value="" disabled>Select a category</option>
              <option value="ai-artist">AI Artist</option>
              <option value="designer">Graphic Designer</option>
              <option value="builder">Builder</option>
            </select>
          </div>

          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-cream-100 mb-2">Professional Title</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-3 bg-dark-700/50 border border-cream-50/8 rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              placeholder="e.g. AI Visual Artist, Creative Technologist"
            />
          </div>

          <!-- Bio -->
          <div>
            <label for="bio" class="block text-sm font-medium text-cream-100 mb-2">Bio</label>
            <textarea
              id="bio"
              v-model="form.bio"
              required
              rows="4"
              class="w-full px-4 py-3 bg-dark-700/50 border border-cream-50/8 rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all resize-none"
              placeholder="Tell us about your work and creative approach..."
            />
          </div>

          <!-- Portfolio URL -->
          <div>
            <label for="portfolio" class="block text-sm font-medium text-cream-100 mb-2">Portfolio URL</label>
            <input
              id="portfolio"
              v-model="form.portfolioUrl"
              type="url"
              required
              class="w-full px-4 py-3 bg-dark-700/50 border border-cream-50/8 rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              placeholder="https://your-portfolio.com"
            />
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-cream-100 mb-2">Location</label>
            <input
              id="location"
              v-model="form.location"
              type="text"
              class="w-full px-4 py-3 bg-dark-700/50 border border-cream-50/8 rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              placeholder="City, Country"
            />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3.5 bg-accent-orange text-dark-900 font-display font-semibold text-sm rounded-lg hover:bg-accent-orange-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit for Review' }}
          </button>
        </form>
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

useHead({ title: 'Submit Your Work — The Creative Directory' })

const formHeader = ref<HTMLElement>()
const formEl = ref<HTMLFormElement>()
const submitted = ref(false)
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  category: '',
  title: '',
  bio: '',
  portfolioUrl: '',
  location: '',
})

async function handleSubmit() {
  isSubmitting.value = true
  // Simulate submission delay (replace with real API call)
  await new Promise(resolve => setTimeout(resolve, 1500))
  submitted.value = true
  isSubmitting.value = false
}

onMounted(() => {
  if (formHeader.value) {
    gsap.from(formHeader.value.children, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.1,
    })
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
