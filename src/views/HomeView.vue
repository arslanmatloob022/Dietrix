<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import BlogCard from "../components/cards/BlogCard.vue";
import ServiceCard from "../components/cards/ServiceCard.vue";
import TestimonialCard from "../components/cards/TestimonialCard.vue";
import TransformationCard from "../components/cards/TransformationCard.vue";
import LeadCaptureForm from "../components/forms/LeadCaptureForm.vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import FaqAccordion from "../components/ui/FaqAccordion.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import {
  blogPosts,
  faqs,
  nutritionistProfile,
  certifications,
  services,
  siteName,
  testimonials,
  transformations,
  trustBadges,
} from "../data/content";
import { upsertJsonLd, useSeo } from "../composables/useSeo";

useSeo({
  title:
    "Online Nutritionist for Weight Loss & Clinical Nutrition | Dietrix Nutrition",
  description:
    "Book online consultations for weight loss, PCOS, diabetes, and personalized diet coaching with a certified nutritionist. Globally accessible, evidence-based care.",
});

upsertJsonLd("dietrix-schema", {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: siteName,
  medicalSpecialty: "Nutrition",
  areaServed: "Worldwide",
  url: window.location.origin,
  availableService: services.map((s) => ({
    "@type": "Service",
    name: s.title,
  })),
});

// Rotating hero headline word
const heroWords = ["Weight", "Health", "Energy", "Life", "Habits"];
const wordIdx = ref(0);
let wordTimer: ReturnType<typeof setInterval>;

// Animated counter
function animateCounter(el: HTMLElement, target: number, duration = 2000) {
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const decimals = el.dataset.decimals ? +el.dataset.decimals : 0;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - p) ** 3;
    const val = eased * target;
    el.textContent =
      prefix +
      (decimals ? val.toFixed(decimals) : Math.round(val).toString()) +
      suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// 3D Tilt
