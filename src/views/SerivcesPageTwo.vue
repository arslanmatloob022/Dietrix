<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const services = [
  {
    id: 1,
    badge: "FROM $149",
    icon: "🔥",
    title: "Weight Loss Accelerator",
    description:
      "Structured fat-loss roadmap for busy professionals with weekly accountability.",
    features: [
      "Metabolic assessment",
      "Weekly progress review",
      "Travel-friendly meal swaps",
    ],
    cta: "Start Weight Loss Plan",
    gradient: "linear-gradient(135deg, #0d9373 0%, #06b6d4 100%)",
    accent: "#0d9373",
  },
  {
    id: 2,
    badge: "FROM $189",
    icon: "🧬",
    title: "Medical Nutrition Therapy",
    description:
      "Condition-specific planning for PCOS, diabetes, thyroid, gut and inflammatory issues.",
    features: [
      "Clinical symptom tracker",
      "Lab-based adjustments",
      "Medication-food timing support",
    ],
    cta: "Get Clinical Guidance",
    gradient: "linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)",
    accent: "#0891b2",
    featured: true,
  },
  {
    id: 3,
    badge: "FROM $119",
    icon: "🎯",
    title: "Custom Diet Blueprint",
    description:
      "Personalized plans aligned with your culture, schedule, and food preferences.",
    features: [
      "Macro-personalized menu",
      "Recipe packs",
      "Habit reset framework",
    ],
    cta: "Build My Plan",
    gradient: "linear-gradient(135deg, #059669 0%, #0d9373 100%)",
    accent: "#059669",
  },
];

const pricingTiers = [
  {
    id: 1,
    name: "STARTER RESET",
    price: "$99",
    period: "/ one-time",
    description: "Ideal for first-time clients needing a clear action plan.",
    features: [
      "1 consultation (45 min)",
      "14-day meal structure",
      "Email support for 7 days",
    ],
    urgency: "Only 12 slots this month",
    cta: "Book Starter Reset",
  },
  {
    id: 2,
    name: "TRANSFORMATION PLUS",
    price: "$249",
    period: "/ monthly",
    description:
      "Most popular package for sustainable fat loss and behavior change.",
    features: [
      "4 consultations per month",
      "Weekly plan revisions",
      "WhatsApp accountability",
    ],
    urgency: "Limited to 20 active clients",
    cta: "Choose Transformation Plus",
    featured: true,
  },
  {
    id: 3,
    name: "CLINICAL CARE PRO",
    price: "$359",
    period: "/ monthly",
    description:
      "For medical conditions requiring close monitoring and nutrition therapy.",
    features: [
      "Bi-weekly deep reviews",
      "Lab report interpretation",
      "Priority messaging support",
    ],
    urgency: "High-touch care, limited onboarding",
    cta: "Apply for Clinical Care",
  },
];

// Food items for the scroll animation
const foodItems = [
  { emoji: "🥦", label: "Broccoli", sx: -55, sy: -42, angle: -40 },
  { emoji: "🍎", label: "Apple", sx: 52, sy: -48, angle: 35 },
  { emoji: "🥕", label: "Carrot", sx: -68, sy: 12, angle: -55 },
  { emoji: "🐟", label: "Salmon", sx: 62, sy: 8, angle: 50 },
  { emoji: "🫐", label: "Blueberry", sx: -28, sy: -65, angle: -20 },
  { emoji: "🥑", label: "Avocado", sx: 32, sy: -58, angle: 28 },
  { emoji: "🍋", label: "Lemon", sx: -60, sy: 38, angle: -62 },
  { emoji: "🫚", label: "Olive Oil", sx: 58, sy: 34, angle: 58 },
];

const mouseX = ref(0);
const mouseY = ref(0);
const bowlSection = ref<HTMLElement | null>(null);
const bowlProgress = ref(0);

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getFoodStyle(item: (typeof foodItems)[0], index: number) {
  const threshold = (index / foodItems.length) * 0.55;
  const local = Math.max(
    0,
    Math.min(1, (bowlProgress.value - threshold) / 0.45),
  );
  const e = ease(local);
  const tx = item.sx * (1 - e);
  const ty = item.sy * (1 - e) - (1 - e) * 25;
  const rot = item.angle * (1 - e);
  const scale = 0.35 + e * 0.65;
  const opacity = 0.15 + e * 0.85;
  return {
    transform: `translate(calc(-50% + ${tx}vw), calc(-50% + ${ty}vh)) rotate(${rot}deg) scale(${scale})`,
    opacity,
    zIndex: Math.round(e * 10),
  };
}

function handleMouse(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2;
}

function handleScroll() {
  if (bowlSection.value) {
    const rect = bowlSection.value.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = (vh * 0.9 - rect.top) / (vh * 0.8);
    bowlProgress.value = Math.max(0, Math.min(1, raw));
  }
  document.querySelectorAll(".scroll-reveal:not(.revealed)").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
      el.classList.add("revealed");
    }
  });
}

