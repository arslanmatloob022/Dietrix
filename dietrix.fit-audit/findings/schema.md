# Schema.org / Structured Data Audit — dietrix.fit

**Pages audited:** all 13 sitemap URLs (`/`, `/services`, `/booking`, `/blog`, `/about`, `/testimonials`, `/contact`, and 6 blog posts — the sitemap contains 6 posts, not 5; `ramadan-nutrition-plan-for-energy-and-fat-loss` was not in the original brief but is live and included here).
**Format:** JSON-LD only (no Microdata/RDFa found) — correct per Google guidance.
**Repo schema sources:**
- `D:\my sites\arr\index.html` (lines 74–112) — static fallback `MedicalBusiness` block baked into the SSG shell, present on every page.
- `D:\my sites\arr\src\data\seo.ts` — `buildOrganizationSchema`, `buildPersonSchema`, `buildWebsiteSchema`, `buildFaqSchema`, `buildBreadcrumbSchema`, `buildArticleSchema`, `buildHowToSchema`.
- `D:\my sites\arr\src\composables\useSeo.ts` — `upsertJsonLd()` / `removeJsonLd()`, injects `<script id="...">` tags client-side (and via `@unhead/vue` under SSR).
- Per-view injection calls: `src/views/HomeView.vue`, `AboutView.vue`, `ServicesView.vue`, `TestimonialsView.vue`, `BlogView.vue`, `BlogArticleView.vue`. **`BookingView.vue` and `ContactView.vue` call `useSeo()` only — neither imports nor calls any schema builder.**

## Score: 52 / 100

Solid foundation (valid JSON-LD, `https://schema.org` context, absolute URLs, ISO 8601 dates, correct `Article`/`BreadcrumbList` pattern on every blog post) undercut by one real entity-conflict bug, one broken cross-page reference, a deprecated schema type still shipping, two conversion-critical pages with no page-specific markup at all, and a missed Review/AggregateRating opportunity where the data already exists.

## What Works

