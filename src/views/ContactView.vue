<script setup lang="ts">
import LeadCaptureForm from "../components/forms/LeadCaptureForm.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import { useSeo } from "../composables/useSeo";
import { pageSeo } from "../data/pageSeo";
import { targetMarkets } from "../data/site";

useSeo(pageSeo.contact);

const responseStats = [
  { value: "24h", label: "average reply window" },
  { value: "100%", label: "online consultation flow" },
  { value: "14+", label: "countries supported" },
];

const contactChannels = [
  {
    label: "Email",
    value: "rimshanaseer101@gmail.com",
    href: "mailto:rimshanaseer101@gmail.com",
    note: "Best for detailed goals, reports and collaboration requests.",
  },
  {
    label: "WhatsApp",
    value: "+1 555-210-8102",
    href: "https://wa.me/+9203007626555",
    note: "Fastest path for slot questions and quick consultation support.",
  },
  {
    label: "Instagram",
    value: "@dietrixnutrition",
    href: "https://instagram.com/dietrixnutrition",
    note: "Follow for nutrition tips, client education and program updates.",
  },
  {
    label: "LinkedIn",
    value: "Dietrix Nutrition",
    href: "https://www.linkedin.com",
    note: "For corporate wellness, partnerships and professional inquiries.",
  },
];

const intakeSteps = [
  {
    step: "01",
    title: "Share your goal",
    detail: "Tell us what you want to improve and what has felt hard so far.",
  },
  {
    step: "02",
    title: "Get routed clearly",
    detail: "We recommend the right plan, consultation type or next question.",
  },
  {
    step: "03",
    title: "Start with confidence",
    detail: "Your first session begins with a clear health and lifestyle map.",
  },
];

const consultationFit = [
  "Weight loss without crash dieting",
  "PCOS, diabetes, thyroid and gut concerns",
  "Remote plans for busy work and family routines",
  "Evidence-based meal structure with weekly accountability",
];

const marketSupportNotes = [
  "Flexible online appointments across time zones",
  "Custom plans for South Asian, Western, Middle Eastern and family meals",
  "Remote support for expats, professionals, students and busy parents",
];
</script>

