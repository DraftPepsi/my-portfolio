<template>
  <header class="navbar">
    <div class="navbar-inner">
      <!-- Left: logo + full name (clickable) -->
      <div
        class="navbar-brand brand-tooltip"
        @click="goIntro"
        role="button"
        tabindex="0"
      >
        <!-- ✅ Put your PNG in /public/logo.png -->
        <img class="brand-logo" src="/CPC.png" alt="Carl logo" />
        <span class="brand-name">Carl Patrick Cagubcub</span>

        <!-- ✅ Hover message -->
        <span class="tooltip">Click me and I’ll say hello again!</span>
      </div>

      <!-- Center: links (desktop only) -->
      <nav class="navbar-links" aria-label="Primary">
        <div class="navbar-links-inner" ref="linksWrap">
          <button
            v-for="(item, i) in items"
            :key="item.key"
            class="nav-link"
            :class="{ active: currentPage === item.page }"
            @click="item.onClick"
            :ref="(el) => (linkRefs[i] = el)"
          >
            {{ item.label }}
          </button>

          <!-- ✅ One shared underline that animates -->
          <span class="nav-indicator" :style="indicatorStyle" />
        </div>
      </nav>

      <!-- Theme switch -->
      <div class="navbar-center">
        <ThemeSwitch />
      </div>

      <!-- Mobile: hamburger (rightmost) -->
      <button
        class="hamburger"
        :class="{ open: isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
        :aria-expanded="isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <Transition name="navdrop">
      <nav v-if="isMenuOpen" class="mobile-menu" aria-label="Mobile">
        <button class="mobile-link" :class="{ active: currentPage === 1 }" @click="go(onGoAbout)">
          About
        </button>
        <button class="mobile-link" :class="{ active: currentPage === 2 }" @click="go(onGoSkills)">
          Skills
        </button>
        <button class="mobile-link" :class="{ active: currentPage === 3 }" @click="go(onGoExperience)">
          Experience
        </button>
        <button class="mobile-link" @click="go(onOpenContact)">
          Contact
        </button>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, onBeforeUnmount, computed } from "vue"
import ThemeSwitch from "./ThemeSwitch.vue"

const props = defineProps({
  currentPage: { type: Number, required: true },
  onGoAbout: { type: Function, required: true },
  onGoSkills: { type: Function, required: true },
  onGoExperience: { type: Function, required: true },
  onOpenContact: { type: Function, required: true },
  onGoIntro: { type: Function, required: true }, // ✅ NEW
})

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
function closeMenu() {
  isMenuOpen.value = false
}
function go(fn) {
  closeMenu()
  fn()
}

/* ✅ Brand click should go back to your intro screen.
   Assuming "About" (page 1) is the intro/hello page in your flow. */
function goIntro() {
  closeMenu()
  props.onGoIntro()
}

const items = computed(() => [
  { key: "about", label: "About", page: 1, onClick: () => go(props.onGoAbout) },
  { key: "skills", label: "Skills", page: 2, onClick: () => go(props.onGoSkills) },
  { key: "exp", label: "Experience", page: 3, onClick: () => go(props.onGoExperience) },
  { key: "contact", label: "Contact", page: -1, onClick: () => go(props.onOpenContact) },
])

/* ---------------- Underline indicator logic ---------------- */
const linksWrap = ref(null)
const linkRefs = ref([])

const indicator = ref({
  left: 0,
  width: 0,
  opacity: 0,
})

const indicatorStyle = computed(() => ({
  transform: `translateX(${indicator.value.left}px)`,
  width: `${indicator.value.width}px`,
  opacity: indicator.value.opacity,
}))

function getActiveIndex() {
  const idx = items.value.findIndex((x) => x.page === props.currentPage)
  return idx
}

function measureForIndex(index) {
  const wrapEl = linksWrap.value
  const btn = linkRefs.value[index]
  if (!wrapEl || !btn) return null

  const wrapRect = wrapEl.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()

  const left = btnRect.left - wrapRect.left
  const width = btnRect.width
  return { left, width }
}

async function moveIndicator(animate = true) {
  await nextTick()

  const idx = getActiveIndex()
  if (idx < 0) {
    indicator.value.opacity = 0
    return
  }

  const target = measureForIndex(idx)
  if (!target) return

  if (!animate || indicator.value.opacity === 0) {
    indicator.value = { ...target, opacity: 1 }
    return
  }

  const currentCenter = indicator.value.left + indicator.value.width / 2
  const targetCenter = target.left + target.width / 2

  indicator.value = { left: currentCenter, width: 0, opacity: 1 }

  window.setTimeout(() => {
    indicator.value = { left: targetCenter, width: 0, opacity: 1 }

    requestAnimationFrame(() => {
      indicator.value = { left: target.left, width: target.width, opacity: 1 }
    })
  }, 140)
}

function handleResize() {
  moveIndicator(false)
}

onMounted(async () => {
  await moveIndicator(false)
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
})

watch(
  () => props.currentPage,
  async () => {
    await moveIndicator(true)
  }
)

