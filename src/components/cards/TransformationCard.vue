<script setup lang="ts">
import type { Transformation } from "../../types/models";

defineProps<{ item: Transformation }>();
</script>

<template>
  <article class="transformation-card glass-card reveal">
    <div class="img-wrap">
      <img
        :src="item.image"
        :alt="`${item.name} personalized nutrition transformation result`"
        loading="lazy"
      />
      <div class="img-overlay" aria-hidden="true"></div>
      <span class="timeline-badge">{{ item.timeline }}</span>
      <span class="evidence-badge">Measured progress</span>
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
      <div class="progress-rail" aria-hidden="true">
        <span></span>
        <i></i>
      </div>
      <p class="microcopy">
        Personalized nutrition, weekly tracking, realistic habit upgrades.
      </p>
    </div>
  </article>
</template>

<style scoped>
.transformation-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  transform-style: preserve-3d;
}

.transformation-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(90deg, rgba(16, 185, 129, 0.42), rgba(45, 212, 191, 0.22))
      top left / 100% 2px no-repeat,
    linear-gradient(160deg, rgba(255, 255, 255, 0.32), transparent 36%);
}

.transformation-card:hover {
  transform: perspective(1200px) rotateX(2.4deg) rotateY(2.2deg)
    translateY(-8px);
}

.img-wrap {
  position: relative;
  z-index: 2;
  height: 214px;
  overflow: hidden;
  flex-shrink: 0;
  transform: translateZ(1px);
}

.img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    112deg,
    transparent 0%,
    rgba(255, 255, 255, 0.44) 45%,
    transparent 62%
  );
  transform: translateX(-105%);
  transition: transform 820ms ease;
}

.transformation-card:hover .img-wrap::after {
  transform: translateX(105%);
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 700ms cubic-bezier(0.25, 0.8, 0.25, 1),
    filter 700ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.transformation-card:hover .img-wrap img {
  transform: scale(1.08);
  filter: saturate(1.08) contrast(1.04);
}

.img-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(6, 78, 59, 0.62) 0%, transparent 62%),
    linear-gradient(135deg, rgba(16, 185, 129, 0.18), transparent 46%);
}

.timeline-badge,
.evidence-badge {
  position: absolute;
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

.timeline-badge {
  bottom: 12px;
  left: 14px;
}

.evidence-badge {
  top: 12px;
  right: 14px;
  color: var(--emerald-900);
  background: rgba(255, 255, 255, 0.74);
}

.content {
  position: relative;
  z-index: 2;
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
  text-align: right;
  flex-shrink: 0;
  max-width: 62%;
  line-height: 1.35;
}

.metrics {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
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

.progress-rail {
  position: relative;
  height: 9px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.14);
  overflow: hidden;
}

.progress-rail span {
  display: block;
  width: 76%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--emerald-700), var(--teal-400));
  box-shadow: 0 0 22px rgba(20, 184, 166, 0.42);
}

.progress-rail i {
  position: absolute;
  top: 50%;
  left: calc(76% - 7px);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
  border: 4px solid var(--emerald-500);
  transform: translateY(-50%);
  box-shadow: 0 8px 20px rgba(6, 78, 59, 0.24);
}

.microcopy {
  color: var(--ink-500);
  font-size: 0.82rem;
  line-height: 1.55;
}

@media (max-width: 520px) {
  .name-row,
  .metrics {
    grid-template-columns: 1fr;
  }

  .name-row {
    display: grid;
  }

  .focus-tag {
    max-width: 100%;
    text-align: left;
    justify-self: start;
  }

  .metric-divider {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .transformation-card,
  .img-wrap::after,
  .img-wrap img {
    transition: none;
  }

  .transformation-card:hover {
    transform: none;
  }
}
</style>
