<script setup lang="ts">
import TestimonialCard from "../components/cards/TestimonialCard.vue";
import TransformationCard from "../components/cards/TransformationCard.vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import { testimonials, transformations } from "../data/content";
import { upsertJsonLd, useSeo } from "../composables/useSeo";
import { buildBreadcrumbSchema, buildOrganizationSchema } from "../data/seo";
import { pageSeo } from "../data/pageSeo";
import { absoluteUrl, siteUrl } from "../data/site";

useSeo(pageSeo.testimonials);

upsertJsonLd("dietrix-organization-schema", buildOrganizationSchema());
upsertJsonLd("dietrix-testimonials-schema", {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/testimonials/")}#collection`,
  url: absoluteUrl("/testimonials/"),
  name: "Dietrix Fit Client Success Stories",
  description:
    "Client reviews, nutrition coaching outcomes, before-after highlights, and remote consultation proof for Dietrix Fit.",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
});

upsertJsonLd(
  "dietrix-testimonials-breadcrumb-schema",
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Testimonials", path: "/testimonials/" },
  ]),
);

// Note: Review/AggregateRating schema is deliberately NOT added here.
// scripts/verify-crawl-signals.mjs enforces this at build time (self-published
// reviews of your own business are a known Google review-snippet policy risk).

const proofStats = [
  {
    value: "1,800+",
    label: "clients coached",
    detail: "across online and clinical plans",
  },
  {
    value: "14+",
    label: "countries served",
    detail: "remote support across time zones",
  },
  {
    value: "4.9/5",
    label: "average experience",
    detail: "from high-touch coaching feedback",
  },
  {
    value: "92%",
    label: "marker improvement",
    detail: "reported across guided programs",
  },
];

const heroSignals = [
  "Lab-aware plans for PCOS, diabetes, thyroid and gut health",
  "Culturally realistic menus for South Asian and global routines",
  "Weekly reviews, habit tracking and nutritionist-led adjustments",
];

const outcomePillars = [
  {
    title: "Weight Confidence",
    metric: "12-16 weeks",
    copy:
      "Clients move from random dieting to a measured fat-loss system with appetite control, flexible meals and consistent check-ins.",
    points: ["Craving control", "Meal rhythm", "Scale trend clarity"],
  },
  {
    title: "Clinical Stability",
    metric: "Lab informed",
    copy:
      "Food timing, plate balance and symptom tracking help clients manage glucose, PCOS, thyroid and digestive concerns more calmly.",
    points: ["HbA1c support", "Cycle tracking", "Medication-food timing"],
  },
  {
    title: "Lifestyle Freedom",
    metric: "Remote first",
    copy:
      "Plans are built for office days, family meals, travel, dining out and real homes, so progress does not depend on perfection.",
    points: ["Travel swaps", "Family meals", "Weekend strategy"],
  },
];

const careTimeline = [
  {
    step: "01",
    title: "Deep Intake",
    detail:
      "Health history, food preferences, labs, lifestyle stress and routine constraints are mapped before the first plan is written.",
  },
  {
    step: "02",
    title: "Personal Blueprint",
    detail:
      "Rimsha builds a nutrition strategy with meals, portions, swaps, hydration, sleep and movement targets that fit the client.",
  },
  {
    step: "03",
    title: "Weekly Refinement",
    detail:
      "Progress data, symptoms, hunger, energy and barriers are reviewed so the plan keeps adapting instead of getting abandoned.",
  },
  {
    step: "04",
    title: "Confident Maintenance",
    detail:
      "Clients leave with repeatable systems for eating, tracking and adjusting their routine long after the first goal is reached.",
  },
];

const reviewThemes = [
  {
    label: "Most mentioned win",
    value: "No more crash dieting",
    note: "Clients repeatedly praise structure that feels realistic instead of punishing.",
  },
  {
    label: "Support style",
    value: "Warm accountability",
    note: "Weekly check-ins keep momentum without making clients feel judged.",
  },
  {
    label: "Global fit",
    value: "Local food, online care",
    note: "Meal plans respect culture, budget, family cooking and availability.",
  },
];

const globalReach = [
  {
    region: "North America",
    locations: "Toronto, New York, Calgary",
    focus: "Desk-job fat loss, postpartum reset, energy repair",
  },
  {
    region: "Middle East",
    locations: "Dubai, Doha, Riyadh",
    focus: "Diabetes support, busy executive meals, dining-out strategy",
  },
  {
    region: "Europe",
    locations: "Madrid, London, Berlin",
    focus: "Gut health, PCOS nutrition, vegetarian-friendly plans",
  },
];
</script>

