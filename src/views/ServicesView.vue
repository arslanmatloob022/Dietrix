<script setup lang="ts">
import PricingCard from "../components/cards/PricingCard.vue";
import ServiceCard from "../components/cards/ServiceCard.vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import { pricingTiers, services } from "../data/content";
import { useSeo } from "../composables/useSeo";

useSeo({
  title: "Nutrition Services and Pricing | Weight Loss, PCOS, Diabetes",
  description:
    "Compare online nutrition services, coaching tiers, and pricing plans for personalized health outcomes.",
});
</script>

<template>
  <main class="page">
    <section class="container reveal">
      <p class="eyebrow">Services</p>
      <h1>Choose the Right Nutrition Program for Your Goal</h1>
      <p class="intro">
        From weight loss acceleration to condition-specific nutrition therapy,
        every program is personalized, trackable, and remotely delivered.
      </p>
    </section>

    <section class="container">
      <SectionTitle
        kicker="What You Get"
        title="Detailed Service Breakdown"
        description="Program structure, inclusions, and outcomes mapped to your lifestyle and medical needs."
      />
      <div class="three-col">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :item="service"
        />
      </div>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Pricing"
        title="Transparent Plans for Every Stage"
        description="Start simple or choose high-touch coaching based on your support requirements."
      />
      <div class="three-col">
        <PricingCard v-for="tier in pricingTiers" :key="tier.id" :tier="tier" />
      </div>
    </section>

    <section class="container">
      <CtaBanner
        title="Unsure Which Plan Fits You Best?"
        description="Book a discovery consultation and get matched with the ideal program in under 15 minutes."
        primary-text="Book Consultation"
        primary-to="/booking"
        secondary-text="Ask in Chatbot"
        secondary-to="/contact"
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
  max-width: 800px;
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
