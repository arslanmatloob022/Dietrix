<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import {
  certifications,
  nutritionistProfile,
  stats,
  trustBadges,
} from "../data/content";
import { upsertJsonLd, useSeo } from "../composables/useSeo";
import { buildBreadcrumbSchema, buildPersonSchema } from "../data/seo";
import { pageSeo } from "../data/pageSeo";
import { ensureMotion } from "../lib/motion";

useSeo(pageSeo.about);
upsertJsonLd("dietrix-person-schema", buildPersonSchema());
upsertJsonLd(
  "dietrix-about-breadcrumb-schema",
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
);

const carePrinciples = [
  {
    title: "Clinical clarity first",
    copy:
      "Every plan starts with health history, symptoms, routine, preferences, barriers and available lab context so advice is specific instead of generic.",
  },
  {
    title: "Food you can actually repeat",
    copy:
      "Meal structure is built around your culture, family table, grocery access, work hours and cooking energy, because consistency beats perfection.",
  },
  {
    title: "Measured without obsession",
    copy:
      "Progress is tracked through weight, waist, energy, digestion, cravings, sleep, cycle health or glucose trends depending on the client goal.",
  },
];

const methodSteps = [
  {
    step: "01",
    title: "Listen",
    text:
      "Understand the client's body story, medical context, current meals and the emotional friction around food.",
  },
  {
    step: "02",
    title: "Design",
    text:
      "Build a practical nutrition map with portions, protein targets, meal timing, swaps and accountability points.",
  },
  {
    step: "03",
    title: "Refine",
    text:
      "Adjust the plan weekly using feedback, hunger, symptoms, energy, adherence and measurable progress.",
  },
  {
    step: "04",
    title: "Sustain",
    text:
      "Teach decision-making frameworks so clients can maintain results through travel, stress, family meals and busy seasons.",
  },
];

const specialtyTracks = [
  {
    title: "Body Composition",
    focus: "Fat loss, fitness nutrition, appetite control",
    metric: "12-week roadmap",
    progress: "88%",
  },
  {
    title: "Hormonal Health",
    focus: "PCOS, thyroid-friendly routines, cycle support",
    metric: "symptom-aware plan",
    progress: "78%",
  },
  {
    title: "Metabolic Care",
    focus: "Diabetes nutrition, glucose stability, labs",
    metric: "marker tracking",
    progress: "84%",
  },
  {
    title: "Digestive Reset",
    focus: "Gut health, bloating, meal timing, sleep rhythm",
    metric: "habit protocol",
    progress: "72%",
  },
];

const profileSignals = [
  { label: "Care model", value: "Remote-first" },
  { label: "Plan style", value: "Evidence-based" },
  { label: "Support", value: "Personalized" },
];

const remoteSupportSignals = [
  "Weekly check-ins",
  "Meal structure",
  "Progress review",
  "Culture-fit swaps",
];

// ── Page motion ───────────────────────────────────────────────────────────────
let aboutKills: (() => void)[] = [];

