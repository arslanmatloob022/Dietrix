<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonType = "button" | "submit" | "reset";

const props = withDefaults(
  defineProps<{
    to?: string;
    type?: ButtonType;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    ariaLabel?: string;
  }>(),
  {
    type: "button",
    variant: "primary",
    size: "md",
    fullWidth: false,
    loading: false,
    ariaLabel: "",
  },
);

const classes = computed(() => [
  "ui-button",
  `ui-button--${props.variant}`,
  `ui-button--${props.size}`,
  props.fullWidth ? "ui-button--full" : "",
  props.loading ? "ui-button--loading" : "",
]);
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    :class="classes"
    :aria-label="ariaLabel || undefined"
  >
    <slot />
  </RouterLink>
  <button
    v-else
    :type="type"
    :class="classes"
    :disabled="loading"
    :aria-label="ariaLabel || undefined"
  >
    <span v-if="loading" class="spinner" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 14px;
  border: 1.5px solid transparent;
  font-family: var(--font-body);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  transition:
    transform 260ms cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 260ms cubic-bezier(0.25, 0.8, 0.25, 1),
    background 260ms ease,
    border-color 260ms ease,
    opacity 260ms ease;
}

/* shine effect */
.ui-button::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.22) 50%,
    rgba(255, 255, 255, 0) 60%
  );
  translate: -100% 0;
  transition: translate 500ms ease;
}
.ui-button:hover::before {
  translate: 100% 0;
}

/* sizes */
.ui-button--sm {
  padding: 0 18px;
  min-height: 40px;
  font-size: 0.84rem;
  border-radius: 12px;
}
.ui-button--md {
  padding: 0 24px;
  min-height: 50px;
  font-size: 0.93rem;
}
.ui-button--lg {
  padding: 0 36px;
  min-height: 58px;
  font-size: 1.05rem;
  border-radius: 18px;
}

/* variants */
.ui-button--primary {
  background: linear-gradient(
    135deg,
    var(--emerald-700) 0%,
    var(--emerald-500) 60%,
    var(--teal-500) 100%
  );
  color: white;
  box-shadow:
    0 8px 28px rgba(5, 150, 105, 0.3),
    0 2px 6px rgba(5, 150, 105, 0.18);
}
.ui-button--primary:hover {
  transform: translateY(-3px);
  box-shadow:
    0 16px 40px rgba(5, 150, 105, 0.38),
    0 4px 12px rgba(5, 150, 105, 0.22);
}
.ui-button--primary:active {
  transform: translateY(0);
}

.ui-button--secondary {
  background: rgba(16, 185, 129, 0.1);
  color: var(--emerald-700);
  border-color: rgba(16, 185, 129, 0.25);
}
.ui-button--secondary:hover {
  background: rgba(16, 185, 129, 0.18);
  transform: translateY(-2px);
}

.ui-button--outline {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  color: var(--emerald-800);
  border-color: rgba(16, 185, 129, 0.35);
  box-shadow: 0 2px 12px rgba(6, 78, 59, 0.08);
}
.ui-button--outline:hover {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(16, 185, 129, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(6, 78, 59, 0.12);
}

.ui-button--ghost {
  background: transparent;
  color: var(--emerald-700);
  border-color: transparent;
}
.ui-button--ghost:hover {
  background: rgba(16, 185, 129, 0.08);
}

.ui-button--full {
  width: 100%;
}

.ui-button--loading {
  cursor: progress;
  opacity: 0.85;
}
.ui-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}

/* spinner */
.spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: white;
  animation: spin 700ms linear infinite;
  flex-shrink: 0;
}
@keyframes spin {
  to {
    rotate: 360deg;
  }
}
</style>