onMounted(() => {
  window.addEventListener("mousemove", handleMouse, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouse);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <main class="sp">
    <!-- BG -->
    <div class="bg" aria-hidden="true">
      <div
        class="orb o1"
        :style="{ transform: `translate(${mouseX * 20}px,${mouseY * 20}px)` }"
      ></div>
      <div
        class="orb o2"
        :style="{ transform: `translate(${-mouseX * 26}px,${-mouseY * 26}px)` }"
      ></div>
      <div
        class="orb o3"
        :style="{ transform: `translate(${mouseX * 14}px,${-mouseY * 18}px)` }"
      ></div>
      <div class="grid-mesh"></div>
    </div>

    <!-- HERO -->
    <section class="hero scroll-reveal">
      <div class="hero-left">
        <div class="ey-row">
          <span class="dot"></span><span class="ey">Services</span>
        </div>
        <h1 class="h-title">
          Choose the Right<br />
          <span class="gt">Nutrition Program</span><br />
          for Your Goal
        </h1>
        <p class="h-body">
          From weight loss acceleration to condition-specific nutrition therapy,
          every program is <em>personalized</em>, trackable, and remotely
          delivered.
        </p>
        <div class="stats">
          <div
            class="stat-chip"
            v-for="s in [
              { n: '500+', l: 'Clients Transformed' },
              { n: '94%', l: 'Goal Achievement' },
              { n: '3+', l: 'Years Experience' },
            ]"
            :key="s.l"
          >
            <span class="sn">{{ s.n }}</span>
            <span class="sl">{{ s.l }}</span>
          </div>
        </div>
      </div>
      <div class="hero-right" aria-hidden="true">
        <div class="ring r1"></div>
        <div class="ring r2"></div>
        <div class="ring r3"></div>
        <div class="fc fa gp">🥗 Personalized Meals</div>
        <div class="fc fb gp">📊 Weekly Tracking</div>
        <div class="fc fc_ gp">💬 24/7 Support</div>
        <div class="fc fd gp">🎯 Goal Matching</div>
      </div>
    </section>

    <!-- SCROLL FOOD BOWL -->
    <section class="bowl-wrap" ref="bowlSection">
      <div class="bowl-sticky">
        <div class="bowl-text scroll-reveal">
          <div class="ey-row">
            <span class="dot"></span
            ><span class="ey">Your Plate, Your Plan</span>
          </div>
          <h2 class="bowl-h">
            Every ingredient <span class="gt">chosen for you</span>
          </h2>
          <p class="bowl-sub">
            Scroll to fill your personalized nutrition bowl
          </p>
        </div>

        <div class="bowl-stage">
          <div
            v-for="(item, i) in foodItems"
            :key="item.label"
            class="food-item"
            :style="getFoodStyle(item, i)"
          >
            <span class="fe">{{ item.emoji }}</span>
          </div>

          <!-- Bowl SVG -->
          <div class="bowl-svg-wrap">
            <svg
              viewBox="0 0 260 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="bowl-svg"
            >
              <ellipse
                cx="130"
                cy="166"
                rx="108"
                ry="11"
                fill="rgba(0,0,0,0.28)"
              />
              <path
                d="M22 85 Q22 162 130 162 Q238 162 238 85 Z"
                fill="rgba(13,147,115,0.07)"
                stroke="rgba(13,147,115,0.55)"
                stroke-width="1.8"
              />
              <ellipse
                cx="130"
                cy="85"
                rx="108"
                ry="20"
                fill="rgba(13,147,115,0.05)"
                stroke="rgba(13,147,115,0.48)"
                stroke-width="1.8"
              />
              <ellipse
                cx="130"
                cy="126"
                rx="92"
                ry="32"
                :fill="`rgba(13,147,115,${bowlProgress * 0.2})`"
              />
              <path
                d="M48 80 Q66 68 82 77"
                stroke="rgba(255,255,255,0.18)"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>

            <svg class="prog-ring" viewBox="0 0 300 300">
              <circle
                cx="150"
                cy="150"
                r="128"
                fill="none"
                stroke="rgba(13,147,115,0.09)"
                stroke-width="3"
              />
              <circle
                cx="150"
                cy="150"
                r="128"
                fill="none"
                stroke="url(#rg)"
                stroke-width="3"
                stroke-linecap="round"
                :stroke-dasharray="`${bowlProgress * 804.2} 804.2`"
                style="transform: rotate(-90deg); transform-origin: center"
              />
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#0d9373" />
                  <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            <div
              class="bowl-pct"
              :style="{ opacity: bowlProgress > 0.05 ? 1 : 0 }"
            >
              {{ Math.round(bowlProgress * 100) }}%
            </div>
          </div>

          <div class="food-chips">
            <transition-group name="chip">
              <span
                v-for="(item, i) in foodItems"
                v-if="bowlProgress > (i / foodItems.length) * 0.55 + 0.38"
                :key="item.label"
                class="food-chip"
                >{{ item.emoji }} {{ item.label }}</span
              >
            </transition-group>
          </div>
        </div>

        <p
          class="bowl-hint"
          :style="{ opacity: bowlProgress < 0.95 ? 0.6 : 0 }"
        >
          ↓ Keep scrolling
        </p>
        <p class="bowl-done" :style="{ opacity: bowlProgress >= 0.95 ? 1 : 0 }">
          ✓ Your bowl is ready!
        </p>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="services">
      <div class="ctr">
        <div class="sh scroll-reveal">
          <div class="ey-row">
            <span class="dot"></span><span class="ey">What You Get</span>
          </div>
          <h2>Detailed <span class="gt">Service Breakdown</span></h2>
          <p class="sub">
            Program structure, inclusions, and outcomes mapped to your lifestyle
            and medical needs.
          </p>
        </div>
        <div class="s-grid">
          <div
            v-for="(s, i) in services"
            :key="s.id"
            class="s-card gc scroll-reveal"
            :class="{ sf: s.featured }"
            :style="{ '--acc': s.accent, '--i': i }"
          >
            <div class="cshine"></div>
            <div class="ctop">
              <span
                class="badge"
                :style="{
                  color: s.accent,
                  borderColor: s.accent + '44',
                  background: s.accent + '16',
                }"
                >{{ s.badge }}</span
              >
              <div class="ibox">{{ s.icon }}</div>
            </div>
            <h3 class="st">{{ s.title }}</h3>
            <p class="sd">{{ s.description }}</p>
            <ul class="fl">
              <li v-for="f in s.features" :key="f">
                <span
                  class="ck"
                  :style="{
                    background: s.accent + '20',
                    borderColor: s.accent + '50',
                    color: s.accent,
                  }"
                  >✓</span
                >{{ f }}
              </li>
            </ul>
            <button class="sbtn" :style="{ background: s.gradient }">
              {{ s.cta }}<span class="ar">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="process">
      <div class="ctr">
        <div class="sh scroll-reveal">
          <div class="ey-row">
            <span class="dot"></span><span class="ey">How It Works</span>
          </div>
          <h2>Your Journey to <span class="gt">Better Health</span></h2>
        </div>
        <div class="p-grid">
          <div
            v-for="(step, i) in [
              {
                n: '01',
                icon: '📞',
                title: 'Discovery Call',
                desc: 'A free 15-min consultation to understand your goals, conditions, and lifestyle.',
              },
              {
                n: '02',
                icon: '📋',
                title: 'Custom Plan Built',
                desc: 'Your dietitian builds a fully personalized plan within 48 hours.',
              },
              {
                n: '03',
                icon: '📈',
                title: 'Weekly Reviews',
                desc: 'Track progress, adjust macros, and stay accountable through real check-ins.',
              },
              {
                n: '04',
                icon: '🏆',
                title: 'Sustainable Results',
                desc: 'Reach your goal and maintain it with long-term habit coaching.',
              },
            ]"
            :key="i"
            class="p-card gc scroll-reveal"
            :style="{ '--i': i }"
          >
            <div class="pn">{{ step.n }}</div>
            <div class="pi">{{ step.icon }}</div>
            <h4 class="pt">{{ step.title }}</h4>
            <p class="pd">{{ step.desc }}</p>
            <div class="pline" v-if="i < 3"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section class="pricing">
      <div class="ctr">
        <div class="sh scroll-reveal">
          <div class="ey-row">
            <span class="dot"></span><span class="ey">Pricing</span>
          </div>
          <h2>Transparent Plans for <span class="gt">Every Stage</span></h2>
          <p class="sub">
            Start simple or choose high-touch coaching based on your support
            requirements.
          </p>
        </div>
        <div class="pr-grid">
          <div
            v-for="(t, i) in pricingTiers"
            :key="t.id"
            class="pr-card gc scroll-reveal"
            :class="{ pf: t.featured }"
            :style="{ '--i': i }"
          >
            <div v-if="t.featured" class="pop-tag">Most Popular</div>
            <div class="tlabel">{{ t.name }}</div>
            <div class="tamt">
              <span class="tprice">{{ t.price }}</span>
              <span class="tper">{{ t.period }}</span>
            </div>
            <p class="tdesc">{{ t.description }}</p>
            <ul class="tfeats">
              <li v-for="f in t.features" :key="f">
                <span class="tck">✓</span>{{ f }}
              </li>
            </ul>
            <p class="urg">⚡ {{ t.urgency }}</p>
            <button class="tbtn" :class="{ tbtnf: t.featured }">
              {{ t.cta }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="testi">
      <div class="ctr">
        <div class="sh scroll-reveal">
          <div class="ey-row">
            <span class="dot"></span><span class="ey">Client Stories</span>
          </div>
          <h2>Real Results, <span class="gt">Real People</span></h2>
        </div>
        <div class="te-grid">
          <div
            v-for="t in [
              {
                text: 'Lost 14kg in 3 months without starving. The weekly check-ins kept me going.',
                name: 'Ayesha R.',
                tag: 'Weight Loss',
                res: '-14kg',
              },
              {
                text: 'My PCOS symptoms reduced drastically. Medically guided nutrition changed everything.',
                name: 'Sara M.',
                tag: 'Medical Nutrition',
                res: 'PCOS Relief',
              },
              {
                text: 'Finally a plan that fits my Pakistani food culture. I didn\'t have to give up biryani!',
                name: 'Usman K.',
                tag: 'Custom Blueprint',
                res: 'Culture-fit',
              },
              {
                text: 'The clinical tracker helped my doctor and dietitian align perfectly on my treatment.',
                name: 'Farah N.',
                tag: 'Clinical Care',
                res: 'Lab Improved',
              },
            ]"
            :key="t.name"
            class="te-card gc scroll-reveal"
          >
            <div class="tres">{{ t.res }}</div>
            <div class="stars">★★★★★</div>
            <p class="tt">"{{ t.text }}"</p>
            <div class="tf">
              <span class="tname">{{ t.name }}</span>
              <span class="ttag">{{ t.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-s">
      <div class="ctr">
        <div class="cta-card gc scroll-reveal">
          <div class="cta-glow"></div>
          <div class="cta-body">
            <div class="ey-row">
              <span class="dot"></span
              ><span class="ey">Limited Consultation Slots</span>
            </div>
            <h2 class="cta-h">
              Unsure Which Plan <span class="gt">Fits You Best?</span>
            </h2>
            <p class="cta-d">
              Book a discovery consultation and get matched with the ideal
              program in under 15 minutes.
            </p>
            <div class="cta-btns">
              <button class="bp">
                <span>Book Consultation</span><span class="shim"></span>
              </button>
              <button class="bs">Ask in Chatbot →</button>
            </div>
          </div>
          <div class="cta-vis" aria-hidden="true">
            <div class="cta-orb"></div>
            <div class="cta-chip cc1 gp">📅 Next slot: Tomorrow</div>
            <div class="cta-chip cc2 gp">⏱ 15 min call</div>
            <div class="cta-chip cc3 gp">✅ Free consultation</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* TOKENS */
.sp {
  --t: #0d9373;
  --tl: #14b8a6;
  --cy: #06b6d4;
  --vi: #7c3aed;
  --bg: #060f0b;
  --sf: rgba(255, 255, 255, 0.04);
  --bd: rgba(255, 255, 255, 0.09);
  --c1: #f0fdf8;
  --c2: rgba(220, 252, 240, 0.65);
  --c3: rgba(200, 240, 220, 0.38);
  --ff: "Outfit", sans-serif;
  --r: 20px;
  --rl: 28px;
  font-family: var(--ff);
  background: var(--bg);
  color: var(--c1);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
}

.ctr {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5vw, 48px);
}

/* BG */
.bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.o1 {
  width: 55vw;
  height: 55vw;
  background: radial-gradient(
    circle,
    rgba(13, 147, 115, 0.22),
    transparent 70%
  );
  top: -12vw;
  left: -8vw;
  animation: d1 14s ease-in-out infinite;
}
.o2 {
  width: 45vw;
  height: 45vw;
  background: radial-gradient(circle, rgba(8, 145, 178, 0.17), transparent 70%);
  bottom: -5vw;
  right: -8vw;
  animation: d2 18s ease-in-out infinite;
}
.o3 {
  width: 35vw;
  height: 35vw;
  background: radial-gradient(
    circle,
    rgba(124, 58, 237, 0.13),
    transparent 70%
  );
  top: 38%;
  left: 38%;
  animation: d3 22s ease-in-out infinite;
}
@keyframes d1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(5vw, 6vw);
  }
}
@keyframes d2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-5vw, -5vw);
  }
}
@keyframes d3 {
  0%,
  100% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(calc(-50% + 6vw), calc(-50% - 4vw));
  }
}
.grid-mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(13, 147, 115, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13, 147, 115, 0.05) 1px, transparent 1px);
  background-size: 64px 64px;
}