onMounted(async () => {
  const motion = await ensureMotion();
  if (!motion || typeof window === "undefined") return;
  const { gsap, ScrollTrigger } = motion;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function st(trigger: string, start: string, fn: () => void) {
    const s = ScrollTrigger.create({ trigger, start, once: true, onEnter: fn });
    aboutKills.push(() => s.kill());
  }

  // ── Portrait floats in from left, copy from right ──────────────────────
  st(".about-hero", "top 72%", () => {
    gsap.from(".portrait-shell", {
      x: -62, opacity: 0, duration: 1.0, ease: "power3.out",
    });
    gsap.from(".profile-panel", {
      x: 44, opacity: 0, duration: 0.85, delay: 0.2, ease: "power3.out",
    });
    gsap.from(".signal-grid div", {
      y: 22, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.4, ease: "back.out(1.4)",
    });
  });

  // ── Principle cards slide from left in sequence ────────────────────────
  document.querySelectorAll<HTMLElement>(".principle-card").forEach((el, i) => {
    const s = ScrollTrigger.create({
      trigger: el, start: "top 65%", once: true,
      onEnter() {
        gsap.from(el, {
          x: -60, opacity: 0, duration: 0.72, delay: i * 0.1, ease: "power3.out",
        });
      },
    });
    aboutKills.push(() => s.kill());
  });

  // ── Method cards: fan-in with rotateX ─────────────────────────────────
  st(".method-grid", "top 68%", () => {
    gsap.from(".method-card", {
      y: 52, scale: 0.9, opacity: 0, rotateX: 10,
      duration: 0.78, stagger: 0.13, ease: "back.out(1.4)", clearProps: "transform",
    });
  });

  // ── Credential cards cascade from right ───────────────────────────────
  document.querySelectorAll<HTMLElement>(".credential-card").forEach((el, i) => {
    const s = ScrollTrigger.create({
      trigger: el, start: "top 65%", once: true,
      onEnter() {
        gsap.from(el, {
          x: 54, opacity: 0, duration: 0.65, delay: i * 0.08, ease: "power3.out",
        });
      },
    });
    aboutKills.push(() => s.kill());
  });

  // ── Specialty track cards spring in ───────────────────────────────────
  st(".track-grid", "top 68%", () => {
    gsap.from(".track-card", {
      y: 44, scale: 0.9, opacity: 0,
      duration: 0.7, stagger: 0.12, ease: "back.out(1.5)",
    });
  });

  // ── Track meter bars fill on scroll (scaleX 0 → natural width) ────────
  document.querySelectorAll<HTMLElement>(".track-meter span").forEach((bar) => {
    const targetW = bar.style.width || "80%";
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
    const s = ScrollTrigger.create({
      trigger: bar, start: "top 68%", once: true,
      onEnter() {
        gsap.to(bar, {
          scaleX: 1, duration: 1.1, ease: "power2.out",
        });
      },
    });
    aboutKills.push(() => {
      s.kill();
      gsap.set(bar, { scaleX: 1 });
      bar.style.width = targetW;
    });
  });

  // ── Support chips pop in with stagger ─────────────────────────────────
  st(".support-strip", "top 65%", () => {
    gsap.from(".support-chip", {
      scale: 0.72, opacity: 0, duration: 0.45, stagger: 0.08, ease: "back.out(1.8)",
    });
  });

  // ── Remote status numbers count up ────────────────────────────────────
  document.querySelectorAll<HTMLElement>(".remote-status strong").forEach((el) => {
    const raw = el.textContent ?? "";
    const num = parseFloat(raw.replace(/[^\d.]/g, ""));
    const suffix = raw.replace(/[\d.]/g, "");
    if (isNaN(num)) return;
    const obj = { val: 0 };
    const s = ScrollTrigger.create({
      trigger: el, start: "top 68%", once: true,
      onEnter() {
        gsap.to(obj, {
          val: num, duration: 1.8, ease: "power2.out",
          onUpdate() {
            el.textContent = (Number.isInteger(num) ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          },
        });
      },
    });
    aboutKills.push(() => s.kill());
  });

  ScrollTrigger.refresh();
});

onUnmounted(() => {
  aboutKills.forEach((fn) => fn());
  aboutKills = [];
});
</script>

<template>
  <main class="about-page">
    <section class="container about-hero reveal">
      <div class="hero-copy">
        <p class="eyebrow">Meet Your Nutritionist</p>
        <h1>{{ nutritionistProfile.name }}</h1>
        <p class="role">
          {{ nutritionistProfile.role }} ·
          {{ nutritionistProfile.experience }} Experience
        </p>
        <p class="hero-story">{{ nutritionistProfile.story }}</p>
        <div class="hero-actions">
          <UiButton to="/booking" size="lg">Book Consultation</UiButton>
          <UiButton to="/services" variant="outline" size="lg">
            View Nutrition Programs
          </UiButton>
        </div>
      </div>

      <aside class="profile-stage glass-card" aria-label="Rimsha Naseer profile">
        <span class="stage-shine" aria-hidden="true"></span>
        <div class="portrait-shell">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80"
            alt="Rimsha Naseer certified online nutritionist for personalized diet plans"
          />
        </div>
        <div class="profile-panel">
          <div>
            <strong>Dn. Rimsha Naseer</strong>
            <span>Clinical nutrition guidance for real routines</span>
          </div>
          <div class="profile-rings" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="signal-grid">
          <div v-for="signal in profileSignals" :key="signal.label">
            <strong>{{ signal.value }}</strong>
            <span>{{ signal.label }}</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="container trust-metrics reveal-group">
      <article v-for="item in stats" :key="item.id" class="metric-card reveal">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </article>
      <article
        v-for="badge in trustBadges"
        :key="badge.id"
        class="metric-card metric-card--soft reveal"
      >
        <strong>{{ badge.label }}</strong>
        <span>{{ badge.subtitle }}</span>
      </article>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Mission"
        title="Nutrition That Fits Real Life"
        description="A practical, compassionate framework designed for long-term health outcomes, not short bursts of restriction."
      />
      <div class="mission-grid reveal-group">
        <article class="mission-card glass-card reveal">
          <span>Mission</span>
          <h2>Make evidence-based nutrition personal and usable</h2>
          <p>{{ nutritionistProfile.mission }}</p>
        </article>
        <article class="mission-card glass-card reveal">
          <span>Philosophy</span>
          <h2>No crash diets, no fear-based food rules</h2>
          <p>{{ nutritionistProfile.philosophy }}</p>
        </article>
      </div>
    </section>

    <section class="container care-lab">
      <div class="lab-copy reveal">
        <p class="eyebrow">Care Framework</p>
        <h2>A nutrition system built for bodies, schedules and emotions</h2>
        <p>
          Dietrix Fit blends clinical nutrition, habit psychology and
          practical meal planning so clients can change health markers without
          losing their culture, family meals or normal life.
        </p>
      </div>
      <div class="principle-stack reveal-group">
        <article
          v-for="principle in carePrinciples"
          :key="principle.title"
          class="principle-card reveal"
        >
          <span aria-hidden="true"></span>
          <div>
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.copy }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="container method-section">
      <SectionTitle
        kicker="Method"
        title="From First Conversation to Confident Food Decisions"
        description="A calm, step-by-step coaching process for clients who need structure, safety and practical follow-through."
        align="center"
      />
      <div class="method-grid reveal-group">
        <article
          v-for="item in methodSteps"
          :key="item.step"
          class="method-card reveal"
        >
          <span>{{ item.step }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="container credential-section">
      <div class="credential-copy reveal">
        <p class="eyebrow">Credentials</p>
        <h2>Certified guidance for nutrition, hormones and metabolic health</h2>
        <p>
          Professional qualifications and specialty training help turn nutrition
          science into careful, client-specific recommendations.
        </p>
      </div>
      <div class="credential-grid reveal-group">
        <article
          v-for="item in certifications"
          :key="item"
          class="credential-card glass-card reveal"
        >
          <span aria-hidden="true"></span>
          <strong>{{ item }}</strong>
        </article>
      </div>
    </section>

    <section class="container specialty-panel reveal">
      <div class="specialty-copy">
        <p class="eyebrow">Global Online Practice</p>
        <h2>Support for nutrition, overall health and fitness routines</h2>
        <p>
          Clients can begin from home and receive structured guidance for body
          composition, metabolic health, hormonal concerns, digestion, meal
          planning and consistency.
        </p>
        <div class="remote-status">
          <div>
            <strong>14+</strong>
            <span>countries supported</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>online consultation flow</span>
          </div>
        </div>
      </div>
      <div class="practice-dashboard" aria-label="Remote nutrition practice focus areas">
        <div class="dashboard-top">
          <span>Care Tracks</span>
          <strong>Remote Nutrition OS</strong>
        </div>
        <div class="track-grid">
          <article
            v-for="track in specialtyTracks"
            :key="track.title"
            class="track-card"
          >
            <div>
              <span>{{ track.metric }}</span>
              <h3>{{ track.title }}</h3>
              <p>{{ track.focus }}</p>
            </div>
            <div class="track-meter" aria-hidden="true">
              <span :style="{ width: track.progress }"></span>
            </div>
          </article>
        </div>
        <div class="support-strip">
          <span
            v-for="signal in remoteSupportSignals"
            :key="signal"
            class="support-chip"
          >
            {{ signal }}
          </span>
        </div>
      </div>
    </section>

    <section class="container">
      <CtaBanner
        kicker="Limited Consultation Slots"
        title="Ready to Work Together on Your Nutrition Goals?"
        description="Start with a personalized consultation and get a plan aligned to your medical context, lifestyle, culture, schedule and long-term health goals."
        primary-text="Book Consultation"
        primary-to="/booking"
        secondary-text="View Services"
        secondary-to="/services"
      />
    </section>
  </main>
</template>

<style>
.about-page {
  display: grid;
  gap: clamp(64px, 7vw, 100px);
}

.about-hero {
  display: grid;
  gap: clamp(30px, 5vw, 58px);
  align-items: center;
  padding-top: 10px;
}

.about-page .hero-copy {
  display: grid;
  gap: 16px;
}

.about-page .eyebrow {
  margin: 0;
}

.about-page h1 {
  max-width: 720px;
  margin: 0;
  color: var(--ink-900);
  font-size: 3.05rem;
  letter-spacing: 0;
}

.about-page .role {
  margin: 0;
  color: var(--teal-700);
  font-weight: 900;
}

.about-page .hero-story,
.about-page .lab-copy p:not(.eyebrow),
.about-page .credential-copy p,
.about-page .specialty-copy p {
  margin: 0;
  max-width: 760px;
  color: var(--ink-600);
  line-height: 1.75;
  font-size: 1.03rem;
}

.about-page .hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}

