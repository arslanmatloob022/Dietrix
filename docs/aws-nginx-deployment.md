# AWS/Nginx deployment for canonical Dietrix URLs

The production domain is **dietrixfit.com**. The previous domain,
`dietrix.fit`, is retired and permanently 301-redirects every URL to its
equivalent on dietrixfit.com — see the "Domain migration" section below.

The production URL policy is:

- `https://dietrixfit.com/` for the home page.
- `https://dietrixfit.com/<path>` for every other canonical page.
- HTTP, `www`, and trailing-slash variants receive one permanent redirect.
- A known SSG path is served from its nested `index.html` with status `200`.
- An unknown path receives the branded `404` document with status `404` and `noindex, follow`.

The reproducible Nginx template is [`deploy/nginx/dietrix.conf`](../deploy/nginx/dietrix.conf).

## Build and pre-deployment checks

Use the package manager pinned by the repository:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm verify:crawl-signals
```

The verifier checks every sitemap URL against its generated SSG document and canonical tag. It also checks internal links, the testimonials `CollectionPage`, the absence of review markup, the pre-rendered noindex 404, and the required Nginx routing directives.

## Install the Nginx site

1. Upload the complete `dist/` directory to `/var/www/dietrix/dist` on the EC2 instance. If a different release path is used, update `root` in the template.
2. Confirm the certificate paths in the template:
   - The canonical certificate must cover both `dietrixfit.com` and `www.dietrixfit.com`.
   - The retired-domain certificate (`dietrix.fit` / `www.dietrix.fit`) must stay valid and on its existing auto-renewal — an HTTPS redirect still needs a successful TLS handshake against the domain being redirected *from*, so letting this certificate expire breaks the redirect with a certificate error before nginx ever gets to run the redirect rule.
3. Back up the current site configuration, then copy the template into `/etc/nginx/sites-available/dietrix.conf` and enable it from `/etc/nginx/sites-enabled/`.
4. Validate before every reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Do not reload Nginx when `nginx -t` reports an error. Retain the previous configuration and release directory until live checks pass so rollback is immediate.

## Live routing checks

Run these after deployment. The query probe must remain in every `Location` header.

```bash
curl -I 'https://dietrixfit.com/testimonials'
curl -I 'https://dietrixfit.com/testimonials/?seo_probe=1'
curl -I 'http://dietrixfit.com/testimonials?seo_probe=1'
curl -I 'http://www.dietrixfit.com/testimonials/?seo_probe=1'
curl -I 'https://www.dietrixfit.com/testimonials?seo_probe=1'
curl -I 'https://dietrixfit.com/a-page-that-does-not-exist'
curl -I 'https://dietrixfit.com/blog/an-article-that-does-not-exist'
curl -I 'https://dietrixfit.com/sitemap.xml'
```

Expected results:

- The first request returns `200`.
- The next four requests return `301` with exactly one canonical destination: `https://dietrixfit.com/testimonials?seo_probe=1`.
- Both unknown URLs return `404`, not `200`, and include `X-Robots-Tag: noindex, follow`. Their HTML also contains the branded error view and a robots noindex meta tag.
- `/sitemap.xml` returns `200` directly, `Content-Type: application/xml` (or `text/xml`), no redirect.

Then crawl every `<loc>` in `https://dietrixfit.com/sitemap.xml`; each must return `200` without following a redirect and must expose the same URL in its canonical tag. Check `/testimonials` in Google Rich Results Test and Schema.org Validator. It should expose `CollectionPage`, with no Review Snippet item or review-related validation error.

## Domain migration checks (dietrix.fit -> dietrixfit.com)

```bash
curl -I 'https://dietrix.fit/'
curl -I 'https://dietrix.fit/testimonials'
curl -I 'https://www.dietrix.fit/testimonials'
curl -I 'http://dietrix.fit/testimonials'
```

Expected: every one of these returns `301` to the equivalent `https://dietrixfit.com/...` URL, never a `200` and never a certificate error. A certificate error here means the old domain's TLS certificate has expired — renew it, since the redirect depends on it.

## Search Console

1. Create and verify a new Search Console property for `dietrixfit.com` (the old `dietrix.fit` property's verification token does not carry over — `index.html`'s old token was removed for exactly this reason).
2. Set `VITE_GOOGLE_SITE_VERIFICATION` to the new token in the build environment; `src/composables/useSeo.ts` injects it automatically, no further code change needed.
3. Submit `https://dietrixfit.com/sitemap.xml` in the new property.
4. In the old `dietrix.fit` property (if still accessible), use "Change of Address" under Settings to tell Google about the migration directly, in addition to the 301s already in place — this is the officially supported migration signal and speeds up authority transfer beyond what redirects alone provide.
