# Dietrix Fit — Content Quality Audit (Sept 2025 QRG)

Site: https://dietrix.fit (Vue 3 + vite-ssg, pre-rendered)
Niche: Online nutrition/weight-loss coaching (health/YMYL-adjacent)
Source reviewed: `src/views/*.vue`, `src/data/content.ts`, `src/data/seo.ts`, `src/data/pageSeo.ts`, `src/data/site.ts`, `src/composables/useSeo.ts`, `src/components/layout/AppFooter.vue`
Pages audited: 13/13 sitemap URLs

## Overall Content Quality Score: 58 / 100

The site has an unusually strong **technical** SEO/content scaffolding for a small coaching practice (clean single-H1 heading hierarchy, JSON-LD Person/MedicalBusiness/Article/FAQ/HowTo/Breadcrumb schema, per-page canonical + OG/Twitter meta, a sitewide medical disclaimer, and a named, credentialed practitioner used consistently across every page). That pulls the score up. It is held down by real E-E-A-T/trust gaps that matter a lot in a YMYL-adjacent niche: stock photography used to depict the named practitioner and "real" client testimonials, zero citations to clinical/medical sources anywhere in health-advice content, thin blog articles relative to their claimed read time, verbatim-duplicated FAQ blocks across all six articles, self-duplicated paragraphs within each article, and several fake/placeholder trust signals (generic social links, unverifiable "4.9/5" rating, non-functional payment badge, malformed WhatsApp links).

### E-E-A-T Breakdown

