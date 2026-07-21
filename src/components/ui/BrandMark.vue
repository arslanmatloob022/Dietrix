<script setup lang="ts">
import { computed, useId } from "vue";

type BrandMarkVariant = "gradient" | "solid" | "dark" | "inverse";

const props = withDefaults(
  defineProps<{
    size?: number | string;
    variant?: BrandMarkVariant;
  }>(),
  {
    size: 32,
    variant: "gradient",
  },
);

const gradientId = `dietrix-fit-gradient-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const leafMaskId = `dietrix-fit-leaf-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
const dimension = computed(() => String(props.size));
const markFill = computed(() => {
  if (props.variant === "solid") return "#047857";
  if (props.variant === "dark") return "#0e1e1b";
  if (props.variant === "inverse") return "#ffffff";
  return `url(#${gradientId})`;
});
</script>

<template>
  <svg
    :width="dimension"
    :height="dimension"
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient
        :id="gradientId"
        x1="8"
        y1="6"
        x2="58"
        y2="58"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#059669" />
        <stop offset="1" stop-color="#0d9488" />
      </linearGradient>
      <mask :id="leafMaskId">
        <rect width="64" height="64" fill="white" />
        <path
          d="M27.2 39.5c3.6-5.4 7.7-9.8 13-13.6"
          stroke="black"
          stroke-width="2.4"
          stroke-linecap="round"
        />
      </mask>
    </defs>

    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 6h20c18.8 0 32 10.7 32 26S46.8 58 28 58H8V6Zm14 12v28h6c10.3 0 18-5.8 18-14s-7.7-14-18-14h-6Z"
      :fill="markFill"
    />
    <path
      d="M25.2 39.8c1.1-10.2 7.6-16.6 18.1-17.8-.9 10.5-7.5 16.9-18.1 17.8Z"
      :fill="markFill"
      :mask="`url(#${leafMaskId})`"
    />
  </svg>
</template>
