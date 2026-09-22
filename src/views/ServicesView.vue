<script setup lang="ts">
import PricingCard from "../components/cards/PricingCard.vue";
import ServiceCard from "../components/cards/ServiceCard.vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import { pricingTiers, services } from "../data/content";
import { upsertJsonLd, useSeo } from "../composables/useSeo";
import { buildBreadcrumbSchema, buildOrganizationSchema } from "../data/seo";
import { pageSeo } from "../data/pageSeo";

useSeo(pageSeo.services);
upsertJsonLd("dietrix-organization-schema", buildOrganizationSchema(services));
upsertJsonLd(
  "dietrix-services-breadcrumb-schema",
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]),
);

const serviceMetrics = [
  { value: "1,800+", label: "clients coached" },
  { value: "14+", label: "countries supported" },
  { value: "92%", label: "improved health markers" },
  { value: "89%", label: "client retention rate" },
];

const pathways = [
  {
    title: "Body Composition",
    label: "Fat loss and shape change",
    copy:
      "For clients who want structured weight loss, better appetite control, and a plan that works with office hours, travel, family meals and social weekends.",
    signals: ["Weight trend", "Waist change", "Energy", "Cravings"],
  },
  {
    title: "Clinical Nutrition",
    label: "PCOS, diabetes, thyroid, gut",
    copy:
      "For clients who need food timing, symptom tracking, lab-aware adjustments, and a calm nutrition plan that supports medical context.",
    signals: ["HbA1c", "Cycle health", "Digestion", "Medication timing"],
  },
  {
    title: "Lifestyle Blueprint",
    label: "Daily meal system",
    copy:
      "For clients who feel confused by food decisions and want a repeatable structure for groceries, meal prep, dining out and family cooking.",
    signals: ["Meal rhythm", "Grocery flow", "Routine fit", "Consistency"],
  },
];

const coachingFlow = [
  {
    step: "01",
    title: "Health and lifestyle audit",
    detail:
      "We review goals, food history, routine, preferences, labs, symptoms and barriers before choosing the right service path.",
  },
  {
    step: "02",
    title: "Personal strategy build",
    detail:
      "Your plan is built around meals, portions, protein, hydration, movement, sleep and realistic swaps for your culture and schedule.",
  },
  {
    step: "03",
    title: "Weekly optimization",
    detail:
      "Progress, hunger, energy, digestion and adherence are reviewed so the plan adapts before motivation drops.",
  },
  {
    step: "04",
    title: "Maintenance confidence",
    detail:
      "You learn how to adjust your meals independently so results continue beyond the first program cycle.",
  },
];

const comparisonRows = [
  {
    label: "Best for",
    values: ["First reset", "Fat loss + habits", "Medical complexity"],
  },
  {
    label: "Support depth",
    values: ["Single roadmap", "Weekly revisions", "Priority clinical care"],
  },
  {
    label: "Tracking",
    values: ["Goal checklist", "Weight + behavior", "Symptoms + labs"],
  },
  {
    label: "Delivery",
    values: ["Online", "Online + WhatsApp", "High-touch online"],
  },
];
</script>