<template>
  <main class="testimonials-page">
    <section class="container hero-section reveal">
      <div class="hero-copy">
        <p class="eyebrow">Social Proof</p>
        <h1>
          Real Client Results Powered by
          <span class="gradient-text">Personal Nutrition Care</span>
        </h1>
        <p class="intro">
          High-trust stories from clients who used online nutrition coaching to
          improve weight, energy, blood markers, digestion, hormonal health and
          daily confidence from home.
        </p>

        <div class="hero-actions">
          <UiButton to="/booking/" size="lg">Book Consultation</UiButton>
          <UiButton to="/services/" variant="outline" size="lg">
            View Programs
          </UiButton>
        </div>

        <ul class="signal-list" aria-label="Nutrition coaching proof points">
          <li v-for="signal in heroSignals" :key="signal">{{ signal }}</li>
        </ul>
      </div>

      <aside
        class="proof-dashboard glass-card"
        aria-label="Client proof dashboard"
      >
        <div class="dashboard-top">
          <div>
            <p class="dashboard-kicker">Verified Review Pulse</p>
            <h2>Global nutrition outcomes</h2>
          </div>
          <div class="rating-orbit" aria-label="Average rating 4.9 out of 5">
            <span>4.9</span>
            <small>out of 5</small>
          </div>
        </div>

        <div class="proof-grid">
          <div v-for="stat in proofStats" :key="stat.label" class="proof-cell">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
            <small>{{ stat.detail }}</small>
          </div>
        </div>

        <div class="dashboard-footer">
          <span>Remote consultations</span>
          <span>Clinical nutrition</span>
          <span>Weekly accountability</span>
        </div>
      </aside>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Outcome Intelligence"
        title="What Clients Start Feeling First"
        description="The strongest stories are not only about numbers. They are about control, confidence and the ability to repeat healthy choices in real life."
        align="center"
      />
      <div class="outcome-grid reveal-group">
        <article
          v-for="pillar in outcomePillars"
          :key="pillar.title"
          class="outcome-card glass-card reveal"
        >
          <div class="outcome-top">
            <span>{{ pillar.metric }}</span>
          </div>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.copy }}</p>
          <ul>
            <li v-for="point in pillar.points" :key="point">{{ point }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="container result-section">
      <SectionTitle
        kicker="Before and After"
        title="Before and After Highlights"
        description="Progress snapshots from lifestyle, hormone, gut-health and medical nutrition programs."
      />
      <div class="three-col reveal-group">
        <TransformationCard
          v-for="item in transformations"
          :key="item.id"
          :item="item"
        />
      </div>
    </section>

    <section class="container story-system">
      <div class="system-copy reveal">
        <p class="eyebrow">Remote Care System</p>
        <h2>From uncertainty to a clear weekly nutrition rhythm</h2>
        <p>
          Dietrix is built for clients who want expert guidance without needing
          to travel, explain their routine again and again, or follow rigid diet
          templates. Every progress story is shaped by the same calm system:
          listen deeply, personalize carefully, measure what matters, then
          adjust with the client.
        </p>
      </div>

      <div
        class="timeline-panel reveal-group"
        aria-label="Nutrition care journey"
      >
        <article
          v-for="item in careTimeline"
          :key="item.step"
          class="timeline-item reveal"
        >
          <span>{{ item.step }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="container reviews-section">
      <SectionTitle
        kicker="Reviews"
        title="Detailed Client Reviews"
        description="High-trust testimonials from remote consultations delivered worldwide with practical coaching, clinical awareness and consistent follow-up."
      />
      <div class="three-col review-grid reveal-group">
        <TestimonialCard
          v-for="item in testimonials"
          :key="item.id"
          :testimonial="item"
        />
      </div>
    </section>

    <section class="container review-insights">
      <article
        v-for="theme in reviewThemes"
        :key="theme.label"
        class="insight-card glass-card reveal"
      >
        <span>{{ theme.label }}</span>
        <h3>{{ theme.value }}</h3>
        <p>{{ theme.note }}</p>
      </article>
    </section>

    <section class="container global-section">
      <SectionTitle
        kicker="Worldwide Access"
        title="Nutrition Support That Travels Across Borders"
        description="Clients can work with Rimsha from home, office, campus or while traveling. The coaching model adapts to time zones, local groceries and cultural meals."
        align="center"
      />
      <div class="global-grid reveal-group">
        <article
          v-for="region in globalReach"
          :key="region.region"
          class="global-card reveal"
        >
          <span>{{ region.region }}</span>
          <h3>{{ region.locations }}</h3>
          <p>{{ region.focus }}</p>
        </article>
      </div>
      <p class="results-note reveal">
        Results are representative client outcomes. Individual results vary by
        health history, consistency, medical context, sleep, stress and follow-up
        adherence.
      </p>
    </section>

    <section class="container">
      <CtaBanner
        kicker="Limited High-Touch Slots"
        title="Ready for a Result Story That Feels Like Yours?"
        description="Book your consultation and get a calm, evidence-based nutrition strategy designed around your body, schedule, culture and health condition."
        primary-text="Book Consultation"
        primary-to="/booking/"
        secondary-text="Explore Services"
        secondary-to="/services/"
      />
    </section>
  </main>
</template>

<style scoped>
.testimonials-page {
  display: grid;
  gap: clamp(66px, 8vw, 104px);
  position: relative;
}

.hero-section {
  display: grid;
  gap: clamp(28px, 5vw, 52px);
  align-items: center;
  padding-top: clamp(8px, 2vw, 18px);
}

.hero-copy {
  display: grid;
  gap: 18px;
}

.eyebrow {
  margin: 0;
}

h1 {
  margin: 0;
  max-width: 820px;
  font-size: 3rem;
  letter-spacing: 0;
  color: var(--ink-900);
}

.intro {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.7;
  max-width: 760px;
  font-size: 1.08rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.signal-list {
  display: grid;
  gap: 10px;
  list-style: none;
  max-width: 720px;
  margin-top: 4px;
}

.signal-list li {
  position: relative;
  color: var(--ink-700);
  font-weight: 700;
  padding-left: 28px;
}

.signal-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background:
    linear-gradient(135deg, var(--emerald-500), var(--teal-400)) padding-box,
    linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(16, 185, 129, 0.3))
      border-box;
  border: 3px solid transparent;
  box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.08);
}