const tiltCleanups: (() => void)[] = [];
function initTilt() {
  document.querySelectorAll<HTMLElement>(".tilt-card").forEach((card) => {
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -20;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03) translateZ(8px)`;
      card.style.transition = "transform 80ms linear";
    };
    const onLeave = () => {
      card.style.transform = "";
      card.style.transition =
        "transform 700ms cubic-bezier(0.25, 0.8, 0.25, 1)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    tiltCleanups.push(() => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    });
  });
}

onMounted(() => {
  wordTimer = setInterval(() => {
    wordIdx.value = (wordIdx.value + 1) % heroWords.length;
  }, 2800);

  // scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("reveal-pending");
          e.target.classList.add("is-visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => {
    el.classList.add("reveal-pending");
    revealObs.observe(el);
  });

  // counters
  const cEls = document.querySelectorAll<HTMLElement>("[data-count]");
  const cObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(
            e.target as HTMLElement,
            +(e.target as HTMLElement).dataset.count!,
            2200,
          );
          cObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  cEls.forEach((el) => cObs.observe(el));

  initTilt();
});

onUnmounted(() => {
  clearInterval(wordTimer);
  tiltCleanups.forEach((fn) => fn());
});

const features = [
  {
    icon: "🔬",
    title: "Evidence-Based",
    desc: "Every protocol built on peer-reviewed nutrition science, not trends or fads.",
  },
  {
    icon: "🌐",
    title: "100% Remote",
    desc: "Consult from anywhere worldwide — video, WhatsApp, or async email support.",
  },
  {
    icon: "⚡",
    title: "Fast Real Results",
    desc: "Avg. 6.8 kg fat loss in 12 weeks with clinical tracking and weekly reviews.",
  },
  {
    icon: "🎯",
    title: "Hyper-Personalized",
    desc: "Plans match your culture, food preferences, medical history, and schedule.",
  },
  {
    icon: "🤝",
    title: "Ongoing Accountability",
    desc: "Weekly check-in calls, progress reviews, and real-time plan adjustments.",
  },
  {
    icon: "🛡️",
    title: "Clinically Certified",
    desc: "Globally recognized credentials: M.Sc. Clinical Nutrition, CDE, PCOS Specialist.",
  },
];

const specialities = [
  { icon: "⚖️", label: "Weight Loss", tag: "Most Popular" },
  { icon: "🩺", label: "PCOS Nutrition", tag: "Hormonal" },
  { icon: "💉", label: "Diabetes Management", tag: "Clinical" },
  { icon: "🫀", label: "Heart Health", tag: "Preventive" },
  { icon: "🧠", label: "Gut & Brain", tag: "Microbiome" },
  { icon: "🦋", label: "Thyroid Support", tag: "Metabolic" },
  { icon: "💪", label: "Sports Nutrition", tag: "Performance" },
  { icon: "🌱", label: "Plant-Based Plans", tag: "Lifestyle" },
];

const processSteps = [
  {
    num: "01",
    emoji: "📋",
    title: "Book Your Slot",
    desc: "Choose your time from available slots. Share your health background and goals in seconds.",
  },
  {
    num: "02",
    emoji: "🎯",
    title: "Get Your Blueprint",
    desc: "Receive a personalized nutrition plan designed around your unique body, goals, and lifestyle.",
  },
  {
    num: "03",
    emoji: "📈",
    title: "Track Real Progress",
    desc: "Weekly check-ins, plan adjustments, and continuous support until you hit your target.",
  },
];
</script>

<template>
  <main class="home">
    <!-- ════════════════════════════════════════════
         HERO  —  Dark aurora, 3D cards, rotating word
         ════════════════════════════════════════════ -->
    <section class="hero-section">
      <div class="hero-aurora" aria-hidden="true">
        <div class="ao ao-1"></div>
        <div class="ao ao-2"></div>
        <div class="ao ao-3"></div>
        <div class="ao ao-4"></div>
        <div class="hero-dot-grid"></div>
        <div class="hero-grid-lines"></div>
      </div>

      <!-- 3D floating metric cards (desktop) -->
      <div class="hero-floats" aria-hidden="true">
        <div class="float-card fc-1">
          <span class="fc-ico">⚡</span>
          <div>
            <p class="fc-val">-6.8 kg</p>
            <p class="fc-lab">Avg. 12-week fat loss</p>
          </div>
        </div>
        <div class="float-card fc-2">
          <span class="fc-ico">💚</span>
          <div>
            <p class="fc-val">89%</p>
            <p class="fc-lab">Client retention rate</p>
          </div>
        </div>
        <div class="float-card fc-3">
          <span class="fc-ico">🌍</span>
          <div>
            <p class="fc-val">14+</p>
            <p class="fc-lab">Countries served</p>
          </div>
        </div>
        <div class="float-card fc-4">
          <span class="live-dot-ring"></span>
          <span class="fc-ico">🟢</span>
          <div>
            <p class="fc-val fc-live">LIVE</p>
            <p class="fc-lab">3 slots remaining</p>
          </div>
        </div>
      </div>

      <div class="container hero-grid">
        <!-- Left copy -->
        <div class="hero-copy reveal">
          <div class="hero-eyebrow-row">
            <span class="hero-badge">✦ Certified Online Nutritionist</span>
            <span class="live-pill">
              <span class="live-dot"></span>12 active clients
            </span>
          </div>

          <h1 class="hero-h1">
            Transform Your<br />
            <span class="word-wrap">
              <Transition name="word" mode="out-in">
                <span :key="wordIdx" class="rotating-word gradient-text">{{
                  heroWords[wordIdx]
                }}</span>
              </Transition> </span
            ><br />
            <span class="hero-h1-muted">with Science</span>
          </h1>

          <p class="hero-sub">
            Evidence-based 1-on-1 nutrition coaching for fat loss, PCOS,
            diabetes, gut health, and high-performance lifestyles — from
            anywhere in the world.
          </p>

          <div class="hero-actions">
            <RouterLink to="/booking" class="hero-btn-primary">
              Book Free Consultation
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9h12M11 5l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RouterLink>
            <RouterLink to="/services" class="hero-btn-outline"
              >Explore Plans</RouterLink
            >
          </div>

          <div class="hero-proof">
            <div class="proof-avs">
              <span class="pa">H</span><span class="pa">K</span>
              <span class="pa">M</span><span class="pa">R</span>
              <span class="pa pa-plus">+</span>
            </div>
            <div class="proof-text">
              <strong>1,800+ clients</strong> coached across 14 countries
            </div>
          </div>

          <div class="hero-urgency">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                stroke="#ef4444"
                stroke-width="1.3"
              />
              <path
                d="M6.5 4V6.5l1.6 1"
                stroke="#ef4444"
                stroke-width="1.3"
                stroke-linecap="round"
              />
            </svg>
            Only <strong>3 new slots</strong> available this month — limited
            intake
          </div>
        </div>

        <!-- Right: form card -->
        <div class="hero-form-wrap reveal">
          <div class="hero-form-card">
            <div class="form-card-header">
              <div class="fch-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 13 7 13s7-9.13 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                    fill="url(#fgd)"
                  />
                  <defs>
                    <linearGradient
                      id="fgd"
                      x1="5"
                      y1="2"
                      x2="19"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#34d399" />
                      <stop offset="1" stop-color="#2dd4bf" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h2>Get Your Free Blueprint</h2>
                <p>Share your goal — tailored plan in 24 h</p>
              </div>
            </div>
            <div class="form-card-body">
              <LeadCaptureForm source="home-cta" />
            </div>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="hero-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#f0faf8"
          />
        </svg>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         MARQUEE  —  Countries served
         ════════════════════════════════════════════ -->
    <div class="marquee-section" aria-label="Globally trusted">
      <div class="marquee-track" aria-hidden="true">
        <div class="marquee-inner">
          <template v-for="n in 3" :key="n">
            <span class="mq-item">🇺🇸 USA</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇬🇧 UK</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇦🇺 Australia</span
            ><span class="mq-sep">✦</span> <span class="mq-item">🇦🇪 UAE</span
            ><span class="mq-sep">✦</span> <span class="mq-item">🇨🇦 Canada</span
            ><span class="mq-sep">✦</span>
            <span class="mq-item">🇸🇦 Saudi Arabia</span
            ><span class="mq-sep">✦</span> <span class="mq-item">🇮🇳 India</span
            ><span class="mq-sep">✦</span>
            <span class="mq-item">🇩🇪 Germany</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇳🇿 New Zealand</span
            ><span class="mq-sep">✦</span>
            <span class="mq-item">🇸🇬 Singapore</span
            ><span class="mq-sep">✦</span>
          </template>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════════════════
         STATS  —  Dark glass, animated counters, 3D
         ════════════════════════════════════════════ -->
    <section class="stats-section dark-section">
      <div class="dark-orb ds-o1" aria-hidden="true"></div>
      <div class="dark-orb ds-o2" aria-hidden="true"></div>
      <div class="dark-dot-grid" aria-hidden="true"></div>
      <div class="container">
        <SectionTitle
          kicker="Proven Results"
          title="Numbers That Speak for Themselves"
          description="Clinical protocols and real accountability create measurable, lasting change."
          align="center"
        />
        <div class="stats-grid reveal-group">
          <div class="stat-card glass-dark tilt-card reveal">
            <div class="stat-glow" aria-hidden="true"></div>
            <p
              class="stat-val"
              data-count="6.8"
              data-suffix=" kg"
              data-decimals="1"
            >
              6.8 kg
            </p>
            <p class="stat-lab">Average Fat Loss in 12 Weeks</p>
          </div>
          <div class="stat-card glass-dark tilt-card reveal">
            <div class="stat-glow" aria-hidden="true"></div>
            <p class="stat-val" data-count="89" data-suffix="%">89%</p>
            <p class="stat-lab">Client Retention Rate</p>
          </div>
          <div class="stat-card glass-dark tilt-card reveal">
            <div class="stat-glow" aria-hidden="true"></div>
            <p class="stat-val" data-count="92" data-suffix="%">92%</p>
            <p class="stat-lab">Improved Blood Markers</p>
          </div>
          <div class="stat-card glass-dark tilt-card reveal">
            <div class="stat-glow" aria-hidden="true"></div>
            <p class="stat-val" data-count="1800" data-suffix="+">1800+</p>
            <p class="stat-lab">Clients Coached Globally</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         WHY DIETRIX  —  6-feature 3D tilt grid
         ════════════════════════════════════════════ -->
    <section class="features-section container">
      <SectionTitle
        kicker="Why Dietrix"
        title="World-Class Nutrition. Personal Touch."
        description="We combine clinical expertise with a human-centered coaching model that creates results that actually last."
      />
      <div class="features-grid reveal-group">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="feature-card glass-card tilt-card reveal"
        >
          <div class="feature-icon-bg" aria-hidden="true">
            <span class="feature-icon">{{ f.icon }}</span>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         SERVICES
         ════════════════════════════════════════════ -->
    <section class="services-section container">
      <SectionTitle
        kicker="Services"
        title="Plans Built Around Your Body, Schedule and Goals"
        description="Choose the support level that matches your current stage and health needs."
      />
      <div class="three-col reveal-group">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :item="service"
        />
      </div>
      <div class="section-action reveal">
        <UiButton to="/services" variant="outline" size="lg"
          >View All Plans and Pricing</UiButton
        >
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         HOW IT WORKS  —  Dark, 3-step timeline
         ════════════════════════════════════════════ -->
    <section class="process-section dark-section">
      <div class="dark-orb ps-o1" aria-hidden="true"></div>
      <div class="dark-dot-grid" aria-hidden="true"></div>
      <div class="container">
        <SectionTitle
          kicker="Process"
          title="From First Contact to First Results in 48 Hours"
          description="A streamlined 3-step journey designed to get you started fast and keep you on track."
          align="center"
        />
        <div class="process-grid reveal-group">
          <div
            v-for="(step, i) in processSteps"
            :key="i"
            class="process-card glass-dark reveal"
          >
            <div class="process-num" aria-hidden="true">{{ step.num }}</div>
            <div class="process-icon-wrap" aria-hidden="true">
              <span class="process-icon">{{ step.emoji }}</span>
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
        <div class="section-action reveal" style="margin-top: 52px">
          <RouterLink to="/booking" class="hero-btn-primary">
            Start Your Transformation
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 9h12M11 5l4 4-4 4"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         SPECIALITIES  —  8-card health conditions
         ════════════════════════════════════════════ -->
    <section class="spec-section container">
      <SectionTitle
        kicker="Specialities"
        title="Conditions We Help You Master"
        description="Clinical expertise across the full spectrum of nutrition-related health challenges."
      />
      <div class="spec-grid reveal-group">
        <div
          v-for="(s, i) in specialities"
          :key="i"
          class="spec-card glass-card tilt-card reveal"
        >
          <span class="spec-icon" aria-hidden="true">{{ s.icon }}</span>
          <h4>{{ s.label }}</h4>
          <span class="spec-tag">{{ s.tag }}</span>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         MEET THE EXPERT  —  Nutritionist bio
         ════════════════════════════════════════════ -->
    <section class="expert-section dark-section">
      <div class="dark-orb ex-o1" aria-hidden="true"></div>
      <div class="container expert-grid reveal">
        <div class="expert-photo-wrap">
          <div class="expert-photo-frame">
            <img
              src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=480&q=85&auto=format"
              alt="Dn. Rimsha Naseer — Certified Clinical Nutritionist"
              class="expert-photo"
              loading="lazy"
            />
            <div class="expert-photo-glow" aria-hidden="true"></div>
          </div>
          <div class="expert-badge-chip">
            <span aria-hidden="true">🎓</span>
            {{ nutritionistProfile.experience }} Experience
          </div>
        </div>
        <div class="expert-copy">
          <span class="expert-kicker eyebrow">Meet Your Nutritionist</span>
          <h2 class="expert-name">{{ nutritionistProfile.name }}</h2>
          <p class="expert-role">{{ nutritionistProfile.role }}</p>
          <p class="expert-story">{{ nutritionistProfile.story }}</p>
          <div class="cert-list">
            <div v-for="cert in certifications" :key="cert" class="cert-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7.5"
                  fill="rgba(16,185,129,0.15)"
                  stroke="rgba(16,185,129,0.35)"
                />
                <path
                  d="M5 8l2 2 4-4"
                  stroke="#34d399"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ cert }}
            </div>
          </div>
          <div class="expert-cta">
            <RouterLink to="/about" class="hero-btn-primary">
              Learn My Story
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9h12M11 5l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         TRANSFORMATIONS
         ════════════════════════════════════════════ -->
    <section class="transformations-section container">
      <SectionTitle
        kicker="Transformations"
        title="Real People, Real Results"
        description="Client transformations driven by consistent nutrition and personalized coaching."
      />
      <div class="three-col reveal-group">
        <TransformationCard
          v-for="item in transformations"
          :key="item.id"
          :item="item"
        />
      </div>
      <div class="section-action reveal">
        <UiButton to="/testimonials" variant="outline" size="lg"
          >See All Stories</UiButton
        >
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         TESTIMONIALS  —  Dark glass cards
         ════════════════════════════════════════════ -->
    <section class="testimonials-section dark-section">
      <div class="dark-orb ts-o1" aria-hidden="true"></div>
      <div class="dark-orb ts-o2" aria-hidden="true"></div>
      <div class="container">
        <SectionTitle
          kicker="Testimonials"
          title="What Clients Say After Coaching"
          description="Real words from clients who improved body composition, biomarkers, and confidence."
          align="center"
        />
        <div class="two-col reveal-group">
          <TestimonialCard
            v-for="item in testimonials.slice(0, 2)"
            :key="item.id"
            :testimonial="item"
          />
        </div>
        <div class="section-action reveal">
          <UiButton to="/testimonials" variant="outline" size="lg"
            >Read More Success Stories</UiButton
          >
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         TRUST BADGES
         ════════════════════════════════════════════ -->
    <section class="trust-section container">
      <ul class="trust-grid reveal-group" aria-label="Trust credentials">
        <li
          v-for="badge in trustBadges"
          :key="badge.id"
          class="trust-item glass-card reveal"
        >
          <div class="trust-icon" aria-hidden="true">✦</div>
          <div>
            <h3>{{ badge.label }}</h3>
            <p>{{ badge.subtitle }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- ════════════════════════════════════════════
         FAQ
         ════════════════════════════════════════════ -->
    <section class="faq-section container">
      <SectionTitle
        kicker="FAQ"
        title="Common Questions Before You Start"
        description="Everything you need to know about online nutrition consultations and coaching."
      />
      <FaqAccordion :items="faqs" />
    </section>

    <!-- ════════════════════════════════════════════
         BLOG
         ════════════════════════════════════════════ -->
    <section class="blog-section container">
      <SectionTitle
        kicker="Nutrition Blog"
        title="Evidence-Based Articles for Better Health"
        description="Practical content built to help you and rank for high-intent health searches."
      />
      <div class="three-col reveal-group">
        <BlogCard v-for="post in blogPosts" :key="post.slug" :post="post" />
      </div>
      <div class="section-action reveal">
        <UiButton to="/blog" variant="outline" size="lg"
          >Browse All Articles</UiButton
        >
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         CTA
         ════════════════════════════════════════════ -->
    <section class="cta-section container">
      <CtaBanner
        title="Ready to Transform Your Health?"
        description="Join 1,800+ clients worldwide who changed their nutrition and their life. Limited new spots available each month."
        primary-text="Book Your Consultation"
        primary-to="/booking"
        secondary-text="Chat with Assistant"
        secondary-to="/contact"
        kicker="Start Today"
      />
    </section>
  </main>
</template>

<style scoped>
/* ═══════════════════════════════════
   LAYOUT
   ═══════════════════════════════════ */
.home {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.container {
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════
   HERO
   ═══════════════════════════════════ */
.hero-section {
  position: relative;
  min-height: 100svh;
  background:
    radial-gradient(
      ellipse 130% 100% at 12% -10%,
      rgba(6, 78, 59, 0.95) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 80% 70% at 88% 110%,
      rgba(13, 148, 136, 0.6) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse 50% 40% at 50% 50%,
      rgba(5, 150, 105, 0.12) 0%,
      transparent 65%
    ),
    #050e0a;
  overflow: hidden;
  padding-bottom: 80px;
}

/* Aurora */
.hero-aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.ao {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: ao-drift 16s ease-in-out infinite alternate;
}
.ao-1 {
  width: 700px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(6, 78, 59, 0.8), transparent 70%);
  top: -200px;
  left: -200px;
}
.ao-2 {
  width: 500px;
  height: 400px;
  background: radial-gradient(
    ellipse,
    rgba(13, 148, 136, 0.5),
    transparent 70%
  );
  top: 0;
  right: -150px;
  animation-delay: -5s;
  animation-duration: 13s;
}
.ao-3 {
  width: 400px;
  height: 320px;
  background: radial-gradient(ellipse, rgba(5, 150, 105, 0.4), transparent 70%);
  bottom: 80px;
  left: 20%;
  animation-delay: -9s;
  animation-duration: 19s;
}
.ao-4 {
  width: 300px;
  height: 250px;
  background: radial-gradient(
    ellipse,
    rgba(20, 184, 166, 0.3),
    transparent 70%
  );
  top: 35%;
  right: 18%;
  animation-delay: -3s;
  animation-duration: 22s;
}

.hero-dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.14) 1px,
    transparent 1px
  );
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black, transparent);
}
.hero-grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Floating 3D metric cards */
.hero-floats {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}
.float-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform-style: preserve-3d;
}
.fc-1 {
  top: 20%;
  right: 5%;
  animation: float-1 7s ease-in-out infinite;
}
.fc-2 {
  top: 54%;
  right: 2%;
  animation: float-2 9s ease-in-out infinite;
}
.fc-3 {
  top: 12%;
  left: 52%;
  animation: float-3 8s ease-in-out infinite;
}
.fc-4 {
  bottom: 22%;
  right: 6%;
  animation: float-1 11s ease-in-out infinite reverse;
}

.fc-ico {
  font-size: 1.5rem;
  line-height: 1;
}
.fc-val {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: white;
  line-height: 1;
  margin: 0;
}
.fc-live {
  color: #4ade80 !important;
}
.fc-lab {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 3px 0 0;
}
.live-dot-ring {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  animation: live-pulse 1.8s ease-in-out infinite;
}

/* Hero layout */
.hero-grid {
  position: relative;
  z-index: 3;
  display: grid;
  gap: 40px;
  align-items: center;
  padding-top: clamp(90px, 12vw, 130px);
  padding-bottom: 40px;
  min-height: 100svh;
}

/* Hero copy */
.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: white;
}
.hero-eyebrow-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.hero-badge {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--emerald-300);
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 5px 14px;
  border-radius: 99px;
}
.live-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 5px 13px;
  border-radius: 99px;
}
.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: live-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.hero-h1 {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  font-weight: 800;
  color: white;
  line-height: 1.04;
  letter-spacing: -0.04em;
}
.hero-h1-muted {
  color: rgba(255, 255, 255, 0.55);
}

/* Rotating word */
.word-wrap {
  display: inline-block;
  position: relative;
  min-width: 300px;
  vertical-align: bottom;
}
.rotating-word {
  display: inline-block;
}
.word-enter-active {
  transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.word-leave-active {
  transition: all 260ms ease-in;
  position: absolute;
  left: 0;
}
.word-enter-from {
  opacity: 0;
  transform: translateY(44px) skewY(5deg);
}
.word-leave-to {
  opacity: 0;
  transform: translateY(-32px) skewY(-4deg);
}

.hero-sub {
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.62);
  max-width: 520px;
}

/* Buttons */
.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.hero-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: linear-gradient(
    135deg,
    var(--emerald-600),
    var(--emerald-500),
    var(--teal-500)
  );
  color: white;
  font-weight: 800;
  font-size: 1rem;
  padding: 15px 30px;
  border-radius: 14px;
  text-decoration: none;
  box-shadow:
    0 12px 40px rgba(5, 150, 105, 0.45),
    0 4px 16px rgba(5, 150, 105, 0.2);
  position: relative;
  overflow: hidden;
  transition:
    transform 260ms,
    box-shadow 260ms;
}
.hero-btn-primary::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent,
    rgba(255, 255, 255, 0.22),
    transparent
  );
  transition: left 600ms ease;
}
.hero-btn-primary:hover::before {
  left: 160%;
}
.hero-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow:
    0 20px 60px rgba(5, 150, 105, 0.55),
    0 6px 24px rgba(5, 150, 105, 0.3);
}
.hero-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.07);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 15px 30px;
  border-radius: 14px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition:
    background 240ms,
    border-color 240ms,
    transform 240ms;
}
.hero-btn-outline:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}

/* Proof */
.hero-proof {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.62);
}
.hero-proof strong {
  color: white;
}
.proof-avs {
  display: flex;
}
.pa {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-600));
  color: white;
  font-weight: 800;
  font-size: 0.78rem;
  display: grid;
  place-items: center;
  border: 2.5px solid #050e0a;
  margin-left: -10px;
}
.pa:first-child {
  margin-left: 0;
}
.pa-plus {
  background: rgba(255, 255, 255, 0.12);
  font-size: 1rem;
}

/* Urgency */
.hero-urgency {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.52);
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 7px 16px;
  border-radius: 99px;
  max-width: fit-content;
}
.hero-urgency strong {
  color: #fca5a5;
}

/* Form card */
.hero-form-wrap {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
}
.hero-form-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(32px) saturate(180%);
  -webkit-backdrop-filter: blur(32px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 460px;
}
.form-card-header {
  background: linear-gradient(
    135deg,
    rgba(6, 78, 59, 0.9),
    rgba(13, 148, 136, 0.75)
  );
  padding: 20px 24px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.fch-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.form-card-header h2 {
  font-size: 1.05rem;
  font-weight: 700;
  color: white;
  margin: 0 0 4px;
}
.form-card-header p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}
.form-card-body {
  padding: 4px;
}

/* Wave */
.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
  pointer-events: none;
}
.hero-wave svg {
  width: 100%;
  height: 80px;
}

/* ═══════════════════════════════════
   MARQUEE
   ═══════════════════════════════════ */
.marquee-section {
  overflow: hidden;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(16, 185, 129, 0.05),
    transparent
  );
  border-top: 1px solid rgba(16, 185, 129, 0.12);
  border-bottom: 1px solid rgba(16, 185, 129, 0.12);
  padding: 14px 0;
}
.marquee-track {
  display: flex;
  overflow: hidden;
}
.marquee-inner {
  display: flex;
  align-items: center;
  animation: marquee-scroll 28s linear infinite;
  white-space: nowrap;
  will-change: transform;
}
.mq-item {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink-600);
  padding: 0 22px;
}
.mq-sep {
  color: var(--emerald-400);
  font-size: 0.6rem;
  flex-shrink: 0;
}

/* ═══════════════════════════════════
   DARK SECTION (shared)
   ═══════════════════════════════════ */
.dark-section {
  background:
    radial-gradient(
      ellipse 100% 80% at 10% 50%,
      rgba(6, 78, 59, 0.5) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse 80% 60% at 90% 50%,
      rgba(13, 148, 136, 0.3) 0%,
      transparent 60%
    ),
    #050e0a;
  position: relative;
  overflow: hidden;
  padding: 96px 0;
  --st-title-color: white;
  --st-desc-color: rgba(255, 255, 255, 0.6);
  --st-kicker-color: var(--emerald-400);
}
.dark-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.ds-o1 {
  width: 500px;
  height: 400px;
  background: rgba(6, 78, 59, 0.45);
  top: -100px;
  left: -80px;
}
.ds-o2 {
  width: 400px;
  height: 300px;
  background: rgba(13, 148, 136, 0.25);
  bottom: -60px;
  right: -60px;
}
.ps-o1 {
  width: 600px;
  height: 500px;
  background: rgba(6, 78, 59, 0.5);
  top: -150px;
  right: -100px;
}
.ex-o1 {
  width: 600px;
  height: 500px;
  background: rgba(6, 78, 59, 0.4);
  bottom: -150px;
  left: -100px;
}
.ts-o1 {
  width: 500px;
  height: 400px;
  background: rgba(6, 78, 59, 0.4);
  top: -100px;
  left: 20%;
}
.ts-o2 {
  width: 400px;
  height: 300px;
  background: rgba(13, 148, 136, 0.2);
  bottom: -60px;
  right: 10%;
}

/* ═══════════════════════════════════
   STATS
   ═══════════════════════════════════ */
.stats-section {
  padding: 96px 0;
}
.stats-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 52px;
}
.stat-card {
  position: relative;
  padding: 40px 28px;
  text-align: center;
  overflow: hidden;
}
.stat-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(16, 185, 129, 0.14),
    transparent 60%
  );
  pointer-events: none;
}
.stat-val {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--emerald-400), var(--teal-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin: 0 0 10px;
}
.stat-lab {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.52);
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
}

/* ═══════════════════════════════════
   FEATURES
   ═══════════════════════════════════ */
.features-section {
  padding: 96px 0;
}
.features-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 52px;
}
.feature-card {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
}
.feature-icon-bg {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.15),
    rgba(13, 148, 136, 0.1)
  );
  border: 1px solid rgba(16, 185, 129, 0.2);
  display: grid;
  place-items: center;
  transition:
    transform 300ms,
    background 300ms;
}
.feature-card:hover .feature-icon-bg {
  transform: scale(1.1) rotate(-6deg);
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.25),
    rgba(13, 148, 136, 0.18)
  );
}
.feature-icon {
  font-size: 1.8rem;
  line-height: 1;
  display: block;
}
.feature-card h3 {
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0;
}
.feature-card p {
  font-size: 0.9rem;
  color: var(--ink-500);
  line-height: 1.65;
  margin: 0;
}

/* ═══════════════════════════════════
   SERVICES
   ═══════════════════════════════════ */
.services-section {
  padding: 96px 0;
}

/* ═══════════════════════════════════
   PROCESS
   ═══════════════════════════════════ */
.process-grid {
  display: grid;
  gap: 24px;
  margin-top: 52px;
}
.process-card {
  position: relative;
  padding: 40px 36px;
  overflow: hidden;
}
.process-num {
  position: absolute;
  top: 16px;
  right: 24px;
  font-family: var(--font-heading);
  font-size: 5rem;
  font-weight: 900;
  color: rgba(16, 185, 129, 0.1);
  line-height: 1;
  user-select: none;
}
.process-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.2);
  display: grid;
  place-items: center;
  margin-bottom: 20px;
}
.process-icon {
  font-size: 1.8rem;
}
.process-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 10px;
}
.process-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  margin: 0;
}

/* ═══════════════════════════════════
   SPECIALITIES
   ═══════════════════════════════════ */
.spec-section {
  padding: 96px 0;
}
.spec-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  margin-top: 52px;
}
.spec-card {
  padding: 28px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.spec-icon {
  font-size: 2.4rem;
  line-height: 1;
  display: block;
  filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.25));
  transition: transform 320ms;
}
.spec-card:hover .spec-icon {
  transform: scale(1.2) translateY(-5px);
}
.spec-card h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0;
}
.spec-tag {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--emerald-700);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 3px 10px;
  border-radius: 99px;
}

/* ═══════════════════════════════════
   EXPERT SECTION
   ═══════════════════════════════════ */
.expert-section {
  padding: 96px 0;
}
.expert-grid {
  display: grid;
  gap: 60px;
  align-items: center;
}
.expert-photo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.expert-photo-frame {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4/5;
  border: 2px solid rgba(16, 185, 129, 0.25);
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(16, 185, 129, 0.1);
}
.expert-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
.expert-photo-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(6, 78, 59, 0.7));
  pointer-events: none;
}
.expert-badge-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--emerald-300);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 8px 18px;
  border-radius: 99px;
}
.expert-copy {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.expert-kicker {
  color: var(--emerald-400) !important;
}
.expert-name {
  color: white;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin: 12px 0 6px;
}
.expert-role {
  color: var(--emerald-400);
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 20px;
}
.expert-story {
  color: rgba(255, 255, 255, 0.62);
  line-height: 1.8;
  margin: 0 0 28px;
  font-size: 0.95rem;
}
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cert-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}
.expert-cta {
  margin-top: 32px;
}

/* ═══════════════════════════════════
   TRANSFORMATIONS / TRUST / FAQ / BLOG / CTA
   ═══════════════════════════════════ */
.transformations-section {
  padding: 96px 0;
}
.testimonials-section .two-col {
  display: grid;
  gap: 20px;
  margin-top: 52px;
}
.trust-section {
  padding: 60px 0;
}
.trust-grid {
  list-style: none;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
.trust-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 24px 22px;
}
.trust-icon {
  font-size: 1.1rem;
  color: var(--emerald-500);
  flex-shrink: 0;
  margin-top: 2px;
}
.trust-item h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0 0 4px;
}
.trust-item p {
  font-size: 0.85rem;
  color: var(--ink-500);
  margin: 0;
}
.faq-section {
  padding: 96px 0;
}
.blog-section {
  padding: 96px 0;
}
.cta-section {
  padding: 40px 0 96px;
}

/* ═══════════════════════════════════
   SHARED HELPERS
   ═══════════════════════════════════ */
.section-action {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}
.three-col {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  margin-top: 52px;
}
.two-col {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-top: 52px;
}

/* ═══════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════ */
@media (min-width: 860px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
  .hero-floats {
    display: block;
  }
  .process-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .expert-grid {
    grid-template-columns: 1fr 1fr;
  }
  .testimonials-section .two-col {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 860px) {
  .hero-floats {
    display: none;
  }
  .hero-form-wrap {
    padding-top: 0;
  }
  .word-wrap {
    min-width: 200px;
  }
}
</style>
