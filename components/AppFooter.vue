<template>
  <footer id="about" class="border-t border-cream-50/5">
    <div class="section py-16">
      <div class="grid md:grid-cols-3 gap-12">
        <div>
          <h3 class="font-display text-2xl font-bold text-cream-50 mb-4">
            TCD<span class="text-accent-orange">.</span>
          </h3>
          <p class="text-sm text-cream-300 leading-relaxed max-w-xs">
            The Creative Directory is a curated showcase of AI artists, graphic designers, and builders shaping the future of creative work.
          </p>
        </div>
        <div>
          <h4 class="font-display text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4">Navigate</h4>
          <nav class="flex flex-col gap-3">
            <NuxtLink to="/" class="text-sm text-cream-300 hover:text-cream-50 transition-colors">Directory</NuxtLink>
            <NuxtLink to="/submit" class="text-sm text-cream-300 hover:text-cream-50 transition-colors">Submit Your Work</NuxtLink>
          </nav>
        </div>
        <div>
          <h4 class="font-display text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4">Connect</h4>
          <nav class="flex flex-col gap-3">
            <a href="#" class="text-sm text-cream-300 hover:text-cream-50 transition-colors">Twitter</a>
            <a href="#" class="text-sm text-cream-300 hover:text-cream-50 transition-colors">Instagram</a>
            <a href="#" class="text-sm text-cream-300 hover:text-cream-50 transition-colors">GitHub</a>
          </nav>
        </div>
      </div>
      <div class="mt-16 pt-8 border-t border-cream-50/5 text-center">
        <p class="text-xs text-cream-300/50">&copy; 2026 The Creative Directory. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
