# Dietrix Fit Website

High-converting, SEO-focused personal branding and lead generation website for an online nutritionist practice.

## Stack

- Vue 3 + TypeScript
- Composition API
- Pinia for state management
- Vue Router with lazy-loaded routes
- Vite build tooling

## Features

- Conversion-first multi-page experience (Home, About, Services, Booking, Blog, Testimonials, Contact)
- Reusable component architecture
- Lead capture with validation, loading states, and error/success feedback
- Booking UI with date/time slot selection and payment-ready checkout section
- SEO-ready structure with semantic HTML, per-page metadata, and JSON-LD schema
- Floating chatbot assistant for instant service/pricing guidance + lead capture

## Project Structure

- src/components
- src/views
- src/stores
- src/services
- src/data
- src/router
- src/composables
- src/types

## Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

AWS/Nginx deployment and canonical URL verification are documented in
[`docs/aws-nginx-deployment.md`](docs/aws-nginx-deployment.md).

Logo variants, app icons, colors, and usage rules are documented in
[`docs/brand-assets.md`](docs/brand-assets.md).