/* GLASS CARD */
.gc {
  background: var(--sf);
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid var(--bd);
  border-radius: var(--rl);
  position: relative;
  overflow: hidden;
  transition:
    transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.4s ease,
    border-color 0.35s ease;
}
.gc::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.04) 0%,
    transparent 55%
  );
  pointer-events: none;
  border-radius: inherit;
}
.gc:hover {
  transform: translateY(-7px) scale(1.009);
  border-color: rgba(13, 147, 115, 0.33);
  box-shadow:
    0 24px 70px rgba(13, 147, 115, 0.11),
    0 0 0 1px rgba(13, 147, 115, 0.17);
}

.gp {
  background: rgba(255, 255, 255, 0.065);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 100px;
  padding: 9px 17px;
  font-size: clamp(0.7rem, 1.4vw, 0.84rem);
  font-weight: 600;
  color: var(--c1);
  white-space: nowrap;
}

/* EYEBROW */
.ey-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.ey {
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: clamp(0.6rem, 1.1vw, 0.7rem);
  color: var(--t);
  font-weight: 700;
}
.dot {
  width: 8px;
  height: 8px;
  background: var(--t);
  border-radius: 50%;
  flex-shrink: 0;
  animation: pulse 2s ease-out infinite;
  box-shadow: 0 0 0 0 rgba(13, 147, 115, 0.7);
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(13, 147, 115, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}

/* GRADIENT TEXT */
.gt {
  background: linear-gradient(90deg, var(--t), var(--cy), var(--vi));
  background-size: 220%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gm 5s linear infinite;
}
@keyframes gm {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 220%;
  }
}

