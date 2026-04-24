<script setup lang="ts">
import TestimonialCard from "../components/cards/TestimonialCard.vue";
import TransformationCard from "../components/cards/TransformationCard.vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import { testimonials, transformations } from "../data/content";
import { useSeo } from "../composables/useSeo";

useSeo({
  title: "Client Success Stories and Reviews | Dietrix Nutrition",
  description:
    "Read real success stories, before and after outcomes, and global client reviews from online nutrition coaching.",
});
</script>

<template>
  <main class="page">
    <section class="container reveal">
      <p class="eyebrow">Social Proof</p>
      <h1>Real Success Stories from Real Clients</h1>
      <p class="intro">
        Verified feedback from clients who transformed health markers, body
        composition, and confidence through personalized online nutrition
        support.
      </p>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Results"
        title="Before and After Highlights"
        description="Progress snapshots from lifestyle and medical nutrition programs."
      />
      <div class="three-col">
        <TransformationCard
          v-for="item in transformations"
          :key="item.id"
          :item="item"
        />
      </div>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Reviews"
        title="Client Reviews"
        description="High-trust testimonials from remote consultations delivered worldwide."
      />
      <div class="three-col">
        <TestimonialCard
          v-for="item in testimonials"
          :key="item.id"
          :testimonial="item"
        />
      </div>
    </section>

    <section class="container">
      <CtaBanner
        title="Want Results Like These?"
        description="Book your consultation and get a strategy designed for your body, schedule, and condition."
        primary-text="Book Consultation"
        primary-to="/booking"
        secondary-text="Explore Services"
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
  font-size: clamp(2rem, 1.5rem + 2.4vw, 3rem);
  color: var(--ink-900);
}

.intro {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.7;
  max-width: 840px;
}

.three-col {
  margin-top: 16px;
  display: grid;
  gap: 14px;
}

@media (min-width: 900px) {
  .three-col {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
