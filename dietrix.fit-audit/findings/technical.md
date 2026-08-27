# Dietrix.fit — Technical SEO Audit
Audited: 2026-08-24 | Live site: https://dietrix.fit | Repo: D:\my sites\arr (not a git repo checkout at audit time, but source tree present)

## Summary Score: 46 / 100

The **source repository** (Vue 3 + vite-ssg static build, `netlify.toml`, `deploy/nginx/dietrix.conf`, `scripts/generate-seo-assets.mjs`, `scripts/verify-crawl-signals.mjs`) is well engineered for SEO: clean per-page canonicals, unique titles/descriptions, rich JSON-LD, a valid sitemap, and explicit safeguards against redirect chains and soft-404s. However, **the live production server does not match this repo's intended configuration**. `curl` against `https://dietrix.fit` shows the site is served by `nginx/1.28.3 (Ubuntu)`, not Netlify, and the deployed nginx behavior contradicts both `netlify.toml` and the repo's own `deploy/nginx/dietrix.conf`. This causes redirect chains on 12 of 13 sitemap URLs, a canonical/redirect contradiction, a sitewide **soft-404** (any broken/unknown URL returns HTTP 200 with the homepage), a duplicate `www` host that is not redirected, and a complete absence of the security headers defined in `netlify.toml`. These are live, crawl-critical defects that outweigh the strong on-page/structured-data work, hence the score.

## What Works

- **Sitemap**: `public/sitemap_index.xml` is well-formed, all 13 URLs resolve (via redirect, see below), lastmod dates are commit-driven (not build-date spam) per `scripts/generate-seo-assets.mjs:41-52`, generated freshly (homepage lastmod 2026-08-17, within audit week). `sitemap_discovery.py` confirms it validates as `urlset` and is correctly declared in `robots.txt`.
- **robots.txt**: `public/robots.txt` is minimal and correct — `Allow: /` plus a `Sitemap:` declaration, no accidental disallows.
- **Structured data**: JSON-LD is present and page-appropriate across all page types checked — `MedicalBusiness`/`Person`/`WebSite`/`FAQPage`/`HowTo`/`Service`/`Offer` on the homepage; `Service`/`Offer` on `/services`; `FAQPage`/`BreadcrumbList` on `/blog`; `Article`/`FAQPage`/`BreadcrumbList` on blog posts; `CollectionPage` on `/testimonials` (with `verify-crawl-signals.mjs:114-160` actively asserting no stray `Review`/`AggregateRating` nodes — a good anti-hallucinated-rich-result guard).
- **Meta/titles/descriptions**: All 13 pages have unique, reasonably-sized `<title>` and `<meta name="description">` values, correct `<meta name="viewport">`, and `robots` content of `index, follow, max-image-preview:large` (except `/404` which correctly declares `noindex, follow`).
- **No JS-rendering dependency**: vite-ssg pre-renders full HTML per route (`vite.config.ts:9-17`); content, meta tags, and JSON-LD are present in the raw HTML with no client-side rendering required for crawlers.
- **Compression & TLS**: gzip is active (`Content-Encoding: gzip`), TLS certificate is valid (dietrix.fit, expires 2026-10-05), HTTP→HTTPS redirects to the correct apex host.
- **Images**: all `<img>` tags carry descriptive, keyword-relevant `alt` text and `loading="lazy"`; no `<img>` sits inside the CSS-only hero (hero uses decorative divs, not an LCP-blocking image).
- **Build-time verification tooling exists**: `scripts/verify-crawl-signals.mjs` already checks canonical/sitemap consistency, internal-link targets, and 404 correctness against the local `dist/` build — it just isn't wired into the deploy pipeline (see High findings) and isn't reflecting what's actually live.

## Findings

### Critical

