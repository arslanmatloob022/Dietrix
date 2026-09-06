<script setup lang="ts">
import { computed, ref } from "vue";
import BlogCard from "../components/cards/BlogCard.vue";
import EmptyState from "../components/ui/EmptyState.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import { blogPosts } from "../data/content";
import { upsertJsonLd, useSeo } from "../composables/useSeo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  contentClusters,
  globalSeoFaqs,
} from "../data/seo";
import { pageSeo } from "../data/pageSeo";
import type { BlogCategory } from "../types/models";

useSeo(pageSeo.blog);
upsertJsonLd("dietrix-organization-schema", buildOrganizationSchema());
upsertJsonLd("dietrix-blog-faq-schema", buildFaqSchema(globalSeoFaqs));
upsertJsonLd(
  "dietrix-blog-breadcrumb-schema",
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Nutrition Blog", path: "/blog/" },
  ]),
);

const categories: Array<"All" | BlogCategory> = [
  "All",
  "Weight Loss",
  "Diet Plans",
  "Health Conditions",
];
const selectedCategory = ref<"All" | BlogCategory>("All");

const featuredPost = computed(() => blogPosts[0]);

const filteredPosts = computed(() => {
  if (selectedCategory.value === "All") {
    return blogPosts;
  }

  return blogPosts.filter((post) => post.category === selectedCategory.value);
});

const categoryStats = computed(() =>
  categories.map((category) => ({
    label: category,
    count:
      category === "All"
        ? blogPosts.length
        : blogPosts.filter((post) => post.category === category).length,
  })),
);

const editorialPillars = [
  {
    label: "Clinical clarity",
    copy: "Articles translate nutrition science into calm, realistic action steps.",
  },
  {
    label: "Search-ready structure",
    copy: "Every guide uses clear headings, internal links and practical intent matching.",
  },
  {
    label: "Home-first application",
    copy: "Advice is written for real kitchens, family meals, work stress and travel weeks.",
  },
];

const readerPaths = [
  "Lose fat without repeating crash-diet cycles",
  "Plan meals faster when work and family routines are full",
  "Understand PCOS, diabetes, thyroid and gut nutrition basics",
  "Move from reading to a personalized online consultation",
];

</script>

