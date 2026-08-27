<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import BlogCard from "../components/cards/BlogCard.vue";
import CtaBanner from "../components/ui/CtaBanner.vue";
import EmptyState from "../components/ui/EmptyState.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import UiButton from "../components/ui/UiButton.vue";
import { blogPosts } from "../data/content";
import { readingTime } from "../data/readingTime";
import { removeJsonLd, upsertJsonLd, useSeo } from "../composables/useSeo";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPersonSchema,
  nutritionistName,
} from "../data/seo";
import { pageSeo } from "../data/pageSeo";

const route = useRoute();

const article = computed(() => {
  const slug = String(route.params.slug || "");
  return blogPosts.find((post) => post.slug === slug) || null;
});

// Curated links win, then same-category posts, then anything else, so every
// article always ships three onward paths instead of one.
const RELATED_COUNT = 3;

const fallbackRelatedPosts = computed(() => {
  const current = article.value;
  if (!current) {
    return [];
  }

  const bySlug = new Map(blogPosts.map((post) => [post.slug, post]));
  const picked: typeof blogPosts = [];

  const add = (post?: (typeof blogPosts)[number]) => {
    if (!post) return;
    if (post.slug === current.slug) return;
    if (picked.some((existing) => existing.slug === post.slug)) return;
    if (picked.length >= RELATED_COUNT) return;
    picked.push(post);
  };

  (current.relatedSlugs ?? []).forEach((slug) => add(bySlug.get(slug)));
  blogPosts
    .filter((post) => post.category === current.category)
    .forEach(add);
  blogPosts.forEach(add);

  return picked;
});

const articleStats = computed(() => {
  if (!article.value) {
    return [];
  }

  return [
    { label: "Reading time", value: readingTime(article.value) },
    { label: "Frameworks", value: `${article.value.sections.length}` },
    { label: "Category", value: article.value.category },
  ];
});

const keyTakeaways = computed(() => {
  if (!article.value) {
    return [];
  }

  return (
    article.value.keyTakeaways ??
    article.value.sections.map((section) => section.heading)
  );
});

const publishedLabel = computed(() =>
  article.value
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${article.value.publishedAt}T00:00:00Z`))
    : "",
);

const updatedLabel = computed(() =>
  article.value?.updatedAt
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${article.value.updatedAt}T00:00:00Z`))
    : "",
);

const articleFaqs = computed(() => {
  if (!article.value) {
    return [];
  }

  const authored = article.value.faqs;
  if (authored?.length) {
    return authored.map((faq, index) => ({
      id: `${article.value?.slug}-faq-${index + 1}`,
      question: faq.question,
      answer: faq.answer,
    }));
  }

  return [
    {
      id: `${article.value.slug}-faq-1`,
      question: "Should I use this article as my full diet plan?",
      answer:
        "Use this article as education and a starting framework. A full diet plan should consider your medical history, routine, preferences, labs, appetite, and progress signals.",
    },
    {
      id: `${article.value.slug}-faq-2`,
      question: "When should I book an online nutrition consultation?",
      answer:
        "Book a consultation when you need a personalized plan, have PCOS, diabetes, thyroid or gut concerns, feel stuck with weight loss, or want accountability.",
    },
    {
      id: `${article.value.slug}-faq-3`,
      question: "Can Dietrix Fit support clients outside Pakistan?",
      answer:
        "Yes. Dietrix Fit is remote-first and supports international clients through online consultations, digital plans, and progress reviews.",
    },
  ];
});

function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

watchEffect(() => {
  if (!article.value) {
    useSeo(pageSeo.notFound);
    removeJsonLd("dietrix-article-schema");
    removeJsonLd("dietrix-article-faq-schema");
    removeJsonLd("dietrix-article-breadcrumb-schema");
    removeJsonLd("dietrix-article-author-schema");
    return;
  }

  useSeo({
    title: article.value.seoTitle,
    description: article.value.seoDescription,
    path: `/blog/${article.value.slug}`,
    type: "article",
    image: article.value.heroImage,
    keywords: [article.value.category, article.value.title],
  });

  upsertJsonLd("dietrix-article-schema", buildArticleSchema(article.value));
  upsertJsonLd("dietrix-article-author-schema", buildPersonSchema());
  upsertJsonLd("dietrix-article-faq-schema", buildFaqSchema(articleFaqs.value));
  upsertJsonLd(
    "dietrix-article-breadcrumb-schema",
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Nutrition Blog", path: "/blog" },
      { name: article.value.title, path: `/blog/${article.value.slug}` },
    ]),
  );
});
</script>

