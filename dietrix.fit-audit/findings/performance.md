# Performance / Core Web Vitals Audit — dietrix.fit

Site: Vue 3 + Vite + vite-ssg (static prerender) on Netlify. Route-based code-splitting via
Vue Router dynamic `import()`, gsap + lenis lazy-loaded through a shared `ensureMotion()`
singleton (`src/lib/motion.ts`).

## Method / Data Sources

- **Primary baseline**: existing Lighthouse CI results in `D:\my sites\arr\.lighthouseci\`
  (`assertion-results.json` + per-URL `*.report.json`), run against a local `dist` build
  (`http://localhost:44027`) with mobile form factor, Lantern-simulated throttling
  (150ms RTT, ~1.6 Mbps, 4x CPU slowdown, Moto G Power UA) — i.e. Lighthouse's default mobile
  profile, not desktop.
- **Coverage gap**: the LHCI baseline only exercises **4 of the 13** sitemap URLs: `/`,
  `/services/weight-management` (a nested service page, not the `/services` hub itself),
  `/blog/best-high-protein-breakfast-for-fat-loss`, and `/booking`. `/about`, `/testimonials`,
  `/contact`, the main `/services` index, and the other 4 blog posts have **no captured lab
  run** and are estimated below from shared layout/animation code (`App.vue`, `src/style.css`,
  `src/lib/motion.ts`) plus per-view source inspection.
