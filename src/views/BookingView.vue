<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import UiButton from "../components/ui/UiButton.vue";
import { useSeo } from "../composables/useSeo";
import { pageSeo } from "../data/pageSeo";
import { submitBooking } from "../services/bookingService";
import type { BookingPayload } from "../types/models";

useSeo(pageSeo.booking);

const bookingStore = reactive({
  selectedDate: "",
  selectedTime: "",
  isSubmitting: false,
  error: "",
  successMessage: "",
  setSlot(date: string, time: string) {
    this.selectedDate = date;
    this.selectedTime = time;
  },
  clearStatus() {
    this.error = "";
    this.successMessage = "";
  },
  async createBooking(payload: BookingPayload) {
    this.isSubmitting = true;
    try {
      await submitBooking(payload);
      this.successMessage =
        "Appointment reserved. Check your email for confirmation and next steps.";
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : "Could not reserve the slot. Please try again.";
    } finally {
      this.isSubmitting = false;
    }
  },
});

const times = ["08:00", "09:30", "11:00", "13:00", "15:30", "17:00", "19:00"];

const availableDays = computed(() =>
  Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return {
      iso: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    };
  }),
);

const form = reactive({ name: "", email: "", healthGoal: "", notes: "" });
const errors = reactive({ slot: "", name: "", email: "", healthGoal: "" });
const currentStep = ref(1);

const heroMetrics = [
  { value: "24h", label: "reply window" },
  { value: "14+", label: "countries supported" },
  { value: "4.9/5", label: "client experience" },
];

const careFeatures = [
  {
    code: "01",
    title: "Personal strategy",
    desc: "A consultation built around your goal, food culture, schedule, symptoms and lifestyle barriers.",
  },
  {
    code: "02",
    title: "Clinical clarity",
    desc: "Support for weight loss, PCOS, diabetes, gut health, thyroid-friendly routines and family meals.",
  },
  {
    code: "03",
    title: "Remote accountability",
    desc: "Start from home with structured next steps, progress checkpoints and practical meal guidance.",
  },
  {
    code: "04",
    title: "Global access",
    desc: "Flexible online booking for clients in Pakistan, UK, USA, Canada, UAE, KSA, Europe and Australia.",
  },
];

const bookingSteps = [
  {
    step: "01",
    title: "Choose a calm slot",
    detail:
      "Pick a time that fits your routine. Morning, afternoon and evening options are available.",
  },
  {
    step: "02",
    title: "Share your health context",
    detail:
      "Tell us your goal, symptoms, routine, food preferences and any medical notes you want considered.",
  },
  {
    step: "03",
    title: "Get your first direction",
    detail:
      "Your session starts with a clear roadmap for meals, habits, tracking and the right service path.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Toronto, Canada",
    result: "Lost 18 kg in 4 months",
    text: "The plan finally matched my work schedule and family meals. I stopped guessing and started seeing steady progress.",
    avatar: "SM",
  },
  {
    name: "Rahul K.",
    location: "Dubai, UAE",
    result: "Improved glucose control",
    text: "The consultation helped me understand food timing and portions without feeling restricted or overwhelmed.",
    avatar: "RK",
  },
];

const selectedAppointment = computed(() => {
  if (!bookingStore.selectedDate || !bookingStore.selectedTime) {
    return "No date chosen";
  }

  return `${bookingStore.selectedDate} at ${bookingStore.selectedTime}`;
});

function pickDate(date: string) {
  bookingStore.clearStatus();
  bookingStore.setSlot(date, "");
  currentStep.value = 1;
}

function pickSlot(date: string, time: string) {
  bookingStore.clearStatus();
  bookingStore.setSlot(date, time);
  currentStep.value = 2;
}

function validate() {
  errors.slot =
    bookingStore.selectedDate && bookingStore.selectedTime
      ? ""
      : "Please select a date and time.";
  errors.name = form.name.trim().length >= 2 ? "" : "Please enter your name.";
  errors.email = /^\S+@\S+\.\S+$/.test(form.email)
    ? ""
    : "A valid email is required.";
  errors.healthGoal =
    form.healthGoal.trim().length >= 8 ? "" : "Please describe your goal.";
  return !errors.slot && !errors.name && !errors.email && !errors.healthGoal;
}

