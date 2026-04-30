<script setup lang="ts">
import { computed } from "vue";
import type { ServiceItem } from "../../types/models";
import UiButton from "../ui/UiButton.vue";

const props = defineProps<{ item: ServiceItem }>();

const programCode = computed(() =>
  props.item.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
);

const featureProgress = computed(
  () => `${Math.min(94, 54 + props.item.features.length * 8)}%`
);
</script>

<template>
  <article class="service-card glass-card reveal">
    <span class="service-card__shine" aria-hidden="true"></span>
    <div class="card-top">
      <span class="price-tag">From {{ item.priceFrom }}</span>
      <div class="icon-wrap" aria-hidden="true">
        <span>{{ programCode }}</span>
      </div>
    </div>

    <div class="program-depth">
      <span>Personalized protocol</span>
      <strong>{{ item.features.length }} care layers</strong>
    </div>

    <h3>{{ item.title }}</h3>
    <p class="summary">{{ item.summary }}</p>

    <div class="feature-meter" aria-hidden="true">
      <span :style="{ width: featureProgress }"></span>
    </div>

    <ul class="features">
      <li v-for="feature in item.features" :key="feature">
        <span class="check" aria-hidden="true"></span>{{ feature }}
      </li>
    </ul>
    <UiButton to="/booking" variant="secondary" class="cta">{{
      item.ctaText
    }}</UiButton>
  </article>
</template>

<style>
.service-card {
  position: relative;
  overflow: hidden;
  padding: clamp(20px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
  isolation: isolate;
  transform-style: preserve-3d;
  transition:
    transform 320ms ease,
    box-shadow 320ms ease,
    border-color 320ms ease;
}

.service-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.88), rgba(236, 253, 245, 0.58)),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.055) 0,
      rgba(6, 95, 70, 0.055) 1px,
      transparent 1px,
      transparent 32px
    );
}

.service-card::after {
  content: "";
  position: absolute;
  right: -64px;
  top: -76px;
  width: 164px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(16, 185, 129, 0.2);
  background:
    radial-gradient(circle at 38% 38%, rgba(255, 255, 255, 0.9), transparent 30%),
    conic-gradient(from 35deg, rgba(6, 95, 70, 0.24), rgba(20, 184, 166, 0.08), rgba(245, 158, 11, 0.18), rgba(6, 95, 70, 0.24));
  filter: saturate(1.12);
  opacity: 0.75;
  z-index: 0;
}

.service-card:hover {
  transform: perspective(1200px) rotateX(2deg) rotateY(-3deg) translateY(-8px);
  box-shadow: 0 30px 78px rgba(6, 78, 59, 0.16);
  border-color: rgba(16, 185, 129, 0.34);
}

.service-card > *:not(.service-card__shine) {
  position: relative;
  z-index: 1;
}

.service-card__shine {
  position: absolute;
  inset: 1px;
  z-index: 2;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    112deg,
    transparent 0%,
    rgba(255, 255, 255, 0.72) 42%,
    transparent 62%
  );
  transform: translateX(-78%);
  animation: service-card-sheen 7.5s ease-in-out infinite;
}

.service-card .card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.service-card .price-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--emerald-600);
  background: rgba(16, 185, 129, 0.12);
  padding: 4px 12px;
  border-radius: 99px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.service-card .icon-wrap {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  color: var(--emerald-800);
  background:
    linear-gradient(rgba(255, 255, 255, 0.86), rgba(236, 253, 245, 0.72)) padding-box,
    conic-gradient(from 30deg, var(--emerald-700), var(--teal-400), #f59e0b, var(--emerald-700)) border-box;
  border-radius: 16px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 12px 24px rgba(5, 150, 105, 0.15);
}

.service-card .icon-wrap span {
  font-family: var(--font-heading);
  font-size: 0.94rem;
  font-weight: 900;
}

.service-card .program-depth {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid rgba(16, 185, 129, 0.14);
}

.service-card .program-depth span,
.service-card .program-depth strong {
  font-size: 0.76rem;
  line-height: 1.35;
}

.service-card .program-depth span {
  color: var(--ink-500);
  font-weight: 800;
}

.service-card .program-depth strong {
  color: var(--emerald-700);
  text-align: right;
}

.service-card h3 {
  font-size: 1.32rem;
  color: var(--ink-900);
  line-height: 1.2;
  letter-spacing: 0;
}

.service-card .summary {
  color: var(--ink-500);
  line-height: 1.65;
  font-size: 0.93rem;
}

.service-card .feature-meter {
  height: 9px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(6, 95, 70, 0.09);
  border: 1px solid rgba(16, 185, 129, 0.13);
}

.service-card .feature-meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--emerald-700), var(--teal-400));
  box-shadow: 0 0 18px rgba(20, 184, 166, 0.35);
}

.service-card .features {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 8px;
  flex: 1;
}
.service-card .features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--ink-600);
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 8px 0;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
}

.service-card .features li:last-child {
  border-bottom: 0;
}

.service-card .check {
  width: 18px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-400));
  flex-shrink: 0;
  margin-top: 2px;
  box-shadow: 0 8px 16px rgba(5, 150, 105, 0.18);
}

.service-card .check::before {
  content: "";
  width: 7px;
  height: 4px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg) translate(1px, -1px);
}

.service-card .cta {
  margin-top: auto;
}

@keyframes service-card-sheen {
  0%,
  42% {
    transform: translateX(-78%);
  }
  70%,
  100% {
    transform: translateX(78%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-card,
  .service-card:hover {
    transform: none;
  }

  .service-card__shine {
    animation: none;
  }
}
</style>
