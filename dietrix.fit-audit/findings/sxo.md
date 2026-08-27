# Search Experience Optimization (SXO) Audit — dietrix.fit

**Date:** 2026-08-24
**Scope:** Home (/), /services, /booking, /about, /testimonials, /contact, /blog, and 6 blog posts (breakfast, PCOS, weekly-planning, diabetes, gut-health, ramadan)
**Method:** render_page.py (raw + rendered) + parse_html.py against each URL; Google SERP research for 6 representative target queries; classification via `page-type-taxonomy.md`; user stories via `user-story-framework.md`; persona scoring via `persona-scoring.md`.

> **SXO Gap Score is separate from the SEO Health Score.** It measures whether page type, depth, and trust signals match what Google is currently rewarding in the SERP — not on-page technical SEO.

## SXO Gap Score: 50 / 100 (Needs Work)

| Dimension | Score | Rationale |
|---|---|---|
| Page Type Match | 7/15 | Homepage/booking are reasonably-aligned Hybrid Service+Content pages; blog posts frequently mismatch the *format* Google rewards for their query (listicle vs. guide) |
| Content Depth | 5/15 | All 6 blog posts are 495–677 words; SERP leaders for the same queries run 1,000–1,700+ words with numbered lists, PDFs, or clinical citations |
| UX Signals | 9/15 | Clear CTAs, breadcrumbs, FAQ accordions, consistent nav — but no interactive tool, quiz, or downloadable resource anywhere on the site |
| Schema | 11/15 | Strong: MedicalBusiness, Person, Article, FAQPage, HowTo, BreadcrumbList present. Gap: no Review/AggregateRating schema on /testimonials despite 9+ testimonials; no MedicalWebPage/citation markup on YMYL posts |
| Media | 5/15 | 100% generic Unsplash stock photography; zero original photos, diagrams, or video. YMYL/diet-plan competitors use plate diagrams, infographics, and expert video |
| Authority (E-E-A-T) | 5/15 | Single named practitioner ("Certified Clinical Nutritionist") with no stated certifying body, registration/license number, or academic institution; no medical reviewer byline; no citations to clinical literature (ADA, PCOS guidelines) on any post |
| Freshness | 8/10 | All content dated Jan–Apr 2026, datePublished/dateModified present in schema |

---

## Lead Finding: Page-Type & Format Mismatches Suppressing Rankings

### 1. Blog posts use "framework/guide" format where the SERP rewards "listicle" format
**Severity: CRITICAL**
**Pages:** `/blog/best-high-protein-breakfast-for-fat-loss` (primary), `/blog/simple-weekly-diet-planning-for-busy-professionals` (secondary)

For **"high protein breakfast for weight loss"**, the top 10 is dominated by numbered-idea listicles: GoodRx "14 High-Protein Breakfast Ideas," Colorado State University Extension "17 dietitian-approved high-protein breakfast ideas," Greens & Proteins "High-Protein Breakfast Ideas... Best Options." These pages each deliver 14–17 distinct, named breakfast items with quantities and macros.

Dietrix's page, despite a title that reads like a listicle ("Best High-Protein Breakfast Ideas for Sustainable Fat Loss"), is structured as a 677-word conceptual guide (H2s: "Why Protein in the Morning Matters," "Build a Balanced Plate," "Common Mistakes to Avoid," "High-Protein Breakfast Templates" — which contains only **one** H3, "Use the 3-part formula," not a list of named ideas). A searcher scanning for "give me 10 breakfasts" lands on a framework instead and bounces.

The same pattern (5 conceptual H2 sections, no numbered list) recurs in the weekly-planning post, competing against "6 Meal Planning Tips," "11 Meal Prepping Tips" style listicles.

**Recommendation:** Rebuild the breakfast post (and weekly-planning post) as a true numbered listicle: 12–15 named, photographed breakfast items, each with protein grams, prep time, and a one-line rationale, wrapped in the existing framework content as intro/outro. Add `ItemList` schema. This is a content-format rewrite, not a rewording.

### 2. YMYL condition posts (PCOS, diabetes) are format-aligned but critically under-authored vs. medical-institution competitors
**Severity: HIGH**
**Pages:** `/blog/pcos-diet-plan-basics-that-actually-work` (601 words), `/blog/diabetes-friendly-plate-method-for-busy-families` (544 words)

SERP for **"PCOS diet plan"** is dominated by Mass General Brigham, Brown University Health, Johns Hopkins Medicine, and dietitian sites offering free downloadable meal-plan PDFs (Kirsten Oddy Nutrition, Health Loft). SERP for **"diabetic plate method diet"** is dominated almost entirely by ADA (diabetes.org), Kaiser Permanente, GoodRx, and a university extension office — each with visual plate diagrams and citations to clinical guidance.

