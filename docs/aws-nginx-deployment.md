# AWS/Nginx deployment for canonical Dietrix URLs

The production URL policy is:

- `https://dietrix.fit/` for the home page.
- `https://dietrix.fit/<path>` for every other canonical page.
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
2. Confirm the certificate paths in the template. The certificate must cover both `dietrix.fit` and `www.dietrix.fit`.
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
curl -I 'https://dietrix.fit/testimonials'
curl -I 'https://dietrix.fit/testimonials/?seo_probe=1'
curl -I 'http://dietrix.fit/testimonials?seo_probe=1'
curl -I 'http://www.dietrix.fit/testimonials/?seo_probe=1'
curl -I 'https://www.dietrix.fit/testimonials?seo_probe=1'
curl -I 'https://dietrix.fit/a-page-that-does-not-exist'
curl -I 'https://dietrix.fit/blog/an-article-that-does-not-exist'
curl -I 'https://dietrix.fit/sitemap.xml'
```

Expected results:

- The first request returns `200`.
- The next four requests return `301` with exactly one canonical destination: `https://dietrix.fit/testimonials?seo_probe=1`.
- Both unknown URLs return `404`, not `200`, and include `X-Robots-Tag: noindex, follow`. Their HTML also contains the branded error view and a robots noindex meta tag.
- `/sitemap.xml` returns `301` to `https://dietrix.fit/sitemap_index.xml` — that path was retired after accumulating a failed-fetch history in Search Console; it must keep redirecting, not serve content again.

Then crawl every `<loc>` in `https://dietrix.fit/sitemap_index.xml`; each must return `200` without following a redirect and must expose the same URL in its canonical tag. Check `/testimonials` in Google Rich Results Test and Schema.org Validator. It should expose `CollectionPage`, with no Review Snippet item or review-related validation error.

After the live checks pass, in Search Console remove the old `https://dietrix.fit/sitemap.xml` submission and submit `https://dietrix.fit/sitemap_index.xml`, inspect `/testimonials`, and start validation for both historical Review Snippets issues. Old 301 crawl rows can remain until Google recrawls the affected URLs.
