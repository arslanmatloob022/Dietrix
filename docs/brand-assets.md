# Dietrix Fit brand assets

The Dietrix Fit identity uses a geometric `D` with a leaf/check counter. The production source is vector-based so the mark remains clear from favicon to app-icon sizes.

## Core files

- `public/brand/dietrix-fit-symbol.svg`: primary gradient symbol.
- `public/brand/dietrix-fit-symbol-solid.svg`: solid emerald symbol.
- `public/brand/dietrix-fit-symbol-dark.svg`: dark monochrome symbol.
- `public/brand/dietrix-fit-symbol-white.svg`: inverse symbol for dark surfaces.
- `public/brand/dietrix-fit-logo.svg`: primary horizontal lockup.
- `public/brand/dietrix-fit-logo-inverse.svg`: horizontal lockup for dark surfaces.
- `public/brand/dietrix-fit-logo-monochrome.svg`: single-color horizontal lockup.

The website renders the symbol through `src/components/ui/BrandMark.vue`. Navbar, footer, and assistant instances must use this component instead of duplicating SVG markup.

## Colors and usage

- Emerald: `#059669`
- Deep emerald: `#047857`
- Teal: `#0D9488`
- Ink: `#0E1E1B`
- Inverse: `#FFFFFF`

Keep clear space around the symbol equal to at least one quarter of its width. Do not rotate, stretch, recolor outside the approved variants, add effects inside the mark, or place the gradient version on a low-contrast background.

App icons use a white mark on the emerald-to-teal surface. Maskable assets retain extra safe space for circular and platform-specific crops. `public/brand/dietrix-fit-organization-logo-512.png` is the crawlable structured-data logo.

## Validation

After changing any brand source or metadata, rebuild and run:

```bash
pnpm build
pnpm verify:brand
pnpm verify:crawl-signals
```