async function reserveSlot() {
  bookingStore.clearStatus();
  if (!validate()) return;

  currentStep.value = 3;
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
  <main class="booking-page">
    <section class="container booking-hero reveal">
      <div class="booking-hero-copy">
        <p class="eyebrow">Booking System</p>
        <h1>Reserve Your 1-on-1 Online Nutrition Consultation</h1>
        <p class="booking-intro">
          Start with a focused session led by Rimsha Naseer, Nutritionist. We
          will map your goal, routine, symptoms and food preferences into a
          practical first strategy for weight loss, PCOS, diabetes, gut health,
          fitness nutrition or family meal planning.
        </p>
        <div class="booking-hero-actions">
          <a class="booking-primary-link" href="#booking-form">
            Choose My Slot
          </a>
          <UiButton to="/services" variant="outline" size="lg">
            Compare Programs
          </UiButton>
        </div>
        <div class="booking-metrics" aria-label="Booking trust metrics">
          <article v-for="metric in heroMetrics" :key="metric.label">
            <strong>{{ metric.value }}</strong>
            <span>{{ metric.label }}</span>
          </article>
        </div>
      </div>

      <aside class="booking-console glass-card" aria-label="Consultation overview">
        <div class="console-surface" aria-hidden="true"></div>
        <div class="console-topline">
          <span>Live intake desk</span>
          <span class="console-dot"></span>
        </div>
        <div class="consultation-ring">
          <strong>45</strong>
          <span>minute strategy call</span>
        </div>
        <div class="console-list">
          <div>
            <span>Best for</span>
            <strong>Personal diet plan direction</strong>
          </div>
          <div>
            <span>Delivery</span>
            <strong>Online worldwide</strong>
          </div>
          <div>
            <span>Next step</span>
            <strong>Clear plan recommendation</strong>
          </div>
        </div>
      </aside>
    </section>

    <section class="container care-feature-grid reveal-group">
      <article v-for="item in careFeatures" :key="item.title" class="care-card reveal">
        <span>{{ item.code }}</span>
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
      </article>
    </section>

    <section class="container booking-progress" aria-label="Booking progress">
      <div
        v-for="(step, index) in ['Choose Slot', 'Your Details', 'Confirm']"
        :key="step"
        class="progress-node"
        :class="{ active: currentStep === index + 1, done: currentStep > index + 1 }"
      >
        <span>{{ index + 1 }}</span>
        <strong>{{ step }}</strong>
      </div>
    </section>

    <section id="booking-form" class="container booking-layout">
      <article class="booking-panel slot-panel reveal">
        <div class="panel-sheen" aria-hidden="true"></div>
        <div class="panel-heading">
          <p class="eyebrow">Step 01</p>
          <h2>Choose Date and Time</h2>
          <p>
            Select a consultation window. Slots are shown for the next two
            weeks so you can start while motivation is fresh.
          </p>
        </div>

        <div class="selector-block">
          <div class="selector-title">
            <span>Date</span>
            <small>Next 14 days</small>
          </div>
          <div class="date-grid" role="listbox" aria-label="Select date">
            <button
              v-for="day in availableDays"
              :key="day.iso"
              class="slot-button date-button"
              :class="{ active: bookingStore.selectedDate === day.iso }"
              type="button"
              @click="pickDate(day.iso)"
            >
              {{ day.label }}
            </button>
          </div>
        </div>

        <div class="selector-block">
          <div class="selector-title">
            <span>Time</span>
            <small>Local availability</small>
          </div>
          <div class="time-grid" role="listbox" aria-label="Select time">
            <button
              v-for="time in times"
              :key="time"
              class="slot-button time-button"
              :disabled="!bookingStore.selectedDate"
              :class="{ active: bookingStore.selectedTime === time }"
              type="button"
              @click="pickSlot(bookingStore.selectedDate, time)"
            >
              <strong>{{ time }}</strong>
              <span>{{ parseInt(time) < 12 ? "AM" : "PM" }}</span>
            </button>
          </div>
        </div>

        <p v-if="errors.slot" class="booking-feedback booking-feedback--error">
          {{ errors.slot }}
        </p>

        <div class="slot-preview">
          <span>Selected appointment</span>
          <strong>{{ selectedAppointment }}</strong>
        </div>
      </article>

      <article class="booking-panel details-panel reveal">
        <div class="panel-sheen" aria-hidden="true"></div>
        <div class="panel-heading">
          <p class="eyebrow">Step 02</p>
          <h2>Share Your Details</h2>
          <p>
            A little context helps us prepare a meaningful session instead of a
            generic diet conversation.
          </p>
        </div>

        <form class="booking-form" @submit.prevent="reserveSlot" novalidate>
          <label>
            <span>Full Name</span>
            <input
              v-model="form.name"
              type="text"
              placeholder="Your full name"
              autocomplete="name"
            />
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>

          <label>
            <span>Email Address</span>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@email.com"
              autocomplete="email"
            />
            <small v-if="errors.email">{{ errors.email }}</small>
          </label>

          <label>
            <span>Primary Health Goal</span>
            <textarea
              v-model="form.healthGoal"
              rows="4"
              placeholder="Weight loss, PCOS management, diabetes support, gut health, fitness nutrition..."
            ></textarea>
            <small v-if="errors.healthGoal">{{ errors.healthGoal }}</small>
          </label>

          <label>
            <span>Additional Notes <em>optional</em></span>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Share schedule, culture, preferences, reports or concerns."
            ></textarea>
          </label>

          <button
            class="reserve-button"
            type="submit"
            :disabled="bookingStore.isSubmitting"
          >
            <span v-if="bookingStore.isSubmitting" class="button-loader"></span>
            {{
              bookingStore.isSubmitting
                ? "Reserving Appointment"
                : "Reserve Appointment"
            }}
          </button>
        </form>

        <div class="checkout-preview">
          <div>
            <span>Appointment</span>
            <strong>{{ selectedAppointment }}</strong>
          </div>
          <button type="button">
            Secure payment ready
            <span>Stripe / Razorpay</span>
          </button>
        </div>

        <div v-if="bookingStore.error" class="booking-feedback booking-feedback--error">
          {{ bookingStore.error }}
        </div>
        <div
          v-if="bookingStore.successMessage"
          class="booking-feedback booking-feedback--success"
        >
          {{ bookingStore.successMessage }}
        </div>
      </article>
    </section>

    <section class="container booking-assurance reveal">
      <div class="assurance-copy">
        <p class="eyebrow">What Happens Next</p>
        <h2>A professional first step, without pressure or confusion</h2>
        <p>
          The booking experience is designed for people who want help from home
          but need clarity before committing to a full program.
        </p>
      </div>
      <div class="assurance-grid">
        <article v-for="item in bookingSteps" :key="item.step">
          <span>{{ item.step }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </section>

    <section class="container booking-testimonials reveal">
      <div class="testimonial-heading">
        <p class="eyebrow">Client Confidence</p>
        <h2>Real People. Real Results.</h2>
      </div>
      <div class="testimonial-grid">
        <article v-for="item in testimonials" :key="item.name" class="testimonial-card">
          <div class="testimonial-top">
            <span class="testimonial-avatar">{{ item.avatar }}</span>
            <div>
              <strong>{{ item.name }}</strong>
              <small>{{ item.location }}</small>
            </div>
            <em>5.0</em>
          </div>
          <p>{{ item.text }}</p>
          <span class="result-pill">{{ item.result }}</span>
        </article>
      </div>
    </section>

    <section class="container booking-cta reveal">
      <div>
        <p class="eyebrow">Limited Consultation Slots</p>
        <h2>Unsure which slot or program fits you best?</h2>
        <p>
          Send your question or explore the services first. The goal is a clear,
          sustainable nutrition path, not another rushed diet attempt.
        </p>
      </div>
      <div class="booking-cta-actions">
        <UiButton to="/contact" size="lg">Ask a Question</UiButton>
        <UiButton to="/services" variant="outline" size="lg">
          Explore Services
        </UiButton>
      </div>
    </section>
  </main>
</template>

<style>
.booking-page {
  position: relative;
  display: grid;
  gap: 72px;
  padding-bottom: 82px;
  overflow: hidden;
}

.booking-page::before {
  content: "";
  position: absolute;
  inset: -80px 0 auto;
  height: 760px;
  z-index: -1;
  background:
    linear-gradient(
      115deg,
      rgba(255, 255, 255, 0.82),
      rgba(236, 253, 245, 0.34)
    ),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.055) 0,
      rgba(6, 95, 70, 0.055) 1px,
      transparent 1px,
      transparent 42px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(6, 95, 70, 0.045) 0,
      rgba(6, 95, 70, 0.045) 1px,
      transparent 1px,
      transparent 42px
    );
  mask-image: linear-gradient(to bottom, #000 0%, transparent 100%);
}

.booking-hero {
  display: grid;
  gap: 34px;
  align-items: center;
  padding-top: 16px;
}

.booking-hero-copy {
  display: grid;
  gap: 18px;
}

.booking-page .eyebrow {
  margin: 0;
}

.booking-page h1,
.booking-page h2,
.booking-page h3 {
  letter-spacing: 0;
}

.booking-page h1 {
  max-width: 790px;
  margin: 0;
  font-size: 3rem;
  line-height: 1.04;
  color: var(--ink-900);
}

.booking-intro {
  max-width: 780px;
  margin: 0;
  color: var(--ink-600);
  font-size: 1.08rem;
  line-height: 1.78;
}

.booking-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}

