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
  display: grid;
  gap: 14px;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(97, 174, 164, 0.3);
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(8px);
}

.lead-form--compact {
  padding: 14px;
}

label {
  display: grid;
  gap: 8px;
  font-weight: 600;
  color: var(--ink-700);
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(108, 171, 163, 0.32);
  border-radius: 12px;
  background: white;
  padding: 12px;
  font: inherit;
  color: var(--ink-800);
}

textarea {
  resize: vertical;
  min-height: 90px;
}

input:focus,
textarea:focus {
  outline: 3px solid rgba(62, 170, 155, 0.2);
  border-color: var(--teal-500);
}

small {
  color: #a64040;
}

.feedback {
  margin: 0;
  font-size: 0.92rem;
}

.feedback--error {
  color: #a64040;
}

.feedback--success {
  color: #0f6d63;
}
</style>