.proof-dashboard {
  position: relative;
  overflow: hidden;
  padding: clamp(20px, 3vw, 32px);
  min-height: 410px;
  isolation: isolate;
  transform-style: preserve-3d;
}

.proof-dashboard::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.78), rgba(236, 253, 245, 0.3)),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.06) 0,
      rgba(6, 95, 70, 0.06) 1px,
      transparent 1px,
      transparent 42px
    );
}

.proof-dashboard::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: inherit;
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.72) 38%,
    transparent 54%
  );
  transform: translateX(-65%);
  animation: dashboard-shine 7s ease-in-out infinite;
}

.dashboard-top {
  display: flex;
  position: relative;
  z-index: 1;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 22px;
}

.dashboard-kicker {
  margin: 0 0 8px;
  color: var(--emerald-700);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
  font-weight: 800;
}

.dashboard-top h2 {
  max-width: 280px;
  font-size: 1.9rem;
}

.rating-orbit {
  width: 118px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  align-content: center;
  border-radius: 50%;
  background:
    linear-gradient(var(--glass-strong), var(--glass-strong)) padding-box,
    conic-gradient(
      from 30deg,
      var(--emerald-500),
      var(--teal-400),
      #f59e0b,
      var(--emerald-500)
    )
      border-box;
  border: 8px solid transparent;
  box-shadow:
    inset 0 0 24px rgba(16, 185, 129, 0.12),
    0 18px 42px rgba(6, 78, 59, 0.18);
  transform: translateZ(32px);
}

.rating-orbit span {
  color: var(--ink-900);
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.rating-orbit small {
  color: var(--ink-500);
  font-size: 0.72rem;
  font-weight: 800;
}

.proof-grid {
  display: grid;
  position: relative;
  z-index: 1;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.proof-cell {
  position: relative;
  min-height: 116px;
  padding: 16px;
  display: grid;
  align-content: start;
  gap: 4px;
  border: 1px solid rgba(16, 185, 129, 0.17);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.48);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.proof-cell strong {
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 2rem;
  line-height: 1;
}

.proof-cell span {
  color: var(--ink-900);
  font-weight: 800;
  font-size: 0.9rem;
}

.proof-cell small {
  color: var(--ink-500);
  line-height: 1.45;
}

.dashboard-footer {
  display: flex;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.dashboard-footer span {
  display: inline-flex;
  border-radius: 999px;
  padding: 7px 11px;
  color: var(--emerald-800);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  font-size: 0.78rem;
  font-weight: 800;
}

.outcome-grid,
.global-grid,
.review-insights {
  margin-top: 20px;
  display: grid;
  gap: 14px;
}

.outcome-card {
  position: relative;
  overflow: hidden;
  padding: clamp(22px, 3vw, 30px);
  transform-style: preserve-3d;
}

.outcome-card::before,
.insight-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.68) 45%,
    transparent 70%
  );
  transform: translateX(-82%);
  transition: transform 700ms ease;
}

.outcome-card:hover::before,
.insight-card:hover::before {
  transform: translateX(82%);
}

.outcome-top {
  display: flex;
  margin-bottom: 16px;
}