<template>
  <main class="services-page">
    <section class="container services-hero reveal">
      <div class="hero-copy">
        <p class="eyebrow">Services</p>
        <h1>Choose the Right Nutrition Program for Your Goal</h1>
        <p class="intro">
          Online nutrition programs for weight loss, PCOS, diabetes, gut health,
          thyroid support, family meal planning and sustainable lifestyle change,
          designed by a clinical nutritionist and delivered from home.
        </p>
        <div class="hero-actions">
          <UiButton to="/booking" size="lg">Book Consultation</UiButton>
          <UiButton to="/contact" variant="outline" size="lg">
            Ask Which Plan Fits
          </UiButton>
        </div>
      </div>

      <aside class="service-console glass-card" aria-label="Service overview">
        <span class="console-tag">Personalized Care Engine</span>
        <div class="console-orbit">
          <strong>3</strong>
          <span>core programs</span>
        </div>
        <div class="console-grid">
          <div v-for="metric in serviceMetrics" :key="metric.label">
            <strong>{{ metric.value }}</strong>
            <span>{{ metric.label }}</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="container pathway-section">
      <SectionTitle
        kicker="Goal Pathways"
        title="Start With the Outcome, Then Match the Program"
        description="Each service is designed around the real reason people seek nutrition support: body change, clinical stability, or daily food confidence."
        align="center"
      />
      <div class="pathway-grid reveal-group">
        <article
          v-for="pathway in pathways"
          :key="pathway.title"
          class="pathway-card glass-card reveal"
        >
          <span>{{ pathway.label }}</span>
          <h3>{{ pathway.title }}</h3>
          <p>{{ pathway.copy }}</p>
          <ul>
            <li v-for="signal in pathway.signals" :key="signal">
              {{ signal }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="container">
      <SectionTitle
        kicker="What You Get"
        title="Detailed Service Breakdown"
        description="Program structure, inclusions, outcomes and support style mapped to your lifestyle and medical needs."
      />
      <div class="three-col reveal-group">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :item="service"
        />
      </div>
    </section>

    <section class="container coaching-system">
      <div class="system-copy reveal">
        <p class="eyebrow">Coaching System</p>
        <h2>A guided process from confusion to confident execution</h2>
        <p>
          The service is not a static PDF diet. It is a remote care workflow
          that combines clinical nutrition, habit psychology, food practicality,
          progress tracking and plan adjustments.
        </p>
      </div>

      <div class="flow-grid reveal-group">
        <article
          v-for="item in coachingFlow"
          :key="item.step"
          class="flow-card reveal"
        >
          <span>{{ item.step }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </section>

    <section class="container pricing-section">
      <SectionTitle
        kicker="Pricing"
        title="Transparent Plans for Every Stage"
        description="Start simple or choose high-touch coaching based on your support requirements, condition complexity and accountability needs."
      />
      <div class="three-col reveal-group">
        <PricingCard v-for="tier in pricingTiers" :key="tier.id" :tier="tier" />
      </div>
    </section>

    <section class="container comparison-panel reveal">
      <div class="comparison-copy">
        <p class="eyebrow">Plan Match</p>
        <h2>Compare the level of care before you book</h2>
      </div>
      <div class="comparison-table" role="table" aria-label="Plan comparison">
        <div
          v-for="row in comparisonRows"
          :key="row.label"
          class="comparison-row"
          role="row"
        >
          <strong role="cell">{{ row.label }}</strong>
          <span v-for="value in row.values" :key="value" role="cell">
            {{ value }}
          </span>
        </div>
      </div>
    </section>

    <section class="container">
      <CtaBanner
        kicker="Limited Consultation Slots"
        title="Unsure Which Plan Fits You Best?"
        description="Book a discovery consultation and get matched with the ideal nutrition program for your body, condition, routine and support needs."
        primary-text="Book Consultation"
        primary-to="/booking"
        secondary-text="Ask in Chatbot"
        secondary-to="/contact"
      />
    </section>
  </main>
</template>

<style>
.services-page {
  display: grid;
  gap: clamp(64px, 7vw, 100px);
}

.services-hero {
  display: grid;
  gap: clamp(28px, 5vw, 54px);
  align-items: center;
  padding-top: 10px;
}

.services-page .hero-copy {
  display: grid;
  gap: 18px;
}

.services-page .eyebrow {
  margin: 0;
}

.services-page h1 {
  max-width: 950px;
  margin: 0;
  color: var(--ink-900);
  font-size: 3rem;
  letter-spacing: 0;
}

.services-page .intro {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.75;
  max-width: 820px;
  font-size: 1.08rem;
}

.services-page .hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.services-page .service-console {
  position: relative;
  overflow: hidden;
  min-height: 410px;
  padding: 24px;
  display: grid;
  align-content: space-between;
  isolation: isolate;
  transform-style: preserve-3d;
}

.services-page .service-console::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.86), rgba(236, 253, 245, 0.38)),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.06) 0,
      rgba(6, 95, 70, 0.06) 1px,
      transparent 1px,
      transparent 38px
    );
}

.services-page .service-console::after,
.services-page .pathway-card::after,
.services-page .comparison-panel::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    112deg,
    transparent 0%,
    rgba(255, 255, 255, 0.72) 42%,
    transparent 62%
  );
  transform: translateX(-78%);
  animation: service-sheen 7s ease-in-out infinite;
}

.services-page .console-tag,
.services-page .console-orbit,
.services-page .console-grid {
  position: relative;
  z-index: 1;
}

.services-page .console-tag {
  justify-self: start;
  border-radius: 999px;
  padding: 8px 12px;
  color: var(--emerald-800);
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.22);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.services-page .console-orbit {
  width: min(230px, 70%);
  aspect-ratio: 1;
  margin: 18px auto;
  display: grid;
  place-items: center;
  align-content: center;
  border-radius: 50%;
  background:
    linear-gradient(var(--glass-strong), var(--glass-strong)) padding-box,
    conic-gradient(
      from 24deg,
      var(--emerald-700),
      var(--teal-400),
      #f59e0b,
      var(--emerald-700)
    )
      border-box;
  border: 10px solid transparent;
  box-shadow:
    inset 0 0 28px rgba(16, 185, 129, 0.16),
    0 24px 60px rgba(6, 78, 59, 0.18);
  transform: translateZ(28px);
}

.services-page .console-orbit strong {
  color: var(--ink-900);
  font-family: var(--font-heading);
  font-size: 3.2rem;
  line-height: 1;
}

.services-page .console-orbit span {
  color: var(--ink-500);
  font-size: 0.82rem;
  font-weight: 800;
}

