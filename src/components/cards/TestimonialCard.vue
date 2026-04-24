<script setup lang="ts">
import type { Testimonial } from "../../types/models";

defineProps<{ testimonial: Testimonial }>();
</script>

<template>
  <article class="testimonial-card glass-card reveal">
    <div class="quote-mark" aria-hidden="true">&ldquo;</div>
    <p class="stars" :aria-label="`${testimonial.rating} out of 5 stars`">
      <span v-for="i in testimonial.rating" :key="i" aria-hidden="true">★</span>
    </p>
    <h3>{{ testimonial.goal }}</h3>
    <p class="quote">{{ testimonial.quote }}</p>
    <div class="result-row">
      <span class="result-badge">{{ testimonial.result }}</span>
    </div>
    <div class="before-after">
      <div class="ba-item">
        <span class="ba-label">Before</span>
        <span class="ba-value">{{ testimonial.beforeLabel }}</span>
      </div>
      <div class="ba-arrow" aria-hidden="true">→</div>
      <div class="ba-item">
        <span class="ba-label after-label">After</span>
        <span class="ba-value after-value">{{ testimonial.afterLabel }}</span>
      </div>
    </div>
    <div class="author">
      <img :src="testimonial.image" :alt="`Photo of ${testimonial.name}`" loading="lazy" />
      <div>
        <p class="name">{{ testimonial.name }}</p>
        <p class="location">{{ testimonial.location }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.testimonial-card {
  padding: clamp(22px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.quote-mark {
  font-family: Georgia, serif;
  font-size: 5rem;
  line-height: 1;
  color: var(--emerald-100);
  position: absolute;
  top: 10px;
  right: 20px;
  pointer-events: none;
  user-select: none;
}

.stars { display: flex; gap: 2px; }
.stars span { color: #f59e0b; font-size: 1.1rem; }

h3 {
  font-size: clamp(1rem, 2vw, 1.18rem);
  color: var(--ink-900);
  line-height: 1.25;
  padding-right: 40px;
}

.quote {
  color: var(--ink-600);
  line-height: 1.7;
  font-size: 0.95rem;
  font-style: italic;
  flex: 1;
}

.result-row { display: flex; }
.result-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--emerald-700);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 99px;
  padding: 3px 12px;
}

.before-after {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 12px;
  padding: 10px 14px;
  border: 1px solid rgba(16, 185, 129, 0.12);
}
.ba-item { display: flex; flex-direction: column; gap: 2px; }
.ba-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-400); }
.after-label { color: var(--emerald-600); }
.ba-value { font-size: 0.88rem; color: var(--ink-700); font-weight: 600; }
.after-value { color: var(--emerald-700); }
.ba-arrow { color: var(--emerald-500); font-size: 1.1rem; flex: 1; text-align: center; }

.author { display: flex; align-items: center; gap: 12px; margin-top: 4px; border-top: 1px solid rgba(16, 185, 129, 0.1); padding-top: 12px; }
.author img { width: 44px; height: 44px; border-radius: 99px; object-fit: cover; border: 2px solid rgba(16, 185, 129, 0.3); }
.name { font-weight: 700; color: var(--ink-900); font-size: 0.9rem; }
.location { color: var(--ink-400); font-size: 0.8rem; margin-top: 2px; }
</style>