- Every block validates structurally (correct `@type`, JSON syntax, required properties present) — confirmed via live fetch + JSON-LD extraction on all 13 URLs.
- `@context` is consistently `https://schema.org` (https, not http) everywhere.
- All URLs in schema are absolute (`https://dietrix.fit/...`), no relative paths.
- Dates (`datePublished`, `dateModified`) are ISO 8601 (`YYYY-MM-DD`).
- All 6 blog posts correctly emit `Article` + `BreadcrumbList` — the right pattern for article/breadcrumb rich results, and applied consistently across every post.
- No deprecated `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, or `LearningVideo` anywhere.
- `Person`/`Organization` use `@id` referencing (`worksFor`, `author`, `publisher`) rather than re-declaring full objects inline — good practice in principle (see Finding 2 for where it breaks in execution).
- Testimonials data (`src/data/content.ts`) already carries `name`, `rating`, `quote` per entry — ready to wire into `Review`/`AggregateRating` with no new content work.

## Findings

### 1. Duplicate/conflicting `Organization` `@id` on Home, Services, Booking, Testimonials, Contact — CRITICAL
- **Description:** `index.html` (lines 74–112) hardcodes a static `MedicalBusiness` JSON-LD script with `"@id": "https://dietrix.fit/#organization"` as a fallback (comment: *"inline for SSG pages that override it"*). But `useSeo.ts`'s `upsertJsonLd()` looks up the *dynamic* script by a different DOM `id` (e.g. `"dietrix-organization-schema"`) via `document.getElementById()`. The static tag in `index.html` has no `id` attribute at all, so the lookup never finds it, never removes/replaces it — it just appends a **second** `<script type="application/ld+json">` alongside it. Result: on `/` and `/services` (which call `buildOrganizationSchema()`), the page ships **two different `MedicalBusiness` nodes declaring the identical `@id`** with materially different properties (one has `founder`/`description`/`sameAs: []`, the other has `availableService`/`priceRange`/`image`, no `founder`). On `/booking`, `/testimonials`, `/contact` (which never override it), only the static block ships — meaning those pages advertise an organization with no services at all. This is a real entity-consolidation conflict: Google's structured-data parser will pick one node (behavior undefined/inconsistent) for a repeated `@id`, and Search Console's "duplicate structured data" / conflicting-property warnings can surface for Organization markup that changes shape page-to-page under the same identifier.
- **Recommendation:** In `D:\my sites\arr\index.html`, add `id="dietrix-organization-schema"` to the static `<script>` tag (line 75) so `upsertJsonLd()` in `src\composables\useSeo.ts` actually finds and *replaces* it via `document.getElementById(id)` instead of appending a duplicate. Then reconcile the two payloads into one canonical `Organization` shape (merge `founder`, `description`, `availableService`, `priceRange` into `buildOrganizationSchema()` in `src\data\seo.ts` so every page emits the same fields for the same `@id`).
  ```html
  <script type="application/ld+json" id="dietrix-organization-schema">
  ```

### 2. `Article.author` references a `Person` `@id` that never resolves on the blog post page — HIGH
- **Description:** `buildArticleSchema()` in `src\data\seo.ts` (line 552) sets `author: { "@id": "https://dietrix.fit/#rimsha-naseer" }`. That `@id` is only ever *defined* by `buildPersonSchema()`, which is called on `/` (Home) and `/about` — **never** on `BlogArticleView.vue`. All 6 blog posts ship blocks `MedicalBusiness` (static, `founder` is an anonymous nested `Person` with no `@id`), `Article`, `FAQPage`, `BreadcrumbList` — no node with `@id="#rimsha-naseer"` exists anywhere in that page's graph. The `author` reference is dangling. Google's structured-data testing tools generally evaluate each page's graph independently, so this weakens/nullifies the author attribution signal Google uses for `Article` rich results and E-E-A-T, on every single blog post.
- **Recommendation:** In `src\views\BlogArticleView.vue`, import `buildPersonSchema` from `../data/seo` and call `upsertJsonLd("dietrix-article-author-schema", buildPersonSchema())` alongside the existing `upsertJsonLd("dietrix-article-schema", ...)` call (near line 125), so the `Person` node the `Article.author` references actually exists on the page. Minimal patch:
  ```ts
  // src/views/BlogArticleView.vue
  import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildPersonSchema } from "../data/seo";
  // ...
  upsertJsonLd("dietrix-article-schema", buildArticleSchema(article.value));
  upsertJsonLd("dietrix-article-author-schema", buildPersonSchema());
  ```

### 3. Deprecated `HowTo` schema still emitted on the homepage — HIGH
- **Description:** `HomeView.vue` line 498 calls `upsertJsonLd("dietrix-home-howto-schema", buildHowToSchema(processSteps))`, and `buildHowToSchema()` (`src\data\seo.ts` lines 496–510) emits a `@type: "HowTo"` block for the 3-step booking process. Google removed `HowTo` rich results globally in September 2023 — this block currently has zero SERP benefit and is pure dead weight/complexity.
- **Recommendation:** Remove the call in `src\views\HomeView.vue` (line 498) and delete (or stop exporting) `buildHowToSchema()` in `src\data\seo.ts` (lines 496–510). No replacement schema is needed — the 3-step process content can stay as plain HTML.

### 4. `/booking` and `/contact` ship no page-specific structured data at all — MEDIUM
- **Description:** `src\views\BookingView.vue` and `src\views\ContactView.vue` both call `useSeo()` for meta tags but never import or call any of the `buildX` schema functions. These are two of the highest-intent, most conversion-critical pages on the site (booking flow and contact/lead capture), yet the only structured data present is the generic static `MedicalBusiness` fallback from `index.html` (Finding 1) with no `ContactPoint`, no `Service`/`Offer` for what's actually being booked, and no `BreadcrumbList`.
- **Recommendation:** Add page-scoped schema in both views. For `/contact`, extend the organization reference with a `ContactPage` + `ContactPoint`; for `/booking`, add a `Service`/`Offer`-focused block referencing the specific consultation service being booked, plus breadcrumbs on both (see Finding 5).
  ```ts
  // src/views/ContactView.vue — add alongside useSeo(pageSeo.contact)
  import { upsertJsonLd } from "../composables/useSeo";
  import { absoluteUrl, siteUrl } from "../data/site";

  upsertJsonLd("dietrix-contact-schema", {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contact")}#contactpage`,
    url: absoluteUrl("/contact"),
    name: "Contact Dietrix Fit",
    about: { "@id": `${siteUrl}/#organization` },
    mainEntity: {
      "@id": `${siteUrl}/#organization`,
      "@type": "MedicalBusiness",
      contactPoint: {
        "@type": "ContactPoint",
        email: "rimshanaseer101@gmail.com",
        contactType: "customer support",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    },
  });
  ```
  ```ts
  // src/views/BookingView.vue — add alongside useSeo(pageSeo.booking)
  import { upsertJsonLd } from "../composables/useSeo";
  import { absoluteUrl, siteUrl } from "../data/site";

  upsertJsonLd("dietrix-booking-schema", {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl("/booking")}#service`,
    name: "Online Nutrition Consultation Booking",
    serviceType: "Nutrition Consultation",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    url: absoluteUrl("/booking"),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "50",
      url: absoluteUrl("/booking"),
      availability: "https://schema.org/InStock",
    },
  });
  ```
  Do not use `Reservation`/`ReserveAction` unless the booking flow issues confirmed slot-based reservations with a real `startTime`/`endTime` and integrates with Google's reservation partner feed — a plain `Service`+`Offer` is the correct, safe scope here.

### 5. `BreadcrumbList` missing on 6 of 13 pages — MEDIUM
- **Description:** `buildBreadcrumbSchema()` exists in `src\data\seo.ts` (line 527) and is correctly wired into `BlogView.vue` and `BlogArticleView.vue` only. `/`, `/services`, `/booking`, `/about`, `/testimonials`, `/contact` emit no breadcrumbs, forfeiting breadcrumb rich-result eligibility (the breadcrumb trail shown in place of the raw URL in SERPs) on every non-blog page.
- **Recommendation:** Call the existing `buildBreadcrumbSchema()` helper from `src\data\seo.ts` on each remaining view. Example for `/services`:
  ```ts
  // src/views/ServicesView.vue
  import { buildBreadcrumbSchema, buildOrganizationSchema } from "../data/seo";
  import { upsertJsonLd } from "../composables/useSeo";

  upsertJsonLd("dietrix-services-breadcrumb-schema", buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]));
  ```
  Repeat with the appropriate 2-level trail for `/booking`, `/about`, `/testimonials`, `/contact`. The homepage does not need a breadcrumb block (it is the root node).

### 6. Testimonials page has no `Review`/`AggregateRating` despite ready rated data — MEDIUM
- **Description:** `/testimonials` only emits a bare `CollectionPage` block (`TestimonialsView.vue` lines 14–28). `src\data\content.ts` (`testimonials` array, from line 178) already has `name`, `rating` (numeric, 1–5), and `quote` for every entry — exactly what `Review` needs — but none of it is surfaced as structured data. Note per Google's review-snippet policy: self-published reviews of your own business on your own site are supported and commonly used (this is different from the disallowed "review of this website" pattern), but only mark up genuine, unedited testimonials, and be aware Google may suppress the rich snippet if it judges the reviews non-independent/self-serving.
- **Recommendation:** Add an `AggregateRating` to the organization node plus individual `Review` items in `src\views\TestimonialsView.vue`, sourced from the existing `testimonials` import:
  ```ts
  import { testimonials } from "../data/content";
  import { siteUrl } from "../data/site";

  const avg = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;

  upsertJsonLd("dietrix-testimonials-reviews-schema", {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteUrl}/#organization`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: testimonials.length,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.quote,
    })),
  });
  ```
  This reuses the same `@id` as the main Organization node deliberately — fix Finding 1 first so this doesn't add a *third* conflicting declaration.

### 7. `FAQPage` on Home, Blog listing, and all 6 blog posts (8 blocks total) — no SERP benefit — INFO
- **Description:** Google retired FAQ rich results for all sites as of May 7, 2026 (superseding the Aug 2023 gov/health-only restriction), so `HomeView.vue`, `BlogView.vue`, and every `BlogArticleView.vue` render is structurally valid but earns no rich-result feature in Google Search. Any benefit to AI answer engines / LLM citation is unconfirmed.
- **Recommendation:** Not urgent to remove — these blocks are harmless and cost little. If cleaning up, deprioritize below Findings 1–6. Do not add *new* `FAQPage` blocks elsewhere on the site expecting a Google SERP feature; if genuine user-submitted Q&A content is ever added (not written by the site), use `QAPage` instead.

### 8. Missing `sameAs` and `hasCredential` on Person/Organization — LOW
- **Description:** `buildOrganizationSchema()` and the static fallback both set `sameAs: []` (empty) or omit it; `buildPersonSchema()` in `src\data\seo.ts` (line 450) has no `sameAs` at all despite `certifications` (`src\data\content.ts` line 26: "M.Sc. Clinical Nutrition", "Certified Diabetes Educator", etc.) existing as plain strings, unused in any schema.
- **Recommendation:** Add real social/profile URLs to `sameAs` on both `Organization` and `Person` once available, and map `certifications` into `hasCredential` on the `Person` node:
  ```ts
  // src/data/seo.ts — inside buildPersonSchema()
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c,
  })),
  ```

### 9. Garbled em dash in Organization `description` — LOW
- **Description:** Both the static block in `index.html` (line 84) and the live-fetched JSON-LD show `"...gut health, and performance â\u0080\u0094 serving clients globally."` — a UTF-8/Windows-1252 double-encoding artifact where an em dash (—) became `â€"`. Cosmetic but visible in any raw JSON-LD viewer/validator and in rich-result previews that surface the description.
- **Recommendation:** Re-save `index.html` as UTF-8 without BOM and verify the em dash character renders correctly; check `src\data\seo.ts` for the same string if it's duplicated there (it currently is not — the `description` field only appears in the static fallback, not in `buildOrganizationSchema()`, which is itself part of Finding 1's inconsistency).