.services-page .console-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.services-page .console-grid div {
  min-height: 82px;
  display: grid;
  align-content: center;
  gap: 4px;
  border-radius: 18px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.services-page .console-grid strong {
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 1.5rem;
  line-height: 1;
}

.services-page .console-grid span {
  color: var(--ink-600);
  font-size: 0.76rem;
  font-weight: 800;
  line-height: 1.35;
}

.services-page .pathway-grid,
.services-page .three-col,
.services-page .flow-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.services-page .pathway-card {
  position: relative;
  overflow: hidden;
  padding: clamp(22px, 3vw, 30px);
  isolation: isolate;
  transform-style: preserve-3d;
}

.services-page .pathway-card > * {
  position: relative;
  z-index: 1;
}

.services-page .pathway-card:hover {
  transform: perspective(1100px) rotateX(2deg) rotateY(-2deg) translateY(-7px);
}

.services-page .pathway-card > span {
  color: var(--emerald-700);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.services-page .pathway-card h3 {
  margin-top: 12px;
  color: var(--ink-900);
  font-size: 1.32rem;
  letter-spacing: 0;
}

.services-page .pathway-card p {
  margin-top: 10px;
  color: var(--ink-600);
  line-height: 1.72;
}

.services-page .pathway-card ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
  padding: 0;
  list-style: none;
}

.services-page .pathway-card li {
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.64);
  border: 1px solid rgba(16, 185, 129, 0.16);
  font-size: 0.78rem;
  font-weight: 800;
}

.services-page .coaching-system {
  display: grid;
  gap: clamp(28px, 5vw, 54px);
  align-items: start;
  padding-block: clamp(28px, 5vw, 46px);
  border-block: 1px solid rgba(16, 185, 129, 0.13);
}

.services-page .system-copy {
  display: grid;
  gap: 14px;
  max-width: 570px;
}

.services-page .system-copy h2,
.services-page .comparison-copy h2 {
  color: var(--ink-900);
  font-size: 2.55rem;
  letter-spacing: 0;
}

.services-page .system-copy p:not(.eyebrow) {
  color: var(--ink-600);
  line-height: 1.8;
}

.services-page .flow-card {
  position: relative;
  overflow: hidden;
  padding: 20px;
  border-radius: 22px;
  border: 1px solid rgba(16, 185, 129, 0.16);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 14px 38px rgba(6, 78, 59, 0.08);
  transition:
    transform 300ms ease,
    box-shadow 300ms ease;
}

.services-page .flow-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 58px rgba(6, 78, 59, 0.13);
}

.services-page .flow-card span {
  width: 48px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-family: var(--font-heading);
  font-weight: 900;
  box-shadow: 0 12px 24px rgba(5, 150, 105, 0.22);
}

.services-page .flow-card h3 {
  color: var(--ink-900);
  font-size: 1.12rem;
  letter-spacing: 0;
}

.services-page .flow-card p {
  margin-top: 8px;
  color: var(--ink-600);
  line-height: 1.68;
}

.services-page .comparison-panel {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 20px;
  align-items: start;
  padding: clamp(24px, 4vw, 36px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(135deg, rgba(236, 253, 245, 0.86), rgba(255, 255, 255, 0.64)),
    rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 20px 58px rgba(6, 78, 59, 0.09);
  isolation: isolate;
}

.services-page .comparison-panel > * {
  position: relative;
  z-index: 1;
}

.services-page .comparison-copy {
  display: grid;
  gap: 10px;
}

.services-page .comparison-table {
  display: grid;
  gap: 10px;
}

.services-page .comparison-row {
  display: grid;
  gap: 8px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(16, 185, 129, 0.14);
}

.services-page .comparison-row strong {
  color: var(--emerald-800);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.services-page .comparison-row span {
  color: var(--ink-700);
  font-weight: 700;
}

@keyframes service-sheen {
  0%,
  38% {
    transform: translateX(-78%);
  }
  68%,
  100% {
    transform: translateX(78%);
  }
}

@media (min-width: 900px) {
  .services-hero {
    grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.64fr);
  }

  .services-page h1 {
    font-size: 4.35rem;
  }

  .services-page .pathway-grid,
  .services-page .three-col {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .services-page .coaching-system {
    grid-template-columns: minmax(0, 0.72fr) minmax(0, 1fr);
  }

  .services-page .flow-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .services-page .comparison-panel {
    grid-template-columns: minmax(0, 0.62fr) minmax(0, 1fr);
  }

  .services-page .comparison-row {
    grid-template-columns: 0.72fr repeat(3, minmax(0, 1fr));
    align-items: center;
  }
}

@media (max-width: 720px) {
  .services-page h1 {
    font-size: 2.35rem;
  }

  .services-page .intro {
    font-size: 1rem;
  }

  .services-page .hero-actions .ui-button {
    width: 100%;
  }

  .services-page .console-grid {
    grid-template-columns: 1fr;
  }

  .services-page .system-copy h2,
  .services-page .comparison-copy h2 {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .services-page .service-console::after,
  .services-page .pathway-card::after,
  .services-page .comparison-panel::after {
    animation: none;
  }

  .services-page .pathway-card:hover,
  .services-page .flow-card:hover {
    transform: none;
  }
}
</style>