.booking-primary-link {
  min-height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  padding: 0 34px;
  color: white;
  font-weight: 800;
  text-decoration: none;
  background: linear-gradient(
    135deg,
    var(--emerald-700),
    var(--emerald-500) 62%,
    var(--teal-500)
  );
  box-shadow:
    0 16px 38px rgba(5, 150, 105, 0.26),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
  transition:
    transform 260ms ease,
    box-shadow 260ms ease;
}

.booking-primary-link:hover {
  transform: translateY(-3px);
  box-shadow:
    0 24px 54px rgba(5, 150, 105, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}

.booking-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  max-width: 680px;
  margin-top: 8px;
}

.booking-metrics article {
  min-height: 96px;
  display: grid;
  align-content: center;
  gap: 4px;
  padding: 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow:
    0 18px 44px rgba(6, 78, 59, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

.booking-metrics strong {
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 1.75rem;
  line-height: 1;
}

.booking-metrics span {
  color: var(--ink-500);
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
}

.booking-console {
  position: relative;
  min-height: 430px;
  display: grid;
  align-content: space-between;
  overflow: hidden;
  padding: 26px;
  border: 1px solid rgba(16, 185, 129, 0.18);
  background: rgba(255, 255, 255, 0.72);
  transform-style: preserve-3d;
}

.console-surface {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(
      circle at 78% 22%,
      rgba(20, 184, 166, 0.2),
      transparent 34%
    ),
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.88),
      rgba(236, 253, 245, 0.48)
    ),
    repeating-linear-gradient(
      135deg,
      rgba(6, 95, 70, 0.06) 0,
      rgba(6, 95, 70, 0.06) 1px,
      transparent 1px,
      transparent 20px
    );
}

