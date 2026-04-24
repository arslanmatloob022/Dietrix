<script setup lang="ts">
import type { PricingTier } from "../../types/models";
import UiButton from "../ui/UiButton.vue";

defineProps<{
  tier: PricingTier;
}>();
</script>

<template>
  <article
    class="pricing-card reveal"
    :class="{ 'pricing-card--highlighted': tier.highlighted }"
  >
    <p class="label">{{ tier.name }}</p>
    <h3>
      {{ tier.price }} <span>/ {{ tier.billing }}</span>
    </h3>
    <p class="description">{{ tier.description }}</p>
    <ul>
      <li v-for="feature in tier.features" :key="feature">{{ feature }}</li>
    </ul>
    <p class="scarcity">{{ tier.scarcity }}</p>
    <UiButton to="/booking" :variant="tier.highlighted ? 'primary' : 'outline'">
      {{ tier.ctaText }}
    </UiButton>
  </article>
</template>

<style scoped>
.pricing-card {
  border-radius: 18px;
  border: 1px solid rgba(97, 163, 157, 0.32);
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  display: grid;
  gap: 12px;
}

.pricing-card--highlighted {
  background: linear-gradient(
    150deg,
    rgba(18, 154, 141, 0.17),
    rgba(255, 255, 255, 0.92)
  );
  box-shadow: 0 20px 44px rgba(10, 58, 54, 0.14);
  transform: scale(1.01);
}

.label {
  margin: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--teal-700);
  font-weight: 700;
}

h3 {
  margin: 0;
  font-size: 2rem;
  line-height: 1;
  color: var(--ink-900);
}

span {
  font-size: 0.9rem;
  color: var(--ink-600);
}

.description,
li {
  margin: 0;
  color: var(--ink-600);
}

ul {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
}

.scarcity {
  margin: 0;
  font-weight: 700;
  color: #9f4532;
  font-size: 0.9rem;
}
</style>