/* SECTION HEADER */
.sh {
  max-width: 640px;
  margin-bottom: clamp(28px, 5vw, 56px);
}
.sh h2 {
  font-size: clamp(1.7rem, 3.5vw, 2.7rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--c1);
  margin-bottom: 12px;
}
.sub {
  color: var(--c2);
  font-size: clamp(0.88rem, 1.4vw, 0.98rem);
  line-height: 1.75;
}

/* SCROLL REVEAL */
.scroll-reveal {
  opacity: 0;
  transform: translateY(34px);
  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: calc(var(--i, 0) * 0.11s);
}
.scroll-reveal.revealed {
  opacity: 1;
  transform: none;
}

/* ──────────────────────────────────────────────────────
   HERO
────────────────────────────────────────────────────── */
.hero {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 5vw, 72px);
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(80px, 10vw, 120px) clamp(20px, 5vw, 48px)
    clamp(60px, 8vw, 100px);
}
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 72px;
  }
  .hero-right {
    display: none;
  }
}
.h-title {
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 900;
  line-height: 1.07;
  color: var(--c1);
  margin-bottom: clamp(14px, 2vw, 22px);
  letter-spacing: -0.02em;
}
.h-body {
  font-size: clamp(0.92rem, 1.5vw, 1.08rem);
  color: var(--c2);
  line-height: 1.8;
  max-width: 480px;
  margin-bottom: clamp(24px, 4vw, 40px);
}
.h-body em {
  font-style: normal;
  color: var(--tl);
  font-weight: 600;
}
.stats {
  display: flex;
  gap: clamp(7px, 1.5vw, 13px);
  flex-wrap: wrap;
}
.stat-chip {
  display: flex;
  flex-direction: column;
  background: rgba(13, 147, 115, 0.08);
  border: 1px solid rgba(13, 147, 115, 0.22);
  border-radius: 14px;
  padding: clamp(9px, 1.5vw, 13px) clamp(12px, 2vw, 18px);
  transition: transform 0.3s ease;
}
.stat-chip:hover {
  transform: translateY(-3px);
}
.sn {
  font-size: clamp(1.2rem, 2.5vw, 1.75rem);
  font-weight: 900;
  color: var(--t);
  line-height: 1;
}
.sl {
  font-size: clamp(0.6rem, 1vw, 0.7rem);
  color: var(--c3);
  margin-top: 4px;
  font-weight: 500;
}

