<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const dot = ref<HTMLElement>()
const ring = ref<HTMLElement>()

let cleanups: (() => void)[] = []

onMounted(async () => {
  if (typeof window === 'undefined') return
  // Hide on touch/coarse pointer devices
  if (window.matchMedia('(pointer: coarse)').matches) return

  const { gsap } = await import('gsap')

  const $dot = dot.value!
  const $ring = ring.value!

  gsap.set([$dot, $ring], { xPercent: -50, yPercent: -50 })

  let mx = -200
  let my = -200

  function onMove(e: MouseEvent) {
    mx = e.clientX
    my = e.clientY
    gsap.to($dot, { x: mx, y: my, duration: 0.08, ease: 'none', overwrite: true })
    gsap.to($ring, { x: mx, y: my, duration: 0.35, ease: 'power2.out', overwrite: true })
  }

  function onEnterInteractive() {
    gsap.to($dot, { scale: 1.8, duration: 0.25, ease: 'power2.out' })
    gsap.to($ring, { scale: 1.7, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
  }

  function onLeaveInteractive() {
    gsap.to($dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to($ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
  }

  function onDown() {
    gsap.to($dot, { scale: 0.7, duration: 0.12 })
    gsap.to($ring, { scale: 0.85, duration: 0.15 })
  }

  function onUp() {
    gsap.to($dot, { scale: 1, duration: 0.35, ease: 'elastic.out(1.2, 0.4)' })
    gsap.to($ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.4)' })
  }

  const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .tilt-card, .spec-card, .nav-link'

  function attachInteractive() {
    document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    })
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  attachInteractive()

  cleanups.push(
    () => window.removeEventListener('mousemove', onMove),
    () => window.removeEventListener('mousedown', onDown),
    () => window.removeEventListener('mouseup', onUp),
  )
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
})
</script>

<template>
  <Teleport to="body">
    <div ref="dot" class="cursor-dot" aria-hidden="true"></div>
    <div ref="ring" class="cursor-ring" aria-hidden="true"></div>
  </Teleport>
</template>

<style>
.cursor-dot,
.cursor-ring {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  z-index: 99999;
  mix-blend-mode: normal;
  will-change: transform;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--emerald-500);
  transform: translate(-50%, -50%) scale(1);
}

.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(16, 185, 129, 0.55);
  background: rgba(16, 185, 129, 0.05);
  transform: translate(-50%, -50%) scale(1);
}

@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}
</style>
