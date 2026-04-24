<script setup lang="ts">
import { computed, reactive } from "vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import { useSeo } from "../composables/useSeo";
import { useBookingStore } from "../stores/booking";

useSeo({
  title: "Book Nutrition Consultation Online | Dietrix Nutrition",
  description:
    "Select a consultation slot, share your health goals, and reserve your online nutrition appointment.",
});

const bookingStore = useBookingStore();

const times = ["08:00", "09:30", "11:00", "13:00", "15:30", "17:00", "19:00"];

const availableDays = computed(() => {
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const iso = date.toISOString().split("T")[0];

    return {
      iso,
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  });
});

const form = reactive({
  name: "",
  email: "",
  healthGoal: "",
  notes: "",
});

const errors = reactive({
  slot: "",
  name: "",
  email: "",
  healthGoal: "",
});

function pickSlot(date: string, time: string) {
  bookingStore.clearStatus();
  bookingStore.setSlot(date, time);
}

function validate() {
  errors.slot =
    bookingStore.selectedDate && bookingStore.selectedTime
      ? ""
      : "Please select a date and time slot.";
  errors.name = form.name.trim().length >= 2 ? "" : "Please enter your name.";
  errors.email = /^\S+@\S+\.\S+$/.test(form.email)
    ? ""
    : "A valid email is required.";
  errors.healthGoal =
    form.healthGoal.trim().length >= 8
      ? ""
      : "Please describe your goal in more detail.";

  return !errors.slot && !errors.name && !errors.email && !errors.healthGoal;
}

async function reserveSlot() {
  bookingStore.clearStatus();

  if (!validate()) {
    return;
  }

  await bookingStore.createBooking({
    name: form.name,
    email: form.email,
    healthGoal: form.healthGoal,
    date: bookingStore.selectedDate,
    time: bookingStore.selectedTime,
    notes: form.notes,
  });

  if (!bookingStore.error) {
    form.name = "";
    form.email = "";
    form.healthGoal = "";
    form.notes = "";
  }
}
</script>

<template>
  <main class="page">
    <section class="container reveal">
      <p class="eyebrow">Booking System</p>
      <h1>Reserve Your 1-on-1 Nutrition Consultation</h1>
      <p class="intro">
        Select your preferred appointment slot, submit your details, and
        continue to payment-ready checkout.
      </p>
    </section>

    <section class="container booking-layout">
      <article class="booking-card reveal">
        <SectionTitle
          kicker="Step 1"
          title="Choose Date and Time"
          description="Available slots update weekly. Limited premium slots are released first."
        />

        <div
          class="date-grid"
          role="listbox"
          aria-label="Select appointment date"
        >
          <button
            v-for="day in availableDays"
            :key="day.iso"
            :class="{ active: bookingStore.selectedDate === day.iso }"
            @click="bookingStore.setSlot(day.iso, '')"
          >
            {{ day.label }}
          </button>
        </div>

        <div
          class="time-grid"
          role="listbox"
          aria-label="Select appointment time"
        >
          <button
            v-for="time in times"
            :key="time"
            :disabled="!bookingStore.selectedDate"
            :class="{ active: bookingStore.selectedTime === time }"
            @click="pickSlot(bookingStore.selectedDate, time)"
          >
            {{ time }}
          </button>
        </div>

        <p v-if="errors.slot" class="feedback feedback--error">
          {{ errors.slot }}
        </p>
      </article>

      <article class="booking-card reveal">
        <SectionTitle
          kicker="Step 2"
          title="Share Your Details"
          description="Tell us your goal so we can personalize your consultation."
        />

        <form class="booking-form" @submit.prevent="reserveSlot" novalidate>
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
            Primary Health Goal
            <textarea
              v-model="form.healthGoal"
              rows="4"
              placeholder="Weight loss, PCOS management, diabetes support, etc."
            ></textarea>
            <small v-if="errors.healthGoal">{{ errors.healthGoal }}</small>
          </label>

          <label>
            Additional Notes (optional)
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Any schedule or medical context to note?"
            ></textarea>
          </label>

          <UiButton
            type="submit"
            :loading="bookingStore.isSubmitting"
            :full-width="true"
          >
            {{
              bookingStore.isSubmitting ? "Reserving..." : "Reserve Appointment"
            }}
          </UiButton>
        </form>

        <div class="checkout-state">
          <p>
            <strong>Selected slot:</strong>
            {{ bookingStore.selectedDate || "No date selected" }}
            {{ bookingStore.selectedTime || "" }}
          </p>
          <UiButton variant="outline" :full-width="true"
            >Proceed to Secure Payment</UiButton
          >
          <p class="hint">
            Payment integration-ready UI. Connect Stripe/Razorpay in backend
            phase.
          </p>
        </div>

        <p v-if="bookingStore.error" class="feedback feedback--error">
          {{ bookingStore.error }}
        </p>
        <p
          v-if="bookingStore.successMessage"
          class="feedback feedback--success"
        >
          {{ bookingStore.successMessage }}
        </p>
      </article>
    </section>

    <section class="container">
      <CtaBanner
        title="Need Help Choosing a Slot?"
        description="Use the assistant for instant support or contact us directly for urgent scheduling requests."
        primary-text="Contact Nutritionist"
        primary-to="/contact"
        secondary-text="Browse Services"
        secondary-to="/services"
      />
    </section>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: 64px;
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-size: 0.78rem;
  color: var(--teal-700);
  font-weight: 700;
}

h1 {
  margin: 10px 0;
  color: var(--ink-900);
  font-size: clamp(2rem, 1.5rem + 2.4vw, 3rem);
}

.intro {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.7;
  max-width: 760px;
}

.booking-layout {
  display: grid;
  gap: 14px;
}

.booking-card {
  border-radius: 18px;
  border: 1px solid rgba(96, 164, 158, 0.3);
  background: rgba(255, 255, 255, 0.82);
  padding: 16px;
}

.date-grid,
.time-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.date-grid button,
.time-grid button {
  border: 1px solid rgba(100, 168, 161, 0.35);
  border-radius: 12px;
  background: white;
  padding: 10px;
  font: inherit;
  color: var(--ink-700);
  cursor: pointer;
}

.date-grid button.active,
.time-grid button.active {
  border-color: var(--teal-500);
  background: rgba(24, 163, 147, 0.1);
  color: var(--teal-700);
  font-weight: 700;
}

.date-grid button:disabled,
.time-grid button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.booking-form {
  margin-top: 14px;
  display: grid;
  gap: 12px;
}

label {
  display: grid;
  gap: 8px;
  color: var(--ink-700);
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid rgba(106, 170, 164, 0.34);
  font: inherit;
  color: var(--ink-800);
  background: white;
  padding: 12px;
}

input:focus,
textarea:focus {
  outline: 3px solid rgba(59, 167, 154, 0.2);
  border-color: var(--teal-500);
}

small {
  color: #a64040;
}

.checkout-state {
  margin-top: 14px;
  border-top: 1px solid rgba(106, 170, 164, 0.25);
  padding-top: 12px;
  display: grid;
  gap: 10px;
}

.checkout-state p {
  margin: 0;
  color: var(--ink-600);
}

.hint {
  font-size: 0.84rem;
}

.feedback {
  margin: 10px 0 0;
}

.feedback--error {
  color: #a64040;
}

.feedback--success {
  color: #0f6d63;
}

@media (min-width: 980px) {
  .booking-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .date-grid,
  .time-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
