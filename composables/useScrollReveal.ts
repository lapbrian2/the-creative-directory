import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollReveal() {
  function reveal(el: HTMLElement | string, options?: gsap.TweenVars) {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      ...options,
    })
  }

  function revealChildren(parent: HTMLElement | string, options?: gsap.TweenVars) {
    const el = typeof parent === 'string' ? document.querySelector(parent) : parent
    if (!el) return

    gsap.from(el.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      ...options,
    })
  }

  function cleanup() {
    ScrollTrigger.getAll().forEach(t => t.kill())
  }

  return { reveal, revealChildren, cleanup }
}