- **Field data (CrUX)**: not queried in this pass (no field-data tool invocation performed);
  recommend running `pagespeed_check.py` / `crux_history.py` against production
  `https://dietrix.fit` once traffic volume supports CrUX (28-day rolling window) to confirm
  these lab estimates, since this local baseline never fetches the real `images.unsplash.com`
  hero/content photography that production serves (no such requests appear in the captured
  network logs — they're all `loading="lazy"` and below the fold in the tested viewport), and
  never measures real TTFB/CDN latency from Netlify edge.
- No `interaction-to-next-paint` audit exists in Lighthouse (lab); **Total Blocking Time (TBT)**
  is used as the lab proxy for INP risk, per Google guidance.

## Estimated Scores (0–100, Performance category, mobile)

| URL | Perf Score | LCP | CLS | TBT (INP proxy) | Source |
|---|---|---|---|---|---|
| `/` | 99 | 1.7s | 0 | 0ms | LHCI measured |
| `/services/weight-management` | 99 | 1.9s | 0 | 0ms | LHCI measured |
| `/blog/best-high-protein-breakfast-for-fat-loss` | 98 | 2.1s | 0 | 0ms | LHCI measured |
| `/booking` | 99 | 1.7s | 0 | 1.5ms | LHCI measured |
| `/services` | ~97-99 (est) | ~1.7-2.0s | ~0 | ~0ms | estimated (same layout, no direct gsap hero) |
| `/about` | ~92-97 (est) | ~1.8-2.3s | ~0 | low | estimated — has on-load ScrollTrigger hero anim |
| `/testimonials` | ~97-99 (est) | ~1.7-2.0s | ~0 | ~0ms | estimated (no direct gsap hero, relies on safe global `.reveal`) |
| `/contact` | ~97-99 (est) | ~1.7-2.0s | ~0 | ~0ms | estimated |
| 4 remaining blog posts | ~96-98 (est) | ~1.9-2.2s | ~0 | ~0ms | estimated, similar to measured blog post |

**Site-wide estimated overall Performance score: ~93-96 / 100** (mobile, lab). Field CWV
"pass" status (75th percentile) cannot be confirmed without CrUX data, but lab numbers give
comfortable headroom under all three "Good" thresholds (LCP ≤2.5s, CLS ≤0.1, TBT trending
toward INP ≤200ms) for the pages actually measured. The caveats below explain why real-world
mobile 75th-percentile numbers could run measurably worse than this lab baseline suggests.

## What Works Well

- **Route-level code-splitting is effective**: each view compiles to a small dedicated JS/CSS
  chunk (e.g. `HomeView-*.js` 2.6KB, `LeadCaptureForm-*.js` 2.4KB) fetched only when that route
  is visited, on top of a shared `app-*.js` (~51KB) — this happens automatically via
  `component: () => import(...)` in `src/router/index.ts`, no manual `vite.config.ts`
  `manualChunks` tuning needed.
- **gsap + lenis are lazy-loaded**, not shipped in the main bundle: `ensureMotion()` in
  `src/lib/motion.ts` dynamically `import()`s `gsap`, `gsap/ScrollTrigger`, and `lenis` only on
  client mount, guarded by `typeof window` checks for SSR safety. Keeps initial JS payload small
  and avoids blocking hydration.
- **`prefers-reduced-motion` is respected** before any gsap timeline runs (checked in
  `HomeView.vue`, `AboutView.vue`, `BookingView.vue`), which also incidentally protects LCP for
  those users since no opacity-from-0 animation runs on their hero content.
- **Global `.reveal` scroll-in-view animation defaults to visible** (`opacity: 1` in
  `src/style.css`, only flipped to `opacity: 0` via a `.reveal-pending` class added by JS) —
  a progressive-enhancement pattern that avoids hiding content from no-JS/slow-JS visitors and
  avoids CLS from a CSS-first-hidden state. Good baseline pattern used on `/services`,
  `/testimonials`, `/contact`.
- **Below-the-fold content images use `loading="lazy"`** consistently (`BlogCard.vue`,
  `TestimonialCard.vue`, `TransformationCard.vue`, and the food-card/expert-photo images in
  `HomeView.vue`).
- **Image containers reserve layout space via CSS** even though `<img>` tags lack explicit
  `width`/`height` attributes: `.expert-photo-frame` uses `aspect-ratio: 4/5`, `.fc-img` is a
  fixed `54px × 54px`, `.blog-card .img-wrap` is a fixed `224px`/`320px` height. This mitigates
  most CLS risk from those specific images despite the missing HTML attributes.
- **`preconnect` hints present** for `fonts.googleapis.com`, `fonts.gstatic.com`, and
  `images.unsplash.com` in `index.html`.
- **Server response / main-thread work are trivially low** in the lab run (`server-response-time`
  10ms, `mainthread-work-breakdown` 0.5s, `bootup-time` 0.1s, DOM size 241 elements) — no bloat
  from unused CSS/JS (`unused-css-rules` / `unused-javascript` both score 1), text compression
  enabled, no legacy JS polyfill bloat.

## Findings

### 1. Google Fonts loaded via CSS `@import` instead of a `<link rel="stylesheet">` — Medium (LCP/render-blocking)
`src/style.css` line 1 uses `@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans...&family=Bricolage+Grotesque...&display=swap")`. A CSS `@import` is discovered only after the browser downloads and parses `style.css` itself, then must fetch the Google Fonts CSS, then the font files — a fully serial chain even though `preconnect` is already primed for `fonts.googleapis.com`/`fonts.gstatic.com`. This adds avoidable round-trips on the font-loading critical path for every page, and the two heading fonts (`--font-heading` = Bricolage Grotesque, `--font-body` = Plus Jakarta Sans) are used by the hero `<h1>` and most section headings site-wide, so this affects LCP text rendering.
**Recommendation:** Replace the `@import` with a `<link rel="preload" as="style">` + `<link rel="stylesheet">` pair directly in `index.html` `<head>` (discovered on the initial HTML parse, in parallel with other head resources), or self-host the two font families as WOFF2 with `font-display: swap` and local `@font-face` (removes the third-party round trip entirely and is the more robust long-term fix). Also confirmed this baseline's `render-blocking-resources` audit already flags ~300ms of estimated savings from render-blocking CSS on `/` (5 blocking resources) and `/blog/best-high-protein-breakfast-for-fat-loss` (4), `/services/weight-management` (3), `/booking` (2) — consolidating/inlining critical CSS and deferring non-critical route CSS would compound with the font fix.

### 2. Hero content animated from `opacity: 0` via GSAP on initial page load — Medium-High (LCP timing risk, lab likely under-reports it)
On `/` (`HomeView.vue`), the hero `<h1>` (`.hero-h1`), sub-copy, CTAs, and the lead-capture form card (`.hero-form-card`) are all driven by `gsap.timeline().from(...)` calls in `initAnimations()`, which sets those elements to `opacity: 0` (and a translate offset) as soon as the lazily-imported `gsap`/`lenis` chunk finishes loading and executing, then animates them back to visible over ~0.5-0.9s per element with staggered offsets. The same pattern exists on `/about` (`.portrait-shell`, `.profile-panel`, `.signal-grid`) and `/booking` (`.consultation-ring`, `.console-list`) gated behind `ScrollTrigger.create({ trigger: '.about-hero', start: 'top 72%', once: true })` — but since these trigger elements sit at the top of the page, `start: 'top 72%'` is already satisfied on load, so the animation still fires immediately rather than on genuine scroll. Chrome's LCP algorithm generally does not credit an element as "painted" while `opacity: 0`, so the reported LCP timestamp for these hero elements is effectively gated behind (a) the dynamic `import('gsap')`/`import('lenis')` chunk downloading and executing, then (b) the animation's own duration. The current LHCI baseline uses Lantern-**simulated** throttling (a resource-timing model), which may not fully capture this JS/paint-driven delay the way a real trace or CrUX field measurement would — so the measured 1.7s LCP on `/` should be treated as an optimistic floor, not a guarantee, for real 75th-percentile mobile users.
**Recommendation:** Do not animate the actual LCP candidate element (hero `<h1>` / hero form) from `opacity: 0` on initial load. Either (a) exclude the first-viewport hero block from the entrance timeline and only animate secondary elements, (b) use a `visibility`/`clip-path` reveal that still allows the browser to register first paint before the animation starts, or (c) gate the hero timeline to start only after the LCP candidate has already had its first paint (e.g. via `requestAnimationFrame` after mount, keeping the *first* frame fully opaque and only animating supplementary elements like floating cards). Re-verify with a live Chrome DevTools Performance trace / real CrUX field LCP after the change, since Lantern simulation is not a reliable check for this specific class of issue.

### 3. Baseline coverage is incomplete — 9 of 13 sitemap URLs never lab-tested — Medium (audit confidence)
The `.lighthouseci` baseline only contains runs for `/`, `/services/weight-management`, one blog post, and `/booking`. `/services` (index), `/about`, `/testimonials`, `/contact`, and 4 of the 5 blog posts have no captured Lighthouse run in this repo, and no live PSI/CrUX call was made against production `https://dietrix.fit` in this pass.
**Recommendation:** Extend the Lighthouse CI config to include all 13 sitemap URLs (or generate the list from the sitemap directly) and re-run `npx lighthouse` per URL, or run `pagespeed_check.py` against each production URL. Prioritize `/about` and `/booking` given their heavier, more numerous `gsap.from()` calls (higher regression risk from #2 above), and re-check CrUX field history once production traffic accrues 28 days of data for each template.

### 4. `<img>` tags site-wide lack explicit `width`/`height` (or equivalent modern `aspect-ratio` attribute) — Low (CLS, currently mitigated by CSS)
None of the `<img>` elements in `HomeView.vue`, `AboutView.vue`, `BlogCard.vue`, `TestimonialCard.vue`, or `TransformationCard.vue` set `width`/`height` attributes. Layout shift is currently avoided because the parent containers already have fixed dimensions or `aspect-ratio` in CSS (`.expert-photo-frame { aspect-ratio: 4/5 }`, `.fc-img { width:54px; height:54px }`, `.blog-card .img-wrap { height: 224px }`), so this is a defense-in-depth gap rather than an active CLS bug today — but any future component/CSS refactor that drops those container rules would silently reintroduce layout shift with no HTML-level safety net, and Lighthouse's `image-aspect-ratio` best-practice check has nothing to cross-validate against.
**Recommendation:** Add explicit `width`/`height` attributes (matching the CSS aspect ratio) to all `<img>` tags as a low-effort, low-risk hardening pass — this also lets the browser compute the correct aspect ratio before CSS loads, useful on slow connections where CSS may not yet be parsed at image-decode time.

### 5. No `fetchpriority="high"` / preload on above-the-fold imagery, and unsplash images requested at fixed `w=` sizes without responsive `srcset` — Low (LCP, only matters if/when an image becomes the LCP element)
The hero section itself is text/CSS-only (no `<img>`), so this doesn't affect `/` today, but `/about`'s hero portrait and any future template using a real photo as the primary visual would benefit from priority hints. Unsplash images are requested via fixed-width query params (e.g. `?w=480&q=85&auto=format`) with no `srcset`/`sizes`, meaning mobile and desktop viewports download the same fixed-size asset rather than a right-sized one, and `auto=format` (Unsplash's content negotiation) — good for AVIF/WebP delivery, but not verified against `Accept` headers in this pass.
**Recommendation:** For any hero/above-the-fold photo added in the future, add `fetchpriority="high"` and drop `loading="lazy"` on that one element (lazy-loading an LCP candidate delays it), and add `srcset`/`sizes` (Unsplash supports `&w=` variants) so mobile doesn't over-fetch. Confirm via response headers that Unsplash is serving AVIF/WebP to modern `Accept` headers in production.

### 6. Third-party script impact — Low (currently well-controlled)
Google Fonts (2 preconnected origins) and Google Analytics (`gtag.js`, injected `async` in `main.ts`, only when `VITE_GA_ID` is set) are the only third parties observed. GA is injected asynchronously and does not block rendering. gsap/lenis are same-origin bundled chunks (not third-party network calls) so they don't carry DNS/TLS overhead, only JS execution/bundle-size cost already covered in Finding #2.
**Recommendation:** No action required beyond monitoring `third-party-summary` blocking-time once GA volume grows; consider `gtag` self-hosting/Partytown only if GA's TBT contribution becomes measurable in future audits.

## Priority Summary

1. **Fix GSAP hero opacity-from-0 animations on `/`, `/about`, `/booking`** (Finding 2) — highest expected impact on real-world LCP/CrUX pass rate; not fully visible in the current Lantern-simulated lab baseline.
2. **Switch Google Fonts `@import` to a preloaded `<link>` or self-hosted `@font-face`** (Finding 1) — removes a serial round-trip from every page's critical path, compounds with existing render-blocking-resources savings (~300ms already flagged by Lighthouse on `/`).
3. **Expand Lighthouse CI / PSI coverage to all 13 URLs and pull CrUX field data** (Finding 3) — needed to convert these lab-based estimates into confirmed 75th-percentile pass/fail status.
4. **Add `width`/`height` to all `<img>` tags** (Finding 4) — cheap hardening against future CLS regressions.
5. **Add `fetchpriority`/`srcset` guidance for any future above-the-fold photography** (Finding 5) — not urgent today since no page currently uses a photo as its LCP element.
