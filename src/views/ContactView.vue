<script setup lang="ts">
import LeadCaptureForm from "../components/forms/LeadCaptureForm.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import { useSeo } from "../composables/useSeo";

useSeo({
  title: "Contact Online Nutritionist | Dietrix Nutrition",
  description:
    "Contact Dietrix Nutrition for online consultations, WhatsApp support, and personalized coaching inquiries.",
});
</script>

<template>
  <main class="page">
    <section class="container reveal">
      <p class="eyebrow">Contact</p>
      <h1>Let’s Build Your Nutrition Strategy</h1>
      <p class="intro">
        Reach out for consultations, service questions, or collaboration
        requests. We respond within one business day.
      </p>
    </section>

    <section class="container contact-grid">
      <article class="contact-card reveal">
        <SectionTitle
          kicker="Get in Touch"
          title="Send Your Details"
          description="Tell us your goal and we will recommend your best-fit plan."
        />
        <LeadCaptureForm source="contact" />
      </article>

      <article class="contact-card reveal">
        <SectionTitle
          kicker="Direct Channels"
          title="Talk to Us Faster"
          description="Prefer direct communication? Use WhatsApp or email below."
        />
        <div class="contact-lines">
          <p><strong>Email:</strong> hello@dietrixnutrition.com</p>
          <p><strong>WhatsApp:</strong> +1 555-210-8102</p>
          <p><strong>Instagram:</strong> @dietrixnutrition</p>
          <p><strong>LinkedIn:</strong> Dietrix Nutrition</p>
        </div>
        <a
          class="whatsapp"
          href="https://wa.me/15552108102"
          target="_blank"
          rel="noreferrer"
        >
          Chat on WhatsApp
        </a>
        <div class="stacked-buttons">
          <UiButton to="/booking" :full-width="true"
            >Book Consultation</UiButton
          >
          <UiButton to="/services" variant="outline" :full-width="true"
            >View Services</UiButton
          >
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: 56px;
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
  color: var(--ink-900);
  font-size: clamp(2rem, 1.5rem + 2.4vw, 3rem);
}

.intro {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.7;
  max-width: 760px;
}

.contact-grid {
  display: grid;
  gap: 14px;
}

.contact-card {
  border-radius: 18px;
  border: 1px solid rgba(102, 168, 161, 0.3);
  background: rgba(255, 255, 255, 0.82);
  padding: 16px;
}

.contact-lines {
  display: grid;
  gap: 8px;
  margin: 14px 0;
}

.contact-lines p {
  margin: 0;
  color: var(--ink-600);
}

.whatsapp {
  display: inline-flex;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  background: #1ca884;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 12px;
}

.stacked-buttons {
  display: grid;
  gap: 10px;
}

@media (min-width: 980px) {
  .contact-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
