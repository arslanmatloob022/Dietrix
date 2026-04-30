<script setup lang="ts">
import UiButton from "./UiButton.vue";

withDefaults(
  defineProps<{
    title: string;
    description: string;
    primaryText: string;
    primaryTo: string;
    secondaryText?: string;
    secondaryTo?: string;
    kicker?: string;
  }>(),
  { secondaryText: "", secondaryTo: "", kicker: "Limited Consultation Slots" },
);
</script>

<template>
  <section class="cta-banner reveal" aria-label="Call to action">
    <div class="cta-bg" aria-hidden="true">
      <div class="cta-orb"></div>
      <div class="cta-orb cta-orb--2"></div>
    </div>
    <div class="cta-content">
      <span class="eyebrow">{{ kicker }}</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="actions">
        <UiButton :to="primaryTo" size="lg">{{ primaryText }}</UiButton>
        <UiButton
          v-if="secondaryText && secondaryTo"
          :to="secondaryTo"
          variant="outline"
          size="lg"
          >{{ secondaryText }}</UiButton
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-banner {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  padding: clamp(36px, 5vw, 64px) clamp(28px, 5vw, 60px);
  background: linear-gradient(
    135deg,
    var(--emerald-900) 0%,
    var(--emerald-700) 50%,
    var(--teal-600) 100%
  );
  box-shadow:
    0 32px 80px rgba(6, 78, 59, 0.3),
    0 8px 24px rgba(6, 78, 59, 0.16);
  margin-bottom: 22px;
}

.cta-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.cta-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
}
.cta-orb--2 {
  width: 250px;
  height: 250px;
  bottom: -60px;
  left: -60px;
  background: rgba(255, 255, 255, 0.05);
}

.cta-content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 20px;
  max-width: 700px;
}

.eyebrow {
  color: var(--emerald-300);
}
.eyebrow::before {
  background: var(--emerald-400);
}

h2 {
  color: white;
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
}
p {
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.05rem;
}

.actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 4px;
}
</style>
