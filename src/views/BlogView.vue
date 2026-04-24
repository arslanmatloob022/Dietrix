<script setup lang="ts">
import { computed, ref } from "vue";
import BlogCard from "../components/cards/BlogCard.vue";
import EmptyState from "../components/ui/EmptyState.vue";
import SectionTitle from "../components/ui/SectionTitle.vue";
import { blogPosts } from "../data/content";
import { useSeo } from "../composables/useSeo";
import type { BlogCategory } from "../types/models";

useSeo({
  title: "Nutrition Blog | Weight Loss, Diet Plans, Health Conditions",
  description:
    "Read structured nutrition articles with practical, evidence-based guidance for weight loss and health conditions.",
});

const categories: Array<"All" | BlogCategory> = [
  "All",
  "Weight Loss",
  "Diet Plans",
  "Health Conditions",
];
const selectedCategory = ref<"All" | BlogCategory>("All");

const filteredPosts = computed(() => {
  if (selectedCategory.value === "All") {
    return blogPosts;
  }

  return blogPosts.filter((post) => post.category === selectedCategory.value);
});
</script>

<template>
  <main class="page">
    <section class="container reveal">
      <p class="eyebrow">SEO Blog Engine</p>
      <h1>Nutrition Insights That Drive Better Decisions</h1>
      <p class="intro">
        Deep-dive articles with clear heading structures, internal links, and
        practical frameworks designed for both readers and search visibility.
      </p>
    </section>

    <section class="container">
      <SectionTitle
        kicker="Categories"
        title="Browse by Intent"
        description="Filter by weight loss, diet planning, or condition-specific nutrition guidance."
      />

      <div class="filters">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div v-if="filteredPosts.length" class="blog-grid">
        <BlogCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
      </div>
      <EmptyState
        v-else
        title="No posts in this category yet"
        description="No data available to show"
      />
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
  max-width: 800px;
}

.filters {
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filters button {
  border: 1px solid rgba(97, 163, 157, 0.34);
  border-radius: 999px;
  background: white;
  color: var(--ink-700);
  padding: 8px 12px;
  font: inherit;
  cursor: pointer;
}

.filters button.active {
  color: var(--teal-700);
  border-color: var(--teal-500);
  background: rgba(17, 152, 138, 0.1);
  font-weight: 700;
}

.blog-grid {
  display: grid;
  gap: 14px;
}

@media (min-width: 900px) {
  .blog-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
