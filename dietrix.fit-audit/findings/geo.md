# GEO (Generative Engine Optimization) Audit — dietrix.fit

**Audited by:** GEO specialist review of local repo (`D:\my sites\arr`) + built `dist/` output
**Date:** 2026-08-24
**Scope:** robots.txt, llms.txt, RSL licensing, JSON-LD schema, SSR/pre-render verification, passage-level citability of blog content, author/brand authority signals, FAQ schema coverage across 13 routes (`/`, `/services`, `/booking`, `/blog`, `/blog/{5 posts}`, `/about`, `/testimonials`, `/contact`).

## GEO Health Score: 57 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 55/100 | 13.75 |
| Structural Readability | 20% | 70/100 | 14.00 |
| Multi-Modal Content | 15% | 30/100 | 4.50 |
| Authority & Brand Signals | 20% | 40/100 | 8.00 |
| Technical Accessibility | 20% | 85/100 | 17.00 |
| **Total** | 100% | | **57.25 ≈ 57** |

## AI Crawler Access Status (robots.txt)

`public/robots.txt` (mirrored verbatim in `dist/robots.txt`):
```
User-agent: *
Allow: /

Sitemap: https://dietrix.fit/sitemap_index.xml
```

| Crawler | Status |
|---|---|
| GPTBot | Allowed (wildcard) |
| OAI-SearchBot | Allowed (wildcard) |
| ClaudeBot | Allowed (wildcard) |
| PerplexityBot | Allowed (wildcard) |
| Google-Extended | Allowed (wildcard) |
| CCBot / anthropic-ai / cohere-ai (training-only) | Allowed (wildcard) — no opt-out declared |

No crawler is specifically named or blocked; the blanket `Allow: /` covers all AI search bots, which is correct for maximizing citation eligibility. No disallowed paths at all (not even `/booking` form pages or admin routes, if any exist) — not a citability risk, just worth confirming intentional.

## llms.txt Status: Present, well-formed

`public/llms.txt` (also verified present in `dist/llms.txt`) includes site description, author name (Dn. Rimsha Naseer), primary URL, service list, target-market keywords, and links to all 6 blog posts. This is above-average llms.txt implementation for a small site.

## RSL 1.0 Licensing: Not present

No RSL (Really Simple Licensing) file or `<link rel="license">` was found anywhere in `public/` or page `<head>` output. Not currently a ranking blocker for AI citation, but as RSL adoption grows among crawlers this is a gap versus sites declaring reuse/training terms explicitly.

## Technical Accessibility: SSR confirmed, schema renders server-side

Confirmed via built `dist/` output (vite-ssg pre-render, not CSR):
- Article body text (e.g. "Morning protein intake increases satiety hormones...") is present in raw static HTML — no JS execution required to read content.
- 4 `application/ld+json` blocks render server-side on blog article pages (Article, FAQPage, BreadcrumbList, plus inherited).
- JSON-LD is emitted via `useHead` during SSR and via DOM upsert on client nav (`src/data/seo.ts`, `src/composables/useSeo.ts`) — consistent between first paint and hydration.

This is a genuine strength: AI crawlers that do not execute JavaScript (most currently) can read full content and structured data without a render step.

## Brand Mention & Authority Analysis

- **Author entity**: `Person` schema (`buildPersonSchema()` in `src/data/seo.ts`) names "Dn. Rimsha Naseer," jobTitle "Certified Clinical Nutritionist," and a `knowsAbout` list. Byline "By Dn. Rimsha Naseer" appears on every blog article. Credentials text exists on `/about` (M.Sc. Clinical Nutrition, Certified Diabetes Educator, PCOS & Hormonal Health Specialist, Sports Nutrition Foundation Credential).
- **`sameAs` links: absent.** Neither `Person` nor `MedicalBusiness` schema declares any `sameAs` array. Zero linkage to LinkedIn, Instagram, YouTube, or any external profile from structured data — this is the single biggest entity-authority gap found.
- **Footer social links are placeholders**, not brand profiles: `href="https://instagram.com"`, `href="https://linkedin.com"`, `href="https://youtube.com"` (`src/components/layout/AppFooter.vue`, lines ~29, 47, 65) — these point to the generic platform homepages, not `instagram.com/dietrixfit` or similar. Given YouTube presence is the single strongest brand-mention correlate with AI citation (~0.737) in the reference table, and this site has zero real YouTube footprint or embed, this is a high-value, currently-empty channel.
- No evidence of Wikipedia, Reddit, or third-party press/citation presence for the brand or the practitioner (expected for a young site, but worth flagging since these are high-correlation signals).
- `MedicalBusiness` schema appropriately omits address/phone with an explicit code comment explaining it's a remote-only practice — correct handling, not a NAP problem.
- No external citations/sources are linked from blog content (no references to clinical studies, guidelines, or third-party sources) — a real E-E-A-T weakness for YMYL (health) content, which both Google AI Overviews and ChatGPT weight heavily for medical/nutrition topics.

