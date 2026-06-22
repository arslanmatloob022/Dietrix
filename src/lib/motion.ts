/**
 * Motion singleton — initializes Lenis smooth-scroll once and wires it to
 * GSAP's ticker so ScrollTrigger stays in perfect sync.
 * Safe for vite-ssg SSR: all DOM work is guarded by typeof window checks.
 */

import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as STType } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

let _gsap: typeof GsapType | null = null
let _ScrollTrigger: typeof STType | null = null
let _lenis: InstanceType<typeof Lenis> | null = null
let _ready = false

export interface MotionContext {
  gsap: typeof GsapType
  ScrollTrigger: typeof STType
  lenis: InstanceType<typeof Lenis>
}

export async function ensureMotion(): Promise<MotionContext | null> {
  if (typeof window === 'undefined') return null
  if (_ready) return { gsap: _gsap!, ScrollTrigger: _ScrollTrigger!, lenis: _lenis! }

  const [{ gsap }, { ScrollTrigger }, { default: LenisCtor }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ])

  gsap.registerPlugin(ScrollTrigger)

  _gsap = gsap
  _ScrollTrigger = ScrollTrigger

  _lenis = new LenisCtor({
    duration: 1.25,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.8,
  })

  _lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time: number) => _lenis!.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  _ready = true
  return { gsap, ScrollTrigger, lenis: _lenis }
}

export function destroyMotion() {
  _lenis?.destroy()
  _lenis = null
  _ready = false
}

export function getLenis() {
  return _lenis
}