Dietrix's posts match the *blog/guide* page type correctly (Article schema, FAQPage, breadcrumb all present) but at ~550-600 words cannot compete on depth, and carry none of the specific E-E-A-T signals Google rewards for medical-adjacent content: no certifying-body name or license number for the author, no "medically reviewed by," no citation to ADA/clinical literature, no plate/insulin diagrams (only decorative stock photos). This is a trust/depth gap layered on top of correct page type — the content type is right, the substance is not.

**Recommendation:** Expand each YMYL post to 1,200+ words, add a visual plate/insulin diagram (not stock photography), cite at least 2–3 authoritative sources (ADA, PubMed, NIH), and add a visible "Reviewed by [Name], [Credential + license/registration number]" line near the byline. Add a downloadable PDF (3-day PCOS plan / diabetes plate guide) as a lead magnet — this format appears in nearly every top-10 competitor for both queries.

### 3. /services reads as a thin marketing page, not a true Service page with proof
**Severity: HIGH**

/services (675 words, **0 images**, 2 schema blocks) lists three packages with price ($119–$189) — good, this satisfies the taxonomy's "clear pricing" requirement — but has no case studies, no before/after tied to a specific package, no team/credential section, and no visual differentiation between the three tiers (zero images on the entire page). Competitors ranking for adjacent pricing/comparison queries ("how much does nutrition coaching cost") are informational guides that transparently break down what's included at each price point; Dietrix's tier descriptions are one sentence each with no "what's included" breakdown (sessions per month, check-in cadence, plan revisions, cancellation policy).

**Recommendation:** Add a comparison table (features x tier), one client outcome/case study per package, and package-specific imagery. Add Service-page requirement `AggregateRating` or `Review` schema pulled from testimonials to reinforce the pricing decision on this page specifically.

### 4. /about lacks the explicit credential signals YMYL searchers and Google reward
**Severity: MEDIUM**

/about states "Certified Clinical Nutritionist · 9+ years Experience" but never names the certifying body, a registration/license number, or the academic institution — compare to competitor SERP language like "Registered Dietitian," "covered by insurance" (implying licensure verification), and Johns Hopkins/Mass General's institutional authority. For PCOS/diabetes searchers in a "skeptical, trust-seeking" emotional state (see Persona Scoring below), this is the single biggest omission on the page.

**Recommendation:** Add explicit credential line (issuing body + registration number if applicable), a short "why you can trust this advice" block, and link out to the certifying body's verification page if one exists.

### 5. /testimonials has no Review/AggregateRating schema
**Severity: MEDIUM**

9 testimonials, 894 words, `CollectionPage` schema present — but no `Review` or `AggregateRating` markup, so none of this social proof is eligible for star-rating rich snippets in the SERP, unlike marketplace competitors (Nourish, Top Nutrition Coaching) that typically carry aggregate ratings.

**Recommendation:** Add `Review` schema per testimonial and `AggregateRating` on the organization/service schema blocks already present on the homepage and /services.

### 6. No interactive tool or downloadable resource anywhere on the site
**Severity: MEDIUM**

Every condition-specific SERP researched (PCOS, diabetes) surfaced at least one competitor offering a free downloadable meal plan, quiz, or interactive plate builder. Dietrix's only "interactive" element is the booking calendar. This is a Hybrid-page requirement gap (taxonomy: "educational content mixed with CTAs... learn more / get started side by side") — the site is CTA-heavy but has no low-commitment educational tool to capture top-of-funnel, skeptical searchers before they're ready to book a paid consultation.

**Recommendation:** Build one lead-magnet tool (e.g., "PCOS Plate Builder" or downloadable 3-day PCOS/diabetes starter plan gated behind email) and link it from both the relevant blog posts and /services.

### 7. US/UK insurance-coverage expectation is unaddressed
**Severity: LOW**

For "online nutritionist for weight loss," nearly every top-10 US result (Nourish, Culina Health, Top Nutrition Coaching, Berry Street, WeightWatchers) leads with "covered by insurance" / "$0 out-of-pocket." Dietrix is a global cash-pay practice and cannot compete on this axis for US-only queries — this is not fixable by content changes, but the homepage/FAQ should proactively address "why no insurance" and lean harder into its actual differentiator (global/diaspora reach, South Asian meal culture) rather than competing head-on with US insurance-based platforms for the same generic query.

**Recommendation:** De-prioritize generic "online nutritionist for weight loss" as a primary keyword target for a Pakistan-based cash-pay practice; reallocate to differentiated long-tail (e.g., "online nutritionist for Pakistani diet plan," "PCOS diet plan roti rice biryani") where Dietrix's FAQ content already shows relevant signal but no dedicated landing/blog page exists yet.

---

## User Stories (derived from SERP signals)