## FAQ Schema Coverage

`FAQPage` schema is implemented on:
- `/` (home) — 10 FAQs, `buildFaqSchema(faqs)`
- `/blog` (index) — reuses `globalSeoFaqs`
- `/blog/{slug}` (all 5 articles) — **but uses the same 3 generic questions/answers on every single article**, regardless of topic (verified in `src/views/BlogArticleView.vue`, `articleFaqs` computed property, lines 73–98: "Should I use this article as my full diet plan?", "When should I book...", "Can Dietrix Fit support clients outside Pakistan?"). None of the FAQ content is specific to PCOS, diabetes, gut health, breakfast, or Ramadan — the actual article topics.

**Not implemented** on `/services`, `/booking`, `/contact`, `/testimonials`, `/about` — `/services` in particular is a strong candidate (pricing/process questions like "How much does online nutrition coaching cost?", "How does the consultation work?") given it's the highest commercial-intent page.

## Passage-Level Citability (blog content)

Reviewed all 5 published articles in `src/data/content.ts`. Structure: each `BlogSection` has a heading + 2 short paragraphs.

- **Passage length is short of the optimal 134–167 word target.** Sample section ("Why Protein in the Morning Matters"): 2 paragraphs totaling ~65 words. Most sections across all 5 articles run 60–110 words — well under the citation sweet spot, meaning AI systems must stitch multiple sections together rather than lifting one self-contained, quotable block.
- **Headings are declarative, not question-based** ("Why Protein in the Morning Matters," "Start With Insulin Stability," "Build Your Emergency Nutrition Kit") rather than matching how users phrase queries ("How much protein should I eat for breakfast?", "What foods help with PCOS insulin resistance?"). Question-phrased H2/H3s materially improve match rate against AI Overview / Perplexity query-to-passage retrieval.
- **Specific, extractable numbers exist** — genuine strength: "25 to 35 grams of protein," "3 to 4 hours apart," "8 to 12 weeks," "60-minute weekly planning" — these are exactly the kind of concrete, quotable statistics AI answer engines prefer. However none carry source attribution (no "according to [study/guideline]"), which limits trust scoring for health claims.
- `dateModified` in `buildArticleSchema()` is hardcoded to always equal `post.publishedAt` (`src/data/seo.ts` line 548; confirmed `BlogPost` type in `src/types/models.ts` has no `updatedAt` field at all). Content can never signal freshness/revision even if genuinely updated — a negative for recency-sensitive AI ranking, particularly for health topics.

## Platform-Specific Visibility Estimates

(Directional, based on structural/schema analysis — no DataForSEO MCP tools were available in this environment for live ChatGPT/AIO scraping. Recommend running `ai_optimization_chat_gpt_scraper` / `ai_opt_llm_ment_search` separately for measured visibility.)

| Platform | Est. Score | Rationale |
|---|---|---|
| Google AI Overviews | ~60/100 | FAQPage + MedicalBusiness + Person schema on key pages helps; short passages and no citations cap upside |
| ChatGPT / OAI-SearchBot | ~45/100 | SSR content is fully crawlable, but near-zero external brand mentions (YouTube/Reddit/Wikipedia) hurts training + retrieval trust |
| Perplexity | ~50/100 | Rewards sourced statistics and freshness; both are weak here |
| Bing Copilot | ~48/100 | Similar to Google but leans more on backlink/E-E-A-T signals, which are thin for this domain |

## Findings

### 1. Placeholder social links reduce brand entity authority — High severity
**Description:** Footer social icons link to `https://instagram.com`, `https://linkedin.com`, and `https://youtube.com` (generic platform homepages) rather than the brand's actual profiles (`src/components/layout/AppFooter.vue`). No `sameAs` array exists in either `Person` or `MedicalBusiness` JSON-LD schema. YouTube presence has the strongest documented correlation (~0.737) with AI citation among the brand-signal factors reviewed, and this site has effectively none.
**Recommendation:** Replace placeholder hrefs with real, active brand profile URLs (or remove the icons until real profiles exist). Add a `sameAs` array to `buildPersonSchema()` and `buildOrganizationSchema()` in `src/data/seo.ts` listing verified LinkedIn/Instagram/YouTube profiles. If a YouTube channel doesn't exist yet, prioritize creating one — even short-form nutrition content — given its outsized correlation with AI citation.