.hero-right {
  position: relative;
  height: clamp(280px, 40vw, 460px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.r1 {
  width: 60%;
  aspect-ratio: 1;
  border-color: rgba(13, 147, 115, 0.25);
  background: radial-gradient(
    circle at 35% 35%,
    rgba(13, 147, 115, 0.1),
    transparent 60%
  );
  animation: ss 24s linear infinite;
  box-shadow:
    inset 0 0 40px rgba(13, 147, 115, 0.06),
    0 0 40px rgba(13, 147, 115, 0.06);
}
.r2 {
  width: 78%;
  aspect-ratio: 1;
  border-color: rgba(8, 145, 178, 0.14);
  border-style: dashed;
  animation: ss 38s linear infinite reverse;
}
.r3 {
  width: 95%;
  aspect-ratio: 1;
  border-color: rgba(124, 58, 237, 0.1);
  animation: ss 55s linear infinite;
}
@keyframes ss {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.fc {
  position: absolute;
}
.fa {
  top: 8%;
  right: 4%;
  animation: f1 4s ease-in-out infinite;
}
.fb {
  bottom: 10%;
  left: 1%;
  animation: f2 5.2s ease-in-out infinite 0.6s;
}
.fc_ {
  top: 46%;
  left: 2%;
  animation: f3 4.6s ease-in-out infinite 1.1s;
}
.fd {
  bottom: 26%;
  right: 1%;
  animation: f1 5.5s ease-in-out infinite 0.3s;
}
@keyframes f1 {
  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-14px) rotate(2deg);
  }
}
@keyframes f2 {
  0%,
  100% {
    transform: translateY(0) rotate(1deg);
  }
  50% {
    transform: translateY(-12px) rotate(-1deg);
  }
}
@keyframes f3 {
  0%,
  100% {
    transform: translateY(-50%) rotate(-1deg);
  }
  50% {
    transform: translateY(calc(-50% - 12px)) rotate(1deg);
  }
}

/* ──────────────────────────────────────────────────────
   BOWL SECTION
────────────────────────────────────────────────────── */
.bowl-wrap {
  position: relative;
  z-index: 1;
  height: 280vh;
}
.bowl-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 3vw, 40px);
  overflow: hidden;
}
.bowl-text {
  text-align: center;
  position: relative;
  z-index: 2;
}
.bowl-h {
  font-size: clamp(1.5rem, 3.2vw, 2.5rem);
  font-weight: 800;
  color: var(--c1);
  margin: 8px 0;
}
.bowl-sub {
  color: var(--c2);
  font-size: clamp(0.82rem, 1.4vw, 0.96rem);
  margin-bottom: clamp(20px, 4vw, 36px);
}

