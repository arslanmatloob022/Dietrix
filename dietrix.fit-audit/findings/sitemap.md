# Sitemap Audit — dietrix.fit

**Sitemap URL:** https://dietrix.fit/sitemap_index.xml
**Local source:** `D:\my sites\arr\public\sitemap_index.xml` (identical to `dist/sitemap_index.xml` at build time)
**Generator:** `D:\my sites\arr\scripts\generate-seo-assets.mjs`
**Verifier:** `D:\my sites\arr\scripts\verify-crawl-signals.mjs`
**robots.txt:** `D:\my sites\arr\public\robots.txt`
**Router:** `D:\my sites\arr\src\router\index.ts`

## Score: 88 / 100

This is a well-engineered, script-generated sitemap with genuine safeguards (git-derived `lastmod`, a dedicated crawl-signal verifier that cross-checks canonical tags, trailing slashes, and internal links against the sitemap). Deductions are for a real `lastmod` semantics gap on blog posts, functionally inert deprecated tags, and a route/generator duplication risk with no automated completeness test.

## Summary of Contents

- 13 `<url>` entries: 7 static pages (`/`, `/services`, `/booking`, `/blog`, `/about`, `/testimonials`, `/contact`) + 6 blog posts (`/blog/<slug>` × 6, sourced from `src/data/content.ts`).
- File is well-formed XML, single `<urlset>` (not a true sitemap index despite the `_index` filename — see Finding 6).
- Well under both the 50,000-URL and 50MB per-file limits (13 URLs, ~2KB); no index-file split needed.

## Findings

### 1. XML structure and namespace — PASS
- **Severity:** Info
- **Description:** Valid `<?xml version="1.0" encoding="UTF-8"?>` declaration, correct `urlset` namespace (`http://www.sitemaps.org/schemas/sitemap/0.9`), well-formed nesting, no unescaped entities. Parses cleanly.
- **Recommendation:** None.

### 2. URL consistency (protocol/domain/trailing slash) — PASS
- **Severity:** Info
- **Description:** All 13 `<loc>` values use `https://dietrix.fit` (no `www`, no mixed protocol). Every non-root path omits the trailing slash; root is `/`. This matches `robots.txt`'s `Sitemap: https://dietrix.fit/sitemap_index.xml` declaration and is actively enforced at build time by `verify-crawl-signals.mjs` (lines 73–77), which fails the build on noncanonical origin or trailing-slash URLs.
- **Recommendation:** None — keep the existing verifier check in CI/prebuild.

### 3. Route coverage vs `src/router/index.ts` — PASS, no missing or orphaned pages
- **Severity:** Info
- **Description:** Every indexable route in the router has a sitemap entry: `/`, `/about`, `/services`, `/booking`, `/blog`, `/testimonials`, `/contact`, and all 6 `/blog/:slug` instances (slugs pulled directly from `src/data/content.ts`, matching the sitemap exactly). The router's `/404` document route and the `/:pathMatch(.*)*` catch-all are correctly *excluded* from the sitemap (as they should be — `verify-crawl-signals.mjs` separately confirms `dist/404/index.html` is `noindex, follow`). No sitemap URL points to a non-routable path, and no routable page is missing.
- **Recommendation:** None currently, but see Finding 5 re: keeping this coverage guaranteed going forward.