.about-page .profile-stage {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 16px;
  padding: clamp(16px, 3vw, 24px);
  isolation: isolate;
  transform-style: preserve-3d;
}

.about-page .profile-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.76), rgba(236, 253, 245, 0.4)),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.055) 0,
      rgba(6, 95, 70, 0.055) 1px,
      transparent 1px,
      transparent 38px
    );
}

.about-page .stage-shine,
.about-page .mission-card::after,
.about-page .specialty-panel::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 2;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    112deg,
    transparent 0%,
    rgba(255, 255, 255, 0.72) 42%,
    transparent 62%
  );
  transform: translateX(-80%);
  animation: about-sheen 7.5s ease-in-out infinite;
}

.about-page .profile-stage > *:not(.stage-shine) {
  position: relative;
  z-index: 1;
}

.about-page .portrait-shell {
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(16, 185, 129, 0.22);
  box-shadow: 0 26px 58px rgba(6, 78, 59, 0.14);
  transform: translateZ(22px);
}

.about-page .portrait-shell img {
  display: block;
  width: 100%;
  min-height: 330px;
  object-fit: cover;
}

.about-page .profile-panel,
.about-page .signal-grid {
  display: grid;
  gap: 10px;
}

.about-page .profile-panel {
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.16);
}

.about-page .profile-panel strong {
  display: block;
  color: var(--ink-900);
  font-family: var(--font-heading);
  font-size: 1.15rem;
}

