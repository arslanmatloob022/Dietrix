<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import CtaBanner from "../components/ui/CtaBanner.vue";
import EmptyState from "../components/ui/EmptyState.vue";
import { blogPosts } from "../data/content";
import { upsertJsonLd, useSeo } from "../composables/useSeo";

const route = useRoute();

const article = computed(() => {
  const slug = String(route.params.slug || "");
  return blogPosts.find((post) => post.slug === slug) || null;
});

watchEffect(() => {
  if (!article.value) {
    useSeo({
      title: "Article Not Found | Dietrix Nutrition Blog",
      description:
        "The requested nutrition article does not exist or may have been moved.",
    });
    return;
  }

  useSeo({
    title: article.value.seoTitle,
    description: article.value.seoDescription,
  });

  upsertJsonLd("dietrix-article-schema", {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.value.title,
    datePublished: article.value.publishedAt,
    articleSection: article.value.category,
    author: {
      "@type": "Person",
      name: "Dn. Rimsha Naseer",
    },
  });
});
</script>

<template>
  <main class="page" v-if="article">
    <article class="container article">
      <header class="reveal">
        <p class="meta">{{ article.category }} · {{ article.readTime }}</p>
        <h1>{{ article.title }}</h1>
        <p class="excerpt">{{ article.excerpt }}</p>
        <img :src="article.heroImage" :alt="article.title" loading="lazy" />
      </header>

      <section
        v-for="section in article.sections"
        :key="section.heading"
        class="section reveal"
      >
        <h2>{{ section.heading }}</h2>
        <h3 v-if="section.subheading">{{ section.subheading }}</h3>
        <p v-for="paragraph in section.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </section>

      <section class="section reveal">
        <h2>Related Resources</h2>
        <ul>
          <li v-for="item in article.internalLinks" :key="item.to">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </section>
    </article>

    <section class="container">
      <CtaBanner
        title="Need Personalized Guidance Beyond This Article?"
        description="Move from information to implementation with a customized consultation."
        primary-text="Book Consultation"
        primary-to="/booking"
        secondary-text="Back to Blog"
        secondary-to="/blog"
      />
    </section>
  </main>

  <main class="page" v-else>
    <section class="container">
      <h1>Article Not Found</h1>
      <EmptyState
        title="We could not find this article"
        description="No data available to show"
      />
      <RouterLink to="/blog" class="back-link">Return to Blog</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: 56px;
}

.article {
  max-width: 860px;
}

header {
  display: grid;
  gap: 12px;
}

.meta {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  color: var(--teal-700);
  font-weight: 700;
}

h1 {
  margin: 0;
  color: var(--ink-900);
  font-size: clamp(2rem, 1.5rem + 2.3vw, 3.1rem);
  line-height: 1.08;
}

.excerpt {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.7;
}

img {
  width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(101, 166, 160, 0.3);
}

.section {
  margin-top: 24px;
  display: grid;
  gap: 12px;
}

h2,
h3 {
  margin: 0;
  color: var(--ink-900);
}

h2 {
  font-size: clamp(1.4rem, 1.25rem + 0.75vw, 1.9rem);
}

h3 {
  font-size: 1.08rem;
  color: var(--teal-700);
}

p {
  margin: 0;
  color: var(--ink-600);
  line-height: 1.78;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li + li {
  margin-top: 8px;
}

a {
  color: var(--teal-700);
}

.back-link {
  display: inline-block;
  margin-top: 14px;
  color: var(--teal-700);
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