watch(
  () => props.currentPage,
  () => closeMenu()
)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 100;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
  color: var(--nav-text);

  transition:
    background-color var(--theme-fade) var(--theme-ease),
    border-color var(--theme-fade) var(--theme-ease),
    color var(--theme-fade) var(--theme-ease);
}

/* Full-width bar so brand can be truly left */
.navbar-inner {
  width: 100%;
  padding: 0.9rem 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  position: relative;
}

/* ✅ Brand (logo + name) */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  cursor: pointer;
  user-select: none;
  position: relative; /* tooltip anchor */
}

.brand-logo {
  height: 28px;
  width: auto;        /* 👈 let width scale naturally */
  max-width: 48px;    /* 👈 safety cap for wide logos */
  object-fit: contain;
}


.brand-name {
  font-size: 0.95rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  white-space: nowrap;
  opacity: 0.95;
}

/* ✅ Tooltip */
.brand-tooltip .tooltip {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;

  background: var(--nav-bg);
  color: var(--nav-text);
  border: 1px solid var(--nav-border);

  border-radius: 12px;
  padding: 6px 10px;

  font-size: 0.75rem;
  letter-spacing: 0.04em;
  white-space: nowrap;

  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;

  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 10;
}

/* show tooltip only on hover-capable devices */
@media (hover: hover) {
  .brand-tooltip:hover .tooltip {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Desktop: center the whole nav group */
.navbar-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Inner wrapper: underline anchor */
.navbar-links-inner {
  position: relative;
  display: flex;
  gap: 1.75rem;
  align-items: center;
  padding-bottom: 8px;
}

.nav-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  color: inherit;
  opacity: var(--nav-link-opacity);
  cursor: pointer;

  position: relative;
  transition: opacity 0.25s ease;
}
.nav-link:hover {
  opacity: var(--nav-link-hover);
}
.nav-link.active {
  opacity: 1;
}

.nav-link.active::after {
  content: none;
}

/* Shared underline indicator */
.nav-indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  border-radius: 999px;
  background: var(--nav-active-underline);

  will-change: transform, width, opacity;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}

/* ✅ Desktop: reserve right space so centered links don't overlap the switch */
.navbar-center {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 160px;
}
/* ✅ kill mobile tap highlight + default focus ring flash */
.navbar button,
.navbar a {
  -webkit-tap-highlight-color: transparent;
}
.mobile-link:focus,
.mobile-link:focus-visible {
  outline: none;
}
/* Hamburger (mobile only) */
.hamburger {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;

  border: 1px solid var(--nav-border);
  background: transparent;
  color: inherit;

  cursor: pointer;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  transition:
    background-color var(--theme-fade) var(--theme-ease),
    border-color var(--theme-fade) var(--theme-ease),
    transform 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.hamburger:hover {
  background: color-mix(in srgb, var(--nav-text) 10%, transparent);
}
.hamburger:active {
  transform: scale(0.98);
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: currentColor;
  border-radius: 999px;
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile dropdown */
.mobile-menu {
  width: 100%;
  padding: 0.35rem 1.5rem 0.9rem;

  display: none;
  gap: 0.55rem;            /* slightly more airy */
}

/* Mobile links: no container/box, right aligned, glow only */
.mobile-link {
  width: 100%;
  text-align: right;       /* ✅ right aligned */

  background: transparent !important; /* ✅ prevent highlight boxes */
  border: none !important;            /* ✅ remove container border */
  border-radius: 0 !important;

  padding: 0.65rem 0;      /* ✅ clean list feel */

  font: inherit;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  font-size: 0.9rem;

  color: inherit;
  opacity: var(--nav-link-opacity);
  cursor: pointer;

  -webkit-appearance: none;
  appearance: none;

  transition:
    opacity 0.2s ease,
    text-shadow 0.25s ease;
}

/* Glow on hover (no background) */
.mobile-link:hover {
  opacity: 1;
  background: transparent !important;

  text-shadow:
    0 0 8px rgba(255, 255, 255, 0.35),
    0 0 18px rgba(255, 255, 255, 0.18);
}

/* Active page: glow only (no box) */
.mobile-link.active {
  opacity: 1;
  background: transparent !important;

  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.45),
    0 0 22px rgba(255, 255, 255, 0.22);
}

/* dropdown transition */
.navdrop-enter-active,
.navdrop-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.navdrop-enter-from,
.navdrop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Mobile: hide desktop links; show hamburger; center switch */
@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }

  /* ✅ Hide full name on mobile */
  .brand-name {
    display: none;
  }

  /* Optional polish */
  .navbar-brand {
    gap: 0;
  }
  .hamburger {
    display: inline-flex;
  }

  .navbar button,
  .navbar a {
    -webkit-tap-highlight-color: transparent;
    outline: none;
}

  .navbar-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    min-width: auto;
    margin-left: 0;
  }

  .mobile-menu {
    display: grid;
  }

  /* ✅ Prevent long name from crushing mobile layout */
  .brand-name {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Desktop: reset mobile centering */
@media (min-width: 769px) {
  .navbar-center {
    position: static;
    transform: none;
  }
}
</style>