.about-page .profile-panel span {
  display: block;
  margin-top: 4px;
  color: var(--ink-500);
  font-size: 0.86rem;
  font-weight: 700;
}

.about-page .profile-rings {
  position: relative;
  width: 62px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    linear-gradient(var(--glass-strong), var(--glass-strong)) padding-box,
    conic-gradient(from 40deg, var(--emerald-700), var(--teal-400), #f59e0b, var(--emerald-700)) border-box;
  border: 7px solid transparent;
}

.about-page .profile-rings span {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.about-page .profile-rings span:nth-child(1) {
  inset: 8px;
}

.about-page .profile-rings span:nth-child(2) {
  inset: 16px;
}

.about-page .profile-rings span:nth-child(3) {
  inset: 24px;
  background: var(--emerald-700);
}

.about-page .signal-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.about-page .signal-grid div,
.about-page .metric-card {
  border-radius: 18px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.64);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.about-page .signal-grid strong,
.about-page .metric-card strong {
  display: block;
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 1.35rem;
  line-height: 1.1;
}

.about-page .signal-grid span,
.about-page .metric-card span {
  display: block;
  margin-top: 6px;
  color: var(--ink-600);
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.35;
}

.about-page .trust-metrics {
  display: grid;
  gap: 14px;
}

.about-page .metric-card {
  min-height: 118px;
  display: grid;
  align-content: center;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.78), rgba(236, 253, 245, 0.44)),
    rgba(255, 255, 255, 0.72);
  transition:
    transform 280ms ease,
    box-shadow 280ms ease;
}