<template>
  <main class="contact-page">
    <section class="container contact-hero reveal">
      <div class="hero-copy">
        <p class="eyebrow">Contact</p>
        <h1>Let’s Build Your Nutrition Strategy</h1>
        <p class="intro">
          Send your goal, symptoms, schedule or service question. Rimsha’s
          online nutrition support is designed to feel personal, clinical and
          easy to start from home.
        </p>
        <div class="hero-actions">
          <UiButton to="/booking" size="lg">Book Consultation</UiButton>
          <a
            class="hero-whatsapp"
            href="https://wa.me/+9203007626555"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <aside class="response-console glass-card" aria-label="Response overview">
        <div class="console-header">
          <span class="console-status">Live intake desk</span>
          <span class="console-light" aria-hidden="true"></span>
        </div>
        <div class="console-ring">
          <strong>4.9</strong>
          <span>client experience</span>
        </div>
        <div class="console-stats">
          <div v-for="stat in responseStats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="container contact-grid">
      <article class="contact-card form-card reveal">
        <div class="card-glow" aria-hidden="true"></div>
        <SectionTitle
          kicker="Get in Touch"
          title="Send Your Details"
          description="Tell us your goal and we will recommend your best-fit plan."
        />
        <LeadCaptureForm source="contact" />
      </article>

      <article class="contact-card channels-card reveal">
        <div class="card-glow" aria-hidden="true"></div>
        <SectionTitle
          kicker="Direct Channels"
          title="Talk to Us Faster"
          description="Prefer direct communication? Pick the channel that fits your question."
        />

        <div class="channel-grid">
          <a
            v-for="channel in contactChannels"
            :key="channel.label"
            class="channel-card"
            :href="channel.href"
            target="_blank"
            rel="noreferrer"
          >
            <span class="channel-code">{{ channel.label.slice(0, 2) }}</span>
            <span class="channel-meta">
              <strong>{{ channel.label }}</strong>
              <em>{{ channel.value }}</em>
              <small>{{ channel.note }}</small>
            </span>
          </a>
        </div>

        <div class="priority-panel">
          <span>Priority path</span>
          <h3>Ready to start? Reserve a consultation slot first.</h3>
          <div class="stacked-buttons">
            <UiButton to="/booking" :full-width="true">
              Book Consultation
            </UiButton>
            <UiButton to="/services" variant="outline" :full-width="true">
              View Services
            </UiButton>
          </div>
        </div>
      </article>
    </section>

    <section class="container contact-support">
      <div class="support-copy reveal">
        <p class="eyebrow">How It Works</p>
        <h2>A calmer path from question to first plan</h2>
        <p>
          The contact experience is built to reduce hesitation. You do not need
          perfect lab reports, a complete food diary or the right words. Share
          what you know, and the next step will be guided.
        </p>
      </div>

      <div class="intake-timeline reveal-group">
        <article
          v-for="item in intakeSteps"
          :key="item.step"
          class="timeline-card reveal"
        >
          <span>{{ item.step }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </section>

    <section class="container market-panel reveal">
      <div class="market-copy">
        <p class="eyebrow">International Clients</p>
        <h2>Online nutrition support across your target countries</h2>
        <p>
          Dietrix Nutrition is positioned for clients searching from Pakistan,
          the UK, England, USA, Canada, Germany, France, KSA, Dubai, UAE and
          Australia, with remote consultation and personalized diet planning.
        </p>
        <ul>
          <li v-for="note in marketSupportNotes" :key="note">{{ note }}</li>
        </ul>
      </div>

      <div
        class="market-grid"
        aria-label="Target countries for Dietrix Nutrition"
      >
        <article v-for="market in targetMarkets" :key="market.country">
          <span>{{ market.country }}</span>
          <strong>{{ market.keywordLabel }}</strong>
        </article>
      </div>
    </section>

    <section class="container fit-strip reveal">
      <div>
        <p class="eyebrow">Best Fit For</p>
        <h2>Personal nutrition support for real routines</h2>
      </div>
      <ul>
        <li v-for="item in consultationFit" :key="item">{{ item }}</li>
      </ul>
    </section>
  </main>
</template>

<style>
.contact-page {
  display: grid;
  gap: clamp(58px, 7vw, 92px);
}

.contact-hero {
  display: grid;
  gap: clamp(28px, 5vw, 54px);
  align-items: center;
  padding-top: 10px;
}

.hero-copy {
  display: grid;
  gap: 18px;
}

.contact-page .eyebrow {
  margin: 0;
}

.contact-page h1 {
  margin: 0;
  max-width: 830px;
  color: var(--ink-900);
  font-size: 3rem;
  letter-spacing: 0;
}

.contact-page .intro {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.75;
  max-width: 760px;
  font-size: 1.08rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

.hero-whatsapp {
  min-height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  padding: 0 28px;
  color: var(--emerald-800);
  font-weight: 800;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.32);
  box-shadow: 0 10px 28px rgba(6, 78, 59, 0.08);
  transition:
    transform 260ms ease,
    box-shadow 260ms ease,
    border-color 260ms ease;
}

.hero-whatsapp:hover {
  transform: translateY(-3px);
  border-color: rgba(16, 185, 129, 0.62);
  box-shadow: 0 18px 44px rgba(6, 78, 59, 0.14);
}

.response-console {
  position: relative;
  overflow: hidden;
  min-height: 390px;
  padding: 24px;
  display: grid;
  align-content: space-between;
  isolation: isolate;
  transform-style: preserve-3d;
}

.response-console::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(
      140deg,
      rgba(255, 255, 255, 0.86),
      rgba(236, 253, 245, 0.4)
    ),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.06) 0,
      rgba(6, 95, 70, 0.06) 1px,
      transparent 1px,
      transparent 40px
    );
}

.contact-page .response-console::after,
.contact-page .contact-card::after {
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
  animation: surface-sheen 7s ease-in-out infinite;
}

.contact-page .console-header,
.contact-page .console-ring,
.contact-page .console-stats {
  position: relative;
  z-index: 1;
}

.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.console-status {
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

.console-light {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--emerald-500);
  box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.12);
  animation: status-pulse 2.6s ease-in-out infinite;
}