.bowl-stage {
  position: relative;
  width: clamp(240px, 38vw, 320px);
  height: clamp(240px, 38vw, 320px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.food-item {
  position: absolute;
  left: 50%;
  top: 50%;
  pointer-events: none;
  will-change: transform, opacity;
  filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.5));
}
.fe {
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  display: block;
  line-height: 1;
}

.bowl-svg-wrap {
  position: relative;
  z-index: 5;
  width: clamp(170px, 26vw, 230px);
  pointer-events: none;
}
.bowl-svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 14px 38px rgba(13, 147, 115, 0.22));
}
.prog-ring {
  position: absolute;
  inset: -22%;
  width: 144%;
  height: 144%;
  left: -22%;
  top: -22%;
  pointer-events: none;
}
.bowl-pct {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--t);
  white-space: nowrap;
  transition: opacity 0.3s ease;
  letter-spacing: 0.06em;
}

.food-chips {
  position: absolute;
  bottom: -68px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  max-width: 380px;
  z-index: 10;
}
.food-chip {
  background: rgba(13, 147, 115, 0.11);
  border: 1px solid rgba(13, 147, 115, 0.27);
  border-radius: 100px;
  padding: 3px 11px;
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--tl);
  white-space: nowrap;
}
.chip-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.chip-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.88);
}

.bowl-hint,
.bowl-done {
  position: absolute;
  bottom: clamp(20px, 3vw, 36px);
  font-size: 0.84rem;
  text-align: center;
  font-weight: 600;
  transition: opacity 0.4s ease;
}
.bowl-hint {
  color: var(--c3);
}
.bowl-done {
  color: var(--t);
}

/* ──────────────────────────────────────────────────────
   SERVICES
────────────────────────────────────────────────────── */
.services {
  position: relative;
  z-index: 1;
  padding: clamp(56px, 8vw, 96px) 0;
}
.s-grid {
  display: grid;
  gap: clamp(14px, 2vw, 22px);
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 920px) {
  .s-grid {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 560px) and (max-width: 920px) {
  .s-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.s-card {
  padding: clamp(22px, 3vw, 34px);
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.8vw, 16px);
}
.sf {
  background: rgba(13, 147, 115, 0.07);
  border-color: rgba(13, 147, 115, 0.28);
}
.cshine {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 60%;
  height: 60%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.055),
    transparent 70%
  );
  border-radius: 50%;
  transition: all 0.6s ease;
  pointer-events: none;
}
.s-card:hover .cshine {
  top: -10%;
  left: 10%;
}
.ctop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.badge {
  font-size: clamp(0.6rem, 1vw, 0.7rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 5px 12px;
  border-radius: 100px;
  border: 1px solid;
}
.ibox {
  width: clamp(38px, 5vw, 48px);
  height: clamp(38px, 5vw, 48px);
  background: rgba(255, 255, 255, 0.055);
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.2rem, 2.5vw, 1.55rem);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.st {
  font-size: clamp(1rem, 1.9vw, 1.25rem);
  font-weight: 800;
  color: var(--c1);
  line-height: 1.22;
}
.sd {
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  color: var(--c2);
  line-height: 1.65;
  flex: 1;
}
.fl {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.fl li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(0.78rem, 1.2vw, 0.86rem);
  color: rgba(220, 252, 240, 0.82);
}
.ck {
  width: 19px;
  height: 19px;
  border-radius: 6px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  flex-shrink: 0;
}
.sbtn {
  margin-top: auto;
  padding: clamp(11px, 1.5vw, 14px) 20px;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  font-weight: 700;
  cursor: pointer;
  font-family: var(--ff);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition:
    filter 0.2s,
    transform 0.2s,
    box-shadow 0.3s;
  overflow: hidden;
}
.sbtn:hover {
  filter: brightness(1.12);
  transform: scale(1.02);
  box-shadow: 0 8px 28px rgba(13, 147, 115, 0.28);
}
.ar {
  transition: transform 0.2s;
}
.sbtn:hover .ar {
  transform: translateX(4px);
}

/* PROCESS */
.process {
  position: relative;
  z-index: 1;
  padding: clamp(56px, 8vw, 96px) 0;
}
.p-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(10px, 1.8vw, 18px);
  position: relative;
}
@media (max-width: 900px) {
  .p-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .p-grid {
    grid-template-columns: 1fr;
  }
}
.p-card {
  padding: clamp(18px, 3vw, 28px) clamp(14px, 2.5vw, 22px);
  text-align: center;
  transition:
    transform 0.35s cubic-bezier(0.23, 1, 0.32, 1),
    border-color 0.3s;
}
.p-card:hover {
  transform: translateY(-6px);
  border-color: rgba(13, 147, 115, 0.28);
}
.pn {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
  color: rgba(13, 147, 115, 0.1);
  line-height: 1;
  margin-bottom: 6px;
}
.pi {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 10px;
}
.pt {
  font-size: clamp(0.88rem, 1.5vw, 1rem);
  font-weight: 700;
  color: var(--c1);
  margin-bottom: 7px;
}
.pd {
  font-size: clamp(0.76rem, 1.2vw, 0.84rem);
  color: var(--c2);
  line-height: 1.65;
}
.pline {
  position: absolute;
  top: 50%;
  right: -9px;
  width: 18px;
  height: 2px;
  background: linear-gradient(90deg, rgba(13, 147, 115, 0.45), transparent);
  z-index: 2;
}
@media (max-width: 900px) {
  .pline {
    display: none;
  }
}

