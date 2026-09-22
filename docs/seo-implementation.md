# Dietrix Fit SEO Implementation

This file summarizes the implemented SEO foundation for `dietrixfit.com`.

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

## Domain migration (dietrix.fit -> dietrixfit.com)

The canonical domain is now `dietrixfit.com`. The previous domain,
`dietrix.fit`, permanently 301-redirects every URL to its equivalent on
the new domain (both `netlify.toml` and `deploy/nginx/dietrix.conf`) —
this preserves indexing/authority instead of starting from zero. A new
Search Console property must be verified for `dietrixfit.com`; the old
property's verification token does not carry over and was removed from
`index.html` rather than left pointing at the wrong domain.

## Sitemap URL

The canonical sitemap is `https://dietrixfit.com/sitemap.xml`. It briefly
lived at `/sitemap_index.xml` on the old `dietrix.fit` domain (2026-08-13
through the domain migration) to shed a "Couldn't fetch" history in
Search Console from a hosting outage. Since the domain migration is
itself a clean slate in Search Console, the sitemap has been restored to
the conventional `/sitemap.xml` path.

## Next Off-Site SEO Work

- Verify a new Search Console property for `dietrixfit.com`, submit
  `https://dietrixfit.com/sitemap.xml`, and use "Change of Address" in the
  old `dietrix.fit` property's settings to signal the migration directly.
- Register Google Business Profile when a public business address or service-area profile is ready.
- Build backlinks from health blogs, fitness websites, women health directories, and nutrition guest posts.
- Turn testimonials into shareable case studies and infographics.
