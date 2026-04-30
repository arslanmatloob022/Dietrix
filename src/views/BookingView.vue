<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { useSeo } from "../composables/useSeo";
import { pageSeo } from "../data/pageSeo";

useSeo(pageSeo.booking);

// ── Minimal stubs so the file compiles standalone ──
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
  async createBooking() {
    this.isSubmitting = true;
    await new Promise((r) => setTimeout(r, 1800));
    this.isSubmitting = false;
    this.successMessage =
      "🎉 Appointment reserved! Check your email for confirmation.";
  },
});

const times = ["08:00", "09:30", "11:00", "13:00", "15:30", "17:00", "19:00"];

const availableDays = computed(() =>
  Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("en-US", {
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
const mouseX = ref(0);
const mouseY = ref(0);

onMounted(() => {
  document.addEventListener("mousemove", (e) => {
    mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20;
  });
});

function pickSlot(date: string, time: string) {
  bookingStore.clearStatus();
  bookingStore.setSlot(date, time);
  if (date && time) currentStep.value = 2;
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
  await bookingStore.createBooking();
  if (!bookingStore.error) {
    form.name = "";
    form.email = "";
    form.healthGoal = "";
    form.notes = "";
  }
}

const benefits = [
  {
    icon: "🧬",
    title: "Personalized Plan",
    desc: "Custom nutrition blueprint tailored to your DNA and lifestyle",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    desc: "Real-time analytics dashboard to monitor your transformation",
  },
  {
    icon: "🤝",
    title: "1-on-1 Support",
    desc: "Direct access to your dietitian between sessions",
  },
  {
    icon: "🌿",
    title: "Holistic Approach",
    desc: "Mind-body wellness integration beyond just food choices",
  },
];

const stats = [
  { value: "2,400+", label: "Clients Transformed" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "12+", label: "Years Experience" },
  { value: "50+", label: "Health Conditions" },
];

const testimonials = [
  {
    name: "Sarah M.",
    result: "Lost 18kg in 4 months",
    text: "The personalized approach completely changed how I relate to food. Life-changing!",
    avatar: "SM",
  },
  {
    name: "Rahul K.",
    result: "Reversed pre-diabetes",
    text: "My doctor is amazed at my blood sugar levels. Best investment I've ever made.",
    avatar: "RK",
  },
];
</script>

<template>
  <main class="page">
    <!-- ── Ambient background ── -->
    <div class="ambient-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- ── Floating particles ── -->
    <div class="particles" aria-hidden="true">
      <span
        v-for="n in 20"
        :key="n"
        class="particle"
        :style="{ '--i': n }"
      ></span>
    </div>

    <!-- ── Hero Section ── -->
    <section class="hero container">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        Booking System · Live Availability
      </div>
      <h1 class="hero-title">
        Reserve Your<br />
        <span class="gradient-text">1-on-1 Nutrition</span><br />
        Consultation
      </h1>
      <p class="hero-sub">
        Join 2,400+ clients who transformed their health with science-backed,
        personalized nutrition therapy. Your breakthrough starts with one
        session.
      </p>

      <!-- Stats bar -->
      <div class="stats-row">
        <div v-for="stat in stats" :key="stat.label" class="stat-pill">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- ── Benefits Strip ── -->
    <section class="container benefits-section">
      <div class="benefits-grid">
        <div v-for="b in benefits" :key="b.title" class="benefit-card">
          <div class="benefit-icon">{{ b.icon }}</div>
          <h3>{{ b.title }}</h3>
          <p>{{ b.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── Progress Steps ── -->
    <section class="container">
      <div class="progress-track">
        <div
          v-for="(step, i) in ['Choose Slot', 'Your Details', 'Confirm & Pay']"
          :key="step"
          class="progress-step"
          :class="{ active: currentStep === i + 1, done: currentStep > i + 1 }"
        >
          <div class="step-bubble">
            <span v-if="currentStep > i + 1">✓</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="step-label">{{ step }}</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: ((currentStep - 1) / 2) * 100 + '%' }"
          ></div>
        </div>
      </div>
    </section>

    <!-- ── Main Booking Layout ── -->
    <section class="container booking-layout">
      <!-- Step 1: Date & Time -->
      <article
        class="glass-card booking-card"
        :class="{ focused: currentStep === 1 }"
      >
        <div class="card-glow"></div>
        <div class="card-header">
          <div class="step-tag"><span class="step-dot"></span>STEP 01</div>
          <h2>Choose Date & Time</h2>
          <p class="card-desc">Premium slots fill up fast. Secure yours now.</p>
        </div>

        <div class="section-divider">
          <span>📅 Select Date</span>
        </div>

        <div class="date-grid" role="listbox" aria-label="Select date">
          <button
            v-for="day in availableDays"
            :key="day.iso"
            class="slot-btn date-btn"
            :class="{ active: bookingStore.selectedDate === day.iso }"
            @click="bookingStore.setSlot(day.iso, '')"
          >
            <span class="slot-ripple"></span>
            {{ day.label }}
          </button>
        </div>

        <div class="section-divider">
          <span>⏰ Select Time</span>
        </div>

        <div class="time-grid" role="listbox" aria-label="Select time">
          <button
            v-for="time in times"
            :key="time"
            class="slot-btn time-btn"
            :disabled="!bookingStore.selectedDate"
            :class="{ active: bookingStore.selectedTime === time }"
            @click="pickSlot(bookingStore.selectedDate, time)"
          >
            <span class="slot-ripple"></span>
            <span class="time-label">{{ time }}</span>
            <span class="time-suffix">{{
              parseInt(time) < 12 ? "AM" : "PM"
            }}</span>
          </button>
        </div>

        <p v-if="errors.slot" class="feedback feedback--error">
          ⚠ {{ errors.slot }}
        </p>

        <!-- Selected slot preview -->
        <div
          v-if="bookingStore.selectedDate && bookingStore.selectedTime"
          class="slot-preview"
        >
          <div class="slot-preview-inner">
            <span>📌</span>
            <div>
              <strong>{{ bookingStore.selectedDate }}</strong>
              <span> at </span>
              <strong>{{ bookingStore.selectedTime }}</strong>
            </div>
            <span class="slot-badge">Held for 10 min</span>
          </div>
        </div>
      </article>

      <!-- Step 2: Details -->
      <article
        class="glass-card booking-card"
        :class="{ focused: currentStep === 2 }"
      >
        <div class="card-glow card-glow--right"></div>
        <div class="card-header">
          <div class="step-tag"><span class="step-dot"></span>STEP 02</div>
          <h2>Share Your Details</h2>
          <p class="card-desc">
            Help us craft the most impactful session for you.
          </p>
        </div>

        <form class="booking-form" @submit.prevent="reserveSlot" novalidate>
          <div class="input-group">
            <label>
              <span class="label-text">👤 Full Name</span>
              <div class="input-wrap">
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Your full name"
                  autocomplete="name"
                />
                <div class="input-line"></div>
              </div>
              <small v-if="errors.name" class="err">{{ errors.name }}</small>
            </label>
          </div>

          <div class="input-group">
            <label>
              <span class="label-text">✉️ Email Address</span>
              <div class="input-wrap">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="you@email.com"
                  autocomplete="email"
                />
                <div class="input-line"></div>
              </div>
              <small v-if="errors.email" class="err">{{ errors.email }}</small>
            </label>
          </div>

          <div class="input-group">
            <label>
              <span class="label-text">🎯 Primary Health Goal</span>
              <div class="input-wrap textarea-wrap">
                <textarea
                  v-model="form.healthGoal"
                  rows="4"
                  placeholder="Weight loss, PCOS management, diabetes support…"
                ></textarea>
                <div class="input-line"></div>
              </div>
              <small v-if="errors.healthGoal" class="err">{{
                errors.healthGoal
              }}</small>
            </label>
          </div>

          <div class="input-group">
            <label>
              <span class="label-text"
                >📝 Additional Notes <em>(optional)</em></span
              >
              <div class="input-wrap textarea-wrap">
                <textarea
                  v-model="form.notes"
                  rows="3"
                  placeholder="Any schedule or medical context to share?"
                ></textarea>
                <div class="input-line"></div>
              </div>
            </label>
          </div>

          <button
            type="submit"
            class="cta-btn"
            :class="{ loading: bookingStore.isSubmitting }"
            :disabled="bookingStore.isSubmitting"
          >
            <span v-if="!bookingStore.isSubmitting" class="btn-content">
              <span>Reserve Appointment</span>
              <span class="btn-arrow">→</span>
            </span>
            <span v-else class="btn-loader">
              <span class="spinner"></span> Reserving…
            </span>
            <div class="btn-glow"></div>
          </button>
        </form>

        <!-- Checkout state -->
        <div class="checkout-state">
          <div class="selected-slot-display">
            <div class="slot-info">
              <span class="slot-label">Selected Appointment</span>
              <span class="slot-value">
                {{ bookingStore.selectedDate || "No date chosen" }}
                {{
                  bookingStore.selectedTime
                    ? "· " + bookingStore.selectedTime
                    : ""
                }}
              </span>
            </div>
          </div>
          <button class="pay-btn">
            <span>🔒 Proceed to Secure Payment</span>
            <span class="pay-icons">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe secure payment for online nutrition consultation"
                height="16"
                onerror="this.style.display = 'none'"
              />
            </span>
          </button>
          <p class="hint">
            Payment integration-ready UI · Connect Stripe / Razorpay in backend
            phase
          </p>
        </div>

        <div v-if="bookingStore.error" class="feedback feedback--error">
          {{ bookingStore.error }}
        </div>
        <div
          v-if="bookingStore.successMessage"
          class="feedback feedback--success"
        >
          {{ bookingStore.successMessage }}
        </div>
      </article>
    </section>

    <!-- ── Testimonials ── -->
    <section class="container testimonials-section">
      <div class="section-eyebrow">What clients say</div>
      <h2 class="section-title">Real People. Real Results.</h2>
      <div class="testimonials-grid">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="testimonial-card glass-card"
        >
          <div class="testimonial-top">
            <div class="avatar">{{ t.avatar }}</div>
            <div>
              <strong>{{ t.name }}</strong>
              <span class="result-tag">{{ t.result }}</span>
            </div>
            <div class="stars">★★★★★</div>
          </div>
          <p class="testimonial-text">"{{ t.text }}"</p>
        </div>
      </div>
    </section>

    <!-- ── CTA Banner ── -->
    <section class="container">
      <div class="cta-banner glass-card">
        <div class="cta-glow"></div>
        <div class="cta-content">
          <h2>Need Help Choosing a Slot?</h2>
          <p>
            Our team is available 9am–8pm, 7 days a week. Get instant answers.
          </p>
          <div class="cta-actions">
            <a href="/contact" class="cta-btn-primary">Contact Nutritionist</a>
            <a href="/services" class="cta-btn-ghost">Browse Services →</a>
          </div>
        </div>
        <div class="cta-visual">🥗</div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap");

/* ── CSS Variables ── */
:root {
  --teal-900: #052e2b;
  --teal-800: #0a3d38;
  --teal-700: #0d5c54;
  --teal-600: #0f7a6e;
  --teal-500: #18a393;
  --teal-400: #2ec9b7;
  --teal-300: #6eddd2;
  --teal-100: #d0f5f1;
  --ink-900: #0b1a18;
  --ink-800: #112220;
  --ink-700: #1e3633;
  --ink-600: #2e4f4b;
  --gold: #f0c060;
  --glass-bg: rgba(10, 40, 36, 0.6);
  --glass-border: rgba(46, 201, 183, 0.18);
  --font-display: "Syne", sans-serif;
  --font-body: "DM Sans", sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  min-height: 100vh;
  background: #050f0e;
  font-family: var(--font-body);
  color: #e8f5f3;
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 80px;
  padding-bottom: 100px;
}

/* ── Ambient BG ── */
.ambient-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #18a393 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation: orbFloat1 12s ease-in-out infinite;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #0d5c54 0%, transparent 70%);
  bottom: -100px;
  right: -100px;
  animation: orbFloat2 15s ease-in-out infinite;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #f0c060 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.08;
  animation: orbFloat3 20s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(60px, 80px);
  }
}
@keyframes orbFloat2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-50px, -60px);
  }
}
@keyframes orbFloat3 {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
  }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(46, 201, 183, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(46, 201, 183, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Particles ── */
.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--teal-400);
  opacity: 0;
  left: calc(var(--i) * 5%);
  animation: particleRise calc(8s + var(--i) * 0.4s) calc(var(--i) * 0.5s)
    infinite ease-in;
}
@keyframes particleRise {
  0% {
    bottom: -10px;
    opacity: 0;
    transform: translateX(0) scale(0.5);
  }
  20% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    bottom: 110vh;
    opacity: 0;
    transform: translateX(calc(sin(var(--i)) * 80px)) scale(1.5);
  }
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* ── Hero ── */
.hero {
  padding-top: 80px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(46, 201, 183, 0.12);
  border: 1px solid rgba(46, 201, 183, 0.3);
  color: var(--teal-300);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  animation: fadeSlideDown 0.8s ease both;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--teal-400);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(46, 201, 183, 0.6);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(46, 201, 183, 0);
  }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
  color: #e8f5f3;
  margin-bottom: 24px;
  animation: fadeSlideDown 0.8s 0.15s ease both;
}

