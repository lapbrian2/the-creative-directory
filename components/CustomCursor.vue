<template>
  <div
    v-if="isDesktop"
    ref="cursorEl"
    class="custom-cursor"
    :class="{ active: isActive, hovering: isHovering }"
  />
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const cursorEl = ref<HTMLElement>()
const isDesktop = ref(false)
const isActive = ref(false)
const isHovering = ref(false)
const pos = { x: 0, y: 0 }

onMounted(() => {
  isDesktop.value = !('ontouchstart' in window) && window.innerWidth >= 1024
  if (!isDesktop.value) return

  isActive.value = true

  document.addEventListener('mousemove', (e: MouseEvent) => {
    gsap.to(pos, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (cursorEl.value) {
          cursorEl.value.style.transform = `translate(${pos.x}px, ${pos.y}px)`
        }
      },
    })
  })

  bindInteractiveElements(document.body)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          bindInteractiveElements(node)
        }
      }
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })

  onUnmounted(() => observer.disconnect())
})

function bindInteractiveElements(root: HTMLElement) {
  const interactives = root.querySelectorAll('a, button, [role="button"], input, select, textarea')
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => { isHovering.value = true })
    el.addEventListener('mouseleave', () => { isHovering.value = false })
  })
}
</script>