.outcome-top span {
  border-radius: 999px;
  padding: 6px 12px;
  color: var(--emerald-800);
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.22);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.outcome-card h3,
.insight-card h3,
.global-card h3,
.timeline-item h3 {
  font-size: 1.22rem;
  letter-spacing: 0;
}

.outcome-card p {
  margin-top: 10px;
  color: var(--ink-600);
  line-height: 1.7;
}

.outcome-card ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin-top: 18px;
}

.outcome-card li {
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(16, 185, 129, 0.14);
  font-size: 0.78rem;
  font-weight: 800;
}

.result-section {
  perspective: 1200px;
}

.three-col {
  margin-top: 16px;
  display: grid;
  gap: 14px;
}

.story-system {
  display: grid;
  gap: clamp(28px, 5vw, 60px);
  align-items: start;
  padding-block: clamp(28px, 5vw, 46px);
  border-block: 1px solid rgba(16, 185, 129, 0.13);
}

.system-copy {
  display: grid;
  gap: 14px;
  max-width: 570px;
}

.system-copy h2 {
  font-size: 2.6rem;
  letter-spacing: 0;
}

.system-copy p:not(.eyebrow) {
  line-height: 1.8;
  font-size: 1.02rem;
}

.timeline-panel {
  display: grid;
  gap: 12px;
  position: relative;
}

.timeline-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: start;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(16, 185, 129, 0.18);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(236, 253, 245, 0.42)),
    rgba(255, 255, 255, 0.46);
  box-shadow: 0 14px 38px rgba(6, 78, 59, 0.08);
}

.timeline-item > span {
  width: 48px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  box-shadow: 0 14px 26px rgba(5, 150, 105, 0.22);
  font-family: var(--font-heading);
  font-weight: 800;
}

.timeline-item p {
  margin-top: 6px;
  line-height: 1.65;
}

.review-grid {
  align-items: stretch;
}

.review-insights {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.insight-card {
  position: relative;
  overflow: hidden;
  padding: clamp(20px, 3vw, 28px);
}

.insight-card > span,
.global-card > span {
  color: var(--emerald-700);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.insight-card h3 {
  margin-top: 10px;
}

.insight-card p {
  margin-top: 8px;
  line-height: 1.7;
}

.global-section {
  display: grid;
  gap: 8px;
}

.global-card {
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(16, 185, 129, 0.15);
  background:
    linear-gradient(135deg, rgba(236, 253, 245, 0.78), rgba(255, 255, 255, 0.58)),
    repeating-linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.07) 0,
      rgba(16, 185, 129, 0.07) 1px,
      transparent 1px,
      transparent 18px
    );
  box-shadow: 0 18px 50px rgba(6, 78, 59, 0.08);
  transition:
    transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 340ms cubic-bezier(0.22, 1, 0.36, 1);
}

.global-card:hover {
  transform: translateY(-6px) rotateX(3deg);
  box-shadow: 0 26px 68px rgba(6, 78, 59, 0.14);
}

.global-card h3 {
  margin-top: 10px;
}

.global-card p {
  margin-top: 8px;
  line-height: 1.7;
}

.results-note {
  max-width: 760px;
  margin: 18px auto 0;
  text-align: center;
  color: var(--ink-500);
  font-size: 0.9rem;
}

@keyframes dashboard-shine {
  0%,
  35% {
    transform: translateX(-65%);
  }
  62%,
  100% {
    transform: translateX(68%);
  }
}

@media (min-width: 900px) {
  .hero-section {
    grid-template-columns: minmax(0, 1.03fr) minmax(360px, 0.72fr);
  }

  h1 {
    font-size: 4.7rem;
  }

  .outcome-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .three-col {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .story-system {
    grid-template-columns: minmax(0, 0.86fr) minmax(420px, 1fr);
  }

  .system-copy h2 {
    font-size: 3.15rem;
  }

  .global-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 899px) {
  .review-insights {
    grid-template-columns: 1fr;
  }

  .proof-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-top {
    align-items: center;
  }
}

@media (max-width: 560px) {
  h1 {
    font-size: 2.35rem;
  }

  .intro {
    font-size: 1rem;
  }

  .hero-actions :deep(.ui-button) {
    width: 100%;
  }

  .dashboard-top {
    flex-direction: column;
  }

  .rating-orbit {
    width: 106px;
  }

  .dashboard-top h2 {
    font-size: 1.55rem;
  }

  .proof-cell strong {
    font-size: 1.55rem;
  }

  .system-copy h2 {
    font-size: 1.95rem;
  }

  .timeline-item {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .proof-dashboard::after,
  .outcome-card::before,
  .insight-card::before {
    animation: none;
    transition: none;
  }

  .global-card:hover {
    transform: none;
  }
}
</style>