## Page-by-Page Summary

| Page | Blocks present | Types | Notes |
|---|---|---|---|
| `/` | 6 | MedicalBusiness×2 (conflicting, F1), Person, WebSite+SearchAction, FAQPage, HowTo (deprecated, F3) | No breadcrumbs (F5) |
| `/services` | 2 | MedicalBusiness×2 (conflicting, F1) | No breadcrumbs (F5); no Service-specific @id |
| `/booking` | 1 | MedicalBusiness (static fallback only) | No page-specific schema at all (F4); no breadcrumbs |
| `/blog` | 3 | MedicalBusiness (static), FAQPage, BreadcrumbList | Good breadcrumb pattern; no ItemList of posts |
| `/about` | 2 | MedicalBusiness (static), Person | No breadcrumbs (F5) |
| `/testimonials` | 2 | MedicalBusiness (static), CollectionPage | No Review/AggregateRating (F6); no breadcrumbs |
| `/contact` | 1 | MedicalBusiness (static fallback only) | No page-specific schema at all (F4); no breadcrumbs |
| 6× `/blog/<slug>` | 4 each | MedicalBusiness (static), Article, FAQPage, BreadcrumbList | Article.author dangling reference (F2); good breadcrumb pattern |

## Priority Fix Order

1. Finding 1 (duplicate `@id`) — fix `index.html` script `id` attribute + reconcile schema shape.
2. Finding 2 (dangling author reference) — add `Person` block to `BlogArticleView.vue`.
3. Finding 3 (deprecated `HowTo`) — delete from `HomeView.vue` / `seo.ts`.
4. Finding 4 (`/booking`, `/contact` schema-less) — add `Service` and `ContactPage` blocks.
5. Finding 5 (missing breadcrumbs) — wire `buildBreadcrumbSchema()` into remaining views.
6. Finding 6 (Review/AggregateRating) — add to `/testimonials`.
7. Findings 7–9 — low priority cleanup.
