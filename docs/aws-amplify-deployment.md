# AWS Amplify Hosting deployment (current)

As of this writing, **AWS Amplify Hosting is the production target** for
dietrixfit.com, replacing the earlier self-managed EC2 + nginx setup
described in [`aws-nginx-deployment.md`](./aws-nginx-deployment.md) (kept
for history only — its routing logic is what got translated into the
rules below, but nginx itself is no longer in the serving path).

## Why `/sitemap.xml` (and any clean-URL page) 404s by default

Amplify auto-detects this project as a "Single Page App" on first connect
and adds a default catch-all rewrite rule (something like
`</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json|webmanifest)$)([^.]+$)/>`
→ `/index.html` with status `200`). Amplify only applies rewrite rules
when the requested path isn't found among the deployed build artifacts —
but two things go wrong here for this specific project:

1. This site is **pre-rendered per route** by `vite-ssg` (`dist/about/index.html`,
   `dist/services/index.html`, etc.), not a runtime SPA. A clean URL like
   `/about` has no literal file at that exact path (`dist/about` is a
   directory, not a file, only `about/index.html` exists) — so it always
   misses and falls into whatever rewrite rule matches, unless a rule
   explicitly maps it to `about/index.html`.
2. The default extension-exclusion regex above does **not** exclude `.xml`
   — so if `sitemap.xml` ever does come up as a miss (e.g. a stale/failed
   build where it wasn't actually generated), the default rule masks that
   miss as a `200` and serves `index.html` instead of a real 404, and the
   Vue app then renders its own `NotFoundView` for the unmatched client
   route — which is the exact branded "Page Not Found" page you saw.

Either way, the fix is the same: replace the default rule with an
explicit table that mirrors the nginx/Netlify routing policy this project
already uses elsewhere.

## Rewrites and redirects

In the Amplify Console: **App settings → Rewrites and redirects** → delete
the auto-added default rule → add the rules in
[`aws-amplify-rewrites-and-redirects.json`](./aws-amplify-rewrites-and-redirects.json),
**in the order given** (first match wins, and the trailing-slash 301s must
come before the no-slash 200 rewrites, with the `/<*>` → `/404/index.html`
catch-all last). Amplify's UI lets you add rules one at a time, or use
"Open text editor" to paste the array directly.

This will not touch `sitemap.xml`, `robots.txt`, `llms.txt`,
`manifest.webmanifest`, `sitemap.xsl`, `favicon.svg`, or anything under
`/assets/` — those are literal files in the build output and Amplify
serves them directly without ever reaching the rules table, **provided
they actually exist in the deployed artifact**. If `/sitemap.xml` still
404s after this change, the rules aren't the problem — the build didn't
produce it. Check the Amplify build log for the `prebuild` step
(`generate-seo-assets.mjs`, which writes `public/sitemap.xml` before
`vite-ssg build` copies `public/` into `dist/`).

## Build settings

A committed [`amplify.yml`](../amplify.yml) now pins the build to pnpm
(matching the `packageManager` field in `package.json`) and sets
`baseDirectory: dist`. Amplify prefers a repo-committed `amplify.yml` over
whatever it auto-detected, so this takes effect on the next build/push —
no console build-settings edit needed. If Amplify's console still shows
its own auto-detected spec after the next deploy, override it manually
with the same content.

## Custom domain (dietrixfit.com)

1. **App settings → Domain management → Add domain** → `dietrixfit.com`.
   Follow Amplify's DNS verification (CNAME/TXT records at your registrar
   or Route 53). Amplify provisions and renews the ACM certificate for you
   — no manual certbot/Let's Encrypt step like the old nginx setup needed.
2. Add `www.dietrixfit.com` as a subdomain in the same domain entry and
   set it to redirect to the apex, if Amplify's domain management UI
   offers that toggle for this domain (it does for the `www` ↔ apex pair
   on the same registered domain).
3. **The retired `dietrix.fit` → `dietrixfit.com` redirect needs a
   decision.** Amplify's per-app rewrite rules apply uniformly to every
   domain attached to that app — there's no per-domain condition — so
   simply adding `dietrix.fit` as a second domain on this same Amplify app
   would *serve* the site there too, not redirect it. To keep the
   permanent-redirect behavior the nginx config had:
   - Keep `dietrix.fit`'s DNS pointed at whatever can still run the
     redirect-only nginx server blocks from `deploy/nginx/dietrix.conf`
     (the HTTP catch-all + the `dietrix.fit`/`www.dietrix.fit` HTTPS
     block) — it doesn't need the app's `dist/` content at all, just
     those two blocks, so a minimal box (or even a tiny separate
     always-on instance) is enough; **or**
   - Point `dietrix.fit`'s DNS at a dedicated redirect mechanism outside
     Amplify (e.g. Route 53 + CloudFront redirect, or your DNS provider's
     own page-rule/redirect feature, if it has one) that 301s everything
     to the equivalent `dietrixfit.com` URL.
   Confirm which option fits your current infra before decommissioning
   the EC2 box entirely — don't drop `dietrix.fit`'s certificate/redirect
   until its replacement is live, or that domain starts erroring instead
   of redirecting.

## Verifying after a deploy

Same checks as the old EC2 doc, just against Amplify now:

```bash
curl -I 'https://dietrixfit.com/sitemap.xml'      # 200, no redirect
curl -I 'https://dietrixfit.com/about/'           # 301 -> /about
curl -I 'https://dietrixfit.com/about'            # 200
curl -I 'https://dietrixfit.com/no-such-page'     # 404, branded body
curl -I 'https://dietrix.fit/'                    # 301 -> https://dietrixfit.com/
```