<template>
  <main class="article-page" v-if="article">
    <article class="container article-shell">
      <header class="article-hero reveal">
        <div class="hero-copy">
          <p class="meta">
            By {{ nutritionistName }} · {{ article.category }} ·
            <time :datetime="article.publishedAt">{{ publishedLabel }}</time>
            · {{ readingTime(article) }}
          </p>
          <p v-if="updatedLabel" class="meta meta-updated">
            Last updated
            <time :datetime="article.updatedAt">{{ updatedLabel }}</time>
          </p>
          <h1>{{ article.title }}</h1>
          <p class="excerpt">{{ article.excerpt }}</p>
          <div class="hero-actions">
            <UiButton to="/booking" size="lg">Get Personal Guidance</UiButton>
            <UiButton to="/blog" variant="outline" size="lg">
              Back to Blog
            </UiButton>
          </div>
        </div>

        <div class="hero-media glass-card">
          <img
            :src="article.heroImage"
            :alt="article.heroImageAlt || article.title"
            loading="lazy"
          />
          <div class="media-overlay" aria-hidden="true"></div>
          <div class="media-card">
            <span>Clinical Reading Mode</span>
            <strong>{{ article.sections.length }} nutrition frameworks</strong>
          </div>
        </div>
      </header>

      <section class="article-intel reveal">
        <div
          v-for="stat in articleStats"
          :key="stat.label"
          class="intel-card"
        >
          <span>{{ stat.label }}</span>
          <strong>{{ stat.value }}</strong>
        </div>
      </section>

      <section class="article-layout">
        <aside class="article-sidebar reveal">
          <div class="toc-card glass-card">
            <p class="toc-label">Article Map</p>
            <a
              v-for="section in article.sections"
              :key="section.heading"
              :href="`#${sectionId(section.heading)}`"
            >
              {{ section.heading }}
            </a>
          </div>

          <div class="takeaway-card glass-card">
            <p class="toc-label">Key Takeaways</p>
            <ul>
              <li v-for="item in keyTakeaways" :key="item">{{ item }}</li>
            </ul>
          </div>
        </aside>

        <div class="article-content">
          <section
            v-for="(section, index) in article.sections"
            :id="sectionId(section.heading)"
            :key="section.heading"
            class="content-section reveal"
          >
            <span class="section-number">{{ String(index + 1).padStart(2, "0") }}</span>
            <h2>{{ section.heading }}</h2>
            <h3 v-if="section.subheading">{{ section.subheading }}</h3>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>

            <ul v-if="section.bullets?.length" class="section-list">
              <li v-for="bullet in section.bullets" :key="bullet">
                {{ bullet }}
              </li>
            </ul>

            <ol v-if="section.steps?.length" class="section-steps">
              <li v-for="step in section.steps" :key="step">{{ step }}</li>
            </ol>

            <figure v-if="section.table" class="section-table">
              <figcaption v-if="section.table.caption">
                {{ section.table.caption }}
              </figcaption>
              <div class="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th
                        v-for="column in section.table.columns"
                        :key="column"
                        scope="col"
                      >
                        {{ column }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, rowIndex) in section.table.rows"
                      :key="rowIndex"
                    >
                      <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                        {{ cell }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-if="section.table.footnote" class="table-footnote">
                {{ section.table.footnote }}
              </p>
            </figure>

            <p v-if="section.callout" class="section-callout">
              {{ section.callout }}
            </p>

            <p
              v-for="link in section.links || []"
              :key="link.to"
              class="section-link"
            >
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
            </p>
          </section>

          <section class="resource-panel reveal">
            <div>
              <p class="meta">Related Resources</p>
              <h2>Turn the article into your next step</h2>
            </div>
            <ul>
              <li v-for="item in article.internalLinks" :key="item.to">
                <RouterLink :to="item.to">{{ item.label }}</RouterLink>
              </li>
            </ul>
          </section>

          <section
            v-if="article.sources?.length"
            class="article-sources reveal"
          >
            <p class="meta">Sources</p>
            <ul>
              <li v-for="source in article.sources" :key="source.label">
                <strong>{{ source.label }}</strong>
                <span v-if="source.detail"> — {{ source.detail }}</span>
              </li>
            </ul>
          </section>

          <section class="article-author reveal">
            <p class="meta">About the author</p>
            <h2>Written by {{ nutritionistName }}</h2>
            <p>
              Certified Clinical Nutritionist (M.Sc. Clinical Nutrition) and
              founder of Dietrix Fit. I build online nutrition plans around
              Pakistani and South Asian food for clients in 14+ countries,
              because a plan that removes roti is a plan nobody keeps.
            </p>
            <div class="author-links">
              <RouterLink to="/about">More about Rimsha</RouterLink>
              <RouterLink to="/services">See nutrition programs</RouterLink>
              <RouterLink to="/booking">Book a consultation</RouterLink>
            </div>
          </section>

          <section class="article-faq reveal">
            <div>
              <p class="meta">Nutrition FAQ</p>
              <h2>Quick answers before you choose your next step</h2>
            </div>
            <article v-for="faq in articleFaqs" :key="faq.id">
              <h3>{{ faq.question }}</h3>
              <p>{{ faq.answer }}</p>
            </article>
          </section>
        </div>
      </section>
    </article>

    <section v-if="fallbackRelatedPosts.length" class="container related-section">
      <SectionTitle
        kicker="Continue Reading"
        title="More Nutrition Guides for the Same Journey"
        description="Three more guides that pick up where this one stops."
      />
      <div class="related-grid reveal-group">
        <BlogCard
          v-for="post in fallbackRelatedPosts"
          :key="post.slug"
          :post="post"
        />
      </div>
    </section>

    <section class="container">
      <CtaBanner
        title="Need Personalized Guidance Beyond This Article?"
        description="Move from information to implementation with a customized online nutrition consultation."
        primary-text="Book Consultation"
        primary-to="/booking"
        secondary-text="Back to Blog"
        secondary-to="/blog"
      />
    </section>
  </main>

  <main class="article-page" v-else>
    <section class="container not-found">
      <h1>Article Not Found</h1>
      <EmptyState
        title="We could not find this article"
        description="No data available to show"
      />
      <RouterLink to="/blog" class="back-link">Return to Blog</RouterLink>
    </section>
  </main>
</template>

<style>
.meta-updated {
  opacity: 0.7;
}

.section-list,
.section-steps {
  display: grid;
  gap: 10px;
  margin: 18px 0;
  padding-left: 20px;
}

.section-list li,
.section-steps li {
  line-height: 1.7;
}

.section-list {
  list-style: disc;
}

.section-steps {
  list-style: decimal;
}

.section-table {
  margin: 24px 0;
}

.section-table figcaption {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 10px;
}

/* Wide tables scroll inside their own container so the page body never does. */
.table-scroll {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.section-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 460px;
}

.section-table th,
.section-table td {
  padding: 11px 14px;
  text-align: left;
  font-size: 0.94rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.section-table th {
  font-weight: 600;
  letter-spacing: 0.02em;
  background: rgba(255, 255, 255, 0.05);
}

.section-table tbody tr:last-child td {
  border-bottom: none;
}

.table-footnote {
  margin-top: 10px;
  font-size: 0.86rem;
  opacity: 0.75;
  line-height: 1.6;
}

.section-callout {
  margin: 20px 0;
  padding: 14px 18px;
  border-left: 3px solid currentColor;
  border-radius: 0 12px 12px 0;
  background: rgba(255, 255, 255, 0.05);
  line-height: 1.7;
}

.section-link {
  margin: 14px 0 0;
  font-size: 0.95rem;
}

.section-link a {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-sources ul {
  display: grid;
  gap: 12px;
  margin-top: 14px;
  padding-left: 20px;
  list-style: disc;
}

.article-sources li {
  font-size: 0.92rem;
  line-height: 1.65;
}

.article-author {
  margin-top: 34px;
  padding: 22px 24px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}

.article-author h2 {
  margin: 6px 0 10px;
}

.article-author p {
  line-height: 1.7;
}

.author-links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 14px;
  font-size: 0.94rem;
}

.author-links a {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-page {
  display: grid;
  gap: clamp(62px, 7vw, 96px);
}

.article-shell {
  max-width: 1180px;
}

.article-hero {
  display: grid;
  gap: clamp(28px, 5vw, 54px);
  align-items: center;
}

.hero-copy {
  display: grid;
  gap: 16px;
}

.meta {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.76rem;
  color: var(--teal-700);
  font-weight: 900;
}

.article-page h1 {
  margin: 0;
  color: var(--ink-900);
  font-size: 3rem;
  line-height: 1.08;
  letter-spacing: 0;
}

.article-page .excerpt {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.75;
  font-size: 1.08rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-media {
  position: relative;
  overflow: hidden;
  min-height: 520px;
  isolation: isolate;
}

.hero-media::after {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 2;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    112deg,
    transparent 0%,
    rgba(255, 255, 255, 0.46) 42%,
    transparent 62%
  );
  transform: translateX(-78%);
  animation: article-sheen 7s ease-in-out infinite;
}

.hero-media img {
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
  display: block;
  transition:
    transform 760ms cubic-bezier(0.25, 0.8, 0.25, 1),
    filter 760ms cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hero-media:hover img {
  transform: scale(1.05);
  filter: saturate(1.08) contrast(1.03);
}

.media-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(to top, rgba(6, 78, 59, 0.58), transparent 58%),
    linear-gradient(135deg, rgba(16, 185, 129, 0.18), transparent 48%);
}

.media-card {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 22px;
  z-index: 3;
  display: grid;
  gap: 5px;
  padding: 18px;
  border-radius: 22px;
  color: white;
  background: rgba(6, 78, 59, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.media-card span {
  color: var(--emerald-200);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.media-card strong {
  font-size: 1.16rem;
}

.article-intel {
  display: grid;
  gap: 12px;
  margin-top: 28px;
}

.intel-card {
  display: grid;
  gap: 4px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: 0 14px 38px rgba(6, 78, 59, 0.08);
}

.intel-card span {
  color: var(--ink-400);
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.intel-card strong {
  color: var(--emerald-700);
  font-family: var(--font-heading);
  font-size: 1.35rem;
}

.article-layout {
  display: grid;
  gap: clamp(26px, 5vw, 52px);
  margin-top: clamp(34px, 6vw, 64px);
  align-items: start;
}

.article-sidebar {
  display: grid;
  gap: 14px;
}

.toc-card,
.takeaway-card {
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.toc-label {
  margin: 0 0 12px;
  color: var(--emerald-700);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.toc-card a {
  display: block;
  padding: 10px 0;
  color: var(--ink-700);
  border-top: 1px solid rgba(16, 185, 129, 0.12);
  font-weight: 800;
  text-decoration: none;
}

.toc-card a:hover {
  color: var(--emerald-700);
}

.takeaway-card ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.takeaway-card li {
  position: relative;
  padding-left: 22px;
  color: var(--ink-600);
  line-height: 1.55;
  font-weight: 700;
}

.takeaway-card li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--emerald-500);
  box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.1);
}

.article-content {
  display: grid;
  gap: 20px;
}

.content-section {
  position: relative;
  display: grid;
  gap: 14px;
  padding: clamp(22px, 4vw, 34px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.82), rgba(236, 253, 245, 0.36)),
    rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: 0 18px 52px rgba(6, 78, 59, 0.08);
  scroll-margin-top: 110px;
  overflow: hidden;
}

.content-section::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.64), transparent 36%);
}

.content-section > * {
  position: relative;
  z-index: 1;
}

.section-number {
  width: 48px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  box-shadow: 0 12px 24px rgba(5, 150, 105, 0.22);
  font-family: var(--font-heading);
  font-weight: 900;
}

.article-page h2,
.article-page h3 {
  margin: 0;
  color: var(--ink-900);
  letter-spacing: 0;
}

.article-page h2 {
  font-size: 1.9rem;
}

.article-page h3 {
  font-size: 1.08rem;
  color: var(--teal-700);
}

.article-page .content-section p {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.82;
}

.resource-panel {
  display: grid;
  gap: 16px;
  padding: clamp(22px, 4vw, 34px);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--emerald-900), var(--emerald-700));
  box-shadow: 0 24px 70px rgba(6, 78, 59, 0.22);
}

