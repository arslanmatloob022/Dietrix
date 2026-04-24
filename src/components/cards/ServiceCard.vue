<script setup lang="ts">
import type { ServiceItem } from "../../types/models";
import UiButton from "../ui/UiButton.vue";

defineProps<{ item: ServiceItem }>();
</script>

<template>
  <article class="service-card glass-card reveal">
    <div class="card-top">
      <span class="price-tag">From {{ item.priceFrom }}</span>
      <div class="icon-wrap" aria-hidden="true">🌿</div>
    </div>
    <h3>{{ item.title }}</h3>
    <p class="summary">{{ item.summary }}</p>
    <ul class="features">
      <li v-for="feature in item.features" :key="feature">
        <span class="check" aria-hidden="true">✓</span>{{ feature }}
      </li>
    </ul>
    <UiButton to="/booking" variant="secondary" class="cta">{{
      item.ctaText
    }}</UiButton>
  </article>
</template>

<style scoped>
.service-card {
  padding: clamp(20px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-tag {
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

.icon-wrap {
  font-size: 1.6rem;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  background: linear-gradient(
    135deg,
    var(--emerald-100),
    rgba(255, 255, 255, 0.6)
  );
  border-radius: 14px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

h3 {
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  color: var(--ink-900);
  line-height: 1.2;
}

.summary {
  color: var(--ink-500);
  line-height: 1.65;
  font-size: 0.93rem;
}

.features {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 8px;
  flex: 1;
}
.features li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--ink-600);
  font-size: 0.9rem;
  line-height: 1.5;
}
.check {
  color: var(--emerald-500);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

.cta {
  margin-top: auto;
}
</style>
