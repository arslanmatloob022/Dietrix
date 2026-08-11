import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");
const contentFile = resolve(root, "src/data/content.ts");
const siteUrl = "https://dietrix.fit";
const targetMarkets = [
  "Pakistan",
  "United Kingdom",
  "England",
  "United States",
  "Canada",
  "Germany",
  "France",
  "Saudi Arabia / KSA",
  "Dubai / UAE",
  "Australia",
  "World",
];
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Karachi",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const content = readFileSync(contentFile, "utf8");
const blogSlugs = [...content.matchAll(/slug:\s*'([^']+)'/g)].map(
  (match) => match[1],
);
const blogPublishDates = [...content.matchAll(/publishedAt:\s*'([^']+)'/g)].map(
  (match) => match[1],
);

// lastmod must track real content changes, not the build date — a sitemap
// that reports "today" for every URL on every build teaches Google to
// distrust the signal. Static pages fall back to their last git commit date.
function lastCommitDate(relativePath) {
  try {
    const date = execFileSync(
      "git",
      ["log", "-1", "--format=%ad", "--date=format:%Y-%m-%d", "--", relativePath],
      { cwd: root, encoding: "utf8" },
    ).trim();
    return date || today;
  } catch {
    return today;
  }
}

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: lastCommitDate("src/views/HomeView.vue") },
  { path: "/services", priority: "0.95", changefreq: "weekly", lastmod: lastCommitDate("src/views/ServicesView.vue") },
  { path: "/booking", priority: "0.9", changefreq: "weekly", lastmod: lastCommitDate("src/views/BookingView.vue") },
  { path: "/blog", priority: "0.9", changefreq: "weekly", lastmod: lastCommitDate("src/views/BlogView.vue") },
  { path: "/about", priority: "0.82", changefreq: "monthly", lastmod: lastCommitDate("src/views/AboutView.vue") },
  { path: "/testimonials", priority: "0.82", changefreq: "monthly", lastmod: lastCommitDate("src/views/TestimonialsView.vue") },
  { path: "/contact", priority: "0.8", changefreq: "monthly", lastmod: lastCommitDate("src/views/ContactView.vue") },
];

const blogRoutes = blogSlugs.map((slug, index) => ({
  path: `/blog/${slug}`,
  priority: "0.78",
  changefreq: "monthly",
  lastmod: blogPublishDates[index] ?? today,
}));

function absolute(path) {
  return new URL(path, siteUrl).toString();
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticRoutes, ...blogRoutes]
  .map(
    (route) => `  <url>
    <loc>${absolute(route.path)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${absolute("/sitemap.xml")}
`;

const llms = `# Dietrix Fit

Dietrix Fit is a global online nutrition platform led by Dn. Rimsha Naseer, Certified Clinical Nutritionist.

Primary URL: ${siteUrl}
Services: personalized diet plans, online nutrition consultations, weight loss coaching, PCOS diet support, diabetes meal planning, gut health nutrition, fitness nutrition, family meal planning.
Audience: worldwide clients, including ${targetMarkets.join(", ")}.

Important pages:
- Home: ${absolute("/")}
- Services and pricing: ${absolute("/services")}
- Booking: ${absolute("/booking")}
- About Rimsha Naseer: ${absolute("/about")}
- Blog: ${absolute("/blog")}
- Testimonials: ${absolute("/testimonials")}
- Contact: ${absolute("/contact")}

High-intent topics:
- online nutritionist consultation
- custom diet plan for weight loss
- diet plan for PCOS
- meal plan for diabetes
- affordable online nutritionist worldwide
- nutritionist online global

Target market keywords:
${targetMarkets
  .map(
    (market) =>
      `- online nutritionist ${market.replace(" / ", " ").replace("United States", "USA").replace("United Kingdom", "UK")}`,
  )
  .join("\n")}

Blog articles:
${blogSlugs.map((slug) => `- ${absolute(`/blog/${slug}`)}`).join("\n")}
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, "sitemap.xml"), sitemap);
writeFileSync(resolve(publicDir, "robots.txt"), robots);
writeFileSync(resolve(publicDir, "llms.txt"), llms);

console.log(
  `Generated ${blogRoutes.length + staticRoutes.length} sitemap URLs.`,
);