.about-page .metric-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 54px rgba(6, 78, 59, 0.12);
}

.about-page .metric-card--soft strong {
  font-size: 1.05rem;
}

.about-page .mission-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.about-page .mission-card {
  position: relative;
  overflow: hidden;
  padding: clamp(22px, 3vw, 32px);
  isolation: isolate;
  transform-style: preserve-3d;
  transition:
    transform 320ms ease,
    box-shadow 320ms ease;
}

.about-page .mission-card:hover {
  transform: perspective(1100px) rotateX(2deg) rotateY(-2deg) translateY(-7px);
  box-shadow: 0 28px 70px rgba(6, 78, 59, 0.14);
}

.about-page .mission-card > * {
  position: relative;
  z-index: 1;
}

.about-page .mission-card span {
  color: var(--emerald-700);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.about-page .mission-card h2,
.about-page .lab-copy h2,
.about-page .credential-copy h2,
.about-page .specialty-copy h2 {
  margin: 12px 0 0;
  color: var(--ink-900);
  font-size: 2.2rem;
  line-height: 1.08;
  letter-spacing: 0;
}

.about-page .mission-card p {
  margin: 14px 0 0;
  color: var(--ink-600);
  line-height: 1.75;
}

.about-page .care-lab {
  display: grid;
  gap: clamp(28px, 5vw, 54px);
  align-items: start;
  padding-block: clamp(28px, 5vw, 48px);
  border-block: 1px solid rgba(16, 185, 129, 0.13);
}

.about-page .lab-copy,
.about-page .credential-copy,
.about-page .specialty-copy {
  display: grid;
  gap: 14px;
}

.about-page .principle-stack {
  display: grid;
  gap: 14px;
}

.about-page .principle-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 14px 38px rgba(6, 78, 59, 0.08);
  transition:
    transform 280ms ease,
    box-shadow 280ms ease;
}

.about-page .principle-card:hover {
  transform: translateX(6px);
  box-shadow: 0 22px 58px rgba(6, 78, 59, 0.12);
}