.gradient-text {
  background: linear-gradient(135deg, var(--teal-400), #a8f0e8, var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-size: 1.1rem;
  color: rgba(232, 245, 243, 0.65);
  max-width: 620px;
  margin: 0 auto 40px;
  line-height: 1.8;
  animation: fadeSlideDown 0.8s 0.3s ease both;
}

@keyframes fadeSlideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  animation: fadeSlideDown 0.8s 0.45s ease both;
}

.stat-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: rgba(46, 201, 183, 0.08);
  border: 1px solid rgba(46, 201, 183, 0.2);
  border-radius: 16px;
  padding: 14px 24px;
  backdrop-filter: blur(10px);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.stat-pill:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(46, 201, 183, 0.15);
}

.stat-pill strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--teal-300);
}

.stat-pill span {
  font-size: 0.72rem;
  color: rgba(232, 245, 243, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

/* ── Benefits ── */
.benefits-section {
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.benefit-card {
  background: rgba(10, 40, 36, 0.5);
  border: 1px solid rgba(46, 201, 183, 0.15);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(16px);
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s;
  animation: fadeSlideUp 0.6s ease both;
}

.benefit-card:hover {
  transform: translateY(-6px) rotateX(3deg);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(46, 201, 183, 0.25);
}

.benefit-icon {
  font-size: 2rem;
  margin-bottom: 12px;
  display: block;
  filter: drop-shadow(0 0 12px rgba(46, 201, 183, 0.4));
}

.benefit-card h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--teal-300);
  margin-bottom: 6px;
}

.benefit-card p {
  font-size: 0.84rem;
  color: rgba(232, 245, 243, 0.55);
  line-height: 1.6;
}

/* ── Progress Track ── */
.progress-track {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.progress-bar {
  position: absolute;
  left: 60px;
  right: 60px;
  height: 2px;
  background: rgba(46, 201, 183, 0.15);
  z-index: 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--teal-500), var(--teal-300));
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 12px rgba(46, 201, 183, 0.5);
}