.console-ring {
  width: min(220px, 68%);
  aspect-ratio: 1;
  margin: 18px auto;
  display: grid;
  place-items: center;
  align-content: center;
  border-radius: 50%;
  background:
    linear-gradient(var(--glass-strong), var(--glass-strong)) padding-box,
    conic-gradient(
        from 18deg,
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
  transform: translateZ(34px);
}

.console-ring strong {
  color: var(--ink-900);
  font-family: var(--font-heading);
  font-size: 3.2rem;
  line-height: 1;
}

.console-ring span {
  color: var(--ink-500);
  font-size: 0.82rem;
  font-weight: 800;
}

.console-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.console-stats div {
  min-height: 88px;
  display: grid;
  align-content: center;
  gap: 4px;
  border-radius: 18px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.console-stats strong {
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 1.5rem;
  line-height: 1;
}

.console-stats span {
  color: var(--ink-600);
  font-size: 0.76rem;
  font-weight: 800;
  line-height: 1.35;
}

.contact-grid {
  display: grid;
  gap: 16px;
  align-items: stretch;
}

.contact-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(102, 168, 161, 0.28);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(22px) saturate(170%);
  -webkit-backdrop-filter: blur(22px) saturate(170%);
  padding: clamp(20px, 3vw, 30px);
  box-shadow:
    0 20px 60px rgba(6, 78, 59, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  isolation: isolate;
  transform-style: preserve-3d;
  transition:
    transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 360ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 360ms ease;
}

.contact-card:hover {
  transform: perspective(1200px) rotateX(1.8deg) rotateY(-1.8deg)
    translateY(-7px);
  border-color: rgba(16, 185, 129, 0.38);
  box-shadow:
    0 30px 78px rgba(6, 78, 59, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.form-card,
.channels-card {
  display: grid;
  align-content: start;
  gap: 18px;
}

.card-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), transparent 34%),
    repeating-linear-gradient(
      135deg,
      rgba(16, 185, 129, 0.05) 0,
      rgba(16, 185, 129, 0.05) 1px,
      transparent 1px,
      transparent 18px
    );
}

.contact-page .contact-card > :not(.card-glow) {
  position: relative;
  z-index: 1;
}

.channel-grid {
  display: grid;
  gap: 10px;
}

.channel-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: start;
  padding: 14px;
  border-radius: 18px;
  color: inherit;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.54);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.74);
  transition:
    transform 260ms ease,
    background 260ms ease,
    border-color 260ms ease;
}

.channel-card:hover {
  transform: translateX(6px);
  background: rgba(236, 253, 245, 0.76);
  border-color: rgba(16, 185, 129, 0.34);
}

.channel-code {
  width: 42px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  box-shadow: 0 12px 24px rgba(5, 150, 105, 0.22);
}

.channel-meta {
  display: grid;
  gap: 3px;
}

.channel-meta strong {
  color: var(--ink-900);
  line-height: 1.2;
}

.channel-meta em {
  color: var(--emerald-700);
  font-style: normal;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.channel-meta small {
  color: var(--ink-500);
  line-height: 1.5;
}

.priority-panel {
  display: grid;
  gap: 12px;
  margin-top: 4px;
  padding: 18px;
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(5, 150, 105, 0.92)),
    rgba(6, 78, 59, 0.94);
  box-shadow: 0 20px 48px rgba(6, 78, 59, 0.22);
}

.contact-page .priority-panel > span {
  color: var(--emerald-200);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-page .priority-panel h3 {
  color: white;
  font-size: 1.32rem;
  letter-spacing: 0;
}

.stacked-buttons {
  display: grid;
  gap: 10px;
}

.contact-support {
  display: grid;
  gap: clamp(24px, 5vw, 52px);
  align-items: start;
  padding-block: clamp(26px, 5vw, 44px);
  border-block: 1px solid rgba(16, 185, 129, 0.13);
}

.support-copy {
  display: grid;
  gap: 14px;
  max-width: 560px;
}

.contact-page .support-copy h2,
.contact-page .fit-strip h2 {
  font-size: 2.55rem;
  letter-spacing: 0;
}

.contact-page .support-copy p:not(.eyebrow) {
  color: var(--ink-600);
  line-height: 1.8;
}

.intake-timeline {
  display: grid;
  gap: 12px;
}

.timeline-card {
  position: relative;
  overflow: hidden;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(16, 185, 129, 0.16);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 14px 38px rgba(6, 78, 59, 0.08);
  transition:
    transform 300ms ease,
    box-shadow 300ms ease;
}

.timeline-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 58px rgba(6, 78, 59, 0.13);
}