.about-page .principle-card > span {
  width: 42px;
  aspect-ratio: 1;
  border-radius: 16px;
  background:
    linear-gradient(rgba(255, 255, 255, 0.82), rgba(236, 253, 245, 0.7)) padding-box,
    conic-gradient(from 30deg, var(--emerald-700), var(--teal-400), #f59e0b, var(--emerald-700)) border-box;
  border: 1px solid transparent;
  box-shadow: 0 12px 24px rgba(5, 150, 105, 0.18);
}

.about-page .principle-card h3,
.about-page .method-card h3 {
  margin: 0;
  color: var(--ink-900);
  font-size: 1.15rem;
  letter-spacing: 0;
}

.about-page .principle-card p,
.about-page .method-card p {
  margin: 8px 0 0;
  color: var(--ink-600);
  line-height: 1.68;
}

.about-page .method-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.about-page .method-card {
  position: relative;
  overflow: hidden;
  min-height: 220px;
  padding: 20px;
  border-radius: 24px;
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.76), rgba(236, 253, 245, 0.44)),
    rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 16px 42px rgba(6, 78, 59, 0.08);
  transition:
    transform 300ms ease,
    box-shadow 300ms ease;
}

.about-page .method-card::before {
  content: "";
  position: absolute;
  right: -46px;
  top: -54px;
  width: 126px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(16, 185, 129, 0.18);
  background: conic-gradient(
    from 25deg,
    rgba(6, 95, 70, 0.22),
    rgba(20, 184, 166, 0.08),
    rgba(245, 158, 11, 0.14),
    rgba(6, 95, 70, 0.22)
  );
}

.about-page .method-card:hover {
  transform: perspective(1100px) rotateX(2deg) rotateY(2deg) translateY(-7px);
  box-shadow: 0 28px 68px rgba(6, 78, 59, 0.14);
}

.about-page .method-card span {
  display: grid;
  place-items: center;
  width: 48px;
  aspect-ratio: 1;
  margin-bottom: 28px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-family: var(--font-heading);
  font-weight: 900;
  box-shadow: 0 12px 24px rgba(5, 150, 105, 0.22);
}

.about-page .credential-section {
  display: grid;
  gap: clamp(28px, 5vw, 54px);
  align-items: start;
}

.about-page .credential-grid {
  display: grid;
  gap: 14px;
}

.about-page .credential-card {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 92px;
  padding: 18px;
  transition:
    transform 280ms ease,
    box-shadow 280ms ease;
}

.about-page .credential-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 54px rgba(6, 78, 59, 0.12);
}

.about-page .credential-card span {
  width: 42px;
  aspect-ratio: 1;
  flex-shrink: 0;
  border-radius: 50%;
  background:
    linear-gradient(var(--glass-strong), var(--glass-strong)) padding-box,
    conic-gradient(from 35deg, var(--emerald-700), var(--teal-400), #f59e0b, var(--emerald-700)) border-box;
  border: 6px solid transparent;
}

.about-page .credential-card strong {
  color: var(--ink-800);
  line-height: 1.35;
}

.about-page .specialty-panel {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 22px;
  padding: clamp(24px, 4vw, 38px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(135deg, rgba(236, 253, 245, 0.86), rgba(255, 255, 255, 0.64)),
    rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 20px 58px rgba(6, 78, 59, 0.09);
  isolation: isolate;
}

.about-page .specialty-panel > * {
  position: relative;
  z-index: 1;
}

.about-page .remote-status {
  display: grid;
  gap: 12px;
  margin-top: 8px;
}

.about-page .remote-status div {
  display: grid;
  gap: 4px;
  padding: 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.about-page .remote-status strong {
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 1.75rem;
  line-height: 1;
}

.about-page .remote-status span {
  color: var(--ink-600);
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1.35;
}

.about-page .practice-dashboard {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 16px;
  padding: clamp(18px, 3vw, 24px);
  border-radius: 28px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.76), rgba(236, 253, 245, 0.46)),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.05) 0,
      rgba(6, 95, 70, 0.05) 1px,
      transparent 1px,
      transparent 34px
    );
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.75),
    0 22px 58px rgba(6, 78, 59, 0.1);
  transform-style: preserve-3d;
}