.progress-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.step-bubble {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(10, 40, 36, 0.8);
  border: 2px solid rgba(46, 201, 183, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: rgba(232, 245, 243, 0.4);
  transition: all 0.4s;
}

.progress-step.active .step-bubble {
  border-color: var(--teal-400);
  background: rgba(46, 201, 183, 0.15);
  color: var(--teal-300);
  box-shadow: 0 0 20px rgba(46, 201, 183, 0.3);
  animation: stepPulse 2s infinite;
}

.progress-step.done .step-bubble {
  background: var(--teal-600);
  border-color: var(--teal-400);
  color: white;
}

@keyframes stepPulse {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(46, 201, 183, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(46, 201, 183, 0.6);
  }
}

.step-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(232, 245, 243, 0.4);
}

.progress-step.active .step-label {
  color: var(--teal-300);
}
.progress-step.done .step-label {
  color: var(--teal-400);
}

/* ── Glass Card ── */
.glass-card {
  background: rgba(8, 30, 27, 0.65);
  border: 1px solid rgba(46, 201, 183, 0.18);
  border-radius: 28px;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.4s,
    box-shadow 0.4s;
  padding: 36px;
  animation: fadeSlideUp 0.7s ease both;
}

.glass-card.focused {
  border-color: rgba(46, 201, 183, 0.4);
  box-shadow:
    0 0 60px rgba(46, 201, 183, 0.1),
    inset 0 0 40px rgba(46, 201, 183, 0.03);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-glow {
  position: absolute;
  top: -80px;
  left: -80px;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(46, 201, 183, 0.12) 0%,
    transparent 70%
  );
  pointer-events: none;
  animation: glowPulse 4s ease-in-out infinite;
}