.contact-page .timeline-card span {
  width: 48px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-family: var(--font-heading);
  font-weight: 800;
}

.contact-page .timeline-card h3 {
  font-size: 1.14rem;
  letter-spacing: 0;
}

.contact-page .timeline-card p {
  margin-top: 8px;
  line-height: 1.65;
}

.market-panel {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 22px;
  align-items: start;
  padding: clamp(24px, 4vw, 36px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(
      135deg,
      rgba(236, 253, 245, 0.86),
      rgba(255, 255, 255, 0.66)
    ),
    rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 20px 58px rgba(6, 78, 59, 0.09);
  isolation: isolate;
}

.market-panel::after {
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
  animation: surface-sheen 7s ease-in-out infinite;
}

.market-panel > * {
  position: relative;
  z-index: 1;
}

.market-copy {
  display: grid;
  gap: 12px;
}

.contact-page .market-copy h2 {
  margin: 0;
  color: var(--ink-900);
  font-size: 2.45rem;
  letter-spacing: 0;
  line-height: 1.08;
}

.market-copy p:not(.eyebrow) {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.75;
}

.market-copy ul {
  display: grid;
  gap: 8px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

.market-copy li {
  color: var(--ink-600);
  line-height: 1.5;
}

.market-copy li::before {
  content: "";
  width: 7px;
  height: 7px;
  display: inline-block;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--emerald-700);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
}

.market-grid {
  display: grid;
  gap: 10px;
}

.market-grid article {
  display: grid;
  gap: 6px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.76);
}

.market-grid span {
  color: var(--emerald-700);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.market-grid strong {
  color: var(--ink-800);
  line-height: 1.25;
}

.fit-strip {
  display: grid;
  gap: 20px;
  align-items: center;
  padding: clamp(24px, 4vw, 36px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(
      135deg,
      rgba(236, 253, 245, 0.84),
      rgba(255, 255, 255, 0.64)
    ),
    rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 20px 58px rgba(6, 78, 59, 0.09);
  border-bottom: 22px;
}

.contact-page .fit-strip ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
}

.contact-page .fit-strip li {
  border-radius: 999px;
  padding: 10px 13px;
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.18);
  font-size: 0.86rem;
  font-weight: 800;
}

@keyframes surface-sheen {
  0%,
  38% {
    transform: translateX(-78%);
  }
  68%,
  100% {
    transform: translateX(78%);
  }
}

@keyframes status-pulse {
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

@media (min-width: 900px) {
  .contact-hero {
    grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.64fr);
  }

  .contact-page h1 {
    font-size: 4.4rem;
  }

  .contact-grid {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 1fr);
  }

  .contact-support {
    grid-template-columns: minmax(0, 0.82fr) minmax(440px, 1fr);
  }

  .market-panel {
    grid-template-columns: minmax(0, 0.74fr) minmax(0, 1fr);
  }

  .market-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .intake-timeline {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .fit-strip {
    grid-template-columns: minmax(0, 0.72fr) minmax(0, 1fr);
  }
}

@media (max-width: 720px) {
  .contact-page h1 {
    font-size: 2.35rem;
  }

  .contact-page .intro {
    font-size: 1rem;
  }

  .contact-page .hero-actions .ui-button,
  .hero-whatsapp {
    width: 100%;
  }

  .console-stats {
    grid-template-columns: 1fr;
  }

  .contact-page .support-copy h2,
  .contact-page .market-copy h2,
  .contact-page .fit-strip h2 {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-page .response-console::after,
  .contact-page .contact-card::after,
  .contact-page .market-panel::after,
  .contact-page .console-light {
    animation: none;
  }

  .contact-page .contact-card:hover,
  .contact-page .hero-whatsapp:hover,
  .contact-page .channel-card:hover,
  .contact-page .timeline-card:hover {
    transform: none;
  }
}
</style>