### 2. Blog article FAQ schema is identical/generic across all 5 posts — Medium-High severity
**Description:** `articleFaqs` in `src/views/BlogArticleView.vue` (lines 73–98) hardcodes the same 3 questions and answers on every article regardless of topic (breakfast, PCOS, weekly planning, diabetes, gut health, Ramadan). None reference the article's actual subject matter.
**Recommendation:** Replace with 3–5 topic-specific FAQs per article (e.g., for the PCOS post: "What foods should I avoid with PCOS insulin resistance?"). Add an `articleFaqs` field per post in `content.ts` rather than a single computed function, so each article's FAQPage schema reflects genuinely distinct, citable Q&A pairs — this both improves AI Overview eligibility and avoids duplicate-content signals across near-identical FAQPage markup on 5+ pages.

### 3. Passage length below optimal AI-citation range; declarative (non-question) headings — Medium severity
**Description:** Blog sections average ~60–110 words per section against the 134–167 word optimum for AI-citable passages. Headings are topic labels ("Start With Insulin Stability") rather than natural-language questions matching search/prompt phrasing.
**Recommendation:** For each `BlogSection`, expand to one self-contained 130–170 word answer block that states the direct answer in the first 1–2 sentences, then supports it. Convert at least the primary H2 in each section to a question form where it maps to a real search/prompt intent (e.g., "What Should I Eat for Breakfast to Support Fat Loss?"). This is a content-authoring change to `src/data/content.ts`, not a code change.

### 4. Health claims and statistics lack source attribution — Medium severity
**Description:** Specific figures ("25 to 35 grams of protein," "8 to 12 weeks," insulin/PCOS claims) appear without citations to clinical guidelines, studies, or authoritative bodies. This is a YMYL (health) content category where AI systems (especially Google AI Overviews and Perplexity) weight sourcing heavily for trust/citation eligibility.
**Recommendation:** Add inline source references (e.g., "per ADA guidelines," "per [study/journal]") for quantitative or clinical claims in each article. Even 1–2 attributed sources per post would materially strengthen E-E-A-T signal for medical nutrition content.

### 5. `dateModified` can never differ from `datePublished`; no FAQ schema on `/services` — Low-Medium severity
**Description:** `buildArticleSchema()` sets `dateModified: post.publishedAt` (`src/data/seo.ts` line 548), and `BlogPost` has no `updatedAt` field in `src/types/models.ts`, so freshness can never be signaled even after genuine content updates. Separately, `/services` — the highest commercial-intent page — has no `FAQPage` schema despite being a natural fit for pricing/process questions.
**Recommendation:** Add an optional `updatedAt` field to `BlogPost` and wire it into `dateModified` (falling back to `publishedAt` when unset). Add a small services-specific FAQ block (5–6 Q&As on cost, process, turnaround, international eligibility) with `buildFaqSchema()` on `ServicesView.vue`, mirroring the pattern already used on `HomeView.vue`.

## Top 5 Highest-Impact Changes (prioritized)

| # | Change | Impact | Effort |
|---|---|---|---|
| 1 | Fix placeholder social links + add `sameAs` schema (Finding 1) | High | Low (config/content edit) |
| 2 | Write topic-specific FAQ content per blog post (Finding 2) | High | Medium (content authoring, ~5 posts) |
| 3 | Expand blog sections to 130–170 word self-contained answer blocks with question-form headings (Finding 3) | High | Medium-High (content rewrite) |
| 4 | Add sourced citations to clinical/nutrition claims (Finding 4) | Medium-High | Medium (research + content edit) |
| 5 | Add FAQ schema to `/services`; wire real `dateModified` (Finding 5) | Medium | Low (schema + small type change) |

## Notable Strengths (for context)
- Confirmed SSR/pre-rendered output (vite-ssg) — no JS-execution barrier for AI crawlers.
- robots.txt allows all AI crawlers via wildcard; no accidental blocks found.
- `llms.txt` present and unusually complete for a small site.
- Layered JSON-LD (`MedicalBusiness`, `Person`, `WebSite`, `HowTo`, `FAQPage`, `BreadcrumbList`, `Article`) already implemented across most pages via a clean shared builder module (`src/data/seo.ts`).
- Byline with named, credentialed author on every article — correct baseline pattern for YMYL content, just needs the sourcing/entity-linking layers above it.
