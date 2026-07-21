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

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.95", changefreq: "weekly" },
  { path: "/booking", priority: "0.9", changefreq: "weekly" },
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  { path: "/about", priority: "0.82", changefreq: "monthly" },
  { path: "/testimonials", priority: "0.82", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
];

const blogRoutes = blogSlugs.map((slug) => ({
  path: `/blog/${slug}`,
  priority: "0.78",
  changefreq: "monthly",
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
    <lastmod>${today}</lastmod>
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
