import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const distDir = resolve(root, "dist");
const sitemapFile = resolve(distDir, "sitemap_index.xml");
const nginxFile = resolve(root, "deploy/nginx/dietrix.conf");
const canonicalOrigin = "https://dietrix.fit";

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return match?.[1];
}

function outputFileFor(pathname) {
  return pathname === "/"
    ? resolve(distDir, "index.html")
    : resolve(distDir, `.${pathname}/index.html`);
}

function canonicalFrom(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonicalTag = tags.find((tag) => attribute(tag, "rel") === "canonical");
  return canonicalTag ? attribute(canonicalTag, "href") : undefined;
}

function jsonLdFrom(html, file) {
  const blocks = [];
  const expression = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(expression)) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (error) {
      failures.push(`Invalid JSON-LD in ${file}: ${error.message}`);
    }
  }

  return blocks;
}

function walk(value, visit) {
  if (Array.isArray(value)) {
    value.forEach((entry) => walk(entry, visit));
    return;
  }

  if (!value || typeof value !== "object") return;
  visit(value);
  Object.values(value).forEach((entry) => walk(entry, visit));
}

check(existsSync(sitemapFile), "dist/sitemap_index.xml is missing; run the production build first");
check(existsSync(nginxFile), "deploy/nginx/dietrix.conf is missing");

if (existsSync(sitemapFile)) {
  const sitemap = readFileSync(sitemapFile, "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const sitemapPaths = new Set(urls.map((url) => new URL(url).pathname));

  check(urls.length > 0, "The sitemap contains no URLs");

  for (const urlString of urls) {
    const url = new URL(urlString);
    const file = outputFileFor(url.pathname);

    check(url.origin === canonicalOrigin, `Noncanonical sitemap origin: ${urlString}`);
    check(
      url.pathname === "/" || !url.pathname.endsWith("/"),
      `Trailing-slash sitemap URL: ${urlString}`,
    );
    check(existsSync(file), `No generated SSG document for ${urlString}: ${file}`);

    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    check(canonicalFrom(html) === urlString, `Canonical mismatch in ${file}`);

    for (const tag of html.match(/<a\b[^>]*href=["'][^"']+["'][^>]*>/gi) ?? []) {
      const href = attribute(tag, "href");
      if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) continue;

      let target;
      try {
        target = new URL(href, urlString);
      } catch {
        failures.push(`Invalid link in ${file}: ${href}`);
        continue;
      }

      if (target.origin !== canonicalOrigin) {
        if (/^https?:\/\/(www\.)?dietrix\.fit/i.test(href)) {
          failures.push(`Internal link uses a noncanonical origin in ${file}: ${href}`);
        }
        continue;
      }

      check(
        target.pathname === "/" || !target.pathname.endsWith("/"),
        `Internal link immediately redirects in ${file}: ${href}`,
      );
      check(
        sitemapPaths.has(target.pathname),
        `Internal link has no sitemap/generated target in ${file}: ${href}`,
      );
    }
  }

  const testimonialsFile = outputFileFor("/testimonials");
  if (existsSync(testimonialsFile)) {
    const html = readFileSync(testimonialsFile, "utf8");
    const blocks = jsonLdFrom(html, testimonialsFile);
    let collectionPage;

    for (const block of blocks) {
      walk(block, (entry) => {
        const types = Array.isArray(entry["@type"]) ? entry["@type"] : [entry["@type"]];
        if (types.includes("CollectionPage")) collectionPage = entry;

        check(!types.includes("Review"), "Testimonials JSON-LD still contains a Review object");
        check(
          !types.includes("AggregateRating"),
          "Testimonials JSON-LD still contains an AggregateRating object",
        );
        check(!("review" in entry), "Testimonials JSON-LD still contains a review property");
        check(
          !("reviewRating" in entry),
          "Testimonials JSON-LD still contains a reviewRating property",
        );
        check(
          !("aggregateRating" in entry),
          "Testimonials JSON-LD still contains an aggregateRating property",
        );
      });
    }

    check(Boolean(collectionPage), "Testimonials JSON-LD has no CollectionPage object");
    if (collectionPage) {
      check(
        collectionPage.url === `${canonicalOrigin}/testimonials`,
        "CollectionPage.url is not the canonical testimonials URL",
      );
      check(
        collectionPage["@id"] === `${canonicalOrigin}/testimonials#collection`,
        "CollectionPage @id is not stable",
      );
      check(
        collectionPage.isPartOf?.["@id"] === `${canonicalOrigin}/#website`,
        "CollectionPage.isPartOf does not reference the website entity",
      );
      check(
        collectionPage.about?.["@id"] === `${canonicalOrigin}/#organization`,
        "CollectionPage.about does not reference the organization entity",
      );
    }
  }
}

const notFoundFile = resolve(distDir, "404/index.html");
check(existsSync(notFoundFile), "The pre-rendered dist/404/index.html document is missing");
if (existsSync(notFoundFile)) {
  const html = readFileSync(notFoundFile, "utf8");
  const robotsTag = (html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i) ?? [])[0];
  check(
    robotsTag && /noindex\s*,\s*follow/i.test(attribute(robotsTag, "content") ?? ""),
    "The pre-rendered 404 document is not noindex, follow",
  );
}

if (existsSync(nginxFile)) {
  const nginx = readFileSync(nginxFile, "utf8");
  check(
    nginx.includes("try_files $uri/index.html $uri =404;"),
    "Nginx does not serve nested SSG documents before directories",
  );
  check(
    nginx.includes("error_page 404 /404/index.html;"),
    "Nginx does not use the branded 404 document",
  );
  check(
    !/try_files[^;]*\/index\.html\s*;/m.test(nginx),
    "Nginx still contains an SPA-style /index.html fallback",
  );
}

if (failures.length) {
  console.error(`Crawl-signal verification failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Crawl-signal verification passed.");
