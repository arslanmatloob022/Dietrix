<script setup lang="ts">
import type { FaqItem } from "../../types/models";

defineProps<{
  items: FaqItem[];
}>();
</script>

<template>
  <div class="faq-list">
    <details v-for="item in items" :key="item.id" class="faq-item reveal">
      <summary>{{ item.question }}</summary>
      <p>{{ item.answer }}</p>
    </details>
  </div>
</template>

<style scoped>
.faq-list {
  display: grid;
  gap: 12px;
}

.faq-item {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  border: 1px solid rgba(105, 171, 161, 0.28);
  padding: 14px 16px;
}

summary {
  cursor: pointer;
  font-weight: 700;
  color: var(--ink-900);
}

p {
  color: var(--ink-600);
  margin: 12px 0 2px;
  line-height: 1.65;
}
</style>
