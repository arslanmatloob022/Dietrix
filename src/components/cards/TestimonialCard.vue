<script setup lang="ts">
import type { Testimonial } from "../../types/models";

defineProps<{ testimonial: Testimonial }>();
</script>

<template>
  <article class="testimonial-card glass-card reveal">
    <div class="quote-mark" aria-hidden="true">&ldquo;</div>
    <div class="rating-row">
      <p class="stars" :aria-label="`${testimonial.rating} out of 5 stars`">
        <span v-for="i in testimonial.rating" :key="i" aria-hidden="true"
          >★</span
        >
      </p>
      <span class="verified-pill">Verified outcome</span>
    </div>
    <h3>{{ testimonial.goal }}</h3>
    <p class="quote">{{ testimonial.quote }}</p>
    <div class="result-row">
      <span class="result-badge">{{ testimonial.result }}</span>
    </div>
    <div class="result-meter" aria-hidden="true">
      <span></span>
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
      <img
        :src="testimonial.image"
        :alt="`${testimonial.name} online nutrition coaching testimonial`"
        loading="lazy"
      />
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
  min-height: 100%;
  overflow: hidden;
  isolation: isolate;
  transform-style: preserve-3d;
}

.testimonial-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.84), rgba(236, 253, 245, 0.34)),
    linear-gradient(
      110deg,
      transparent 0%,
      rgba(255, 255, 255, 0.72) 42%,
      transparent 58%
    );
  background-size:
    100% 100%,
    220% 100%;
  background-position:
    0 0,
    -120% 0;
  transition: background-position 800ms ease;
}

.testimonial-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(90deg, rgba(16, 185, 129, 0.55), rgba(45, 212, 191, 0.28))
      top left / 100% 2px no-repeat,
    linear-gradient(180deg, rgba(255, 255, 255, 0.65), transparent 32%);
  opacity: 0.72;
}

.testimonial-card:hover {
  transform: perspective(1100px) rotateX(2.2deg) rotateY(-2.4deg)
    translateY(-8px);
}

.testimonial-card:hover::before {
  background-position:
    0 0,
    120% 0;
}

.quote-mark {
  font-family: Georgia, serif;
  font-size: 5rem;
  line-height: 1;
  color: rgba(167, 243, 208, 0.72);
  position: absolute;
  top: 10px;
  right: 20px;
  pointer-events: none;
  user-select: none;
  transform: translateZ(18px);
  z-index: 1;
}

.rating-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-right: 28px;
  position: relative;
  z-index: 1;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars span {
  color: #f59e0b;
  font-size: 1.1rem;
  filter: drop-shadow(0 4px 10px rgba(245, 158, 11, 0.2));
}

.verified-pill {
  border-radius: 999px;
  padding: 5px 9px;
  color: var(--emerald-800);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  font-size: 0.7rem;
  font-weight: 800;
  white-space: nowrap;
}

h3 {
  font-size: 1.1rem;
  color: var(--ink-900);
  line-height: 1.25;
  padding-right: 40px;
  position: relative;
  z-index: 1;
}

.quote {
  color: var(--ink-600);
  line-height: 1.7;
  font-size: 0.95rem;
  font-style: italic;
  flex: 1;
  position: relative;
  z-index: 1;
}

.result-row {
  display: flex;
  position: relative;
  z-index: 1;
}

.result-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--emerald-700);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 99px;
  padding: 3px 12px;
}

.result-meter {
  height: 8px;
  padding: 1px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.12);
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.result-meter span {
  display: block;
  width: 88%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--emerald-600), var(--teal-400));
  box-shadow: 0 0 22px rgba(16, 185, 129, 0.42);
  animation: result-pulse 3.4s ease-in-out infinite;
}

.before-after {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.05);
  border-radius: 12px;
  padding: 10px 14px;
  border: 1px solid rgba(16, 185, 129, 0.12);
  position: relative;
  z-index: 1;
}

.ba-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.ba-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-400);
}

.after-label {
  color: var(--emerald-600);
}

.ba-value {
  font-size: 0.88rem;
  color: var(--ink-700);
  font-weight: 600;
  line-height: 1.45;
}

.after-value {
  color: var(--emerald-700);
}

.ba-arrow {
  color: var(--emerald-500);
  font-size: 1.1rem;
  text-align: center;
}

.author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  border-top: 1px solid rgba(16, 185, 129, 0.1);
  padding-top: 12px;
  position: relative;
  z-index: 1;
}

.author img {
  width: 46px;
  height: 46px;
  border-radius: 99px;
  object-fit: cover;
  border: 2px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 8px 22px rgba(6, 78, 59, 0.16);
}

.name {
  font-weight: 700;
  color: var(--ink-900);
  font-size: 0.9rem;
}

.location {
  color: var(--ink-400);
  font-size: 0.8rem;
  margin-top: 2px;
}

@keyframes result-pulse {
  0%,
  100% {
    filter: saturate(1);
  }
  50% {
    filter: saturate(1.4) brightness(1.08);
  }
}

@media (max-width: 520px) {
  .rating-row {
    align-items: flex-start;
    flex-direction: column;
    padding-right: 44px;
  }

  .before-after {
    grid-template-columns: 1fr;
  }

  .ba-arrow {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-card,
  .testimonial-card::before,
  .result-meter span {
    animation: none;
    transition: none;
  }

  .testimonial-card:hover {
    transform: none;
  }
}
</style>
