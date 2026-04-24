<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="empty-state" role="status" aria-live="polite">
    <h3>{{ title }}</h3>
    <p>{{ description || "No data available to show" }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  border-radius: 16px;
  border: 1px dashed rgba(80, 160, 151, 0.46);
  background: rgba(243, 250, 249, 0.8);
  text-align: center;
  padding: 20px;
}

h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--ink-900);
}

p {
  margin: 8px 0 0;
  color: var(--ink-600);
}
</style>