.booking-console::after,
.booking-panel::after,
.booking-assurance::after,
.booking-cta::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 1;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    112deg,
    transparent 0%,
    rgba(255, 255, 255, 0.76) 42%,
    transparent 62%
  );
  transform: translateX(-78%);
  animation: booking-sheen 7s ease-in-out infinite;
}

.booking-console > :not(.console-surface),
.booking-panel > :not(.panel-sheen),
.booking-assurance > *,
.booking-cta > * {
  position: relative;
  z-index: 2;
}

.console-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.console-topline span:first-child {
  border-radius: 999px;
  padding: 9px 13px;
  color: var(--emerald-800);
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.2);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.console-dot {
  width: 14px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--emerald-500);
  box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.14);
  animation: booking-pulse 2.4s ease-in-out infinite;
}

.consultation-ring {
  width: min(230px, 72%);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  align-content: center;
  margin: 18px auto;
  border-radius: 50%;
  background:
    linear-gradient(var(--glass-strong), var(--glass-strong)) padding-box,
    conic-gradient(
        from 20deg,
        var(--emerald-700),
        var(--teal-400),
        #f59e0b,
        var(--emerald-700)
      )
      border-box;
  border: 10px solid transparent;
  box-shadow:
    0 28px 72px rgba(6, 78, 59, 0.18),
    inset 0 0 28px rgba(16, 185, 129, 0.14);
  transform: translateZ(34px);
}

.consultation-ring strong {
  color: var(--ink-900);
  font-family: var(--font-heading);
  font-size: 4rem;
  line-height: 0.9;
}

.consultation-ring span {
  max-width: 120px;
  color: var(--ink-500);
  font-size: 0.78rem;
  font-weight: 850;
  line-height: 1.25;
  text-align: center;
  text-transform: uppercase;
}

