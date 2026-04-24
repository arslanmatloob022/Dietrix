<script setup lang="ts">
import type { Transformation } from "../../types/models";

defineProps<{ item: Transformation }>();
</script>

<template>
  <article class="transformation-card glass-card reveal">
    <div class="img-wrap">
      <img
        :src="item.image"
        :alt="`${item.name} transformation result`"
        loading="lazy"
      />
      <div class="img-overlay" aria-hidden="true"></div>
      <span class="timeline-badge">{{ item.timeline }}</span>
    </div>
    <div class="content">
      <div class="name-row">
        <p class="name">{{ item.name }}</p>
        <div class="focus-tag">{{ item.focus }}</div>
      </div>
      <div class="metrics" aria-label="Before and after result">
        <div class="metric">
          <span class="metric-label">Before</span>
          <span class="metric-value">{{ item.beforeMetric }}</span>
        </div>
        <div class="metric-divider" aria-hidden="true">→</div>
        <div class="metric metric--after">
          <span class="metric-label">After</span>
          <span class="metric-value after">{{ item.afterMetric }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.transformation-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.img-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  flex-shrink: 0;
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.transformation-card:hover .img-wrap img {
  transform: scale(1.06);
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(6, 78, 59, 0.5) 0%, transparent 60%);
}

.timeline-badge {
  position: absolute;
  bottom: 12px;
  left: 14px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
  background: rgba(6, 78, 59, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 99px;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px 20px;
  flex: 1;
}

.name-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
.name {
  font-weight: 700;
  color: var(--ink-900);
  font-size: 0.95rem;
}
.focus-tag {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--emerald-700);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 99px;
  padding: 3px 10px;
  white-space: nowrap;
  flex-shrink: 0;
}

.metrics {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.12);
  border-radius: 12px;
  padding: 10px 14px;
}
.metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}
.metric-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-400);
}
.metric-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink-700);
}
.after {
  color: var(--emerald-700);
}
.metric-divider {
  color: var(--emerald-500);
  font-size: 1.1rem;
}
</style>