.card-glow--right {
  left: auto;
  right: -80px;
  top: -80px;
  background: radial-gradient(
    circle,
    rgba(240, 192, 96, 0.08) 0%,
    transparent 70%
  );
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.card-header {
  margin-bottom: 28px;
}

.step-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--teal-400);
  margin-bottom: 10px;
}

.step-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--teal-400);
  animation: pulse 2s infinite;
}

.card-header h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #e8f5f3;
  margin-bottom: 6px;
}

.card-desc {
  color: rgba(232, 245, 243, 0.5);
  font-size: 0.88rem;
  line-height: 1.6;
}

/* ── Section Divider ── */
.section-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0 14px;
}

.section-divider::before,
.section-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(46, 201, 183, 0.2),
    transparent
  );
}

.section-divider span {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--teal-400);
  white-space: nowrap;
}

/* ── Slot Buttons ── */
.date-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.slot-btn {
  position: relative;
  border: 1px solid rgba(46, 201, 183, 0.2);
  border-radius: 14px;
  background: rgba(46, 201, 183, 0.04);
  padding: 10px 8px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: rgba(232, 245, 243, 0.7);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slot-btn:hover:not(:disabled) {
  border-color: rgba(46, 201, 183, 0.5);
  background: rgba(46, 201, 183, 0.1);
  color: var(--teal-300);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46, 201, 183, 0.15);
}