.console-list {
  display: grid;
  gap: 10px;
}

.console-list div {
  display: grid;
  gap: 4px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.13);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

.console-list span {
  color: var(--emerald-700);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.console-list strong {
  color: var(--ink-800);
  line-height: 1.25;
}

.care-feature-grid {
  display: grid;
  gap: 14px;
}

.care-card {
  position: relative;
  overflow: hidden;
  min-height: 205px;
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow:
    0 18px 52px rgba(6, 78, 59, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
  transform-style: preserve-3d;
  transition:
    transform 320ms ease,
    box-shadow 320ms ease,
    border-color 320ms ease;
}

.care-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 88% 16%,
      rgba(20, 184, 166, 0.14),
      transparent 34%
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), transparent 54%);
  pointer-events: none;
}

.care-card:hover {
  transform: perspective(1100px) rotateX(2deg) rotateY(-2deg) translateY(-7px);
  border-color: rgba(16, 185, 129, 0.36);
  box-shadow:
    0 28px 72px rgba(6, 78, 59, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.care-card > * {
  position: relative;
  z-index: 1;
}

.care-card > span {
  width: 48px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-family: var(--font-heading);
  font-weight: 900;
  box-shadow: 0 14px 32px rgba(5, 150, 105, 0.22);
}

.care-card h2 {
  margin: 0;
  color: var(--ink-900);
  font-size: 1.35rem;
}

.care-card p {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.68;
}

.booking-progress {
  width: min(620px, 100% - 40px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 8px;
  position: relative;
}

.booking-progress::before {
  content: "";
  position: absolute;
  top: 22px;
  left: 17%;
  right: 17%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(16, 185, 129, 0.28),
    rgba(20, 184, 166, 0.12)
  );
}

.progress-node {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 8px;
  color: var(--ink-400);
}

.progress-node span {
  width: 44px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(16, 185, 129, 0.22);
  font-weight: 900;
  box-shadow: 0 12px 26px rgba(6, 78, 59, 0.09);
}

.progress-node strong {
  color: currentColor;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.progress-node.active,
.progress-node.done {
  color: var(--emerald-700);
}

.progress-node.active span,
.progress-node.done span {
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  box-shadow: 0 16px 34px rgba(5, 150, 105, 0.24);
}

.booking-layout {
  display: grid;
  gap: 16px;
  align-items: start;
}

.booking-panel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  padding: clamp(22px, 3vw, 34px);
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(16, 185, 129, 0.18);
  box-shadow:
    0 22px 64px rgba(6, 78, 59, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  isolation: isolate;
}

.panel-sheen {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(
      circle at 90% 10%,
      rgba(20, 184, 166, 0.14),
      transparent 34%
    ),
    repeating-linear-gradient(
      90deg,
      rgba(16, 185, 129, 0.045) 0,
      rgba(16, 185, 129, 0.045) 1px,
      transparent 1px,
      transparent 32px
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.7), transparent 42%);
}

.panel-heading {
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
}

.panel-heading h2 {
  margin: 0;
  color: var(--ink-900);
  font-size: 2.2rem;
}

.panel-heading p:not(.eyebrow) {
  max-width: 560px;
  margin: 0;
  color: var(--ink-600);
  line-height: 1.72;
}

.selector-block {
  display: grid;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid rgba(16, 185, 129, 0.13);
}

.selector-block + .selector-block {
  margin-top: 24px;
}

.selector-title {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
}

.selector-title span {
  color: var(--ink-900);
  font-weight: 900;
}

.selector-title small {
  color: var(--emerald-700);
  font-weight: 850;
}

.date-grid,
.time-grid {
  display: grid;
  gap: 9px;
}

.date-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.time-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.slot-button {
  min-height: 48px;
  border: 1px solid rgba(16, 185, 129, 0.18);
  border-radius: 16px;
  color: var(--ink-700);
  background: rgba(255, 255, 255, 0.7);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.82);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;
}

.slot-button:hover:not(:disabled) {
  transform: translateY(-3px);
  border-color: rgba(16, 185, 129, 0.42);
  background: rgba(236, 253, 245, 0.82);
  box-shadow: 0 12px 28px rgba(6, 78, 59, 0.1);
}

.slot-button.active {
  color: white;
  border-color: transparent;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  box-shadow:
    0 16px 34px rgba(5, 150, 105, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.slot-button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.time-button {
  min-height: 60px;
  display: grid;
  gap: 2px;
  align-content: center;
  justify-items: center;
}

.time-button strong {
  font-size: 0.96rem;
}

.time-button span {
  font-size: 0.68rem;
  font-weight: 900;
  opacity: 0.7;
}

.slot-preview,
.checkout-preview {
  margin-top: 22px;
  padding: 16px;
  border-radius: 18px;
  background: rgba(236, 253, 245, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);
}

.slot-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.slot-preview span,
.checkout-preview span {
  color: var(--ink-500);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.slot-preview strong,
.checkout-preview strong {
  color: var(--emerald-800);
}

.booking-form {
  display: grid;
  gap: 14px;
}

.booking-form label {
  display: grid;
  gap: 8px;
}

.booking-form label > span {
  color: var(--ink-800);
  font-weight: 900;
}

.booking-form em {
  color: var(--ink-400);
  font-style: normal;
  font-weight: 700;
}

.booking-form input,
.booking-form textarea {
  width: 100%;
  border: 1px solid rgba(16, 185, 129, 0.22);
  border-radius: 16px;
  color: var(--ink-800);
  background: rgba(255, 255, 255, 0.72);
  padding: 15px 16px;
  font: inherit;
  font-weight: 700;
  outline: none;
  resize: vertical;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.82);
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;
}

.booking-form input:focus,
.booking-form textarea:focus {
  border-color: rgba(16, 185, 129, 0.58);
  background: rgba(255, 255, 255, 0.94);
  box-shadow:
    0 0 0 4px rgba(16, 185, 129, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.booking-form input::placeholder,
.booking-form textarea::placeholder {
  color: var(--ink-400);
}

.booking-form small {
  color: #b42318;
  font-weight: 800;
}

.reserve-button {
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: 18px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  box-shadow:
    0 16px 38px rgba(5, 150, 105, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.26);
  font: inherit;
  font-weight: 900;
  cursor: pointer;
  transition:
    transform 240ms ease,
    box-shadow 240ms ease,
    opacity 240ms ease;
}

.reserve-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow:
    0 24px 54px rgba(5, 150, 105, 0.33),
    inset 0 1px 0 rgba(255, 255, 255, 0.32);
}

.reserve-button:disabled {
  cursor: progress;
  opacity: 0.82;
}

.button-loader {
  width: 18px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.42);
  border-top-color: white;
  animation: booking-spin 900ms linear infinite;
}

.checkout-preview {
  display: grid;
  gap: 12px;
}

.checkout-preview div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.checkout-preview button {
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  border-radius: 15px;
  border: 1px solid rgba(16, 185, 129, 0.22);
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.7);
  padding: 0 16px;
  font: inherit;
  font-weight: 900;
}

.checkout-preview button span {
  color: var(--teal-600);
  font-size: 0.72rem;
  text-transform: none;
  letter-spacing: 0;
}

.booking-feedback {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  font-weight: 850;
}

.booking-feedback--error {
  color: #9f331f;
  background: rgba(254, 226, 226, 0.72);
  border: 1px solid rgba(248, 113, 113, 0.28);
}

.booking-feedback--success {
  color: var(--emerald-800);
  background: rgba(209, 250, 229, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.24);
}

.booking-assurance,
.booking-cta {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(16, 185, 129, 0.16);
  background:
    linear-gradient(
      135deg,
      rgba(236, 253, 245, 0.86),
      rgba(255, 255, 255, 0.66)
    ),
    rgba(255, 255, 255, 0.72);
  box-shadow: 0 22px 62px rgba(6, 78, 59, 0.09);
  isolation: isolate;
}

.booking-assurance {
  display: grid;
  gap: 28px;
  padding: clamp(24px, 4vw, 38px);
}

.assurance-copy {
  display: grid;
  gap: 12px;
}

.assurance-copy h2,
.testimonial-heading h2,
.booking-cta h2 {
  margin: 0;
  color: var(--ink-900);
  font-size: 2.45rem;
}

.assurance-copy p:not(.eyebrow),
.booking-cta p {
  max-width: 680px;
  margin: 0;
  color: var(--ink-600);
  line-height: 1.74;
}

.assurance-grid {
  display: grid;
  gap: 12px;
}

.assurance-grid article {
  min-height: 190px;
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 20px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

.assurance-grid span {
  width: 46px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-family: var(--font-heading);
  font-weight: 900;
}

.assurance-grid h3 {
  margin: 0;
  color: var(--ink-900);
  font-size: 1.22rem;
}

.assurance-grid p {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.66;
}

.booking-testimonials {
  display: grid;
  gap: 22px;
}

.testimonial-heading {
  display: grid;
  gap: 10px;
  justify-items: center;
  text-align: center;
}

.testimonial-grid {
  display: grid;
  gap: 14px;
}

.testimonial-card {
  display: grid;
  gap: 16px;
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow:
    0 18px 48px rgba(6, 78, 59, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
}

.testimonial-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonial-avatar {
  width: 48px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-size: 0.78rem;
  font-weight: 900;
  box-shadow: 0 14px 28px rgba(5, 150, 105, 0.22);
}

.testimonial-top div {
  display: grid;
}

.testimonial-top strong {
  color: var(--ink-900);
}

.testimonial-top small {
  color: var(--ink-500);
}

.testimonial-top em {
  margin-left: auto;
  color: #f59e0b;
  font-style: normal;
  font-weight: 900;
}

.testimonial-card p {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.72;
}

.result-pill {
  width: fit-content;
  border-radius: 999px;
  padding: 8px 12px;
  color: var(--emerald-800);
  background: rgba(16, 185, 129, 0.11);
  border: 1px solid rgba(16, 185, 129, 0.22);
  font-size: 0.78rem;
  font-weight: 900;
}

.booking-cta {
  display: grid;
  gap: 24px;
  align-items: center;
  padding: clamp(28px, 5vw, 46px);
  background:
    radial-gradient(
      circle at 86% 22%,
      rgba(20, 184, 166, 0.32),
      transparent 34%
    ),
    linear-gradient(135deg, var(--emerald-900), var(--emerald-700), var(--teal-600));
  box-shadow: 0 28px 76px rgba(6, 78, 59, 0.18);
}

.booking-cta .eyebrow,
.booking-cta .eyebrow::before {
  color: var(--emerald-200);
}

.booking-cta h2 {
  max-width: 720px;
  color: white;
}

.booking-cta p {
  color: rgba(255, 255, 255, 0.78);
}

.booking-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@keyframes booking-sheen {
  0%,
  38% {
    transform: translateX(-78%);
  }
  68%,
  100% {
    transform: translateX(78%);
  }
}

@keyframes booking-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.82);
    opacity: 0.72;
  }
}

@keyframes booking-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 760px) {
  .care-feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .assurance-grid,
  .testimonial-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .testimonial-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 980px) {
  .booking-hero {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.56fr);
  }

  .booking-page h1 {
    font-size: 4.35rem;
  }

  .booking-layout {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1fr);
  }

  .date-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .booking-cta {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}

