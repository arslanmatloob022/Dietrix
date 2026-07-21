<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BrandMark from "../ui/BrandMark.vue";
import UiButton from "../ui/UiButton.vue";

const route = useRoute();
const menuOpen = ref(false);
const scrolled = ref(false);

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Booking", to: "/booking" },
  { label: "Blog", to: "/blog" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<template>
  <header class="app-header" :class="{ scrolled }">
    <div class="container nav-shell">
      <RouterLink to="/" class="brand" aria-label="Dietrix Fit home">
        <span class="brand-icon" aria-hidden="true">
          <BrandMark :size="28" />
        </span>
        <span class="brand-text">Dietrix <em>Fit</em></span>
      </RouterLink>

      <button
        class="menu-toggle"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
      >
        <span class="burger" :class="{ open: menuOpen }">
          <span></span><span></span><span></span>
        </span>
      </button>

      <nav
        class="nav"
        :class="{ 'nav--open': menuOpen }"
        aria-label="Main navigation"
      >
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <UiButton to="/booking" size="sm" aria-label="Book consultation now">
        Book Now
      </UiButton>
    </div>
  </header>
</template>

<style scoped>
/* ── Header shell ───────────────────────────── */
.app-header {
  position: sticky;
  top: 0;
  z-index: 200;
  transition:
    background 360ms ease,
    box-shadow 360ms ease,
    padding 360ms ease;
  background: rgba(240, 250, 248, 0.6);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
.app-header.scrolled {
  background: rgba(240, 250, 248, 0.88);
  box-shadow:
    0 4px 32px rgba(6, 78, 59, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.7);
}

/* ── Nav shell grid ────────────────────────── */
.nav-shell {
  min-height: 76px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
}

/* ── Brand ─────────────────────────────────── */
.brand {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.brand-icon {
  display: flex;
  filter: drop-shadow(0 4px 12px rgba(5, 150, 105, 0.4));
}
.brand-text {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--ink-900);
  letter-spacing: -0.02em;
}
.brand-text em {
  font-style: normal;
  color: var(--emerald-600);
}

/* ── Nav links ─────────────────────────────── */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
}
.nav-link {
  position: relative;
  color: var(--ink-700);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 8px 12px;
  border-radius: 10px;
  transition:
    color 220ms ease,
    background 220ms ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 50%;
  translate: -50% 0;
  width: 0;
  height: 2px;
  background: var(--emerald-500);
  border-radius: 2px;
  transition: width 260ms cubic-bezier(0.25, 0.8, 0.25, 1);
}
.nav-link.router-link-exact-active {
  color: var(--emerald-700);
  background: rgba(16, 185, 129, 0.1);
}
.nav-link.router-link-exact-active::after {
  width: 22px;
}
.nav-link:hover {
  color: var(--emerald-700);
  background: rgba(16, 185, 129, 0.08);
}

/* ── Hamburger toggle ──────────────────────── */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: background 200ms;
}
.menu-toggle:hover {
  background: rgba(16, 185, 129, 0.1);
}

.burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}
.burger span {
  display: block;
  height: 2px;
  background: var(--ink-800);
  border-radius: 2px;
  transition:
    transform 320ms cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 320ms ease,
    width 320ms ease;
}
.burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.burger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile ────────────────────────────────── */
@media (max-width: 1000px) {
  .nav-shell {
    grid-template-columns: auto auto;
    grid-template-areas: "brand toggle" "nav nav" "cta cta";
  }
  .brand {
    grid-area: brand;
  }
  .menu-toggle {
    display: flex;
    grid-area: toggle;
    justify-self: end;
  }
  .nav {
    grid-area: nav;
    display: none;
    flex-direction: column;
    align-items: stretch;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 16px 48px rgba(6, 78, 59, 0.12);
    padding: 10px;
    gap: 2px;
  }
  .nav--open {
    display: flex;
  }
  .nav-link {
    text-align: left;
  }
  :deep(.ui-button) {
    grid-area: cta;
    width: 100%;
  }
}
</style>