.about-page .practice-dashboard::before {
  content: "";
  position: absolute;
  right: -58px;
  top: -76px;
  width: 176px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(16, 185, 129, 0.2);
  background:
    radial-gradient(circle at 38% 38%, rgba(255, 255, 255, 0.86), transparent 30%),
    conic-gradient(from 34deg, rgba(6, 95, 70, 0.26), rgba(20, 184, 166, 0.1), rgba(245, 158, 11, 0.14), rgba(6, 95, 70, 0.26));
}

.about-page .practice-dashboard > * {
  position: relative;
  z-index: 1;
}

.about-page .dashboard-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.12);
}

.about-page .dashboard-top span {
  color: var(--emerald-700);
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.about-page .dashboard-top strong {
  color: var(--ink-900);
  font-family: var(--font-heading);
  font-size: 1.2rem;
}

.about-page .track-grid {
  display: grid;
  gap: 12px;
}

.about-page .track-card {
  display: grid;
  gap: 14px;
  min-height: 170px;
  padding: 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: 0 14px 34px rgba(6, 78, 59, 0.07);
  transition:
    transform 280ms ease,
    box-shadow 280ms ease,
    border-color 280ms ease;
}

.about-page .track-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-5px);
  box-shadow: 0 24px 58px rgba(6, 78, 59, 0.13);
  border-color: rgba(16, 185, 129, 0.28);
}

.about-page .track-card span {
  color: var(--emerald-700);
  font-size: 0.74rem;
  font-weight: 900;
  text-transform: uppercase;
}

.about-page .track-card h3 {
  margin: 8px 0 0;
  color: var(--ink-900);
  font-size: 1.14rem;
  letter-spacing: 0;
}

.about-page .track-card p {
  margin: 8px 0 0;
  color: var(--ink-600);
  line-height: 1.55;
  font-size: 0.9rem;
}

.about-page .track-meter {
  height: 8px;
  overflow: hidden;
  align-self: end;
  border-radius: 999px;
  background: rgba(6, 95, 70, 0.09);
  border: 1px solid rgba(16, 185, 129, 0.12);
}

.about-page .track-meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--emerald-700), var(--teal-400));
  box-shadow: 0 0 18px rgba(20, 184, 166, 0.35);
}

.about-page .support-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}

.about-page .support-chip {
  border-radius: 999px;
  padding: 8px 11px;
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.16);
  font-size: 0.78rem;
  font-weight: 900;
}

@keyframes about-sheen {
  0%,
  40% {
    transform: translateX(-80%);
  }
  70%,
  100% {
    transform: translateX(80%);
  }
}

@media (min-width: 760px) {
  .about-page .trust-metrics {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .about-page .mission-grid,
  .about-page .method-grid,
  .about-page .credential-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .about-page .remote-status,
  .about-page .track-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 980px) {
  .about-hero {
    grid-template-columns: minmax(0, 0.92fr) minmax(390px, 0.78fr);
  }

  .about-page h1 {
    font-size: 4.1rem;
  }

  .about-page .care-lab,
  .about-page .credential-section,
  .about-page .specialty-panel {
    grid-template-columns: minmax(0, 0.72fr) minmax(0, 1fr);
  }

  .about-page .method-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .about-page h1 {
    font-size: 2.45rem;
  }

  .about-page .hero-actions .ui-button {
    width: 100%;
  }

  .about-page .signal-grid {
    grid-template-columns: 1fr;
  }

  .about-page .dashboard-top {
    align-items: flex-start;
    flex-direction: column;
  }

  .about-page .mission-card h2,
  .about-page .lab-copy h2,
  .about-page .credential-copy h2,
  .about-page .specialty-copy h2 {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page .stage-shine,
  .about-page .mission-card::after,
  .about-page .specialty-panel::after {
    animation: none;
  }

  .about-page .metric-card:hover,
  .about-page .mission-card:hover,
  .about-page .principle-card:hover,
  .about-page .method-card:hover,
  .about-page .credential-card:hover,
  .about-page .track-card:hover {
    transform: none;
  }
}
</style>