@media (max-width: 720px) {
  .booking-page {
    gap: 54px;
    padding-bottom: 64px;
  }

  .booking-page h1 {
    font-size: 2.35rem;
  }

  .booking-intro {
    font-size: 1rem;
  }

  .booking-hero-actions,
  .booking-cta-actions {
    display: grid;
  }

  .booking-primary-link,
  .booking-hero-actions .ui-button,
  .booking-cta-actions .ui-button {
    width: 100%;
  }

  .booking-metrics {
    grid-template-columns: 1fr;
  }

  .time-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .booking-progress {
    width: min(100% - 40px, 620px);
  }

  .progress-node strong {
    font-size: 0.66rem;
  }

  .slot-preview,
  .checkout-preview div,
  .checkout-preview button {
    display: grid;
    justify-content: stretch;
  }

  .assurance-copy h2,
  .testimonial-heading h2,
  .booking-cta h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .date-grid,
  .time-grid {
    grid-template-columns: 1fr;
  }

  .booking-panel {
    padding: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .booking-console::after,
  .booking-panel::after,
  .booking-assurance::after,
  .booking-cta::after,
  .console-dot,
  .button-loader {
    animation: none;
  }

  .booking-primary-link:hover,
  .care-card:hover,
  .slot-button:hover:not(:disabled),
  .reserve-button:hover:not(:disabled) {
    transform: none;
  }
}
</style>
