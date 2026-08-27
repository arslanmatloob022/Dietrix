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
  testimonials,
  transformations,
  trustBadges,
} from "../data/content";
import { upsertJsonLd, useSeo } from "../composables/useSeo";
import {
  buildFaqSchema,
  buildOrganizationSchema,
  buildPersonSchema,
  buildWebsiteSchema,
} from "../data/seo";
import { pageSeo } from "../data/pageSeo";
import { ensureMotion } from "../lib/motion";

useSeo(pageSeo.home);
upsertJsonLd("dietrix-organization-schema", buildOrganizationSchema(services));
upsertJsonLd("dietrix-person-schema", buildPersonSchema());
upsertJsonLd("dietrix-website-schema", buildWebsiteSchema());
upsertJsonLd("dietrix-home-faq-schema", buildFaqSchema(faqs));

// ── Rotating hero word ───────────────────────────────────────────────────────
const heroWords = ["Weight", "Health", "Energy", "Life", "Habits"];
const wordIdx = ref(0);
let wordTimer: ReturnType<typeof setInterval>;

// ── 3D Tilt ──────────────────────────────────────────────────────────────────
const tiltCleanups: (() => void)[] = [];
function initTilt() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll<HTMLElement>(".tilt-card").forEach((card) => {
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
      card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03) translateZ(8px)`;
      card.style.transition = "transform 80ms linear";
    };
    const onLeave = () => {
      card.style.transform = "";
      card.style.transition = "transform 700ms cubic-bezier(0.25,0.8,0.25,1)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    tiltCleanups.push(() => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    });
  });
}

// ── Magnetic buttons ─────────────────────────────────────────────────────────
const magneticCleanups: (() => void)[] = [];
async function initMagnetic() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const motion = await ensureMotion();
  if (!motion) return;
  const { gsap } = motion;

  document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.35;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      gsap.to(el, { x, y, duration: 0.45, ease: "power2.out", overwrite: true });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1.1,0.4)", overwrite: true });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    magneticCleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    });
  });
}

// ── All GSAP animations ───────────────────────────────────────────────────────
let gsapCleanups: (() => void)[] = [];

async function initAnimations() {
  const motion = await ensureMotion();
  if (!motion) return;
  const { gsap, ScrollTrigger } = motion;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── 1. Hero entrance timeline ──────────────────────────────────────────────
  if (!reducedMotion) {
    // Note: .hero-h1 (the LCP candidate) is intentionally excluded from this
    // opacity-from-0 entrance — animating it delays first paint until the
    // lazily-loaded gsap chunk executes, which hurts LCP on real devices.
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".hero-eyebrow-row", { y: 24, opacity: 0, duration: 0.6 })
      .from(".hero-sub", { y: 22, opacity: 0, duration: 0.65 }, "-=0.35")
      .from(".hero-actions", { y: 18, opacity: 0, duration: 0.55 }, "-=0.45")
      .from(".hero-proof, .hero-urgency", { y: 14, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.35")
      .from(".hero-form-card", { x: 48, opacity: 0, duration: 0.85, ease: "power2.out" }, "-=0.9")
      .from(".float-card", { y: 28, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.65");

    gsapCleanups.push(() => heroTl.kill());
  }

  // ── 2. Hero parallax (aurora blobs scroll at different rates) ─────────────
  if (!reducedMotion) {
    const parallaxTargets = [
      { sel: ".ao-1", yPct: -40 },
      { sel: ".ao-2", yPct: -25 },
      { sel: ".ao-3", yPct: -15 },
      { sel: ".ao-4", yPct: -30 },
      { sel: ".hero-dot-grid", yPct: -10 },
    ];
    parallaxTargets.forEach(({ sel, yPct }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const t = gsap.to(el, {
        yPercent: yPct,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsapCleanups.push(() => t.kill());
    });

    // Hero content fade as it leaves viewport
    const heroFade = gsap.to(".hero-copy", {
      yPercent: -8,
      opacity: 0.6,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "65% top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsapCleanups.push(() => heroFade.kill());
  }

  // ── 3. Navbar entrance ────────────────────────────────────────────────────
  if (!reducedMotion) {
    const navTl = gsap.from(".app-header", {
      y: -80,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1,
    });
    gsapCleanups.push(() => navTl.kill());
  }

  // ── 4. Stats counters via GSAP ────────────────────────────────────────────
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count!);
    const suffix = el.dataset.suffix ?? "";
    const decimals = el.dataset.decimals ? +el.dataset.decimals : 0;
    const obj = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter() {
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate() {
            el.textContent = (decimals ? obj.val.toFixed(decimals) : Math.round(obj.val).toString()) + suffix;
          },
        });
      },
    });
    gsapCleanups.push(() => st.kill());
  });

  // ── 5. Process section: animated connector line ───────────────────────────
  if (!reducedMotion) {
    const procLine = document.querySelector<HTMLElement>(".process-progress-line");
    if (procLine) {
      gsap.set(procLine, { scaleX: 0, transformOrigin: "left center" });
      const t = gsap.to(procLine, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
      gsapCleanups.push(() => t.kill());
    }

    // Process cards stagger with number pop
    const procCards = document.querySelectorAll<HTMLElement>(".process-card");
    procCards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 82%",
        once: true,
        onEnter() {
          gsap.from(card, {
            y: 44,
            opacity: 0,
            scale: 0.96,
            duration: 0.75,
            delay: i * 0.12,
            ease: "power3.out",
          });
          const num = card.querySelector<HTMLElement>(".process-num");
          if (num) {
            gsap.from(num, {
              scale: 2,
              opacity: 0,
              duration: 0.55,
              delay: i * 0.12 + 0.35,
              ease: "back.out(2)",
            });
          }
        },
      });
      gsapCleanups.push(() => st.kill());
    });
  }

  // ── 6. Expert section: split reveal ──────────────────────────────────────
  if (!reducedMotion) {
    const photoWrap = document.querySelector<HTMLElement>(".expert-photo-wrap");
    const expertCopy = document.querySelector<HTMLElement>(".expert-copy");
    if (photoWrap && expertCopy) {
      const st = ScrollTrigger.create({
        trigger: ".expert-section",
        start: "top 75%",
        once: true,
        onEnter() {
          gsap.from(photoWrap, { x: -50, opacity: 0, duration: 0.9, ease: "power3.out" });
          gsap.from(expertCopy, { x: 50, opacity: 0, duration: 0.9, delay: 0.1, ease: "power3.out" });
          gsap.from(".cert-item", {
            x: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.55,
            delay: 0.4,
            ease: "power3.out",
          });
        },
      });
      gsapCleanups.push(() => st.kill());
    }
  }

  // ── 7. Specialities wave stagger ─────────────────────────────────────────
  if (!reducedMotion) {
    const specCards = document.querySelectorAll<HTMLElement>(".spec-card");
    if (specCards.length) {
      const st = ScrollTrigger.create({
        trigger: ".spec-grid",
        start: "top 82%",
        once: true,
        onEnter() {
          gsap.from(specCards, {
            y: 30,
            opacity: 0,
            scale: 0.92,
            stagger: { each: 0.07, from: "center" },
            duration: 0.6,
            ease: "back.out(1.4)",
          });
        },
      });
      gsapCleanups.push(() => st.kill());
    }
  }

  // ── 8. Testimonials — no pin/scrub; cards animate in as a group ──────────
  if (!reducedMotion) {
    const tGrid = document.querySelector<HTMLElement>(".testimonials-grid");
    if (tGrid) {
      const st = ScrollTrigger.create({
        trigger: tGrid,
        start: "top 85%",
        once: true,
        onEnter() {
          gsap.from(tGrid.children, {
            y: 48,
            opacity: 0,
            scale: 0.95,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "all",
          });
        },
      });
      gsapCleanups.push(() => st.kill());
    }
  }

  // ── 9. Feature cards fan-in ───────────────────────────────────────────────
  if (!reducedMotion) {
    const fCards = document.querySelectorAll<HTMLElement>(".feature-card");
    if (fCards.length) {
      const st = ScrollTrigger.create({
        trigger: ".features-grid",
        start: "top 82%",
        once: true,
        onEnter() {
          gsap.from(fCards, {
            y: 40,
            opacity: 0,
            rotateX: 8,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform",
          });
        },
      });
      gsapCleanups.push(() => st.kill());
    }
  }

  // ── 10. Trust ribbon — no scroll animation (static, always visible) ───────

  // ── 11. Section title kicker line draw ────────────────────────────────────
  if (!reducedMotion) {
    document.querySelectorAll<HTMLElement>(".eyebrow::before").forEach(() => {
      // Handled via CSS, no GSAP needed
    });
  }

  // ── 12. CTA banner rise ───────────────────────────────────────────────────
  if (!reducedMotion) {
    const ctaBanner = document.querySelector<HTMLElement>(".cta-section");
    if (ctaBanner) {
      const st = ScrollTrigger.create({
        trigger: ctaBanner,
        start: "top 85%",
        once: true,
        onEnter() {
          gsap.from(ctaBanner, { y: 36, opacity: 0, duration: 0.8, ease: "power3.out" });
        },
      });
      gsapCleanups.push(() => st.kill());
    }
  }

  // ── 13. Nutrition Bowl — dramatic scroll-fill animation ─────────────
  if (!reducedMotion) {
    const bowlWrap = document.querySelector<HTMLElement>('.bowl-section-wrap')
    if (bowlWrap) {
      const isMobile = window.matchMedia('(max-width: 759px)').matches

      // ── Initial hidden states (food cards enter from different sides) ──
      // Protein from top-left, veggie from top-right, fruit from bottom
      gsap.set('.fc--protein', { x: -420, y: -120, scale: 0.55, opacity: 0, rotation: -20 })
      gsap.set('.fc--veggie',  { x:  420, y: -150, scale: 0.55, opacity: 0, rotation:  18 })
      gsap.set('.fc--fruit',   { x: -160, y:  320, scale: 0.55, opacity: 0, rotation: -12 })
      gsap.set('.bl',          { scaleY: 0, transformOrigin: 'bottom center' })
      gsap.set('.bs',          { opacity: 0 })
      gsap.set('.bowl-vessel', { scale: 0.78, opacity: 0 })
      gsap.set('.bowl-chip',   { scale: 0.4, opacity: 0 })
      gsap.set('[data-bowl-legend]', { opacity: 0, x: -36 })
      gsap.set('.blis-bar',    { height: '0%' })

      const runBowlTl = (scrub: boolean) => {
        const cfg = scrub
          ? { scrollTrigger: { trigger: bowlWrap, pin: true, scrub: 2, start: 'top top', end: '+=260%', invalidateOnRefresh: true } }
          : {}
        const tl = gsap.timeline(cfg)

        tl
          // Bowl materialises
          .to('.bowl-vessel', { scale: 1, opacity: 1, duration: 0.28, ease: 'power3.out' })
          // Stat chips float in
          .to('.bowl-chip', { scale: 1, opacity: 1, duration: 0.22, stagger: 0.1, ease: 'back.out(1.6)' }, 0.05)
          // Protein card flies from top-left (clipped by overflow:hidden until it enters stage)
          .to('.fc--protein', { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.42, ease: 'back.out(1.7)' }, 0.12)
          // Bowl base + protein layer fill
          .to('.bl-base',    { scaleY: 0.55, duration: 0.38 }, 0.22)
          .to('.bl-protein', { scaleY: 0.8,  duration: 0.32 }, 0.3)
          // Legend item 1 slides in + bar fills
          .to('[data-bowl-legend="protein"]', { opacity: 1, x: 0, duration: 0.22 }, 0.35)
          .to('.blis-bar--protein', { height: '100%', duration: 0.28 }, 0.37)
          // Veggie card flies from top-right
          .to('.fc--veggie',  { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.42, ease: 'back.out(1.7)' }, 0.44)
          .to('.bl-veggie',   { scaleY: 0.75, duration: 0.32 }, 0.54)
          .to('[data-bowl-legend="veggie"]', { opacity: 1, x: 0, duration: 0.22 }, 0.58)
          .to('.blis-bar--veggie', { height: '100%', duration: 0.28 }, 0.6)
          // Fruit card slides from bottom
          .to('.fc--fruit',   { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.42, ease: 'back.out(1.7)' }, 0.68)
          .to('.bl-fruit',    { scaleY: 0.8,  duration: 0.3 }, 0.78)
          // Base fill completes
          .to('.bl-base',     { scaleY: 1, duration: 0.28 }, 0.8)
          .to('[data-bowl-legend="fruit"]', { opacity: 1, x: 0, duration: 0.22 }, 0.82)
          .to('.blis-bar--fruit', { height: '100%', duration: 0.28 }, 0.84)
          // Splash burst!
          .to('.bs1', { y: -52, opacity: 1, duration: 0.1 }, 0.92)
          .to('.bs1', { y: -78, opacity: 0, duration: 0.14 }, 0.94)
          .to('.bs2', { y: -36, opacity: 1, duration: 0.09 }, 0.925)
          .to('.bs2', { y: -56, opacity: 0, duration: 0.12 }, 0.945)
          .to('.bs3', { y: -44, opacity: 1, duration: 0.1  }, 0.93)
          .to('.bs3', { y: -68, opacity: 0, duration: 0.14 }, 0.95)
          .to('.bs4', { y: -30, opacity: 1, duration: 0.08 }, 0.935)
          .to('.bs4', { y: -48, opacity: 0, duration: 0.1  }, 0.955)

        return tl
      }

      if (isMobile) {
        const mst = ScrollTrigger.create({
          trigger: bowlWrap, start: 'top 76%', once: true,
          onEnter() {
            const tl = runBowlTl(false)
            gsapCleanups.push(() => tl.kill())
          }
        })
        gsapCleanups.push(() => mst.kill())
      } else {
        const tl = runBowlTl(true)
        gsapCleanups.push(() => tl.kill())
      }
    }
  }

  // Force ScrollTrigger refresh after all are registered
  ScrollTrigger.refresh();
}

onMounted(async () => {
  wordTimer = setInterval(() => {
    wordIdx.value = (wordIdx.value + 1) % heroWords.length;
  }, 2800);

  initTilt();
  await initAnimations();
  await initMagnetic();
});

onUnmounted(() => {
  clearInterval(wordTimer);
  tiltCleanups.forEach((fn) => fn());
  magneticCleanups.forEach((fn) => fn());
  gsapCleanups.forEach((fn) => fn());
});

const features = [
  { icon: "🔬", title: "Evidence-Based", desc: "Every protocol built on peer-reviewed nutrition science, not trends or fads." },
  { icon: "🌐", title: "100% Remote", desc: "Consult from anywhere worldwide — video, WhatsApp, or async email support." },
  { icon: "⚡", title: "Fast Real Results", desc: "Avg. 6.8 kg fat loss in 12 weeks with clinical tracking and weekly reviews." },
  { icon: "🎯", title: "Hyper-Personalized", desc: "Plans match your culture, food preferences, medical history, and schedule." },
  { icon: "🤝", title: "Ongoing Accountability", desc: "Weekly check-in calls, progress reviews, and real-time plan adjustments." },
  { icon: "🛡️", title: "Clinically Certified", desc: "Globally recognized credentials: M.Sc. Clinical Nutrition, CDE, PCOS Specialist." },
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
  { num: "01", emoji: "📋", title: "Book Your Slot", desc: "Choose your time from available slots. Share your health background and goals in seconds." },
  { num: "02", emoji: "🎯", title: "Get Your Blueprint", desc: "Receive a personalized nutrition plan designed around your unique body, goals, and lifestyle." },
  { num: "03", emoji: "📈", title: "Track Real Progress", desc: "Weekly check-ins, plan adjustments, and continuous support until you hit your target." },
];
</script>

<template>
  <main class="home">

    <!-- ═══════════════════════════════════════════════════════
         HERO  —  Dark aurora, 3D floating cards, rotating word
         ═══════════════════════════════════════════════════════ -->
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
        <div class="hero-copy">
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
              </Transition>
            </span><br />
            <span class="hero-h1-muted">with Science</span>
          </h1>

          <p class="hero-sub">
            Evidence-based 1-on-1 nutrition coaching for fat loss, PCOS,
            diabetes, gut health, and high-performance lifestyles — from
            anywhere in the world.
          </p>

          <div class="hero-actions">
            <RouterLink to="/booking" class="hero-btn-primary magnetic">
              Book Free Consultation
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <RouterLink to="/services" class="hero-btn-outline magnetic">Explore Plans</RouterLink>
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
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#ef4444" stroke-width="1.3"/>
              <path d="M6.5 4V6.5l1.6 1" stroke="#ef4444" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            Only <strong>3 new slots</strong> available this month — limited intake
          </div>
        </div>

        <!-- Right: form card -->
        <div class="hero-form-wrap">
          <div class="hero-form-card">
            <div class="form-card-header">
              <div class="fch-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 7 13 7 13s7-9.13 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="url(#fgd)"/>
                  <defs>
                    <linearGradient id="fgd" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#34d399"/>
                      <stop offset="1" stop-color="#2dd4bf"/>
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
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f0faf8"/>
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         MARQUEE  —  Countries served
         ═══════════════════════════════════════════════════════ -->
    <div class="marquee-section" aria-label="Globally trusted">
      <div class="marquee-track" aria-hidden="true">
        <div class="marquee-inner">
          <template v-for="n in 3" :key="n">
            <span class="mq-item">🇺🇸 USA</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇬🇧 UK</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇦🇺 Australia</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇦🇪 UAE</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇨🇦 Canada</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇸🇦 Saudi Arabia</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇮🇳 India</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇩🇪 Germany</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇳🇿 New Zealand</span><span class="mq-sep">✦</span>
            <span class="mq-item">🇸🇬 Singapore</span><span class="mq-sep">✦</span>
          </template>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         STATS  —  Dark glass, GSAP count-up
         ═══════════════════════════════════════════════════════ -->
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
            <p class="stat-val" data-count="6.8" data-suffix=" kg" data-decimals="1">6.8 kg</p>
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

    <!-- ═══════════════════════════════════════════════════════
         WHY DIETRIX  —  6-feature fan-in grid
         ═══════════════════════════════════════════════════════ -->
    <section class="features-section container">
      <SectionTitle
        kicker="Why Dietrix"
        title="World-Class Nutrition. Personal Touch."
        description="We combine clinical expertise with a human-centered coaching model that creates results that actually last."
      />
      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="i"
          class="feature-card glass-card tilt-card"
        >
          <div class="feature-icon-bg" aria-hidden="true">
            <span class="feature-icon">{{ f.icon }}</span>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         NUTRITION BOWL — Scroll-fill "build your plate" reveal
         ═══════════════════════════════════════════════════════ -->
    <section class="bowl-section-wrap">
      <!-- Dark ambient background -->
      <div class="bowl-bg" aria-hidden="true">
        <div class="bgo bgo-1"></div>
        <div class="bgo bgo-2"></div>
        <div class="bgo bgo-3"></div>
        <div class="bowl-grid-overlay"></div>
      </div>

      <div class="bowl-section container">
        <!-- LEFT — animated bowl stage (overflow:hidden clips food cards during entry) -->
        <div class="bowl-stage-wrap" aria-hidden="true">
          <!-- Floating nutrition stat chips -->
          <div class="bowl-chip bchip-a">
            <strong>1,850</strong><span>kcal / day</span>
          </div>
          <div class="bowl-chip bchip-b">
            <strong>38g</strong><span>Protein</span>
          </div>
          <div class="bowl-chip bchip-c">
            <strong>32g</strong><span>Fiber</span>
          </div>

          <!-- Food cards with real images — fly in from different angles -->
          <div class="fc fc--protein">
            <div class="fc-img">
              <img
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=240&q=85&auto=format&fit=crop"
                alt="Lean protein foods"
                loading="lazy"
              />
            </div>
            <div class="fc-text">
              <strong>Lean Protein</strong>
              <span>Chicken · Fish · Eggs</span>
              <b>42 g protein / day</b>
            </div>
          </div>

          <div class="fc fc--veggie">
            <div class="fc-img">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=240&q=85&auto=format&fit=crop"
                alt="Fresh vegetables"
                loading="lazy"
              />
            </div>
            <div class="fc-text">
              <strong>Vegetables</strong>
              <span>Broccoli · Spinach · Kale</span>
              <b>32 g fiber / day</b>
            </div>
          </div>

          <div class="fc fc--fruit">
            <div class="fc-img">
              <img
                src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=240&q=85&auto=format&fit=crop"
                alt="Fresh fruits"
                loading="lazy"
              />
            </div>
            <div class="fc-text">
              <strong>Fresh Fruits</strong>
              <span>Berries · Apple · Citrus</span>
              <b>Rich in vitamins C &amp; K</b>
            </div>
          </div>

          <!-- Bowl vessel -->
          <div class="bowl-vessel">
            <div class="bowl-rim"></div>
            <div class="bowl-body">
              <!-- Progressive fill layers -->
              <div class="bl bl-base"></div>
              <div class="bl bl-protein"></div>
              <div class="bl bl-veggie"></div>
              <div class="bl bl-fruit"></div>
              <div class="bowl-sheen"></div>
            </div>
            <div class="bowl-shadow"></div>
            <!-- Splash drops (fire when bowl is full) -->
            <div class="bs bs1"></div>
            <div class="bs bs2"></div>
            <div class="bs bs3"></div>
            <div class="bs bs4"></div>
          </div>
        </div>

        <!-- RIGHT — copy, legend, CTA -->
        <div class="bowl-copy">
          <p class="eyebrow">Your Personalized Plate</p>
          <h2 class="bowl-h2">
            Scroll to Fill<br />Your Nutrition Bowl
          </h2>
          <p class="bowl-p">
            Watch your personalized plate come together. Every consultation
            starts with a complete health assessment — then Rimsha Naseer layers
            the right proteins, vegetables, and fruits into a daily plan
            calibrated to your metabolism and goals.
          </p>

          <div class="bowl-legend">
            <div class="bl-item" data-bowl-legend="protein">
              <div class="blis-visual">
                <span class="blis-dot blis-dot--protein"></span>
                <div class="blis-track"><div class="blis-bar blis-bar--protein"></div></div>
              </div>
              <div class="blis-label">
                <strong>Lean Protein · 35% of plate</strong>
                <span>Muscle recovery · Hormonal balance · Satiety</span>
              </div>
              <span class="blis-pct">35%</span>
            </div>
            <div class="bl-item" data-bowl-legend="veggie">
              <div class="blis-visual">
                <span class="blis-dot blis-dot--veggie"></span>
                <div class="blis-track"><div class="blis-bar blis-bar--veggie"></div></div>
              </div>
              <div class="blis-label">
                <strong>Vegetables · 40% of plate</strong>
                <span>Fiber · Micronutrients · Metabolic support</span>
              </div>
              <span class="blis-pct">40%</span>
            </div>
            <div class="bl-item" data-bowl-legend="fruit">
              <div class="blis-visual">
                <span class="blis-dot blis-dot--fruit"></span>
                <div class="blis-track"><div class="blis-bar blis-bar--fruit"></div></div>
              </div>
              <div class="blis-label">
                <strong>Fruits · 25% of plate</strong>
                <span>Natural energy · Antioxidants · Vitamins</span>
              </div>
              <span class="blis-pct">25%</span>
            </div>
          </div>

          <div class="bowl-actions">
            <RouterLink to="/booking" class="bowl-btn magnetic">
              Build My Plate
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <RouterLink to="/services" class="bowl-link">See Nutrition Plans</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SERVICES
         ═══════════════════════════════════════════════════════ -->
    <section class="services-section container">
      <SectionTitle
        kicker="Services"
        title="Plans Built Around Your Body, Schedule and Goals"
        description="Choose the support level that matches your current stage and health needs."
      />
      <div class="three-col reveal-group">
        <ServiceCard v-for="service in services" :key="service.id" :item="service" />
      </div>
      <div class="section-action reveal">
        <UiButton to="/services" variant="outline" size="lg">View All Plans and Pricing</UiButton>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         HOW IT WORKS  —  Dark, 3-step with progress line
         ═══════════════════════════════════════════════════════ -->
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
        <!-- Animated connector line -->
        <div class="process-connector" aria-hidden="true">
          <div class="process-progress-line"></div>
        </div>
        <div class="process-grid">
          <div v-for="(step, i) in processSteps" :key="i" class="process-card glass-dark">
            <div class="process-num" aria-hidden="true">{{ step.num }}</div>
            <div class="process-icon-wrap" aria-hidden="true">
              <span class="process-icon">{{ step.emoji }}</span>
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
        <div class="section-action" style="margin-top: 52px">
          <RouterLink to="/booking" class="hero-btn-primary magnetic">
            Start Your Transformation
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         SPECIALITIES  —  8-card wave stagger
         ═══════════════════════════════════════════════════════ -->
    <section class="spec-section container">
      <SectionTitle
        kicker="Specialities"
        title="Conditions We Help You Master"
        description="Clinical expertise across the full spectrum of nutrition-related health challenges."
      />
      <div class="spec-grid">
        <div v-for="(s, i) in specialities" :key="i" class="spec-card glass-card tilt-card">
          <span class="spec-icon" aria-hidden="true">{{ s.icon }}</span>
          <h4>{{ s.label }}</h4>
          <span class="spec-tag">{{ s.tag }}</span>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         MEET THE EXPERT  —  Split reveal
         ═══════════════════════════════════════════════════════ -->
    <section class="expert-section dark-section">
      <div class="dark-orb ex-o1" aria-hidden="true"></div>
      <div class="container expert-grid">
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7.5" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.35)"/>
                <path d="M5 8l2 2 4-4" stroke="#34d399" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ cert }}
            </div>
          </div>
          <div class="expert-cta">
            <RouterLink to="/about" class="hero-btn-primary magnetic">
              Learn My Story
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         TRANSFORMATIONS
         ═══════════════════════════════════════════════════════ -->
    <section class="transformations-section container">
      <SectionTitle
        kicker="Transformations"
        title="Real People, Real Results"
        description="Client transformations driven by consistent nutrition and personalized coaching."
      />
      <div class="three-col reveal-group">
        <TransformationCard v-for="item in transformations" :key="item.id" :item="item" />
      </div>
      <div class="section-action reveal">
        <UiButton to="/testimonials" variant="outline" size="lg">See All Stories</UiButton>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         TESTIMONIALS  —  Horizontal scroll on desktop
         ═══════════════════════════════════════════════════════ -->
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
        <div class="testimonials-grid">
          <TestimonialCard v-for="item in testimonials" :key="item.id" :testimonial="item" />
        </div>
        <div class="section-action">
          <RouterLink to="/testimonials" class="testimonials-cta magnetic">
            Read All Success Stories
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         TRUST CREDENTIAL RIBBON
         ═══════════════════════════════════════════════════════ -->
    <section class="trust-section" aria-label="Why clients trust Dietrix">
      <div class="trust-inner container">
        <div v-for="badge in trustBadges" :key="badge.id" class="trust-item">
          <div class="trust-icon-wrap" aria-hidden="true">✦</div>
          <div class="trust-body">
            <strong>{{ badge.label }}</strong>
            <span>{{ badge.subtitle }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         FAQ
         ═══════════════════════════════════════════════════════ -->
    <section class="faq-section container">
      <SectionTitle
        kicker="FAQ"
        title="Common Questions Before You Start"
        description="Everything you need to know about online nutrition consultations and coaching."
      />
      <FaqAccordion :items="faqs" />
    </section>

    <!-- ═══════════════════════════════════════════════════════
         BLOG
         ═══════════════════════════════════════════════════════ -->
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
        <UiButton to="/blog" variant="outline" size="lg">Browse All Articles</UiButton>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         CTA
         ═══════════════════════════════════════════════════════ -->
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
    radial-gradient(ellipse 130% 100% at 12% -10%, rgba(6,78,59,0.95) 0%, transparent 55%),
    radial-gradient(ellipse 80% 70% at 88% 110%, rgba(13,148,136,0.6) 0%, transparent 50%),
    radial-gradient(ellipse 50% 40% at 50% 50%, rgba(5,150,105,0.12) 0%, transparent 65%),
    #050e0a;
  overflow: hidden;
  padding-bottom: 80px;
}

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
.ao-1 { width: 700px; height: 500px; background: radial-gradient(ellipse, rgba(6,78,59,0.8), transparent 70%); top: -200px; left: -200px; }
.ao-2 { width: 500px; height: 400px; background: radial-gradient(ellipse, rgba(13,148,136,0.5), transparent 70%); top: 0; right: -150px; animation-delay: -5s; animation-duration: 13s; }
.ao-3 { width: 400px; height: 320px; background: radial-gradient(ellipse, rgba(5,150,105,0.4), transparent 70%); bottom: 80px; left: 20%; animation-delay: -9s; animation-duration: 19s; }
.ao-4 { width: 300px; height: 250px; background: radial-gradient(ellipse, rgba(20,184,166,0.3), transparent 70%); top: 35%; right: 18%; animation-delay: -3s; animation-duration: 22s; }

.hero-dot-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black, transparent);
}
.hero-grid-lines {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px);
  background-size: 60px 60px;
}

.hero-floats {
  position: absolute; inset: 0;
  z-index: 2; pointer-events: none;
}
.float-card {
  position: absolute; display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; border-radius: 18px;
  background: rgba(255,255,255,0.07); backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  transform-style: preserve-3d;
}
.fc-1 { top: 20%; right: 5%; animation: float-1 7s ease-in-out infinite; }
.fc-2 { top: 54%; right: 2%; animation: float-2 9s ease-in-out infinite; }
.fc-3 { top: 12%; left: 52%; animation: float-3 8s ease-in-out infinite; }
.fc-4 { bottom: 22%; right: 6%; animation: float-1 11s ease-in-out infinite reverse; }
.fc-ico { font-size: 1.5rem; line-height: 1; }
.fc-val { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; color: white; line-height: 1; margin: 0; }
.fc-live { color: #4ade80 !important; }
.fc-lab { font-size: 0.7rem; color: rgba(255,255,255,0.5); margin: 3px 0 0; }
.live-dot-ring { position: absolute; top: -5px; right: -5px; width: 12px; height: 12px; border-radius: 50%; background: #22c55e; animation: live-pulse 1.8s ease-in-out infinite; }

.hero-grid {
  position: relative; z-index: 3; display: grid; gap: 40px; align-items: center;
  padding-top: clamp(90px, 12vw, 130px); padding-bottom: 40px; min-height: 100svh;
}
.hero-copy { display: flex; flex-direction: column; gap: 24px; color: white; }
.hero-eyebrow-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.hero-badge { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--emerald-300); background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); padding: 5px 14px; border-radius: 99px; }
.live-pill { display: inline-flex; align-items: center; gap: 7px; font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); padding: 5px 13px; border-radius: 99px; }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: live-pulse 2s ease-in-out infinite; flex-shrink: 0; }

.hero-h1 { font-family: var(--font-heading); font-size: clamp(3rem, 6.5vw, 5.5rem); font-weight: 800; color: white; line-height: 1.04; letter-spacing: -0.04em; }
.hero-h1-muted { color: rgba(255,255,255,0.55); }
.word-wrap { display: inline-block; position: relative; min-width: 300px; vertical-align: bottom; }
.rotating-word { display: inline-block; }
.word-enter-active { transition: all 400ms cubic-bezier(0.22,1,0.36,1); }
.word-leave-active { transition: all 260ms ease-in; position: absolute; left: 0; }
.word-enter-from { opacity: 0; transform: translateY(44px) skewY(5deg); }
.word-leave-to { opacity: 0; transform: translateY(-32px) skewY(-4deg); }

.hero-sub { font-size: clamp(1rem, 1.8vw, 1.15rem); line-height: 1.8; color: rgba(255,255,255,0.62); max-width: 520px; }

.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.hero-btn-primary {
  display: inline-flex; align-items: center; gap: 9px;
  background: linear-gradient(135deg, var(--emerald-600), var(--emerald-500), var(--teal-500));
  color: white; font-weight: 800; font-size: 1rem; padding: 15px 30px; border-radius: 14px;
  text-decoration: none;
  box-shadow: 0 12px 40px rgba(5,150,105,0.45), 0 4px 16px rgba(5,150,105,0.2);
  position: relative; overflow: hidden;
  transition: box-shadow 260ms;
  will-change: transform;
}
.hero-btn-primary::before {
  content: ""; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(105deg, transparent, rgba(255,255,255,0.22), transparent);
  transition: left 600ms ease;
}
.hero-btn-primary:hover::before { left: 160%; }
.hero-btn-primary:hover { box-shadow: 0 20px 60px rgba(5,150,105,0.55), 0 6px 24px rgba(5,150,105,0.3); }

.hero-btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.07); color: white; font-weight: 700; font-size: 1rem;
  padding: 15px 30px; border-radius: 14px; text-decoration: none;
  border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px);
  transition: background 240ms, border-color 240ms;
  will-change: transform;
}
.hero-btn-outline:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.35); }

.hero-proof { display: flex; align-items: center; gap: 14px; font-size: 0.9rem; color: rgba(255,255,255,0.62); }
.hero-proof strong { color: white; }
.proof-avs { display: flex; }
.pa { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--emerald-700), var(--teal-600)); color: white; font-weight: 800; font-size: 0.78rem; display: grid; place-items: center; border: 2.5px solid #050e0a; margin-left: -10px; }
.pa:first-child { margin-left: 0; }
.pa-plus { background: rgba(255,255,255,0.12); font-size: 1rem; }

.hero-urgency { display: inline-flex; align-items: center; gap: 8px; font-size: 0.82rem; color: rgba(255,255,255,0.52); background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); padding: 7px 16px; border-radius: 99px; max-width: fit-content; }
.hero-urgency strong { color: #fca5a5; }

.hero-form-wrap { display: flex; align-items: flex-start; justify-content: center; padding-top: 20px; }
.hero-form-card { background: rgba(255,255,255,0.06); backdrop-filter: blur(32px) saturate(180%); -webkit-backdrop-filter: blur(32px) saturate(180%); border: 1px solid rgba(255,255,255,0.13); border-radius: 28px; overflow: hidden; box-shadow: 0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1); width: 100%; max-width: 460px; }
.form-card-header { background: linear-gradient(135deg, rgba(6,78,59,0.9), rgba(13,148,136,0.75)); padding: 20px 24px; display: flex; align-items: flex-start; gap: 14px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.fch-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.15); display: grid; place-items: center; flex-shrink: 0; }
.form-card-header h2 { font-size: 1.05rem; font-weight: 700; color: white; margin: 0 0 4px; }
.form-card-header p { font-size: 0.8rem; color: rgba(255,255,255,0.65); margin: 0; }
.form-card-body { padding: 4px; }

.hero-wave { position: absolute; bottom: 0; left: 0; right: 0; line-height: 0; pointer-events: none; }
.hero-wave svg { width: 100%; height: 80px; }

/* ═══════════════════════════════════
   MARQUEE
   ═══════════════════════════════════ */
.marquee-section { overflow: hidden; background: linear-gradient(90deg, transparent, rgba(16,185,129,0.05), transparent); border-top: 1px solid rgba(16,185,129,0.12); border-bottom: 1px solid rgba(16,185,129,0.12); padding: 14px 0; }
.marquee-track { display: flex; overflow: hidden; }
.marquee-inner { display: flex; align-items: center; animation: marquee-scroll 28s linear infinite; white-space: nowrap; will-change: transform; }
.mq-item { font-size: 0.85rem; font-weight: 600; color: var(--ink-600); padding: 0 22px; }
.mq-sep { color: var(--emerald-400); font-size: 0.6rem; flex-shrink: 0; }

/* ═══════════════════════════════════
   DARK SECTION (shared)
   ═══════════════════════════════════ */
.dark-section {
  background:
    radial-gradient(ellipse 100% 80% at 10% 50%, rgba(6,78,59,0.5) 0%, transparent 60%),
    radial-gradient(ellipse 80% 60% at 90% 50%, rgba(13,148,136,0.3) 0%, transparent 60%),
    #050e0a;
  position: relative; overflow: hidden; padding: 96px 0;
  --st-title-color: white;
  --st-desc-color: rgba(255,255,255,0.6);
  --st-kicker-color: var(--emerald-400);
}
.dark-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
.ds-o1 { width: 500px; height: 400px; background: rgba(6,78,59,0.45); top: -100px; left: -80px; }
.ds-o2 { width: 400px; height: 300px; background: rgba(13,148,136,0.25); bottom: -60px; right: -60px; }
.ps-o1 { width: 600px; height: 500px; background: rgba(6,78,59,0.5); top: -150px; right: -100px; }
.ex-o1 { width: 600px; height: 500px; background: rgba(6,78,59,0.4); bottom: -150px; left: -100px; }
.ts-o1 { width: 500px; height: 400px; background: rgba(6,78,59,0.4); top: -100px; left: 20%; }
.ts-o2 { width: 400px; height: 300px; background: rgba(13,148,136,0.2); bottom: -60px; right: 10%; }

/* ═══════════════════════════════════
   STATS
   ═══════════════════════════════════ */
.stats-section { padding: 96px 0; }
.stats-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-top: 52px; }
.stat-card { position: relative; padding: 40px 28px; text-align: center; overflow: hidden; }
.stat-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(16,185,129,0.14), transparent 60%); pointer-events: none; }
.stat-val { font-family: var(--font-heading); font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 800; background: linear-gradient(135deg, var(--emerald-400), var(--teal-400)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin: 0 0 10px; }
.stat-lab { font-size: 0.9rem; color: rgba(255,255,255,0.52); font-weight: 500; margin: 0; line-height: 1.4; }

/* ═══════════════════════════════════
   FEATURES
   ═══════════════════════════════════ */
.features-section { padding: 96px 0; }
.features-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin-top: 52px; }
.feature-card { padding: 32px 28px; display: flex; flex-direction: column; gap: 14px; position: relative; overflow: hidden; }
.feature-icon-bg { width: 60px; height: 60px; border-radius: 18px; background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(13,148,136,0.1)); border: 1px solid rgba(16,185,129,0.2); display: grid; place-items: center; transition: transform 300ms, background 300ms; }
.feature-card:hover .feature-icon-bg { transform: scale(1.1) rotate(-6deg); background: linear-gradient(135deg, rgba(16,185,129,0.25), rgba(13,148,136,0.18)); }
.feature-icon { font-size: 1.8rem; line-height: 1; display: block; }
.feature-card h3 { font-size: 1.08rem; font-weight: 700; color: var(--ink-900); margin: 0; }
.feature-card p { font-size: 0.9rem; color: var(--ink-500); line-height: 1.65; margin: 0; }

/* ═══════════════════════════════════
   SERVICES
   ═══════════════════════════════════ */
.services-section { padding: 96px 0; }

/* ═══════════════════════════════════
   PROCESS
   ═══════════════════════════════════ */
.process-connector {
  position: relative; height: 4px; margin: 40px 80px 0;
  background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden;
}
.process-progress-line {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, var(--emerald-600), var(--teal-400));
  border-radius: 4px;
  box-shadow: 0 0 16px rgba(16,185,129,0.5);
  transform-origin: left center;
}
.process-grid { display: grid; gap: 24px; margin-top: 24px; }
.process-card { position: relative; padding: 40px 36px; overflow: hidden; }
.process-num { position: absolute; top: 16px; right: 24px; font-family: var(--font-heading); font-size: 5rem; font-weight: 900; color: rgba(16,185,129,0.1); line-height: 1; user-select: none; }
.process-icon-wrap { width: 60px; height: 60px; border-radius: 18px; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.2); display: grid; place-items: center; margin-bottom: 20px; }
.process-icon { font-size: 1.8rem; }
.process-card h3 { font-size: 1.2rem; font-weight: 700; color: white; margin: 0 0 10px; }
.process-card p { font-size: 0.9rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin: 0; }

/* ═══════════════════════════════════
   SPECIALITIES
   ═══════════════════════════════════ */
.spec-section { padding: 96px 0; }
.spec-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); margin-top: 52px; }
.spec-card { padding: 28px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.spec-icon { font-size: 2.4rem; line-height: 1; display: block; filter: drop-shadow(0 4px 12px rgba(16,185,129,0.25)); transition: transform 320ms; }
.spec-card:hover .spec-icon { transform: scale(1.2) translateY(-5px); }
.spec-card h4 { font-size: 0.95rem; font-weight: 700; color: var(--ink-900); margin: 0; }
.spec-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--emerald-700); background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); padding: 3px 10px; border-radius: 99px; }

/* ═══════════════════════════════════
   EXPERT SECTION
   ═══════════════════════════════════ */
.expert-section { padding: 96px 0; }
.expert-grid { display: grid; gap: 60px; align-items: center; }
.expert-photo-wrap { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.expert-photo-frame { position: relative; border-radius: 28px; overflow: hidden; width: 100%; max-width: 360px; aspect-ratio: 4/5; border: 2px solid rgba(16,185,129,0.25); box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(16,185,129,0.1); }
.expert-photo { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
.expert-photo-glow { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(6,78,59,0.7)); pointer-events: none; }
.expert-badge-chip { display: inline-flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: var(--emerald-300); background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); padding: 8px 18px; border-radius: 99px; }
.expert-copy { display: flex; flex-direction: column; gap: 0; }
.expert-kicker { color: var(--emerald-400) !important; }
.expert-name { color: white; font-size: clamp(1.8rem, 3vw, 2.4rem); margin: 12px 0 6px; }
.expert-role { color: var(--emerald-400); font-weight: 600; font-size: 1rem; margin: 0 0 20px; }
.expert-story { color: rgba(255,255,255,0.62); line-height: 1.8; margin: 0 0 28px; font-size: 0.95rem; }
.cert-list { display: flex; flex-direction: column; gap: 10px; }
.cert-item { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: rgba(255,255,255,0.75); font-weight: 500; }
.expert-cta { margin-top: 32px; }

/* ═══════════════════════════════════
   TRANSFORMATIONS
   ═══════════════════════════════════ */
.transformations-section { padding: 96px 0; }

/* ═══════════════════════════════════
   TESTIMONIALS HORIZONTAL SCROLL
   ═══════════════════════════════════ */
/* ─── Testimonials static grid section ───────────────────────────────── */
.testimonials-section {
  padding: 96px 0;
}

.testimonials-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  margin-top: 52px;
}

.testimonials-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  padding: 0 28px;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.92rem;
  color: #ffffff;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(10px);
  transition: background 220ms ease, border-color 220ms ease, transform 220ms ease;
}

.testimonials-cta:hover {
  background: rgba(16,185,129,0.18);
  border-color: rgba(16,185,129,0.5);
  transform: translateY(-2px);
}

/* ─── Trust credential ribbon ────────────────────────────────────────── */
.trust-section {
  background: linear-gradient(90deg, rgba(16,185,129,0.04), rgba(6,78,59,0.07), rgba(16,185,129,0.04));
  border-top: 1px solid rgba(16,185,129,0.14);
  border-bottom: 1px solid rgba(16,185,129,0.14);
  padding: 0;
  position: relative;
  z-index: 1;
}

.trust-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 28px 36px;
  border-right: 1px solid rgba(16,185,129,0.12);
  flex: 1;
  min-width: 200px;
  will-change: transform, opacity;
}

.trust-item:last-child { border-right: none; }

.trust-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(16,185,129,0.10);
  border: 1.5px solid rgba(16,185,129,0.22);
  font-size: 1rem;
  color: var(--emerald-500);
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(16,185,129,0.12);
  transition: background 220ms ease, box-shadow 220ms ease;
}

.trust-item:hover .trust-icon-wrap {
  background: rgba(16,185,129,0.18);
  box-shadow: 0 6px 20px rgba(16,185,129,0.2);
}

.trust-body strong {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  color: var(--ink-900);
  margin-bottom: 3px;
  letter-spacing: -0.01em;
}

.trust-body span {
  display: block;
  font-size: 0.78rem;
  color: var(--ink-500);
  font-weight: 600;
}

@media (max-width: 759px) {
  .trust-inner { display: grid; grid-template-columns: 1fr 1fr; }
  .trust-item { border-right: none; border-bottom: 1px solid rgba(16,185,129,0.1); padding: 20px 22px; }
  .trust-item:last-child, .trust-item:nth-last-child(2):nth-child(odd) { border-bottom: none; }
}
.faq-section { padding: 96px 0; position: relative; z-index: 1; }
.blog-section { padding: 96px 0; position: relative; z-index: 1; }
.cta-section { padding: 40px 0 96px; position: relative; z-index: 1; }

/* ═══════════════════════════════════
   SHARED HELPERS
   ═══════════════════════════════════ */
.section-action { margin-top: 48px; display: flex; justify-content: center; }
.three-col { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); margin-top: 52px; }
.two-col { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); margin-top: 52px; }

/* ═══════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════ */
@media (min-width: 860px) {
  .hero-grid { grid-template-columns: 1fr 1fr; gap: 60px; }
  .hero-floats { display: block; }
  .process-grid { grid-template-columns: repeat(3, 1fr); }
  .expert-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .hero-floats { display: none; }
  .hero-form-wrap { padding-top: 0; }
  .word-wrap { min-width: 200px; }
  .process-connector { display: none; }
}

/* ═══════════════════════════════════════════════════════
   NUTRITION BOWL — Scroll-fill section
   ═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   NUTRITION BOWL — Full dark-section, dramatic scroll experience
   ═══════════════════════════════════════════════════════════════ */

.bowl-section-wrap {
  position: relative;
  background: linear-gradient(148deg, #011810 0%, #022c22 36%, #041b36 78%, #020e1a 100%);
  z-index: 2; /* stays above adjacent light sections during GSAP pin */
}

/* ── Background orbs + grid ─────────────────────────── */
.bowl-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.bgo {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  will-change: transform;
}

.bgo-1 {
  width: 580px; height: 580px;
  top: -140px; left: -120px;
  background: radial-gradient(circle, rgba(16,185,129,0.20) 0%, transparent 65%);
}

.bgo-2 {
  width: 460px; height: 460px;
  bottom: -100px; right: -100px;
  background: radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 65%);
}

.bgo-3 {
  width: 340px; height: 340px;
  top: 30%; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 65%);
}

.bowl-grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%);
}

/* ── Section layout ─────────────────────────────────── */
.bowl-section {
  display: grid;
  align-items: center;
  gap: 56px;
  min-height: 100vh;
  padding-block: 80px;
  position: relative;
  z-index: 1;
}

/* ── Stage: overflow:hidden clips food-card entry animation ── */
.bowl-stage-wrap {
  position: relative;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ── Floating stat chips ─────────────────────────────── */
.bowl-chip {
  position: absolute;
  padding: 9px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(16,185,129,0.30);
  backdrop-filter: blur(14px);
  text-align: center;
  will-change: transform, opacity;
  z-index: 4;
}

.bchip-a { top: 64px; left: 5%; }
.bchip-b { bottom: 88px; right: 6%; }
.bchip-c { bottom: 56px; left: 6%; }

.bowl-chip strong {
  display: block;
  color: #34d399;
  font-family: var(--font-heading);
  font-size: 1.15rem;
  line-height: 1;
  font-weight: 900;
}

.bowl-chip span {
  display: block;
  color: rgba(255,255,255,0.55);
  font-size: 0.67rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-top: 3px;
}

/* ── Food cards ─────────────────────────────────────── */
.fc {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 15px 11px 11px;
  border-radius: 22px;
  background: rgba(255,255,255,0.95);
  border: 1.5px solid rgba(16,185,129,0.22);
  box-shadow:
    0 28px 64px rgba(0,0,0,0.36),
    0 10px 24px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.9);
  min-width: 196px;
  will-change: transform, opacity;
  z-index: 5;
  backdrop-filter: blur(8px);
}

/* Resting positions around the bowl */
.fc--protein { top: 68px; left: 12px; }
.fc--veggie  { top: 52px; right: 12px; }
.fc--fruit   { bottom: 86px; left: 50%; transform: translateX(-50%); }

.fc-img {
  width: 54px; height: 54px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.fc-img img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

.fc-text strong {
  display: block;
  font-size: 0.88rem;
  font-weight: 900;
  color: #0e1e1b;
  line-height: 1.2;
}

.fc-text span {
  display: block;
  font-size: 0.71rem;
  color: #4a8a7e;
  font-weight: 700;
  margin-top: 3px;
}

.fc-text b {
  display: block;
  font-size: 0.68rem;
  font-weight: 900;
  color: #059669;
  margin-top: 5px;
  font-style: normal;
}

/* ── Bowl vessel ─────────────────────────────────────── */
.bowl-vessel {
  position: relative;
  width: 340px;
  flex-shrink: 0;
  z-index: 3;
  will-change: transform, opacity;
}

.bowl-rim {
  position: absolute;
  top: -20px; left: -18px; right: -18px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(16,185,129,0.25));
  border: 2px solid rgba(16,185,129,0.60);
  box-shadow:
    0 10px 28px rgba(0,0,0,0.35),
    inset 0 1px 0 rgba(255,255,255,0.4);
  z-index: 4;
}

.bowl-body {
  position: relative;
  width: 340px;
  height: 192px;
  border-radius: 0 0 170px 170px;
  border: 2.5px solid rgba(16,185,129,0.52);
  border-top: none;
  background: rgba(3,28,20,0.75);
  overflow: hidden;
  box-shadow:
    0 60px 120px rgba(0,0,0,0.5),
    0 28px 56px rgba(0,0,0,0.3),
    inset 0 -36px 60px rgba(16,185,129,0.06);
}

/* ── Fill layers animate in sequence ────────────────── */
.bl {
  position: absolute;
  left: 0; right: 0;
  transform: scaleY(0);
  transform-origin: bottom center;
  will-change: transform;
}

.bl-base {
  bottom: 0; height: 100%;
  background: linear-gradient(to top, rgba(4,30,22,0.9), rgba(6,60,44,0.5));
}

.bl-protein {
  bottom: 0; height: 65%;
  background: linear-gradient(
    to top,
    rgba(161,73,14,0.85) 0%,
    rgba(217,119,6,0.6) 45%,
    rgba(245,158,11,0.25) 100%
  );
}

.bl-veggie {
  bottom: 0; height: 40%;
  background: linear-gradient(
    to top,
    rgba(5,100,65,0.9) 0%,
    rgba(16,185,129,0.7) 50%,
    rgba(52,211,153,0.3) 100%
  );
}

.bl-fruit {
  bottom: 0; height: 22%;
  background: linear-gradient(
    to top,
    rgba(185,28,28,0.75) 0%,
    rgba(239,68,68,0.55) 50%,
    rgba(251,113,133,0.2) 100%
  );
}

.bowl-sheen {
  position: absolute; inset: 0;
  background: linear-gradient(
    130deg,
    rgba(255,255,255,0.14) 0%,
    transparent 45%,
    rgba(255,255,255,0.05) 100%
  );
  pointer-events: none;
  z-index: 2;
  animation: bowl-sheen-sweep 7s ease-in-out infinite;
}

@keyframes bowl-sheen-sweep {
  0%, 35%  { transform: translateX(-110%); }
  65%, 100% { transform: translateX(110%); }
}

.bowl-shadow {
  position: absolute;
  bottom: -18px; left: 5%; right: 5%;
  height: 22px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 72%);
  border-radius: 50%;
  filter: blur(8px);
}

/* ── Splash drops ─────────────────────────────────────── */
.bs {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  will-change: transform, opacity;
  z-index: 6;
}

.bs1 { width: 13px; height: 13px; background: rgba(52,211,153,0.85); top: -18px; left: 34%; }
.bs2 { width:  8px; height:  8px; background: rgba(20,184,166,0.78); top: -12px; right: 30%; }
.bs3 { width: 10px; height: 10px; background: rgba(16,185,129,0.75); top: -15px; left: 58%; }
.bs4 { width:  6px; height:  6px; background: rgba(52,211,153,0.68); top:  -9px; right: 44%; }

/* ── Copy (dark-themed) ──────────────────────────────── */
.bowl-copy { display: grid; gap: 26px; }

.bowl-copy .eyebrow {
  color: var(--emerald-400);
  margin: 0;
}

.bowl-copy .eyebrow::before {
  background: var(--emerald-400);
}

.bowl-h2 {
  margin: 0;
  font-size: 2.85rem;
  line-height: 1.04;
  letter-spacing: -0.01em;
  color: #ffffff;
}

.bowl-p {
  max-width: 510px;
  margin: 0;
  color: rgba(255,255,255,0.70);
  line-height: 1.80;
  font-size: 1.04rem;
}

/* ── Legend with progress bars ───────────────────────── */
.bowl-legend { display: grid; gap: 10px; }

.bl-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(16,185,129,0.20);
  will-change: transform, opacity;
  transition: background 220ms ease;
}

.bl-item:hover {
  background: rgba(255,255,255,0.09);
}

.blis-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.blis-dot {
  display: block;
  width: 14px; height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
}

.blis-dot--protein { background: #f59e0b; box-shadow: 0 0 10px rgba(245,158,11,0.55); }
.blis-dot--veggie  { background: #34d399; box-shadow: 0 0 10px rgba(52,211,153,0.55); }
.blis-dot--fruit   { background: #f87171; box-shadow: 0 0 10px rgba(248,113,113,0.55); }

.blis-track {
  width: 4px;
  min-height: 28px;
  flex: 1;
  background: rgba(255,255,255,0.1);
  border-radius: 999px;
  overflow: hidden;
}

.blis-bar {
  width: 100%;
  height: 0%;
  border-radius: inherit;
}

.blis-bar--protein { background: linear-gradient(to top, #b45309, #fbbf24); }
.blis-bar--veggie  { background: linear-gradient(to top, #059669, #34d399); }
.blis-bar--fruit   { background: linear-gradient(to top, #dc2626, #fb7185); }

.blis-label {
  flex: 1;
  min-width: 0;
}

.blis-label strong {
  display: block;
  color: rgba(255,255,255,0.92);
  font-size: 0.87rem;
  font-weight: 900;
  line-height: 1.3;
}

.blis-label span {
  display: block;
  color: rgba(255,255,255,0.48);
  font-size: 0.73rem;
  font-weight: 700;
  margin-top: 4px;
}

.blis-pct {
  color: rgba(255,255,255,0.36);
  font-size: 0.78rem;
  font-weight: 900;
  font-family: var(--font-heading);
  flex-shrink: 0;
}

/* ── CTA row ─────────────────────────────────────────── */
.bowl-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.bowl-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 54px;
  padding: 0 30px;
  border-radius: 18px;
  color: #ffffff;
  font-weight: 900;
  font-size: 0.97rem;
  text-decoration: none;
  background: linear-gradient(135deg, #065f46, #0d9488);
  box-shadow:
    0 18px 44px rgba(5,150,105,0.38),
    0 6px 16px rgba(5,150,105,0.22),
    inset 0 1px 0 rgba(255,255,255,0.22);
  transition: transform 260ms ease, box-shadow 260ms ease;
}

.bowl-btn:hover {
  transform: translateY(-3px);
  box-shadow:
    0 28px 58px rgba(5,150,105,0.48),
    0 8px 20px rgba(5,150,105,0.28);
}

.bowl-link {
  color: rgba(255,255,255,0.65);
  font-weight: 800;
  font-size: 0.9rem;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.28);
  padding-bottom: 2px;
  transition: color 200ms, border-color 200ms;
}

.bowl-link:hover {
  color: #ffffff;
  border-color: rgba(255,255,255,0.75);
}

/* ── Desktop ─────────────────────────────────────────── */
@media (min-width: 760px) {
  .bowl-section {
    grid-template-columns: 1fr 1fr;
    padding-block: 0;
  }
}

/* ── Mobile ──────────────────────────────────────────── */
@media (max-width: 759px) {
  .bowl-section { padding-block: 64px; min-height: auto; }
  .bowl-stage-wrap { height: 480px; }
  .bowl-vessel { width: 280px; }
  .bowl-body { width: 280px; height: 158px; border-radius: 0 0 140px 140px; }
  .bowl-rim { top: -16px; left: -14px; right: -14px; height: 32px; }
  .fc { min-width: 168px; }
  .fc--protein { top: 52px; left: 6px; }
  .fc--veggie  { top: 38px; right: 6px; }
  .fc--fruit   { bottom: 72px; }
  .bowl-h2 { font-size: 2.1rem; }
}
</style>
