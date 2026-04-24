<script setup lang="ts">
import CtaBanner from "../components/ui/CtaBanner.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import { certifications, nutritionistProfile } from "../data/content";
import { useSeo } from "../composables/useSeo";

useSeo({
  title: "About Dn. Rimsha Naseer | Certified Online Nutritionist",
  description:
    "Discover the mission, certifications, and personalized nutrition philosophy behind Dietrix Nutrition.",
});
</script>

<template>
  <main class="page">
    <section class="container intro reveal">
      <div>
        <p class="eyebrow">Meet Your Nutritionist</p>
        <h1>{{ nutritionistProfile.name }}</h1>
        <p class="role">
          {{ nutritionistProfile.role }} ·
          {{ nutritionistProfile.experience }} Experience
        </p>
        <p>{{ nutritionistProfile.story }}</p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
        alt="Professional nutritionist smiling in clinic"
      />
    </section>

    <section class="container">
      <SectionTitle
        kicker="Mission"
        title="Nutrition That Fits Real Life"
        description="A practical, compassionate framework designed for long-term health outcomes."
      />
      <div class="about-grid">
        <article class="card reveal">
          <h2>Mission</h2>
          <p>{{ nutritionistProfile.mission }}</p>
        </article>
        <article class="card reveal">
          <h2>Philosophy</h2>
          <p>{{ nutritionistProfile.philosophy }}</p>
        </article>
      </div>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Credentials"
        title="Certifications and Qualifications"
        description="Professional qualifications that build trust in evidence-based care."
      />
      <ul class="cert-list">
        <li v-for="item in certifications" :key="item" class="reveal">
          {{ item }}
        </li>
      </ul>
    </section>

    <section class="container">
      <CtaBanner
        title="Ready to Work Together on Your Nutrition Goals?"
        description="Start with a personalized consultation and get a plan aligned to your medical and lifestyle context."
        primary-text="Book Consultation"
        primary-to="/booking"
        secondary-text="View Services"
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

.intro {
  display: grid;
  gap: 18px;
  align-items: center;
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
  font-size: clamp(2rem, 1.55rem + 2.2vw, 3rem);
  color: var(--ink-900);
}

.role {
  margin: 0;
  color: var(--teal-700);
  font-weight: 700;
}

.intro p {
  color: var(--ink-600);
  line-height: 1.7;
}

img {
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(98, 162, 155, 0.32);
  box-shadow: 0 24px 56px rgba(13, 65, 61, 0.12);
}

.about-grid {
  margin-top: 16px;
  display: grid;
  gap: 14px;
}

.card {
  border-radius: 16px;
  border: 1px solid rgba(100, 167, 160, 0.3);
  background: rgba(255, 255, 255, 0.82);
  padding: 18px;
}

.card h2 {
  margin: 0;
  color: var(--ink-900);
  font-size: 1.2rem;
}

.card p {
  margin: 10px 0 0;
  color: var(--ink-600);
}

.cert-list {
  margin: 16px 0 0;
  padding-left: 20px;
  display: grid;
  gap: 12px;
}

.cert-list li {
  color: var(--ink-700);
  line-height: 1.6;
}

@media (min-width: 980px) {
  .intro {
    grid-template-columns: 1fr 0.9fr;
  }

  .about-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
