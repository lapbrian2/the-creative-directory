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
          <!-- Server error banner -->
          <div v-if="serverError" class="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            {{ serverError }}
          </div>

          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-cream-100 mb-2">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="w-full px-4 py-3 bg-dark-700/50 border rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              :class="fieldErrors.name ? 'border-red-500/50' : 'border-cream-50/8'"
              placeholder="Your full name"
            />
            <p v-if="fieldErrors.name" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-cream-100 mb-2">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full px-4 py-3 bg-dark-700/50 border rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              :class="fieldErrors.email ? 'border-red-500/50' : 'border-cream-50/8'"
              placeholder="your@email.com"
            />
            <p v-if="fieldErrors.email" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.email }}</p>
          </div>

          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-cream-100 mb-2">Category</label>
            <select
              id="category"
              v-model="form.category"
              class="w-full px-4 py-3 bg-dark-700/50 border rounded-lg text-cream-100 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              :class="fieldErrors.category ? 'border-red-500/50' : 'border-cream-50/8'"
            >
              <option value="" disabled>Select a category</option>
              <option value="ai-artist">AI Artist</option>
              <option value="designer">Graphic Designer</option>
              <option value="builder">Builder</option>
            </select>
            <p v-if="fieldErrors.category" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.category }}</p>
          </div>

          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-cream-100 mb-2">Professional Title</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              class="w-full px-4 py-3 bg-dark-700/50 border rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              :class="fieldErrors.title ? 'border-red-500/50' : 'border-cream-50/8'"
              placeholder="e.g. AI Visual Artist, Creative Technologist"
            />
            <p v-if="fieldErrors.title" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.title }}</p>
          </div>

          <!-- Bio -->
          <div>
            <label for="bio" class="block text-sm font-medium text-cream-100 mb-2">Bio</label>
            <textarea
              id="bio"
              v-model="form.bio"
              rows="4"
              class="w-full px-4 py-3 bg-dark-700/50 border rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all resize-none"
              :class="fieldErrors.bio ? 'border-red-500/50' : 'border-cream-50/8'"
              placeholder="Tell us about your work and creative approach..."
            />
            <p v-if="fieldErrors.bio" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.bio }}</p>
          </div>

          <!-- Portfolio URL -->
          <div>
            <label for="portfolio" class="block text-sm font-medium text-cream-100 mb-2">Portfolio URL</label>
            <input
              id="portfolio"
              v-model="form.portfolioUrl"
              type="url"
              class="w-full px-4 py-3 bg-dark-700/50 border rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              :class="fieldErrors.portfolioUrl ? 'border-red-500/50' : 'border-cream-50/8'"
              placeholder="https://your-portfolio.com"
            />
            <p v-if="fieldErrors.portfolioUrl" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.portfolioUrl }}</p>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-cream-100 mb-2">Location</label>
            <input
              id="location"
              v-model="form.location"
              type="text"
              class="w-full px-4 py-3 bg-dark-700/50 border rounded-lg text-cream-100 placeholder-cream-300/30 focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/20 transition-all"
              :class="fieldErrors.location ? 'border-red-500/50' : 'border-cream-50/8'"
              placeholder="City, Country"
            />
            <p v-if="fieldErrors.location" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.location }}</p>
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
import { ZodError } from 'zod'
import { submissionSchema } from '~/composables/useValidation'

useHead({ title: 'Submit Your Work — The Creative Directory' })

const formHeader = ref<HTMLElement>()
const formEl = ref<HTMLFormElement>()
const submitted = ref(false)
const isSubmitting = ref(false)
const serverError = ref('')
const fieldErrors = ref<Record<string, string>>({})

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
  // Clear previous errors
  fieldErrors.value = {}
  serverError.value = ''

  // Client-side Zod validation
  const result = submissionSchema.safeParse(form)
  if (!result.success) {
    const flattened = result.error.flatten().fieldErrors
    for (const [key, messages] of Object.entries(flattened)) {
      if (messages && messages.length > 0) {
        fieldErrors.value[key] = messages[0]
      }
    }
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/submissions', {
      method: 'POST',
      body: result.data,
    })
    submitted.value = true
  } catch (error: unknown) {
    // Handle server validation errors (422)
    if (error && typeof error === 'object' && 'data' in error) {
      const fetchError = error as { statusCode?: number; data?: { data?: Record<string, string[]> }; statusMessage?: string }
      if (fetchError.statusCode === 422 && fetchError.data?.data) {
        for (const [key, messages] of Object.entries(fetchError.data.data)) {
          if (messages && messages.length > 0) {
            fieldErrors.value[key] = messages[0]
          }
        }
      } else {
        serverError.value = fetchError.statusMessage || 'Something went wrong. Please try again.'
      }
    } else {
      serverError.value = 'Something went wrong. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (import.meta.client && formHeader.value) {
    import('gsap').then(({ gsap }) => {
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
