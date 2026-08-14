# Dietrix Fit SEO Implementation

This file summarizes the implemented SEO foundation for `dietrix.fit`.

## Page Meta Map

| Page | URL | Primary Intent |
| --- | --- | --- |
| Home | `/` | online nutritionist consultation, global custom diet plans |
| About | `/about` | Rimsha Naseer nutritionist, certified clinical nutritionist |
| Services | `/services` | custom diet plans, weight loss, PCOS, diabetes, fitness nutrition |
| Booking | `/booking` | book online nutrition consultation |
| Blog | `/blog` | nutrition blog, weight loss, PCOS, meal planning |
| Testimonials | `/testimonials` | nutritionist reviews and client results |
| Contact | `/contact` | contact online nutritionist, WhatsApp nutrition support |

The source of truth is `src/data/seo.ts`.

## Target Countries

Dietrix Fit now explicitly targets remote clients in:

- Pakistan
- United Kingdom
- England
- United States
- Canada
- Germany
- France
- Saudi Arabia / KSA
- Dubai / UAE
- Australia

## Keyword Mapping

High-intent keywords now map to page destinations:

| Keyword | Page |
| --- | --- |
| online nutritionist consultation | `/booking` |
| custom diet plan for weight loss | `/services` |
| nutritionist online global | `/` |
| diet plan for PCOS | `/blog/pcos-diet-plan-basics-that-actually-work` |
| how to lose weight fast safely | `/blog/best-high-protein-breakfast-for-fat-loss` |
| meal plan for diabetes | `/blog/diabetes-friendly-plate-method-for-busy-families` |
| best diet plan for working women at home | `/blog/simple-weekly-diet-planning-for-busy-professionals` |
| affordable online nutritionist worldwide | `/services` |
| online nutritionist USA | `/` |
| diet plan UK clients | `/services` |
| online nutritionist Canada | `/booking` |
| online nutritionist UAE | `/contact` |
| online nutritionist Germany | `/contact` |
| online nutritionist France | `/contact` |
| online nutritionist KSA | `/booking` |
| online nutritionist Dubai | `/booking` |
| online nutritionist Australia | `/booking` |
| online diet plan England | `/services` |

## Content Engine

Implemented content clusters:

| Cluster | Pillar |
| --- | --- |
| Weight loss | `/services` |
| Women health | `/blog/pcos-diet-plan-basics-that-actually-work` |
| Fitness nutrition | `/services` |
| Meal planning | `/blog/simple-weekly-diet-planning-for-busy-professionals` |

`src/data/seo.ts` contains a 50+ topic pipeline for future articles.

## Schema Markup

Implemented schema helpers:

- Organization and MedicalBusiness schema
- Person schema for Dn. Rimsha Naseer
- WebSite schema
- FAQPage schema
- Article schema
- BreadcrumbList schema
- CollectionPage schema on testimonials, with no first-party Review or AggregateRating markup

## Technical SEO

Generated assets:

- `public/sitemap_index.xml` (canonical sitemap; the old `/sitemap.xml` is
  permanently redirected — see "Sitemap URL" below)
- `public/robots.txt`
- `public/llms.txt`

The `prebuild` script regenerates SEO assets before production builds.

AWS/Nginx canonical routing, real-404 behavior, deployment steps, and live checks are documented in `docs/aws-nginx-deployment.md`.

## Tracking

Environment-ready integrations:

- `VITE_GA_ID` injects Google Analytics
- `VITE_GOOGLE_SITE_VERIFICATION` injects Google Search Console verification

## Sitemap URL

The canonical sitemap is `https://dietrix.fit/sitemap_index.xml`. It was
renamed from `/sitemap.xml` on 2026-08-13 after that URL accumulated weeks
of "Couldn't fetch" history in Search Console during a hosting outage —
Google re-verifies a previously-failing URL on a slower schedule than a
fresh one. `/sitemap.xml` now 301-redirects to the new URL (both
`netlify.toml` and `deploy/nginx/dietrix.conf`); it should stay retired
rather than reused for a future sitemap.

## Next Off-Site SEO Work

- In Search Console, remove the old `https://dietrix.fit/sitemap.xml`
  submission and submit `https://dietrix.fit/sitemap_index.xml` instead.
- Register Google Business Profile when a public business address or service-area profile is ready.
- Build backlinks from health blogs, fitness websites, women health directories, and nutrition guest posts.
- Turn testimonials into shareable case studies and infographics.