.slot-btn.active {
  border-color: var(--teal-400);
  background: linear-gradient(
    135deg,
    rgba(46, 201, 183, 0.2),
    rgba(24, 163, 147, 0.15)
  );
  color: var(--teal-300);
  font-weight: 700;
  box-shadow:
    0 0 20px rgba(46, 201, 183, 0.2),
    inset 0 0 12px rgba(46, 201, 183, 0.05);
  transform: scale(1.02);
}

.slot-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.time-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.time-label {
  font-weight: 600;
}
.time-suffix {
  font-size: 0.65rem;
  opacity: 0.6;
}

.slot-ripple {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at center,
    rgba(46, 201, 183, 0.3) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.slot-btn.active .slot-ripple {
  opacity: 1;
  animation: ripplePulse 2s infinite;
}

@keyframes ripplePulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* ── Slot Preview ── */
.slot-preview {
  margin-top: 20px;
  animation: fadeSlideUp 0.4s ease both;
}

.slot-preview-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(
    135deg,
    rgba(46, 201, 183, 0.12),
    rgba(46, 201, 183, 0.06)
  );
  border: 1px solid rgba(46, 201, 183, 0.3);
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 0.9rem;
}

.slot-badge {
  margin-left: auto;
  background: rgba(240, 192, 96, 0.15);
  border: 1px solid rgba(240, 192, 96, 0.3);
  color: var(--gold);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 100px;
  animation: urgencyPulse 2s infinite;
}

@keyframes urgencyPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* ── Form ── */
.booking-form {
  display: grid;
  gap: 18px;
}

.input-group label {
  display: grid;
  gap: 8px;
}

.label-text {
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(232, 245, 243, 0.7);
}

.label-text em {
  font-style: normal;
  font-weight: 400;
  opacity: 0.6;
}

.input-wrap {
  position: relative;
}

.input-wrap input,
.input-wrap textarea {
  width: 100%;
  background: rgba(46, 201, 183, 0.04);
  border: 1px solid rgba(46, 201, 183, 0.18);
  border-radius: 12px;
  padding: 13px 16px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: #e8f5f3;
  transition:
    border-color 0.3s,
    box-shadow 0.3s,
    background 0.3s;
  resize: none;
}

.input-wrap input::placeholder,
.input-wrap textarea::placeholder {
  color: rgba(232, 245, 243, 0.28);
}

.input-wrap input:focus,
.input-wrap textarea:focus {
  outline: none;
  border-color: rgba(46, 201, 183, 0.5);
  background: rgba(46, 201, 183, 0.07);
  box-shadow:
    0 0 0 3px rgba(46, 201, 183, 0.1),
    0 4px 20px rgba(46, 201, 183, 0.1);
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--teal-400), transparent);
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s;
}

.input-wrap:focus-within .input-line {
  opacity: 1;
}

.err {
  color: #ff7878;
  font-size: 0.78rem;
}

/* ── CTA Button ── */
.cta-btn {
  position: relative;
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    var(--teal-600),
    var(--teal-500),
    var(--teal-400)
  );
  color: white;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s;
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.cta-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.01);
  box-shadow:
    0 12px 40px rgba(46, 201, 183, 0.35),
    0 0 0 1px rgba(46, 201, 183, 0.4);
}

.cta-btn:active {
  transform: scale(0.98);
}

.cta-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-arrow {
  display: inline-block;
  transition: transform 0.3s;
}

.cta-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn-glow {
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    var(--teal-400),
    transparent,
    var(--teal-300)
  );
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
  filter: blur(8px);
}