1. **As a newly-diagnosed PCOS searcher**, I want a medically credible starting framework, **because** I'm scared and don't know who to trust, **but I'm blocked by** the absence of visible medical credentials or citations on Dietrix's PCOS post.
   *(Source: SERP dominance of Johns Hopkins/Mass General/Brown Health for "PCOS diet plan"; emotional state = skeptical per user-story-framework.md)*

2. **As a parent managing a family member's diabetes**, I want a simple visual plate diagram I can put on the fridge, **because** I need something my whole family can follow without recalculating carbs daily, **but I'm blocked by** Dietrix's diabetes post having no diagram — only stock photography and prose.
   *(Source: ADA/Kaiser/university-extension plate-diagram format dominating "diabetic plate method diet")*

3. **As a busy professional scanning for breakfast ideas**, I want a scannable list of 10+ concrete options I can pick from tonight, **because** I have 5 minutes between meetings, **but I'm blocked by** Dietrix's breakfast post being a conceptual framework instead of a list.
   *(Source: GoodRx "14 ideas," CSU "17 ideas" listicle dominance for "high protein breakfast for weight loss")*

4. **As a price-comparing prospect**, I want to see exactly what's included at each price tier before booking a call, **because** I don't want a surprise sales pitch, **but I'm blocked by** /services' one-sentence tier descriptions and lack of a comparison table.
   *(Source: "how much does nutrition coaching cost" guide content dominance, all of which itemize what's included at each price band)*

5. **As a diaspora client wanting culturally-relevant meals** (roti, rice, biryani), I want proof this coach understands my food culture, **because** generic Western diet advice doesn't fit my kitchen, **but I'm blocked by** this content existing only as two FAQ answers on /blog, with no dedicated page or post to rank for it.
   *(Source: homepage FAQPage schema already contains "Can a Pakistani diet plan include roti, rice, curry, and biryani?" — evidence of latent demand with no content depth behind it)*

---

## Persona Scoring

| Persona | Journey Stage | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Newly-diagnosed PCOS searcher (trust-seeking) | Awareness/Consideration | 18/25 | 16/25 | 8/25 | 14/25 | 56/100 | Needs Work |
| Diabetes family cook (needs visual clarity) | Consideration | 17/25 | 12/25 | 9/25 | 14/25 | 52/100 | Needs Work |
| Busy professional wanting quick breakfast ideas | Awareness | 10/25 | 8/25 | 14/25 | 12/25 | 44/100 | Needs Work |
| Price-comparing prospect | Decision | 15/25 | 14/25 | 13/25 | 16/25 | 58/100 | Needs Work |
| Diaspora client seeking culturally-relevant plan | Consideration/Decision | 12/25 | 10/25 | 15/25 | 15/25 | 52/100 | Needs Work |
| US insurance-expecting searcher | Awareness | 6/25 | 10/25 | 12/25 | 10/25 | 38/100 | Critical Mismatch |

**Weakest persona:** US insurance-expecting searcher (38/100). Top issue: page never addresses insurance/coverage expectations set by the dominant SERP competitors for generic US queries. Recommended fix: do not chase this query cluster; instead build content and title tags around Dietrix's actual differentiator (global/diaspora, cash-pay flexibility) rather than competing against insurance-backed platforms.

**Systemic issue across all personas:** Trust dimension is the lowest-scoring dimension site-wide (avg. ~11.8/25) — driven by missing credential specifics, no medical reviewer, no citations, and no Review/AggregateRating schema. Fixing Finding #4 (about page credentials) and #5 (review schema) would lift every persona's Trust score simultaneously.

**Priority actions (weakest-first):**
1. Fix Trust systemic gap: name the certifying body + license/registration number on /about and add "medically reviewed" bylines to PCOS/diabetes posts (Findings #2, #4).
2. Rebuild breakfast post as a true listicle to serve the largest-volume awareness-stage persona (Finding #1).
3. Build a diaspora-specific PCOS/diet page to capture the latent, currently-unserved demand visible in existing FAQ schema (Finding #7 / User Story 5).

---

## Limitations

- SERP analysis is based on Google web search results returned via the WebSearch tool on 2026-08-24 (US-region results); true rank position, PAA box contents, AI Overview presence, and ad density could not be directly observed/screenshotted, so SERP feature counts are inferred from result composition rather than a live browser SERP capture.
- Backlink/authority profile (Domain Rating, referring domains) was not assessed — the Authority score is based solely on on-page E-E-A-T signals.
- No Pakistan/UK/Middle East-region SERP variants were checked; only global/US-leaning queries were used given the tool's search region.
- gut-health and Ramadan blog posts were parsed for structure/word count but not run through full SERP comparison; findings for those two are extrapolated from the identical templated structure shared with the analyzed posts (same H2 pattern, same word-count range, same FAQ block).
- Core Web Vitals / actual rendered visual layout (above-the-fold screenshot) were not captured; UX Signals scoring is based on DOM/HTML structure only.