| Factor | Weight | Score | Notes |
|---|---|---|---|
| Experience | 20% | 55/100 | Transformation stats and testimonials exist, but every "client" and the practitioner's own photo are stock imagery; no first-person practitioner voice (video, real session photos, personal anecdotes) in blog content |
| Expertise | 25% | 68/100 | Named credentialed nutritionist (M.Sc. Clinical Nutrition, CDE, PCOS Specialist) consistently represented via Person schema and bio copy; undermined by zero outbound citations to clinical/medical sources in any health-advice article and no verifiable license/registration number |
| Authoritativeness | 25% | 45/100 | No external recognition, press, backlinks, or guest-publication signals; social profile links are generic homepages (not the practice's real accounts); no third-party review platform (Google/Trustpilot) backing the claimed "4.9/5" rating |
| Trustworthiness | 30% | 58/100 | Sitewide disclaimer and a "results vary" note are present (good); undercut by stock-photo impersonation of the named expert/testimonials, unverifiable rating claims, a decorative non-functional "Stripe/Razorpay" payment badge, and malformed WhatsApp contact links |

**Weighted score: ≈57/100**, rounded to **58/100** given the technical/structural strengths noted above.

---

## What Works (Sitewide)

- Single, clear `<h1>` per page; consistent `<h2>`/`<h3>` hierarchy via a shared `SectionTitle` component — no heading-structure violations found anywhere in the 13 pages.
- A real named practitioner (Dn. Rimsha Naseer, Certified Clinical Nutritionist, M.Sc. Clinical Nutrition, CDE, PCOS & Hormonal Health Specialist) is consistently attributed across Home, About, Booking, Services, Contact, and every blog byline — good for topical authorship consistency.
- `Person`, `MedicalBusiness`, `WebSite`, `Article`, `FAQPage`, `HowTo`, and `BreadcrumbList` JSON-LD schema are implemented and wired per page (`src/data/seo.ts`, `src/composables/useSeo.ts`) — strong AI-citation/structured-data readiness.
- Sitewide footer disclaimer: "Evidence-based nutrition coaching. Not a substitute for medical advice." plus a testimonials-page note that "Results are representative client outcomes. Individual results vary…" — genuine attempt at YMYL disclaiming.
- The `MedicalBusiness` schema deliberately omits a fake street address/phone rather than filling placeholder NAP data for a remote-only practice — a thoughtful trust decision (see code comment in `seo.ts`).
- Keyword targeting is broad but generally natural in body copy (no obvious keyword stuffing in reader-facing prose); the aggressive geo-keyword lists live mostly in `<meta>`/schema and the `/blog` keyword-map section rather than crammed into sentences.
- Blog articles use a genuinely useful structure for AI-citation: numbered sections, sticky "Article Map" TOC, explicit "Key Takeaways," and FAQ blocks with extractable Q&A pairs.

---

## Per-Page Breakdown

### 1. Home (`/`) — `src/views/HomeView.vue`
- **Word count:** ~1,200–1,400 words of unique body copy (hero, features, bowl section, services, process, specialities, expert bio excerpt, transformations, testimonials, FAQ, blog teasers). Comfortably clears the 500-word homepage floor.
- **E-E-A-T:** Names the practitioner, certifications, and stats (6.8 kg avg. loss, 89% retention, 92% marker improvement) but none of these figures are sourced/footnoted anywhere on the page or site (no methodology, no "based on X clients over Y period" citation).
- **Headings:** 1×H1, well-formed H2/H3 cascade via `SectionTitle` and card components.
- **Keyword targeting:** Natural; "online nutritionist," "weight loss," "PCOS," "diabetes" appear organically, not stuffed.
- **AI-citation readiness:** Good — FAQ schema + HowTo schema (3-step process) give assistants clean extractable answers.
- **Findings:** Unsourced outcome statistics (see sitewide finding); hero/testimonial imagery is stock photography (see sitewide finding).

### 2. Services (`/services`) — `src/views/ServicesView.vue`
- **Word count:** ~900–1,000 words. Clears the 800-word service-page floor.
- **E-E-A-T:** Clear service breakdown (3 programs), pricing transparency, comparison table — good clarity for conversion and for AI answer extraction ("what's included in each plan").
- **Headings:** Clean H1 → H2 → H3.
- **Keyword targeting:** Heavy geo-keyword list in `pageSeo.services.keywords` (10+ country variants: "diet plan Pakistan," "diet plan UK," "diet plan Dubai," etc.) is confined to meta description/keywords, not stuffed into visible copy — acceptable, though the meta description itself reads as a keyword list ("Compare online diet plans for Pakistan, UK, USA, Canada, Germany, France, KSA, Dubai, and Australia…") rather than a natural sentence.
- **AI-citation readiness:** Good — pathway cards and comparison table are structured, extractable data.
- **Findings:** No pricing currency/region disclosure beyond "$"; no refund/cancellation policy visible anywhere on the page (trust gap for a paid health-adjacent service).

### 3. Booking (`/booking`) — `src/views/BookingView.vue`
- **Word count:** ~700–800 words of copy plus a live form (word count is secondary here since this is a transactional/conversion page).
- **E-E-A-T / Trust:** Contains a **second, non-overlapping set of two testimonials** (Sarah M./Toronto, Rahul K./Dubai) hardcoded directly in this view — these do not exist in `src/data/content.ts`'s canonical `testimonials` array used everywhere else. This is an internal content inconsistency and, combined with stock imagery elsewhere, compounds the fabricated-testimonial risk.
- **Trust:** A "Secure payment ready — Stripe / Razorpay" button exists in the booking form but is non-functional decoration (no real payment integration wired in `bookingService.ts` beyond a mock submit) — a false trust signal.
- **Headings:** Clean H1/H2 structure.
- **AI-citation readiness:** Weak — this page is mostly form UI with limited standalone factual content; fine for its purpose but not designed to be cited.

### 4. Blog Index (`/blog`) — `src/views/BlogView.vue`
- **Word count:** ~1,300–1,500 words, but a large share of this is **internal SEO planning content published as if it were reader content**: a raw "Keyword Mapping" section listing target keywords → destination URLs, and a "Next 50+ Article Pipeline" section listing 50+ unpublished topic titles. Neither serves a site visitor; both read as exposed programmatic-SEO scaffolding rather than genuine content, which is exactly the kind of low-value/scaled-content pattern the Sept 2025 QRG update flags.
- **E-E-A-T:** No author/editorial-team bio for the blog as a whole beyond linking to individual article bylines.
- **Headings:** Clean.
- **AI-citation readiness:** The `globalSeoFaqs` FAQ block (10 Q&As) is genuinely useful and well-structured for snippet/AI extraction — but FAQPage rich-result eligibility on Google is now restricted to government/health-authority sites, so this schema will likely not render as a rich result even though it's well-formed.
- **Findings:** Publicly exposed keyword map + article pipeline (see dedicated finding below).

### 5. About (`/about`) — `src/views/AboutView.vue`
- **Word count:** ~900–1,000 words. This is the site's primary E-E-A-T page.
- **E-E-A-T:** Strongest bio content on the site — mission, philosophy, 4-step method, 4 certifications, 4 specialty tracks, 9+ years experience, 14+ countries served. However: (a) the profile photo is a stock Unsplash image (`photo-1559839734-2b71ea197ec2`) captioned as "Rimsha Naseer certified online nutritionist" — presenting a stock model as the real named practitioner is a serious authenticity/trust issue for a YMYL health site; (b) no verifiable credential detail (issuing institution, license/registration number, year certified, LinkedIn/verifiable profile) for any of the 4 listed certifications; (c) "M.Sc. Clinical Nutrition" does not state the institution.
- **Headings:** Clean H1 → H2 → H3.
- **AI-citation readiness:** Good factual density (years of experience, specialties, care model) that assistants could extract, but unverifiable claims reduce reliability.

### 6. Testimonials (`/testimonials`) — `src/views/TestimonialsView.vue`
- **Word count:** ~850–950 words.
- **E-E-A-T:** Includes a good disclaimer ("Results are representative client outcomes. Individual results vary…") and a `CollectionPage` schema. However all 6 testimonial photos (Hannah K., Karim D., Sofia R., Ayesha M., Emily W., Omar S.) are stock Unsplash photos of unrelated stock models, and the page markets a "4.9/5 — Verified Review Pulse" rating that is not backed by any linked third-party review platform (no Google Business Profile, Trustpilot, or similar link/widget anywhere on the site).
- **Headings:** Clean.
- **AI-citation readiness:** Structured outcome data (before/after metrics) is extractable but not independently verifiable.

### 7. Contact (`/contact`) — `src/views/ContactView.vue`
- **Word count:** ~500–600 words. Meets the 500–600 location/contact-page floor.
- **Trust:** Real email (`rimshanaseer101@gmail.com` — a personal Gmail address rather than a business domain email, itself a minor trust signal for a "clinical practice"); WhatsApp link is malformed (`https://wa.me/+92 0300 7626555` — contains spaces and a `+`/leading-zero combination that breaks the wa.me deep-link format, so the "Chat on WhatsApp" CTA and footer WhatsApp link are likely broken or unreliable in production); Instagram handle is unique to the brand but LinkedIn link points to the generic `linkedin.com` homepage, not a company or personal profile.
- **Headings:** Clean.
- **Findings:** Broken/malformed WhatsApp deep links (hero CTA + footer, appears twice).

### 8–13. Blog Articles (6 posts) — `src/views/BlogArticleView.vue` + `src/data/content.ts`
Slugs: `best-high-protein-breakfast-for-fat-loss`, `pcos-diet-plan-basics-that-actually-work`, `simple-weekly-diet-planning-for-busy-professionals`, `diabetes-friendly-plate-method-for-busy-families`, `gut-health-meal-rhythm-for-bloating-relief`, `ramadan-nutrition-plan-for-energy-and-fat-loss`.

- **Word count:** Each article has exactly 5 sections × 2 short paragraphs (~25–40 words each) = roughly **400–650 words of actual body copy** per article. This is well below the skill's 1,500-word blog-post floor, and — more importantly for reader trust — well below what each post's own `readTime` metadata claims (6–9 minutes implies ~1,500–2,250 words at average reading speed). The mismatch between stated read time and actual content length is a concrete, checkable inconsistency.
- **E-E-A-T (this is where YMYL risk concentrates):**
  - Byline is plain text ("By Dn. Rimsha Naseer · Category · Read time") with **no link to the About/credentials page** from the byline itself — a missed, easy E-E-A-T win.
  - **Zero citations** to any clinical or scientific source in any article, despite making specific medical/physiological claims: insulin resistance and PCOS (`pcos-diet-plan-basics...`), HbA1c and diabetes carbohydrate guidance (`diabetes-friendly-plate-method...`), gut symptom red flags including "blood in stool" (`gut-health-meal-rhythm...`). No outbound link to a health authority (NIH, ADA, NHS, PubMed, etc.) anywhere.
  - No visible "medically reviewed by" / clinical-review byline or review date at the article level — only the sitewide footer disclaimer, which is not co-located with the specific medical claims.
  - `dateModified` in the `Article` schema is hardcoded equal to `datePublished` for every post (`buildArticleSchema` in `src/data/seo.ts`) — the site cannot claim any article has ever been reviewed or refreshed since publication, a negative freshness signal for YMYL content.
- **Duplication (major, structural, affects all 6 posts identically):**
  - The **exact same 3 generic FAQs** are hardcoded in `BlogArticleView.vue`'s `articleFaqs` computed property and injected — verbatim, with only the slug-based ID changing — into every single article regardless of topic: "Should I use this article as my full diet plan?", "When should I book an online nutrition consultation?", "Can Dietrix Fit support clients outside Pakistan?" A reader/AI crawler on the PCOS article and the Ramadan article gets the identical FAQ block; the "outside Pakistan" question is irrelevant to several of the topics. This is templated near-duplicate content across 6 indexed URLs.
  - **Within a single article**, the first paragraph of each of the 5 sections is repeated three times on the same page: once in the main body, once (verbatim, via `keyTakeaways`) in the sidebar "Key Takeaways" list, and a third time (again via `keyTakeaways[index].detail`) inside the "Practical nutrition cue" action-note box under that same section. This inflates the page without adding unique content and dilutes on-page keyword/topical signal.
- **Headings:** Good hierarchy — H1 (title) → H2 (section heading) → H3 (subheading, where present).
- **AI-citation readiness:** Structurally strong (numbered sections, anchor-linked TOC, FAQ schema, Article schema with author/publisher `@id` references) — but the thinness and lack of sourced facts limits what a citing assistant can actually extract with confidence for a health topic.
- **Content clusters:** Topically the 6 posts are non-overlapping (breakfast, PCOS, weekly planning, diabetes, gut health, Ramadan) — no duplicate topical coverage between articles themselves, which is good.

---

## Findings List

| # | Title | Severity | Description | Recommendation |
|---|---|---|---|---|
| 1 | Stock photography used to depict the named practitioner and client testimonials | High | The About/Home hero photo captioned "Rimsha Naseer certified online nutritionist" and all 6 testimonial headshots on Testimonials/Home are Unsplash stock photography of unrelated models, not real people. For a named, credentialed health professional this is a significant authenticity/trust risk — if identified by a user or regulator it undermines every other trust signal on the site (YMYL). | Replace with a real photo of the practitioner and, ideally, real client photos with consent (or clearly illustrative/avatar imagery that doesn't imply a specific real person). At minimum, stop captioning stock photos with the real practitioner's full name. |
| 2 | Zero clinical/medical citations in YMYL health content | High | None of the 6 blog articles (covering PCOS/insulin resistance, diabetes/HbA1c, gut health red-flag symptoms) link to or cite any medical/scientific authority (NIH, ADA, NHS, PubMed, peer-reviewed journals). This is the single largest E-E-A-T gap for a health-adjacent niche under the Sept 2025 QRG. | Add at least 1–2 outbound citations to reputable medical/nutrition sources per article near specific physiological claims (insulin, HbA1c, symptom red flags). |
| 3 | Duplicate FAQ block hardcoded verbatim across all 6 blog articles | Medium-High | `BlogArticleView.vue`'s `articleFaqs` computed property returns the same 3 questions/answers for every article regardless of topic (only the ID prefix changes). Creates near-duplicate content across 6 indexed URLs and irrelevant FAQ answers on-topic (e.g., "outside Pakistan" FAQ on a gut-health or breakfast article). | Write 2–3 topic-specific FAQs per article instead of reusing a global template; keep the 3 global questions only as a small shared block if needed, clearly separated from topic FAQs. |
| 4 | Self-duplicated content within each blog article | Medium | Each section's first paragraph is repeated 3 times on the same page: main body → sidebar "Key Takeaways" → "Practical nutrition cue" action-note box (all sourced from the same string in `keyTakeaways`). Inflates apparent length without adding unique value and reads as templated/AI-stitched. | Write distinct, shorter takeaway/action-note copy instead of re-rendering the section's first paragraph; or drop one of the three repeated presentations. |
| 5 | Blog posts are thin relative to both the content-minimum floor and their own stated read time | Medium-High | Each of the 6 articles has ~400–650 words of actual body copy (5 sections × 2 short paragraphs), well under the skill's 1,500-word blog floor and inconsistent with the displayed `readTime` of 6–9 minutes (which implies ~1,500–2,250 words). | Either expand each article's topical coverage substantially (more sections, deeper explanation, examples, sourced data) to genuinely earn a 6–9 min read time, or correct the displayed read-time estimate to match actual content length. |
| 6 | No "medically reviewed by" / clinical review signal or real content-refresh cycle on health articles | Medium | Only a small sitewide footer disclaimer exists; no article-level review byline, review date, or "last medically reviewed" signal. `buildArticleSchema()` hardcodes `dateModified = datePublished` for every post, meaning schema can never signal that content was reviewed/updated post-publication. | Add a per-article "Reviewed by Dn. Rimsha Naseer, [credential], on [date]" line near the top, and update `dateModified` whenever content is actually revised. |
| 7 | Internal SEO planning artifacts published as visible page content on `/blog` | Medium | The "Keyword Mapping" table (target keyword → destination URL) and "Next 50+ Article Pipeline" list (50+ unpublished topic titles) on the public `/blog` page expose raw programmatic-SEO scaffolding to visitors and crawlers. This adds no reader value and reads as scaled/low-effort content generation, a pattern the Sept 2025 QRG specifically flags. | Remove both sections from the public page (move to internal docs/roadmap), or convert them into genuinely useful reader-facing content (e.g., a real topic index of published articles only). |
| 8 | Unverifiable "4.9/5" rating and "Verified Review Pulse" claim | Medium | Testimonials and Contact pages both display a "4.9/5" average and label it "Verified Review Pulse" / "client experience," but no third-party review platform (Google Business Profile, Trustpilot, Facebook reviews) is linked or embedded anywhere on the site to substantiate it. | Either link to/embed a real third-party review source, or soften the language (e.g., "based on internal client feedback surveys") and remove "Verified." |
| 9 | Booking page contains a separate, non-canonical testimonial pair not present in the shared testimonials dataset | Low-Medium | `BookingView.vue` hardcodes 2 testimonials (Sarah M., Rahul K.) that do not exist in `src/data/content.ts`'s `testimonials` array used by Home/Testimonials. Creates inconsistent client-story data across the site and, combined with Finding #1, compounds concern about testimonial authenticity. | Pull testimonials from the single shared `content.ts` array everywhere, or clearly source/attribute the booking-page pair if they are genuinely distinct real clients. |
| 10 | Non-functional "Secure payment ready — Stripe / Razorpay" button on Booking | Low-Medium | The booking form displays a payment-readiness badge referencing Stripe/Razorpay, but `bookingService.ts` only performs a mock submission — no real payment processor is integrated. This is a false trust/functionality signal to a user about to pay for a health service. | Remove the payment badge until real payment integration exists, or clearly label it as "coming soon." |
| 11 | Malformed WhatsApp deep links (Contact hero, Contact channel card, Footer) | Low | Links use `https://wa.me/+92 0300 7626555`, which contains spaces and a `+`/leading-zero combination inconsistent with the wa.me URL format (should be a plain digit string with country code, no `+`, no spaces, no leading 0 after country code). Likely breaks the "Chat on WhatsApp" CTA in some browsers/OS combinations. | Fix to the correct format, e.g. `https://wa.me/923007626555`. |
| 12 | Generic/placeholder social profile links reduce Authoritativeness signal | Low | Footer LinkedIn and YouTube links point to the generic `linkedin.com` / `youtube.com` homepages rather than the practice's actual profiles; Contact page's LinkedIn channel link does the same. | Link to real, brand-specific social profiles, or remove the icons/channels until real accounts exist. |
| 13 | Credentials listed without issuing institution or verification detail | Low | "M.Sc. Clinical Nutrition," "Certified Diabetes Educator," "PCOS & Hormonal Health Specialist," "Sports Nutrition Foundation Credential" are listed on Home/About with no issuing body, year, or verifiable license/registration number. | Add issuing institution/body and (where applicable) a license or certificate ID for each credential to strengthen Expertise signals. |
| 14 | Unsourced outcome statistics repeated sitewide | Low | "6.8 kg avg. 12-week fat loss," "89% retention," "92% improved blood markers," "1,800+ clients," "14+ countries" appear on Home, About, Services, Testimonials, and Contact with no methodology, sample size, or date range disclosed anywhere. | Add a footnote/methodology note (e.g., "based on N clients tracked between [dates]") at least once, linked from wherever the stats appear. |
| 15 | Personal Gmail address used as the sole business contact email | Low | `rimshanaseer101@gmail.com` is used across Contact, Footer, and schema (`contactEmail`) as the only email channel for a "clinical" practice. | Use a branded domain email (e.g., `hello@dietrix.fit`) to reinforce professionalism/trust; keep Gmail as a fallback if desired. |

---

## Score Summary

- **Overall Content Quality Score: 58/100**
- **Experience: 55/100** | **Expertise: 68/100** | **Authoritativeness: 45/100** | **Trustworthiness: 58/100**
- **Highest-scoring pages:** Services (~72/100 equivalent), About (~65/100 equivalent) — clear structure, real bio depth.
- **Lowest-scoring pages:** The 6 blog articles (~48/100 equivalent each) — thin content, duplicated FAQs/takeaways, no citations, undermines the site's biggest content-quality opportunity (organic search + AI citation for health queries).