1. **Title: Live nginx deployment has drifted from `deploy/nginx/dietrix.conf` — production is not running the checked-in config**
   - **Description**: `deploy/nginx/dietrix.conf:62-68` is written so `/about`, `/services`, etc. serve `try_files $uri/index.html $uri =404;` directly (200, no redirect), and only paths that *already* end in `/` get 301'd to strip the slash (lines 62-64). Live behavior is the opposite: `curl -I https://dietrix.fit/about` returns `301 Moved Permanently` → `Location: https://dietrix.fit/about/` (verified for all 12 non-root sitemap URLs). This is the classic default-nginx directory-redirect behavior (`try_files $uri $uri/ =404;`), which the repo's own comments (`netlify.toml:1-5`, `deploy/nginx/dietrix.conf:89-92`) explicitly say was fixed to avoid. The file in the repo is not what's running on the server.
   - **Recommendation**: Redeploy `deploy/nginx/dietrix.conf` to the production host and `nginx -t && systemctl reload nginx`. Add a CI/CD step that diffs the live config (or re-deploys it) on every release so this cannot silently drift again.

2. **Title: Every sitemap URL except `/` triggers a redirect, and the redirect target contradicts its own canonical tag**
   - **Description**: The sitemap lists `https://dietrix.fit/about` (no trailing slash), but requesting it returns `301 → https://dietrix.fit/about/`. The page actually served at `/about/` declares `<link rel="canonical" href="https://dietrix.fit/about">` — the exact URL that just redirected to it. This is a circular canonical/redirect signal: Google Search Console will very likely classify `/about` (and the other 11 affected URLs) as "Page with redirect" and decline to index it under the sitemap-declared URL, which is precisely the failure mode the code comments in `netlify.toml:1-5` and `scripts/generate-seo-assets.mjs:38-40` were written to prevent. Confirmed on `/about`, `/services`, `/booking`, `/blog`, `/testimonials`, `/contact`, and all 5 blog posts.
   - **Recommendation**: Once the correct nginx config (Critical #1) is live, re-crawl to confirm each sitemap URL returns `200` directly with no redirect. Re-submit the sitemap in Search Console afterward and use the URL Inspection tool to force re-crawl the 12 affected URLs.

3. **Title: Sitewide soft-404 — any nonexistent URL returns HTTP 200 with homepage content**
   - **Description**: `curl -I https://dietrix.fit/this-page-does-not-exist` returns `200 OK` with `Content-Length: 85288` and an `ETag` byte-for-byte identical to the real homepage — the server is silently serving the homepage for unknown paths instead of the branded `dist/404/index.html`. This contradicts `deploy/nginx/dietrix.conf:93-97` (`try_files $uri/index.html $uri =404;` + `error_page 404 /404/index.html;`, explicitly commented "There is intentionally no SPA fallback to /index.html") and directly matches the exact regression `scripts/verify-crawl-signals.mjs:175-189` was written to catch (`"Nginx still contains an SPA-style /index.html fallback"`). Additionally, `/404` itself 301-redirects to `/404/`, and `/404/` returns `200` (not `404`) even though its `<meta name="robots" content="noindex, follow">` is correct in the markup.
   - **Recommendation**: Same root fix as Critical #1 — deploy the correct `deploy/nginx/dietrix.conf`. After the fix, verify with `curl -I` that unknown paths return real `404` status and that `/404/` itself returns `404` (Netlify's `netlify.toml:186-189` `[[redirects]] from="/*" to="/404/index.html" status=404` shows the intended behavior if Netlify were the actual host). Run `node scripts/verify-crawl-signals.mjs` against the live nginx behavior, not just the local `dist/`, as part of every deploy.

4. **Title: `www.dietrix.fit` is a live, unredirected duplicate of the apex domain**
   - **Description**: `https://www.dietrix.fit/` returns `200 OK` with content identical to `https://dietrix.fit/` (same `Content-Length: 85288`, same `ETag`), instead of the `301 → https://dietrix.fit/` defined in `deploy/nginx/dietrix.conf:27-46` (the `server_name www.dietrix.fit` block). The page's own canonical tag (`https://dietrix.fit/`) is correct, so this is "soft" duplication that Google should mostly resolve via canonical — but it's a second fully-crawlable, fully-indexable host serving the entire site, wasting crawl budget and creating host-level ambiguity (e.g., for backlink/authority consolidation, hreflang tooling, and any tool that doesn't respect canonicals as strictly as Google, e.g. Bing).
   - **Recommendation**: Same deployment fix as above — ensure the live nginx vhost config actually includes the `www` → apex 301 block from `deploy/nginx/dietrix.conf:27-46`. Confirm the TLS certificate on the `www` vhost also covers `www.dietrix.fit` (SAN) so the redirect can be served over HTTPS without a certificate warning.

5. **Title: All Netlify-defined security headers are absent in production**
   - **Description**: `netlify.toml:195-201` defines `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` for `/*`, plus caching headers. None of these appear in any live response (`curl -I` on `/`, `/about/`, etc. show only `Server`, `Date`, `Content-Type`, `Content-Length`, `Last-Modified`, `Connection`, `ETag`, `Accept-Ranges`). Since the site is actually served by nginx, not Netlify, `netlify.toml` has **zero effect in production** — it is dead configuration. There is also no `Strict-Transport-Security` (HSTS) header and no `Content-Security-Policy` anywhere, despite the site being fully HTTPS with no legitimate need for it to ever downgrade.
   - **Recommendation**: Port the header block from `netlify.toml:195-221` into `deploy/nginx/dietrix.conf` using `add_header` directives inside the `server { listen 443 ... server_name dietrix.fit; }` block (around line 49-98), e.g.:
     ```
     add_header X-Frame-Options "SAMEORIGIN" always;
     add_header X-Content-Type-Options "nosniff" always;
     add_header Referrer-Policy "strict-origin-when-cross-origin" always;
     add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
     ```
     Add a `Content-Security-Policy` scoped to the actual third-party origins in use (`fonts.googleapis.com`, `fonts.gstatic.com`, `images.unsplash.com`, plus any analytics/booking widget domains). Either retire `netlify.toml` entirely (to avoid future confusion about which config is authoritative) or clearly document in `README.md` that nginx is canonical and `netlify.toml` is unused/staging-only.

### High

6. **Title: `/sitemap.xml` legacy redirect is not deployed — serves the homepage instead of a 301**
   - **Description**: `deploy/nginx/dietrix.conf:79-81` and `netlify.toml:176-180` both define `/sitemap.xml → 301 → /sitemap_index.xml`, specifically to shed a failed-fetch history in Search Console (per the inline comment). Live, `https://dietrix.fit/sitemap.xml` returns `200 OK` with the homepage's HTML (not XML, not a redirect) — the `sitemap_discovery.py` skill tool flags it explicitly: `"error": "DOCTYPE is not allowed in sitemap XML"`. This is the same soft-404 fallback bug (Critical #3) misfiring here too.
   - **Recommendation**: Fixed by the same nginx redeploy as Critical #1/#3. After the fix, verify `curl -I https://dietrix.fit/sitemap.xml` returns `301` to `/sitemap_index.xml`, then confirm in GSC that the old sitemap URL is deprecated in favor of the new one.

7. **Title: `verify-crawl-signals.mjs` and brand-asset verification are not wired into the build/deploy pipeline**
   - **Description**: `package.json:8-13` defines `verify:crawl-signals` and `verify:brand` as standalone scripts, but neither `build` nor `prebuild` invokes them. This is exactly the class of regression now live in production (Critical #1-4): the repo has the tooling to catch trailing-slash redirects, missing 404 documents, and canonical mismatches automatically, but it never runs as a gate.
   - **Recommendation**: Add `"postbuild": "node scripts/verify-crawl-signals.mjs"` to `package.json:8-13` so CI fails the build if `dist/` regresses. Since the actual bug found here is a *deployment* config drift rather than a `dist/` bug, also add a lightweight live-site smoke test (e.g., a script that `curl`s the 13 sitemap URLs plus one deliberately-bad URL against the production domain post-deploy and fails the pipeline if any sitemap URL redirects or the bad URL returns anything but 404) — this would have caught the current production state immediately.

8. **Title: No LCP/CLS dimension safety net for lazy-loaded images**
   - **Description**: None of the 19 `<img>` elements sampled across the homepage, blog listing, and blog article carry `width`/`height` attributes (or CSS `aspect-ratio`, confirmed absent from `assets/app-DvFaLBbL.css` — 0 occurrences of `aspect-ratio`). All images are `loading="lazy"` and hosted on `images.unsplash.com` (third-party origin, variable latency, no first-party cache control). Without reserved intrinsic dimensions, each image insertion is a potential CLS contributor as it loads, particularly on the testimonial/transformation cards and blog thumbnails which sit above the fold on scroll.
   - **Recommendation**: Add explicit `width`/`height` (or `aspect-ratio` via CSS) to every `<img>` in the Vue components that render Unsplash images (e.g. wherever `TransformationCard`, `BlogCard`, `ServiceCard`, testimonial and About-page photo markup lives under `src/components` / `src/views`). Consider self-hosting or proxying the Unsplash images through a first-party image CDN for cache-control and format-negotiation (AVIF/WebP) control instead of depending on `images.unsplash.com` uptime and query-param resizing at request time.

### Medium

9. **Title: `manifest.webmanifest` served with an incorrect MIME type**
   - **Description**: `curl -I https://dietrix.fit/manifest.webmanifest` returns `Content-Type: application/octet-stream` instead of `application/manifest+json`. This is an nginx default-MIME-type gap (the `.webmanifest` extension isn't mapped in the server's `mime.types`), not a code bug — `public/manifest.webmanifest` itself is fine.
   - **Recommendation**: Add `types { application/manifest+json webmanifest; }` (or an explicit `location ~* \.webmanifest$ { add_header Content-Type application/manifest+json; }`) to `deploy/nginx/dietrix.conf`.

10. **Title: No IndexNow integration**
    - **Description**: No IndexNow key file exists under `public/`, and no script in `scripts/` pings the IndexNow endpoint on publish. For a blog that ships new posts on a monthly-ish cadence (per `sitemap_index.xml` lastmod spread), this means Bing/Yandex/Naver discovery relies solely on their own crawl schedule rather than instant push notification.
    - **Recommendation**: Generate an IndexNow key, publish it at `public/<key>.txt`, and add a small post-deploy step (e.g., in the same place `verify:crawl-signals` would run) that POSTs the sitemap's URL list to `https://api.indexnow.org/indexnow` after each successful deploy.

11. **Title: `hreflang` is emitted as a self-referencing no-op on every page**
    - **Description**: `src/composables/useSeo.ts:65-66` adds `<link rel="alternate" hreflang="en">` and `hreflang="x-default"`, both pointing at the same canonical URL, on every route. Since there is only one language/locale version of each page, this hreflang pair carries no signal (it neither declares alternates nor is incorrect) — it's inert markup. Not flagged as an error per se; deferred to the `seo-hreflang` sub-skill for any deeper multi-market/locale strategy review, since `llms.txt` (`scripts/generate-seo-assets.mjs:104-135`) indicates the business targets many country markets (Pakistan, UK, US, Canada, Germany, France, KSA, UAE, Australia) without dedicated locale pages.
    - **Recommendation**: If the business intends to target these markets with distinct landing content in the future, plan real hreflang clusters at that point; until then this is safe to leave as-is or remove for cleanliness.

### Low / Info

12. **Title: `netlify.toml` is fully dead configuration**
    - **Description**: The entire `netlify.toml` (redirects, headers, caching, build command) has no effect because the live host is a self-managed nginx server, not Netlify. It is well-written and clearly documents the *intended* behavior (and matches `deploy/nginx/dietrix.conf`'s intent), but its presence next to a mismatched live deployment is a maintenance hazard — a future engineer could reasonably assume it's authoritative and "fix" the wrong file.
    - **Recommendation**: Either retire `netlify.toml` (if nginx/AWS is the permanent target) or migrate hosting to Netlify to make it authoritative again. Document the decision in `README.md`.

13. **Title: `public/_redirects` duplicates the nginx 404 note but targets a different platform**
    - **Description**: `public/_redirects:1-5` is a Netlify-specific redirects file with a single catch-all `/* /404/index.html 404` rule and a comment pointing to `deploy/nginx/dietrix.conf` as the real production routing source. Harmless as-is, but reinforces finding #12 — two platforms' worth of routing config live in the repo simultaneously.
    - **Recommendation**: No action required beyond the `netlify.toml` decision in #12; delete `public/_redirects` if Netlify is fully retired.

## Per-URL Summary (all 13 sitemap URLs)

| URL | Live Status (raw) | Redirect? | Canonical on served page | Structured data | Notes |
|---|---|---|---|---|---|
| `/` | 200 | No | `https://dietrix.fit/` | MedicalBusiness, Person, WebSite, FAQPage, HowTo, Service, Offer | OK |
| `/about` | 301 → `/about/` (200) | Yes | `https://dietrix.fit/about` | MedicalBusiness, Person | Redirect/canonical loop (Critical #2) |
| `/services` | 301 → `/services/` (200) | Yes | `https://dietrix.fit/services` | MedicalBusiness, Person, Service, Offer | Redirect/canonical loop |
| `/booking` | 301 → `/booking/` (200) | Yes | `https://dietrix.fit/booking` | MedicalBusiness, Person | Redirect/canonical loop; no page-level Service/Offer schema |
| `/blog` | 301 → `/blog/` (200) | Yes | `https://dietrix.fit/blog` | MedicalBusiness, Person, FAQPage, BreadcrumbList | Redirect/canonical loop |
| `/testimonials` | 301 → `/testimonials/` (200) | Yes | `https://dietrix.fit/testimonials` | MedicalBusiness, Person, CollectionPage | Redirect/canonical loop |
| `/contact` | 301 → `/contact/` (200) | Yes | `https://dietrix.fit/contact` | MedicalBusiness, Person | Redirect/canonical loop; no LocalBusiness/ContactPage-specific schema |
| `/blog/best-high-protein-breakfast-for-fat-loss` | 301 → trailing slash (200) | Yes | matches | Article, FAQPage, BreadcrumbList | Redirect/canonical loop |
| `/blog/pcos-diet-plan-basics-that-actually-work` | 301 → trailing slash (200) | Yes | matches | (same pattern) | Redirect/canonical loop |
| `/blog/simple-weekly-diet-planning-for-busy-professionals` | 301 → trailing slash (200) | Yes | matches | (same pattern) | Redirect/canonical loop |
| `/blog/diabetes-friendly-plate-method-for-busy-families` | 301 → trailing slash (200) | Yes | matches | (same pattern) | Redirect/canonical loop |
| `/blog/gut-health-meal-rhythm-for-bloating-relief` | 301 → trailing slash (200) | Yes | matches | (same pattern) | Redirect/canonical loop |
| `/blog/ramadan-nutrition-plan-for-energy-and-fat-loss` | 301 → trailing slash (200) | Yes | matches | (same pattern) | Redirect/canonical loop |

No orphaned pages were found — every route in `src/router/index.ts` that resolves to a concrete SSG path (per `vite.config.ts:12-16`) is present in the sitemap, and `scripts/verify-crawl-signals.mjs:84-111` already checks internal links against the sitemap set at build time.

## Category Pass/Fail

| Category | Status |
|---|---|
| Crawlability (robots.txt, sitemap) | Pass |
| Crawlability (real 404s, soft-404 avoidance) | **Fail (Critical)** |
| Indexability (canonicals, meta robots) | Fail — canonicals correct in markup but contradicted by live redirect chain |
| Security headers / HSTS / CSP | **Fail (Critical)** |
| HTTPS / TLS | Pass |
| URL structure / redirect hygiene | **Fail (Critical)** |
| Host canonicalization (www vs apex) | **Fail (Critical)** |
| Mobile-friendliness (viewport, responsive) | Pass |
| Core Web Vitals (lab estimate) | Partial — good JS/CSS delivery, but CLS risk from undimensioned images |
| Structured Data | Pass |
| JavaScript rendering (SSR/SSG) | Pass |
| IndexNow | Not implemented (Info) |