.cta-btn:hover .btn-glow {
  opacity: 0.5;
}

/* ── Checkout State ── */
.checkout-state {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(46, 201, 183, 0.12);
  display: grid;
  gap: 12px;
}

.selected-slot-display {
  background: rgba(46, 201, 183, 0.06);
  border: 1px solid rgba(46, 201, 183, 0.15);
  border-radius: 12px;
  padding: 14px 18px;
}

.slot-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slot-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(232, 245, 243, 0.4);
}

.slot-value {
  font-weight: 700;
  color: var(--teal-300);
  font-size: 0.88rem;
}

.pay-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(46, 201, 183, 0.08);
  border: 1px solid rgba(46, 201, 183, 0.25);
  border-radius: 14px;
  padding: 14px 18px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--teal-300);
  cursor: pointer;
  transition: all 0.3s;
}

.pay-btn:hover {
  background: rgba(46, 201, 183, 0.14);
  border-color: rgba(46, 201, 183, 0.4);
  transform: translateY(-2px);
}

.hint {
  font-size: 0.74rem;
  color: rgba(232, 245, 243, 0.3);
  text-align: center;
}

/* ── Feedback ── */
.feedback {
  margin-top: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.88rem;
  animation: fadeSlideUp 0.3s ease both;
}

.feedback--error {
  background: rgba(166, 64, 64, 0.15);
  border: 1px solid rgba(166, 64, 64, 0.3);
  color: #ff9090;
}

.feedback--success {
  background: rgba(46, 201, 183, 0.12);
  border: 1px solid rgba(46, 201, 183, 0.3);
  color: var(--teal-300);
}

/* ── Booking Layout ── */
.booking-layout {
  display: grid;
  gap: 20px;
}

/* ── Testimonials ── */
.testimonials-section {
  text-align: center;
}

.section-eyebrow {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--teal-400);
  margin-bottom: 12px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 700;
  color: #e8f5f3;
  margin-bottom: 36px;
}

.testimonials-grid {
  display: grid;
  gap: 16px;
}

.testimonial-card {
  text-align: left;
  padding: 28px;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s;
}

.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(46, 201, 183, 0.2);
}

.testimonial-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--teal-700), var(--teal-500));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  color: white;
  flex-shrink: 0;
}

.testimonial-top strong {
  display: block;
  font-weight: 700;
  color: #e8f5f3;
  font-size: 0.9rem;
}

.result-tag {
  font-size: 0.72rem;
  color: var(--teal-400);
  background: rgba(46, 201, 183, 0.1);
  border-radius: 6px;
  padding: 2px 8px;
}

.stars {
  margin-left: auto;
  color: var(--gold);
  font-size: 0.85rem;
}

.testimonial-text {
  font-size: 0.9rem;
  color: rgba(232, 245, 243, 0.65);
  line-height: 1.7;
  font-style: italic;
}

/* ── CTA Banner ── */
.cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 40px 48px;
}

.cta-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(46, 201, 183, 0.06) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.cta-content h2 {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #e8f5f3;
  margin-bottom: 8px;
}

.cta-content p {
  color: rgba(232, 245, 243, 0.55);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.cta-btn-primary {
  background: linear-gradient(135deg, var(--teal-600), var(--teal-400));
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.9rem;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.cta-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46, 201, 183, 0.3);
}

.cta-btn-ghost {
  color: var(--teal-400);
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid rgba(46, 201, 183, 0.25);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.cta-btn-ghost:hover {
  background: rgba(46, 201, 183, 0.08);
  border-color: rgba(46, 201, 183, 0.4);
}

.cta-visual {
  font-size: 5rem;
  filter: drop-shadow(0 0 30px rgba(46, 201, 183, 0.3));
  flex-shrink: 0;
  animation: floatEmoji 4s ease-in-out infinite;
}

@keyframes floatEmoji {
  0%,
  100% {
    transform: translateY(0) rotate(-5deg);
  }
  50% {
    transform: translateY(-12px) rotate(5deg);
  }
}

/* ── Responsive ── */
@media (min-width: 900px) {
  .booking-layout {
    grid-template-columns: repeat(2, 1fr);
  }

  .date-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .benefits-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .glass-card {
    padding: 22px 16px;
  }
  .time-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .cta-banner {
    flex-direction: column;
    text-align: center;
  }
  .cta-visual {
    font-size: 3rem;
  }
  .cta-actions {
    justify-content: center;
  }
}
</style>