/* PRICING */
.pricing {
  position: relative;
  z-index: 1;
  padding: clamp(56px, 8vw, 96px) 0;
}
.pr-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(14px, 2vw, 22px);
  align-items: start;
}
@media (max-width: 900px) {
  .pr-grid {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 560px) and (max-width: 900px) {
  .pr-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.pr-card {
  padding: clamp(22px, 3vw, 34px) clamp(18px, 2.5vw, 28px);
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1.5vw, 14px);
}
.pf {
  background: rgba(13, 147, 115, 0.09);
  border-color: rgba(13, 147, 115, 0.36);
  transform: scale(1.028);
  box-shadow: 0 0 80px rgba(13, 147, 115, 0.1);
}
.pf:hover {
  transform: scale(1.028) translateY(-6px);
}
.pop-tag {
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, var(--t), var(--cy));
  color: white;
  font-size: 0.67rem;
  font-weight: 900;
  letter-spacing: 0.09em;
  padding: 5px 17px;
  border-radius: 100px;
  white-space: nowrap;
}
.tlabel {
  font-size: clamp(0.6rem, 1vw, 0.68rem);
  letter-spacing: 0.13em;
  font-weight: 700;
  color: var(--c3);
}
.tamt {
  display: flex;
  align-items: baseline;
  gap: 5px;
}
.tprice {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--c1);
  line-height: 1;
}
.tper {
  font-size: clamp(0.76rem, 1.2vw, 0.86rem);
  color: var(--c3);
}
.tdesc {
  font-size: clamp(0.78rem, 1.3vw, 0.88rem);
  color: var(--c2);
  line-height: 1.65;
}
.tfeats {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1;
}
.tfeats li {
  display: flex;
  gap: 9px;
  align-items: center;
  font-size: clamp(0.78rem, 1.2vw, 0.86rem);
  color: rgba(220, 252, 240, 0.82);
}
.tck {
  width: 19px;
  height: 19px;
  background: rgba(13, 147, 115, 0.17);
  border: 1px solid rgba(13, 147, 115, 0.33);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: var(--t);
  flex-shrink: 0;
}
.urg {
  font-size: clamp(0.7rem, 1.1vw, 0.76rem);
  color: #f59e0b;
  font-weight: 700;
}
.tbtn {
  padding: clamp(11px, 1.5vw, 14px) 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  border-radius: 12px;
  color: var(--c2);
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  font-weight: 700;
  cursor: pointer;
  font-family: var(--ff);
  transition: all 0.25s ease;
  margin-top: 4px;
}
.tbtn:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.22);
  color: var(--c1);
}
.tbtnf {
  background: linear-gradient(135deg, var(--t), var(--cy));
  border-color: transparent;
  color: white;
  box-shadow: 0 5px 22px rgba(13, 147, 115, 0.28);
}
.tbtnf:hover {
  filter: brightness(1.1);
  background: linear-gradient(135deg, var(--t), var(--cy));
}

