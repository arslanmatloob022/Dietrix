<script setup lang="ts">
import UiButton from "../components/ui/UiButton.vue";
import { useSeo } from "../composables/useSeo";

useSeo({
  title: "Page Not Found | Dietrix Nutrition",
  description:
    "The page you requested does not exist. Return to Dietrix home and continue your health journey.",
});
</script>

<template>
  <main class="container not-found reveal">
    <h1>Page Not Found</h1>
    <p>The page you requested is unavailable. Let us get you back on track.</p>
    <div class="actions">
      <UiButton to="/">Go to Home</UiButton>
      <UiButton to="/booking" variant="outline">Book Consultation</UiButton>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 12px;
}

h1 {
  margin: 0;
  color: var(--ink-900);
  font-size: clamp(2rem, 1.6rem + 2vw, 3rem);
}

p {
  margin: 0;
  color: var(--ink-600);
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
