<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppFooter from './components/layout/AppFooter.vue'
import FloatingChatbot from './components/layout/FloatingChatbot.vue'
import AppNavbar from './components/layout/AppNavbar.vue'
import CustomCursor from './components/ui/CustomCursor.vue'
import { ensureMotion, getLenis } from './lib/motion'

const route = useRoute()
const progressFill = ref<HTMLElement>()
let revealTriggers: any[] = []
let progressCleanup: (() => void) | null = null

async function attachGsapReveals() {
  if (typeof window === 'undefined') return

  const motion = await ensureMotion()
  if (!motion) return
  const { gsap, ScrollTrigger } = motion

  // Kill previous triggers to avoid accumulation on route change
  revealTriggers.forEach((t) => t?.kill?.())
  revealTriggers = []

  // ── Staggered reveal groups (spring bounce, bigger offset) ───────────
  document.querySelectorAll<HTMLElement>('.reveal-group').forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[]
    if (!children.length) return
    const st = ScrollTrigger.create({
      trigger: group,
      start: 'top 86%',
      once: true,
      onEnter() {
        gsap.from(children, {
          y: 52,
          opacity: 0,
          scale: 0.93,
          duration: 0.78,
          stagger: 0.12,
          ease: 'back.out(1.5)',
          clearProps: 'all',
        })
      },
    })
    revealTriggers.push(st)
  })

  // ── Individual reveals — alternate left/right x-slide ────────────────
  let revealIdx = 0
  document.querySelectorAll<HTMLElement>('.reveal:not(.reveal-group .reveal)').forEach((el) => {
    const xFrom = revealIdx % 2 === 0 ? -48 : 48
    revealIdx++
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter() {
        gsap.from(el, {
          y: 46,
          x: xFrom,
          opacity: 0,
          scale: 0.96,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'all',
        })
      },
    })
    revealTriggers.push(st)
  })
}

function initScrollProgress() {
  if (typeof window === 'undefined') return
  const fill = progressFill.value
  if (!fill) return

  // Wire to Lenis for accurate smooth-scroll progress
  const lenis = getLenis()
  if (lenis) {
    const handler = ({ progress }: { progress: number }) => {
      fill.style.transform = `scaleX(${progress})`
    }
    lenis.on('scroll', handler)
    progressCleanup = () => lenis.off('scroll', handler)
  } else {
    // Fallback: native scroll
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) fill.style.transform = `scaleX(${Math.min(window.scrollY / total, 1)})`
    }
    window.addEventListener('scroll', handler, { passive: true })
    progressCleanup = () => window.removeEventListener('scroll', handler)
  }
}

onMounted(async () => {
  await ensureMotion()
  await nextTick()
  await attachGsapReveals()
  initScrollProgress()
})

watch(
  () => route.fullPath,
  async () => {
    if (typeof window === 'undefined') return
    await nextTick()
    requestAnimationFrame(attachGsapReveals)
  },
)

onUnmounted(() => {
  revealTriggers.forEach((t) => t?.kill?.())
  progressCleanup?.()
})
</script>

<template>
  <div class="app-shell">
    <!-- Scroll progress line (top of viewport) -->
    <div class="scroll-progress-bar" aria-hidden="true">
      <div ref="progressFill" class="scroll-progress-fill"></div>
    </div>
    <CustomCursor />
    <AppNavbar />
    <RouterView v-slot="{ Component, route: currentRoute }">
      <Transition name="page" mode="out-in">
        <Suspense timeout="0">
          <component :is="Component" :key="currentRoute.fullPath" />
          <template #fallback>
            <section class="container route-loading" aria-live="polite">
              Loading your nutrition experience...
            </section>
          </template>
        </Suspense>
      </Transition>
    </RouterView>
    <AppFooter />
    <FloatingChatbot />
    <RouterLink
      to="/booking"
      class="mobile-book-cta"
      aria-label="Book nutrition consultation"
    >
      Book Consultation
    </RouterLink>
  </div>
</template>

<style scoped>
/* ── Scroll progress bar ─────────────────────────────── */
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 99999;
  background: rgba(16, 185, 129, 0.1);
  pointer-events: none;
}

.scroll-progress-fill {
  height: 100%;
  width: 100%;
  transform-origin: left center;
  transform: scaleX(0);
  background: linear-gradient(90deg, var(--emerald-700), var(--emerald-400), var(--teal-400));
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 3px rgba(16, 185, 129, 0.4);
  will-change: transform;
}

.route-loading {
  min-height: 60vh;
  display: grid;
  place-content: center;
  text-align: center;
  font-weight: 700;
  font-family: var(--font-heading);
  color: var(--emerald-600);
  font-size: 1.1rem;
}

.mobile-book-cta {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 76px;
  z-index: 130;
  text-decoration: none;
  text-align: center;
  font-weight: 800;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  border-radius: 16px;
  min-height: 52px;
  display: grid;
  place-items: center;
  box-shadow:
    0 16px 40px rgba(5, 150, 105, 0.35),
    0 4px 12px rgba(5, 150, 105, 0.2);
  transition:
    transform 260ms ease,
    box-shadow 260ms ease;
}
.mobile-book-cta:active {
  transform: scale(0.97);
}

@media (min-width: 901px) {
  .mobile-book-cta {
    display: none;
  }
}
</style>
