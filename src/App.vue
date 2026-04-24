<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import AppFooter from "./components/layout/AppFooter.vue";
import FloatingChatbot from "./components/layout/FloatingChatbot.vue";
import AppNavbar from "./components/layout/AppNavbar.vue";

const route = useRoute();
let observer: IntersectionObserver | null = null;

function attachRevealAnimations() {
  const elements = Array.from(
    document.querySelectorAll(".reveal"),
  ) as HTMLElement[];

  if (!elements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.remove("reveal-pending");
      element.classList.add("is-visible");
    });
    return;
  }

  observer?.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.remove("reveal-pending");
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    },
  );

  elements.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    htmlElement.classList.remove("is-visible");
    htmlElement.classList.add("reveal-pending");
    htmlElement.style.transitionDelay = `${Math.min(index * 50, 260)}ms`;
    observer?.observe(htmlElement);
  });
}

onMounted(() => {
  attachRevealAnimations();
});

watch(
  () => route.fullPath,
  async () => {
    await nextTick();
    requestAnimationFrame(() => {
      attachRevealAnimations();
    });
  },
  {
    immediate: true,
  },
);

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="app-shell">
    <AppNavbar />
    <RouterView v-slot="{ Component, route: currentRoute }">
      <Transition name="page" mode="out-in">
        <Suspense timeout="0">
          <component :is="Component" :key="currentRoute.fullPath" />
          <template #fallback>
            <section class="container route-loading" aria-live="polite">
              Loading your nutrition experience...
            </section>
          </template>
        </Suspense>
      </Transition>
    </RouterView>
    <AppFooter />
    <FloatingChatbot />
    <RouterLink
      to="/booking"
      class="mobile-book-cta"
      aria-label="Book nutrition consultation"
    >
      Book Consultation
    </RouterLink>
  </div>
</template>

<style scoped>
.route-loading {
  min-height: 60vh;
  display: grid;
  place-content: center;
  text-align: center;
  font-weight: 700;
  font-family: var(--font-heading);
  color: var(--emerald-600);
  font-size: 1.1rem;
}

.mobile-book-cta {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 76px;
  z-index: 130;
  text-decoration: none;
  text-align: center;
  font-weight: 800;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: white;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-500));
  border-radius: 16px;
  min-height: 52px;
  display: grid;
  place-items: center;
  box-shadow:
    0 16px 40px rgba(5, 150, 105, 0.35),
    0 4px 12px rgba(5, 150, 105, 0.2);
  transition:
    transform 260ms ease,
    box-shadow 260ms ease;
}
.mobile-book-cta:active {
  transform: scale(0.97);
}

@media (min-width: 901px) {
  .mobile-book-cta {
    display: none;
  }
}
</style>
