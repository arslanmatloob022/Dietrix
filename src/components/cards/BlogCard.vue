<script setup lang="ts">
import type { BlogPost } from "../../types/models";

defineProps<{ post: BlogPost; featured?: boolean }>();
</script>

<template>
  <RouterLink
    :to="`/blog/${post.slug}`"
    class="blog-card glass-card reveal"
    :class="{ 'blog-card--featured': featured }"
  >
    <div class="img-wrap">
      <img
        :src="post.heroImage"
        :alt="`${post.title} nutrition guide by Dietrix Fit`"
        loading="lazy"
      />
      <div class="image-shade" aria-hidden="true"></div>
      <span class="category-badge">{{ post.category }}</span>
      <span class="read-badge">{{ post.readTime }}</span>
    </div>

    <div class="body">
      <div class="meta-row">
        <span>{{ post.publishedAt }}</span>
        <span>Evidence-led guide</span>
      </div>
      <h3>{{ post.title }}</h3>
      <p class="excerpt">{{ post.excerpt }}</p>

      <div class="insight-strip" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <span class="read-link">
        Read article
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7h8M8 4l3 3-3 3"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  </RouterLink>
</template>

<style>
.blog-card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  min-height: 100%;
  isolation: isolate;
  transform-style: preserve-3d;
}

.blog-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.84), rgba(236, 253, 245, 0.32)),
    linear-gradient(
      112deg,
      transparent 0%,
      rgba(255, 255, 255, 0.7) 42%,
      transparent 62%
    );
  background-size:
    100% 100%,
    230% 100%;
  background-position:
    0 0,
    -120% 0;
  transition: background-position 800ms ease;
}

.blog-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(90deg, rgba(16, 185, 129, 0.5), rgba(45, 212, 191, 0.28))
      top left / 100% 2px no-repeat,
    linear-gradient(180deg, rgba(255, 255, 255, 0.46), transparent 32%);
}

.blog-card:hover {
  transform: perspective(1200px) rotateX(2deg) rotateY(-2deg) translateY(-8px);
}

.blog-card:hover::before {
  background-position:
    0 0,
    120% 0;
}

.blog-card .img-wrap {
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 224px;
  flex-shrink: 0;
}

.blog-card.blog-card--featured .img-wrap {
  height: 320px;
}

.blog-card .img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.42) 44%,
    transparent 62%
  );
  transform: translateX(-108%);
  transition: transform 850ms ease;
}

.blog-card:hover .img-wrap::after {
  transform: translateX(108%);
}

.blog-card .img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 720ms cubic-bezier(0.25, 0.8, 0.25, 1),
    filter 720ms cubic-bezier(0.25, 0.8, 0.25, 1);
}

.blog-card:hover .img-wrap img {
  transform: scale(1.08);
  filter: saturate(1.08) contrast(1.04);
}

.blog-card .image-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(6, 78, 59, 0.58), transparent 58%),
    linear-gradient(135deg, rgba(16, 185, 129, 0.18), transparent 48%);
}

.blog-card .category-badge,
.blog-card .read-badge {
  position: absolute;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.blog-card .category-badge {
  top: 14px;
  left: 14px;
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(16, 185, 129, 0.24);
}

.blog-card .read-badge {
  right: 14px;
  bottom: 14px;
  color: white;
  background: rgba(6, 78, 59, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.26);
}

.blog-card .body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px 22px 24px;
  flex: 1;
}

.blog-card .meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--ink-400);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.blog-card h3 {
  font-size: 1.2rem;
  color: var(--ink-900);
  line-height: 1.32;
  flex: 1;
  letter-spacing: 0;
}

.blog-card.blog-card--featured h3 {
  font-size: 1.55rem;
}

.blog-card .excerpt {
  color: var(--ink-500);
  font-size: 0.94rem;
  line-height: 1.68;
}

.blog-card .insight-strip {
  display: grid;
  grid-template-columns: 1.1fr 0.7fr 0.45fr;
  gap: 6px;
  margin-top: 4px;
}

.blog-card .insight-strip span {
  height: 8px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.12);
}

.blog-card .insight-strip span:first-child {
  background: linear-gradient(90deg, var(--emerald-600), var(--teal-400));
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.32);
}

.blog-card .read-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--emerald-600);
  font-weight: 800;
  font-size: 0.9rem;
  margin-top: auto;
  transition: gap 220ms ease;
}

.blog-card:hover .read-link {
  gap: 10px;
}

@media (max-width: 680px) {
  .blog-card.blog-card--featured .img-wrap,
  .blog-card .img-wrap {
    height: 220px;
  }

  .blog-card.blog-card--featured h3,
  .blog-card h3 {
    font-size: 1.15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-card,
  .blog-card::before,
  .blog-card .img-wrap::after,
  .blog-card .img-wrap img {
    transition: none;
  }

  .blog-card:hover {
    transform: none;
  }
}
</style>
