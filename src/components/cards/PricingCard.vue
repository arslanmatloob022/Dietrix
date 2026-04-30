<script setup lang="ts">
import { computed } from "vue";
import type { PricingTier } from "../../types/models";
import UiButton from "../ui/UiButton.vue";

const props = defineProps<{
  tier: PricingTier;
}>();

const supportTag = computed(() => {
  if (props.tier.highlighted) {
    return "Most chosen";
  }

  return props.tier.billing === "one-time" ? "Fast start" : "Premium care";
});
</script>

<template>
  <article
    class="pricing-card reveal"
    :class="{ 'pricing-card--highlighted': tier.highlighted }"
  >
    <span class="pricing-card__shine" aria-hidden="true"></span>
    <div class="pricing-card__top">
      <p class="label">{{ tier.name }}</p>
      <span class="support-tag">{{ supportTag }}</span>
    </div>
    <div class="pricing-card__price">
      <h3>
        {{ tier.price }} <span>/ {{ tier.billing }}</span>
      </h3>
      <p>Remote plan delivery</p>
    </div>
    <p class="description">{{ tier.description }}</p>
    <ul>
      <li v-for="feature in tier.features" :key="feature">
        <span aria-hidden="true"></span>{{ feature }}
      </li>
    </ul>
    <p class="scarcity">{{ tier.scarcity }}</p>
    <UiButton to="/booking" :variant="tier.highlighted ? 'primary' : 'outline'">
      {{ tier.ctaText }}
    </UiButton>
  </article>
</template>

<style>
.pricing-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(97, 163, 157, 0.32);
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.88), rgba(236, 253, 245, 0.5)),
    rgba(255, 255, 255, 0.8);
  padding: 20px;
  display: grid;
  gap: 12px;
  min-height: 100%;
  isolation: isolate;
  transform-style: preserve-3d;
  box-shadow: 0 16px 42px rgba(6, 78, 59, 0.08);
  transition:
    transform 320ms ease,
    box-shadow 320ms ease,
    border-color 320ms ease;
}

.pricing-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(circle at top right, rgba(20, 184, 166, 0.16), transparent 34%),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.045) 0,
      rgba(6, 95, 70, 0.045) 1px,
      transparent 1px,
      transparent 36px
    );
}

.pricing-card:hover {
  transform: perspective(1200px) rotateX(2deg) rotateY(2deg) translateY(-8px);
  box-shadow: 0 30px 78px rgba(6, 78, 59, 0.16);
  border-color: rgba(16, 185, 129, 0.34);
}

.pricing-card > *:not(.pricing-card__shine) {
  position: relative;
  z-index: 1;
}

.pricing-card--highlighted {
  background: linear-gradient(
    150deg,
    rgba(18, 154, 141, 0.2),
    rgba(255, 255, 255, 0.92)
  );
  box-shadow: 0 20px 44px rgba(10, 58, 54, 0.14);
  transform: scale(1.01);
}

.pricing-card--highlighted:hover {
  transform: perspective(1200px) rotateX(2deg) rotateY(2deg) translateY(-8px)
    scale(1.01);
}

.pricing-card__shine {
  position: absolute;
  inset: 1px;
  z-index: 2;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    112deg,
    transparent 0%,
    rgba(255, 255, 255, 0.7) 42%,
    transparent 62%
  );
  transform: translateX(-82%);
  animation: pricing-card-sheen 8s ease-in-out infinite;
}

.pricing-card__top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.pricing-card .label {
  margin: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--teal-700);
  font-weight: 700;
}

.pricing-card .support-tag {
  border-radius: 999px;
  padding: 6px 10px;
  color: var(--emerald-800);
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.18);
  font-size: 0.72rem;
  font-weight: 900;
  white-space: nowrap;
}

.pricing-card__price {
  display: grid;
  gap: 6px;
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.pricing-card h3 {
  margin: 0;
  font-size: 2rem;
  line-height: 1;
  color: var(--ink-900);
  letter-spacing: 0;
}

.pricing-card h3 span {
  font-size: 0.9rem;
  color: var(--ink-600);
}

.pricing-card__price p {
  margin: 0;
  color: var(--ink-500);
  font-size: 0.84rem;
  font-weight: 800;
}

.pricing-card .description,
.pricing-card li {
  margin: 0;
  color: var(--ink-600);
}

.pricing-card ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}

.pricing-card li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.55;
}

.pricing-card li span {
  width: 8px;
  aspect-ratio: 1;
  flex-shrink: 0;
  margin-top: 8px;
  border-radius: 50%;
  background: var(--emerald-700);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
}

.pricing-card .scarcity {
  margin: 0;
  font-weight: 700;
  color: #9f4532;
  font-size: 0.9rem;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(159, 69, 50, 0.07);
  border: 1px solid rgba(159, 69, 50, 0.13);
}

@keyframes pricing-card-sheen {
  0%,
  44% {
    transform: translateX(-82%);
  }
  72%,
  100% {
    transform: translateX(82%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-card,
  .pricing-card:hover,
  .pricing-card--highlighted,
  .pricing-card--highlighted:hover {
    transform: none;
  }

  .pricing-card__shine {
    animation: none;
  }
}
</style>
