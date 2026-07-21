import { existsSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const publicDir = resolve(root, "public");
const distDir = resolve(root, "dist");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function pngSize(file) {
  const data = readFileSync(file);
  const signature = "89504e470d0a1a0a";
  check(data.subarray(0, 8).toString("hex") === signature, `${file} is not a valid PNG`);
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}

const rasterAssets = new Map([
  ["favicon-16x16.png", [16, 16]],
  ["favicon-32x32.png", [32, 32]],
  ["favicon-48x48.png", [48, 48]],
  ["apple-touch-icon.png", [180, 180]],
  ["brand/dietrix-fit-icon-192.png", [192, 192]],
  ["brand/dietrix-fit-icon-512.png", [512, 512]],
  ["brand/dietrix-fit-maskable-192.png", [192, 192]],
  ["brand/dietrix-fit-maskable-512.png", [512, 512]],
  ["brand/dietrix-fit-organization-logo-512.png", [512, 512]],
]);

for (const [asset, [expectedWidth, expectedHeight]] of rasterAssets) {
  const file = resolve(publicDir, asset);
  check(existsSync(file), `Missing brand asset: public/${asset}`);
  if (!existsSync(file)) continue;
  const { width, height } = pngSize(file);
  check(
    width === expectedWidth && height === expectedHeight,
    `Wrong dimensions for public/${asset}: ${width}x${height}`,
  );
}

const svgAssets = [
  "favicon.svg",
  "brand/dietrix-fit-symbol.svg",
  "brand/dietrix-fit-symbol-solid.svg",
  "brand/dietrix-fit-symbol-dark.svg",
  "brand/dietrix-fit-symbol-white.svg",
  "brand/dietrix-fit-logo.svg",
  "brand/dietrix-fit-logo-inverse.svg",
  "brand/dietrix-fit-logo-monochrome.svg",
];

for (const asset of svgAssets) {
  const file = resolve(publicDir, asset);
  check(existsSync(file), `Missing vector brand asset: public/${asset}`);
  if (!existsSync(file)) continue;
  const svg = readFileSync(file, "utf8");
  check(/<svg\b/.test(svg) && /viewBox=/.test(svg), `Invalid SVG source: public/${asset}`);
  check(!/#863bff|#7e14ff|#47bfff/i.test(svg), `Old purple favicon palette remains in ${asset}`);
}

const icoFile = resolve(publicDir, "favicon.ico");
check(existsSync(icoFile), "Missing legacy public/favicon.ico");
if (existsSync(icoFile)) {
  const ico = readFileSync(icoFile);
  check(ico.length > 6 && ico.readUInt16LE(2) === 1, "public/favicon.ico is invalid");
}

const manifestFile = resolve(publicDir, "manifest.webmanifest");
check(existsSync(manifestFile), "Missing public/manifest.webmanifest");
if (existsSync(manifestFile)) {
  const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
  check(manifest.name === "Dietrix Fit", "Manifest name is not Dietrix Fit");
  check(manifest.short_name === "Dietrix", "Manifest short_name is not Dietrix");
  check(manifest.display === "standalone", "Manifest display mode is not standalone");
  check(
    manifest.icons?.some((icon) => icon.sizes === "512x512" && icon.purpose === "any"),
    "Manifest has no standard 512px icon",
  );
  check(
    manifest.icons?.some((icon) => icon.sizes === "512x512" && icon.purpose === "maskable"),
    "Manifest has no maskable 512px icon",
  );
  for (const icon of manifest.icons ?? []) {
    check(existsSync(resolve(publicDir, `.${icon.src}`)), `Manifest icon is missing: ${icon.src}`);
  }
}

const generatedHome = resolve(distDir, "index.html");
check(existsSync(generatedHome), "dist/index.html is missing; run the production build first");
if (existsSync(generatedHome)) {
  const html = readFileSync(generatedHome, "utf8");
  for (const required of [
    "/favicon.svg",
    "/favicon-32x32.png",
    "/apple-touch-icon.png",
    "/manifest.webmanifest",
    "/brand/dietrix-fit-organization-logo-512.png",
  ]) {
    check(html.includes(required), `Generated home page does not reference ${required}`);
  }
  check(!html.includes("Dietrix Nutrition"), "Generated home page still contains Dietrix Nutrition");
}

for (const relativeFile of [
  "index.html",
  "src/data/site.ts",
  "src/data/content.ts",
  "src/components/layout/AppNavbar.vue",
  "src/components/layout/AppFooter.vue",
  "src/components/layout/FloatingChatbot.vue",
]) {
  const file = resolve(root, relativeFile);
  const source = readFileSync(file, "utf8");
  check(!source.includes("Dietrix Nutrition"), `${relativeFile} still contains Dietrix Nutrition`);
  if ([".html", ".ts", ".vue"].includes(extname(file))) {
    check(!/#863bff|#7e14ff|#47bfff/i.test(source), `${relativeFile} still contains the old favicon palette`);
  }
}

if (failures.length) {
  console.error(`Brand verification failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Dietrix Fit brand assets and metadata passed verification.");