.resource-panel h2,
.resource-panel .meta {
  color: white;
}

.resource-panel .meta {
  color: var(--emerald-200);
}

.resource-panel ul {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.resource-panel a {
  display: block;
  padding: 13px 14px;
  border-radius: 16px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
  text-decoration: none;
  font-weight: 800;
}

.article-faq {
  display: grid;
  gap: 14px;
  padding: clamp(22px, 4vw, 34px);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.82), rgba(236, 253, 245, 0.36)),
    rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(16, 185, 129, 0.14);
  box-shadow: 0 18px 52px rgba(6, 78, 59, 0.08);
}

.article-faq article {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.14);
}

.article-faq p {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.7;
}

.related-grid {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}

.not-found {
  display: grid;
  gap: 16px;
}

.back-link {
  display: inline-block;
  color: var(--teal-700);
  font-weight: 800;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

@keyframes article-sheen {
  0%,
  38% {
    transform: translateX(-78%);
  }
  68%,
  100% {
    transform: translateX(78%);
  }
}

@media (min-width: 960px) {
  .article-hero {
    grid-template-columns: minmax(0, 0.82fr) minmax(420px, 1fr);
  }

  .article-page h1 {
    font-size: 4rem;
  }

  .article-intel {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .article-layout {
    grid-template-columns: 300px minmax(0, 1fr);
  }

  .article-sidebar {
    position: sticky;
    top: 104px;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .article-page h1 {
    font-size: 2.35rem;
  }

  .article-page .excerpt {
    font-size: 1rem;
  }

  .article-page .hero-actions .ui-button {
    width: 100%;
  }

  .hero-media,
  .hero-media img {
    min-height: 330px;
  }

  .article-page h2 {
    font-size: 1.55rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-media::after,
  .hero-media img {
    animation: none;
    transition: none;
  }

  .hero-media:hover img {
    transform: none;
  }
}
</style>