/* TESTIMONIALS */
.testi {
  position: relative;
  z-index: 1;
  padding: clamp(56px, 8vw, 96px) 0;
}
.te-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(12px, 2vw, 18px);
}
@media (max-width: 900px) {
  .te-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 520px) {
  .te-grid {
    grid-template-columns: 1fr;
  }
}
.te-card {
  padding: clamp(18px, 3vw, 26px);
  display: flex;
  flex-direction: column;
  gap: clamp(9px, 1.4vw, 13px);
}
.tres {
  display: inline-flex;
  align-self: flex-start;
  background: linear-gradient(
    135deg,
    rgba(13, 147, 115, 0.18),
    rgba(6, 182, 212, 0.13)
  );
  border: 1px solid rgba(13, 147, 115, 0.28);
  border-radius: 8px;
  padding: 4px 11px;
  font-size: 0.75rem;
  font-weight: 900;
  color: var(--tl);
  letter-spacing: 0.05em;
}
.stars {
  color: #f59e0b;
  font-size: 0.86rem;
  letter-spacing: 2px;
}
.tt {
  font-size: clamp(0.78rem, 1.2vw, 0.86rem);
  line-height: 1.72;
  color: var(--c2);
  font-style: italic;
  flex: 1;
}
.tf {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
}
.tname {
  font-weight: 700;
  font-size: clamp(0.78rem, 1.2vw, 0.86rem);
  color: var(--c1);
}
.ttag {
  font-size: 0.66rem;
  font-weight: 700;
  background: rgba(13, 147, 115, 0.11);
  color: var(--t);
  border: 1px solid rgba(13, 147, 115, 0.24);
  padding: 3px 10px;
  border-radius: 100px;
}

/* CTA */
.cta-s {
  position: relative;
  z-index: 1;
  padding: 0 0 clamp(70px, 10vw, 110px);
}
.cta-card {
  padding: clamp(32px, 5vw, 60px) clamp(24px, 5vw, 60px);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(28px, 5vw, 60px);
  align-items: center;
  background: rgba(13, 147, 115, 0.06);
  border-color: rgba(13, 147, 115, 0.2);
}
@media (max-width: 768px) {
  .cta-card {
    grid-template-columns: 1fr;
  }
  .cta-vis {
    display: none;
  }
}
.cta-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 25% 50%,
    rgba(13, 147, 115, 0.07),
    transparent 60%
  );
  pointer-events: none;
  border-radius: inherit;
}
.cta-body {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 2vw, 18px);
}
.cta-h {
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 900;
  color: var(--c1);
  line-height: 1.2;
}
.cta-d {
  font-size: clamp(0.88rem, 1.4vw, 0.98rem);
  color: var(--c2);
  line-height: 1.72;
  max-width: 460px;
}
.cta-btns {
  display: flex;
  gap: 11px;
  flex-wrap: wrap;
  margin-top: 4px;
}
.bp {
  position: relative;
  overflow: hidden;
  padding: clamp(12px, 1.8vw, 15px) clamp(20px, 3vw, 30px);
  background: linear-gradient(135deg, var(--t), var(--cy));
  border: none;
  border-radius: 12px;
  color: white;
  font-size: clamp(0.86rem, 1.4vw, 0.94rem);
  font-weight: 800;
  cursor: pointer;
  font-family: var(--ff);
  letter-spacing: 0.02em;
  transition:
    transform 0.2s,
    filter 0.2s,
    box-shadow 0.3s;
  box-shadow: 0 5px 26px rgba(13, 147, 115, 0.32);
}
.bp span:first-child {
  position: relative;
  z-index: 1;
}
.bp:hover {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.08);
  box-shadow: 0 13px 42px rgba(13, 147, 115, 0.42);
}
.shim {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.26),
    transparent
  );
  animation: sh 2.5s ease-in-out infinite;
}
@keyframes sh {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}
.bs {
  padding: clamp(12px, 1.8vw, 15px) clamp(18px, 2.5vw, 26px);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 12px;
  color: var(--c2);
  font-size: clamp(0.86rem, 1.4vw, 0.94rem);
  font-weight: 600;
  cursor: pointer;
  font-family: var(--ff);
  transition: all 0.25s ease;
}
.bs:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.22);
  color: var(--c1);
}
.cta-vis {
  position: relative;
  width: 200px;
  height: 180px;
  flex-shrink: 0;
}
.cta-orb {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 147, 115, 0.2), transparent 70%);
  animation: ss 12s linear infinite;
}
.cta-chip {
  position: absolute;
}
.cc1 {
  top: 14px;
  right: 0;
  animation: f1 4s ease-in-out infinite;
}
.cc2 {
  bottom: 38px;
  left: 0;
  animation: f2 5s ease-in-out infinite 0.5s;
}
.cc3 {
  bottom: 6px;
  right: 8px;
  animation: f3 4.5s ease-in-out infinite 1s;
}
</style>