### 4. `lastmod` accuracy — partial gap on blog posts
- **Severity:** Medium
- **Description:** Static pages compute `lastmod` from the real last git-commit date of the corresponding view file (`lastCommitDate()` in `generate-seo-assets.mjs`, lines 41–61) — this is genuinely good practice and correctly tracks last *significant* change rather than build date. However, blog post `lastmod` values (lines 64–69) are set to `publishedAt` from `src/data/content.ts`, i.e. the original publish date, not a last-edited/last-modified date. If a published article is substantively revised later, its `lastmod` will not change, understating freshness (and, worse, if `content.ts` itself changes for reasons unrelated to that specific post, there's no signal differentiating an edited post from an untouched one). Currently harmless in effect (dates are in the past and not obviously wrong), but the field's semantics diverge from the static-page approach and from the stated intent ("lastmod must track real content changes, not the build date").
- **Recommendation:** In `scripts/generate-seo-assets.mjs`, add an `updatedAt` field to blog entries in `src/data/content.ts` (falling back to `publishedAt` when unset) and use that for blog `lastmod`, or derive it via `lastCommitDate()` against the specific content block/file for that slug, mirroring the static-route approach.

### 5. Static route list duplicated between router and generator — drift risk
- **Severity:** Low
- **Description:** `src/router/index.ts` and the `staticRoutes` array in `scripts/generate-seo-assets.mjs` are two independently maintained lists. They currently agree (verified), but nothing enforces that a new route added to the router is also added to the generator (or vice versa) — a forgotten sitemap entry would ship silently. This risk is partially mitigated by `verify-crawl-signals.mjs`, which fails the build if any internal `<a href>` in the generated HTML points to a path absent from the sitemap (lines 103–110) — but that only catches missing pages that are *linked to* from somewhere; an orphaned route with no internal links pointing to it would not be caught.
- **Recommendation:** Either derive `staticRoutes` programmatically from `src/router/index.ts` (filtering out `/404` and the catch-all), or add a lightweight test asserting the two lists match, so the existing verifier's link-based safety net isn't the only guard.

### 6. Deprecated `priority` and `changefreq` tags — informational, no functional effect
- **Severity:** Info
- **Description:** Every `<url>` entry includes `<changefreq>` and `<priority>`, generated in `generate-seo-assets.mjs` (lines 54–69). Google has publicly stated both tags are ignored for crawling/ranking purposes (Bing/others may weight them lightly, but their practical value is minimal). The `priority` values here do follow a deliberate, coherent hierarchy (`1.0` home → `0.95` services → `0.9` booking/blog → `0.82` about/testimonials → `0.8` contact → `0.78` blog posts) that reflects a real conversion-path rationale rather than being random — so they are *internally justified*, but since Google discards the field entirely, the hierarchy has no actual effect on crawl behavior.
- **Recommendation:** Optional cleanup: remove `priority`/`changefreq` emission from `generate-seo-assets.mjs` (lines 79–84) to reduce file size and avoid implying the values do something they don't. Not urgent — no harm in leaving them.

### 7. Filename `sitemap_index.xml` is a plain urlset, not a sitemap index — documented, not a defect
- **Severity:** Info
- **Description:** The file is named `sitemap_index.xml` but contains a single `<urlset>` (a flat sitemap), not a `<sitemapindex>` referencing child sitemaps. This could be confusing to tooling/maintainers expecting index-of-sitemaps semantics from that filename. However, this is intentional and explained in the generator script's own comment (`generate-seo-assets.mjs`, lines 90–95): the path was deliberately changed from `/sitemap.xml` to escape a Search Console failure-history from a past hosting outage tied to the old URL, giving Google a "clean slate" URL to (re-)discover.
- **Recommendation:** No action needed given the documented rationale; the tradeoff was made consciously. If naming clarity becomes a concern later, consider `sitemap-fresh.xml` or similar rather than reverting to `sitemap.xml`.

### 8. `public`/`dist` parity — PASS
- **Severity:** Info
- **Description:** `public/sitemap_index.xml` and `dist/sitemap_index.xml` are byte-identical, confirming the committed file reflects the current build output and the generator ran cleanly (`prebuild` npm script wires `generate-seo-assets.mjs` before `build`).
- **Recommendation:** None.

### 9. Sitemap size limits — PASS
- **Severity:** Info
- **Description:** 13 URLs, well under the 50,000-URL / 50MB uncompressed per-file cap (and well under the 1,000-URL `news:` cap, which doesn't apply here — no `news:` namespace present).
- **Recommendation:** None; revisit only if the blog scales into the thousands of posts.

### 10. Orphaned view file not reflected anywhere (router or sitemap) — informational
- **Severity:** Low
- **Description:** `src/views/SerivcesPageTwo.vue` exists but is not referenced by `src/router/index.ts` or any other source file (confirmed via repo-wide search). It is correctly absent from the sitemap since it isn't routable, which is the right sitemap behavior — but if this file was intended to become a live page, it is currently invisible to both the router and the sitemap generation logic.
- **Recommendation:** Not a sitemap defect. Flagging for the content/architecture side of the audit — either wire it into the router (and by extension `generate-seo-assets.mjs`'s static route list) or remove the dead file.

## Quality Gates (Location Pages)

Not applicable — the site has no location/city-swap page pattern (0 location pages found in router or sitemap). No warning or hard-stop triggered.

## Missing / Extra Pages

- **Missing from sitemap (present in crawl/router but not sitemap):** None.
- **Extra in sitemap (present in sitemap but 404/non-routable):** None.
