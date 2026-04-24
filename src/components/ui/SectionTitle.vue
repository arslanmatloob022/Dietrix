<script setup lang="ts">
withDefaults(
  defineProps<{
    kicker?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    size?: "md" | "lg";
  }>(),
  { kicker: "", description: "", align: "left", size: "md" },
);
</script>

<template>
  <header class="section-title" :class="[`align-${align}`, `size-${size}`]">
    <span v-if="kicker" class="eyebrow">{{ kicker }}</span>
    <h2>{{ title }}</h2>
    <p v-if="description" class="desc">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-title {
  display: grid;
  gap: 14px;
  max-width: 680px;
}
.section-title.align-center {
  margin-inline: auto;
  text-align: center;
}
.section-title.size-lg h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
}

h2 {
  margin: 0;
  font-size: clamp(1.65rem, 3vw, 2.6rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: var(--st-title-color, var(--ink-900));
}

.desc {
  margin: 0;
  color: var(--st-desc-color, var(--ink-500));
  font-size: 1.02rem;
  line-height: 1.75;
  max-width: 560px;
}

/* Expose eyebrow color for dark contexts */
.eyebrow {
  color: var(--st-kicker-color, var(--emerald-600));
}
.align-center .desc {
  margin-inline: auto;
}
</style>
