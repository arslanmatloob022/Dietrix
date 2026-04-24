<script setup lang="ts">
import type { BlogPost } from "../../types/models";

defineProps<{ post: BlogPost }>();
</script>

<template>
  <RouterLink :to="`/blog/${post.slug}`" class="blog-card glass-card reveal">
    <div class="img-wrap">
      <img :src="post.heroImage" :alt="post.title" loading="lazy" />
      <span class="category-badge">{{ post.category }}</span>
    </div>
    <div class="body">
      <p class="read-time">{{ post.readTime }}</p>
      <h3>{{ post.title }}</h3>
      <p class="excerpt">{{ post.excerpt }}</p>
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

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
}
.blog-card:hover {
  transform: translateY(-6px);
}

.img-wrap {
  position: relative;
  overflow: hidden;
  height: 210px;
  flex-shrink: 0;
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.blog-card:hover .img-wrap img {
  transform: scale(1.06);
}

.category-badge {
  position: absolute;
  top: 12px;
  left: 14px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--emerald-700);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  border-radius: 99px;
  padding: 4px 12px;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 20px 22px;
  flex: 1;
}

.read-time {
  font-size: 0.78rem;
  color: var(--ink-400);
  font-weight: 600;
}

h3 {
  font-size: clamp(1rem, 2vw, 1.18rem);
  color: var(--ink-900);
  line-height: 1.35;
  flex: 1;
}

.excerpt {
  color: var(--ink-500);
  font-size: 0.9rem;
  line-height: 1.65;
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--emerald-600);
  font-weight: 700;
  font-size: 0.88rem;
  margin-top: auto;
  transition: gap 220ms ease;
}
.blog-card:hover .read-link {
  gap: 10px;
}
</style>
