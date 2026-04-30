<script setup lang="ts">
import { reactive } from "vue";
import UiButton from "../ui/UiButton.vue";
import { useLeadStore } from "../../stores/leads";
import type { LeadSource } from "../../types/models";

const props = withDefaults(
  defineProps<{
    source?: LeadSource;
    compact?: boolean;
  }>(),
  {
    source: "contact",
    compact: false,
  },
);

const leadStore = useLeadStore();

const form = reactive({
  name: "",
  email: "",
  goal: "",
});

const errors = reactive({
  name: "",
  email: "",
  goal: "",
});

function validate() {
  errors.name = form.name.trim().length >= 2 ? "" : "Please enter your name.";
  errors.email = /^\S+@\S+\.\S+$/.test(form.email)
    ? ""
    : "Valid email required.";
  errors.goal =
    form.goal.trim().length >= 8 ? "" : "Goal must be at least 8 characters.";

  return !errors.name && !errors.email && !errors.goal;
}

async function onSubmit() {
  leadStore.clearStatus();

  if (!validate()) {
    return;
  }

  await leadStore.captureLead({
    name: form.name,
    email: form.email,
    goal: form.goal,
    source: props.source,
  });

  if (!leadStore.error) {
    form.name = "";
    form.email = "";
    form.goal = "";
  }
}
</script>

<template>
  <form
    class="lead-form"
    :class="{ 'lead-form--compact': compact }"
    @submit.prevent="onSubmit"
    novalidate
  >
    <label>
      Full Name
      <input
        v-model="form.name"
        type="text"
        placeholder="Your full name"
        autocomplete="name"
      />
      <small v-if="errors.name">{{ errors.name }}</small>
    </label>

    <label>
      Email Address
      <input
        v-model="form.email"
        type="email"
        placeholder="you@email.com"
        autocomplete="email"
      />
      <small v-if="errors.email">{{ errors.email }}</small>
    </label>

    <label>
      Health Goal
      <textarea
        v-model="form.goal"
        :rows="compact ? 2 : 4"
        placeholder="Lose 8 kg, improve PCOS symptoms, control blood sugar, etc."
      ></textarea>
      <small v-if="errors.goal">{{ errors.goal }}</small>
    </label>

    <UiButton
      type="submit"
      :loading="leadStore.isSubmitting"
      :full-width="true"
    >
      {{ leadStore.isSubmitting ? "Sending..." : "Get My Personalized Plan" }}
    </UiButton>

    <p v-if="leadStore.error" class="feedback feedback--error">
      {{ leadStore.error }}
    </p>
    <p v-if="leadStore.successMessage" class="feedback feedback--success">
      {{ leadStore.successMessage }}
    </p>
  </form>
</template>

<style scoped>
.lead-form {
  position: relative;
  display: grid;
  gap: 14px;
  padding: clamp(16px, 2.6vw, 24px);
  border-radius: 22px;
  border: 1px solid rgba(97, 174, 164, 0.28);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.88), rgba(236, 253, 245, 0.42)),
    rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(18px) saturate(170%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    0 18px 46px rgba(6, 78, 59, 0.08);
  overflow: hidden;
  isolation: isolate;
}

.lead-form::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), transparent 38%),
    repeating-linear-gradient(
      90deg,
      rgba(16, 185, 129, 0.04) 0,
      rgba(16, 185, 129, 0.04) 1px,
      transparent 1px,
      transparent 32px
    );
}

.lead-form::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    110deg,
    transparent 0%,
    rgba(255, 255, 255, 0.74) 42%,
    transparent 62%
  );
  transform: translateX(-82%);
  transition: transform 800ms ease;
}

.lead-form:hover::after {
  transform: translateX(82%);
}

.lead-form--compact {
  padding: 14px;
}

label {
  display: grid;
  gap: 8px;
  font-weight: 800;
  color: var(--ink-700);
  font-size: 0.92rem;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(108, 171, 163, 0.34);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.76);
  padding: 14px 15px;
  font: inherit;
  color: var(--ink-800);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 8px 20px rgba(6, 78, 59, 0.04);
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease,
    transform 220ms ease;
}

textarea {
  resize: vertical;
  min-height: 116px;
}

input:focus,
textarea:focus {
  outline: 0;
  border-color: var(--teal-500);
  background: rgba(255, 255, 255, 0.96);
  box-shadow:
    0 0 0 4px rgba(20, 184, 166, 0.13),
    0 14px 28px rgba(6, 78, 59, 0.08);
  transform: translateY(-1px);
}

input::placeholder,
textarea::placeholder {
  color: rgba(61, 102, 96, 0.62);
}

small {
  color: #a64040;
  font-weight: 700;
}

.feedback {
  margin: 0;
  font-size: 0.92rem;
  border-radius: 14px;
  padding: 10px 12px;
  font-weight: 700;
}

.feedback--error {
  color: #a64040;
  background: rgba(166, 64, 64, 0.08);
  border: 1px solid rgba(166, 64, 64, 0.14);
}

.feedback--success {
  color: #0f6d63;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .lead-form::after,
  input,
  textarea {
    transition: none;
  }

  input:focus,
  textarea:focus {
    transform: none;
  }
}
</style>