<template>
  <main class="blog-page">
    <section class="container blog-hero reveal">
      <div class="hero-copy">
        <p class="eyebrow">Nutrition Knowledge Hub</p>
        <h1>Nutrition Insights That Drive Better Decisions</h1>
        <p class="intro">
          Evidence-led guides for fat loss, PCOS, diabetes, gut health and
          practical diet planning, written to help readers take action instead
          of collecting more confusion.
        </p>
        <div class="hero-actions">
          <UiButton to="/booking/" size="lg">Ask for a Personal Plan</UiButton>
          <UiButton to="/services/" variant="outline" size="lg">
            Explore Services
          </UiButton>
        </div>
      </div>

      <aside class="blog-console glass-card" aria-label="Blog content overview">
        <span class="console-tag">SEO + Clinical Editorial</span>
        <div class="console-score">
          <strong>{{ blogPosts.length }}</strong>
          <span>deep-dive guides</span>
        </div>
        <div class="console-metrics">
          <div v-for="stat in categoryStats" :key="stat.label">
            <strong>{{ stat.count }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </aside>
    </section>

    <section v-if="featuredPost" class="container featured-section">
      <div class="featured-copy reveal">
        <p class="eyebrow">Featured Framework</p>
        <h2>Start with the article most readers need first</h2>
        <p>
          Begin with a practical nutrition foundation, then explore condition
          support, meal planning systems and evidence-based routines.
        </p>
      </div>
      <BlogCard :post="featuredPost" featured />
    </section>

    <section class="container pillar-grid reveal-group">
      <article
        v-for="pillar in editorialPillars"
        :key="pillar.label"
        class="pillar-card glass-card reveal"
      >
        <span>{{ pillar.label }}</span>
        <p>{{ pillar.copy }}</p>
      </article>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Categories"
        title="Browse by Intent"
        description="Filter by weight loss, diet planning, or condition-specific nutrition guidance."
      />

      <div class="filters" aria-label="Blog category filters">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          <span>{{ category }}</span>
          <small>{{
            categoryStats.find((item) => item.label === category)?.count
          }}</small>
        </button>
      </div>

      <div v-if="filteredPosts.length" class="blog-grid reveal-group">
        <BlogCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
      </div>
      <EmptyState
        v-else
        title="No posts in this category yet"
        description="No data available to show"
      />
    </section>

    <section class="container seo-clusters reveal">
      <div class="cluster-copy">
        <p class="eyebrow">Content Engine</p>
        <h2>SEO clusters designed for search and AI answers</h2>
        <p>
          Dietrix content is organized around high-intent nutrition problems,
          clear internal links and question-led answers that search engines and
          AI assistants can understand.
        </p>
      </div>
      <div class="cluster-grid">
        <article
          v-for="cluster in contentClusters"
          :key="cluster.cluster"
          class="cluster-card glass-card"
        >
          <span>{{ cluster.cluster }}</span>
          <h3>{{ cluster.pillar }}</h3>
          <ul>
            <li
              v-for="topic in cluster.supportingArticles.slice(0, 4)"
              :key="topic"
            >
              {{ topic }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="container ai-faq reveal">
      <div class="faq-copy">
        <p class="eyebrow">AI Answer Targets</p>
        <h2>Clear nutrition FAQs for featured snippets</h2>
        <p>
          Short question-and-answer blocks help readers quickly understand the
          service while giving search systems structured, factual answers.
        </p>
      </div>
      <div class="faq-grid">
        <article v-for="faq in globalSeoFaqs" :key="faq.id">
          <h3>{{ faq.question }}</h3>
          <p>{{ faq.answer }}</p>
        </article>
      </div>
    </section>

    <section class="container reader-paths reveal">
      <div>
        <p class="eyebrow">Reader Paths</p>
        <h2>Use the blog as a roadmap, not a random article shelf</h2>
      </div>
      <ul>
        <li v-for="path in readerPaths" :key="path">{{ path }}</li>
      </ul>
    </section>
  </main>
</template>

<style>
.blog-page {
  display: grid;
  gap: clamp(62px, 7vw, 96px);
}

.blog-hero {
  display: grid;
  gap: clamp(28px, 5vw, 54px);
  align-items: center;
  padding-top: 10px;
}

.hero-copy {
  display: grid;
  gap: 18px;
}

.blog-page .eyebrow {
  margin: 0;
}

.blog-page h1 {
  max-width: 920px;
  margin: 0;
  color: var(--ink-900);
  font-size: 3rem;
  letter-spacing: 0;
}

.blog-page .intro {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.75;
  max-width: 780px;
  font-size: 1.08rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.blog-console {
  position: relative;
  overflow: hidden;
  min-height: 390px;
  padding: 24px;
  display: grid;
  align-content: space-between;
  isolation: isolate;
}

.blog-console::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(
      140deg,
      rgba(255, 255, 255, 0.86),
      rgba(236, 253, 245, 0.38)
    ),
    repeating-linear-gradient(
      90deg,
      rgba(6, 95, 70, 0.06) 0,
      rgba(6, 95, 70, 0.06) 1px,
      transparent 1px,
      transparent 38px
    );
}

.blog-console::after,
.pillar-card::after,
.reader-paths::after {
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
  animation: blog-sheen 7s ease-in-out infinite;
}

.console-tag,
.console-score,
.console-metrics {
  position: relative;
  z-index: 1;
}

.console-tag {
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

.console-score {
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
}

.console-score strong {
  color: var(--ink-900);
  font-family: var(--font-heading);
  font-size: 3.2rem;
  line-height: 1;
}

.console-score span {
  color: var(--ink-500);
  font-size: 0.82rem;
  font-weight: 800;
}

.console-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.console-metrics div {
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

.console-metrics strong {
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 1.5rem;
  line-height: 1;
}

.console-metrics span {
  color: var(--ink-600);
  font-size: 0.76rem;
  font-weight: 800;
  line-height: 1.35;
}

.featured-section {
  display: grid;
  gap: 22px;
  align-items: center;
}

.featured-copy {
  display: grid;
  gap: 12px;
  max-width: 560px;
}

.blog-page .featured-copy h2,
.blog-page .reader-paths h2 {
  font-size: 2.45rem;
  letter-spacing: 0;
}

.blog-page .featured-copy p:not(.eyebrow) {
  color: var(--ink-600);
  line-height: 1.75;
}

.pillar-grid {
  display: grid;
  gap: 14px;
}

.pillar-card {
  position: relative;
  overflow: hidden;
  padding: 22px;
  isolation: isolate;
}

.pillar-card > * {
  position: relative;
  z-index: 1;
}

.pillar-card span {
  color: var(--emerald-700);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.pillar-card p {
  margin-top: 10px;
  color: var(--ink-600);
  line-height: 1.7;
}

.filters {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filters button {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 1px solid rgba(97, 163, 157, 0.34);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--ink-700);
  padding: 9px 12px 9px 15px;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(6, 78, 59, 0.06);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background 220ms ease;
}

.filters button:hover {
  transform: translateY(-2px);
  border-color: rgba(20, 184, 166, 0.62);
}

.filters button.active {
  color: var(--teal-700);
  border-color: var(--teal-500);
  background: rgba(17, 152, 138, 0.12);
}

.filters small {
  min-width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  font-size: 0.72rem;
}

.blog-grid {
  display: grid;
  gap: 16px;
}

.blog-page .seo-clusters,
.blog-page .keyword-map,
.blog-page .ai-faq,
.blog-page .topic-pipeline {
  display: grid;
  gap: 22px;
}

.blog-page .cluster-copy,
.blog-page .faq-copy {
  display: grid;
  gap: 12px;
  max-width: 720px;
}

.blog-page .cluster-copy h2,
.blog-page .keyword-map h2,
.blog-page .ai-faq h2,
.blog-page .topic-pipeline h2 {
  margin: 0;
  color: var(--ink-900);
  font-size: 2.45rem;
  letter-spacing: 0;
  line-height: 1.08;
}

.blog-page .cluster-copy p:not(.eyebrow),
.blog-page .faq-copy p:not(.eyebrow) {
  color: var(--ink-600);
  line-height: 1.75;
}

.blog-page .cluster-grid,
.blog-page .keyword-grid,
.blog-page .faq-grid {
  display: grid;
  gap: 14px;
}

.blog-page .cluster-card {
  padding: 20px;
  display: grid;
  gap: 12px;
}

.blog-page .cluster-card span,
.blog-page .keyword-grid span {
  color: var(--emerald-700);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.blog-page .cluster-card h3 {
  margin: 0;
  color: var(--ink-900);
  font-size: 1rem;
  letter-spacing: 0;
}

.blog-page .cluster-card ul,
.blog-page .topic-pipeline ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-page .cluster-card li,
.blog-page .topic-pipeline li {
  color: var(--ink-600);
  line-height: 1.5;
}

.blog-page .cluster-card li::before,
.blog-page .topic-pipeline li::before {
  content: "";
  width: 7px;
  height: 7px;
  display: inline-block;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--emerald-700);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
}

.blog-page .keyword-grid article,
.blog-page .faq-grid article {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 14px 34px rgba(6, 78, 59, 0.07);
}

.blog-page .keyword-grid strong,
.blog-page .faq-grid h3 {
  margin: 0;
  color: var(--ink-900);
  line-height: 1.25;
  letter-spacing: 0;
}

.blog-page .keyword-grid a {
  color: var(--teal-700);
  font-size: 0.88rem;
  font-weight: 900;
  text-decoration: none;
}

.blog-page .faq-grid p {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.65;
}

.blog-page .topic-pipeline {
  padding: clamp(24px, 4vw, 36px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(
      135deg,
      rgba(236, 253, 245, 0.86),
      rgba(255, 255, 255, 0.64)
    ),
    rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 20px 58px rgba(6, 78, 59, 0.09);
}

.reader-paths {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 20px;
  align-items: center;
  padding: clamp(24px, 4vw, 36px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(
      135deg,
      rgba(236, 253, 245, 0.86),
      rgba(255, 255, 255, 0.64)
    ),
    rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.16);
  box-shadow: 0 20px 58px rgba(6, 78, 59, 0.09);
  isolation: isolate;
  margin-bottom: 22px;
}

.reader-paths > * {
  position: relative;
  z-index: 1;
}

.blog-page .reader-paths ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
}

.blog-page .reader-paths li {
  border-radius: 999px;
  padding: 10px 13px;
  color: var(--emerald-800);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.18);
  font-size: 0.86rem;
  font-weight: 800;
}

@keyframes blog-sheen {
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
  .blog-hero {
    grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.64fr);
  }

  .blog-page h1 {
    font-size: 4.35rem;
  }

  .featured-section {
    grid-template-columns: minmax(0, 0.68fr) minmax(0, 1fr);
  }

  .pillar-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .blog-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .blog-page .cluster-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .blog-page .keyword-grid,
  .blog-page .faq-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .blog-page .topic-pipeline {
    grid-template-columns: minmax(0, 0.55fr) minmax(0, 1fr);
    align-items: start;
  }

  .blog-page .topic-pipeline ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reader-paths {
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
  }
}

@media (max-width: 720px) {
  .blog-page h1 {
    font-size: 2.35rem;
  }

  .blog-page .intro {
    font-size: 1rem;
  }

  .blog-page .hero-actions .ui-button {
    width: 100%;
  }

  .console-metrics {
    grid-template-columns: 1fr;
  }

  .blog-page .featured-copy h2,
  .blog-page .cluster-copy h2,
  .blog-page .keyword-map h2,
  .blog-page .ai-faq h2,
  .blog-page .topic-pipeline h2,
  .blog-page .reader-paths h2 {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-console::after,
  .pillar-card::after,
  .reader-paths::after {
    animation: none;
  }

  .filters button:hover {
    transform: none;
  }
}
</style>
