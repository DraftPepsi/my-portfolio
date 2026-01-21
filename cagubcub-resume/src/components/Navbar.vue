<template>
  <header class="navbar">
    <div class="navbar-inner">
      <!-- Left: placeholder name / logo -->
      <div class="navbar-brand">
        <span class="brand-name">Your Name.</span>
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
        type="button"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-label="Open menu"
        @click="toggleMenu"
      >
        <span class="hamburger-bars" :class="{ open: isMenuOpen }"></span>
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
import { ref, watch, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
import ThemeSwitch from './ThemeSwitch.vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  onGoAbout: { type: Function, required: true },
  onGoSkills: { type: Function, required: true },
  onGoExperience: { type: Function, required: true },
  onOpenContact: { type: Function, required: true },
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

const items = computed(() => [
  { key: 'about', label: 'About', page: 1, onClick: () => go(props.onGoAbout) },
  { key: 'skills', label: 'Skills', page: 2, onClick: () => go(props.onGoSkills) },
  { key: 'exp', label: 'Experience', page: 3, onClick: () => go(props.onGoExperience) },
  { key: 'contact', label: 'Contact', page: -1, onClick: () => go(props.onOpenContact) },
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
  // Contact isn't a page, so no underline for it by default
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

  // First time: just set it
  if (!animate || indicator.value.opacity === 0) {
    indicator.value = { ...target, opacity: 1 }
    return
  }

  // ✅ shrink → jump → expand effect
  const currentCenter = indicator.value.left + indicator.value.width / 2
  const targetCenter = target.left + target.width / 2

  // shrink to 0 at current center
  indicator.value = { left: currentCenter, width: 0, opacity: 1 }

  // wait for shrink transition to be visible
  window.setTimeout(() => {
    // jump (still 0 width) to target center
    indicator.value = { left: targetCenter, width: 0, opacity: 1 }

    // next frame: expand to target size/position
    requestAnimationFrame(() => {
      indicator.value = { left: target.left, width: target.width, opacity: 1 }
    })
  }, 140) // tweak timing if you want snappier/slower
}

function handleResize() {
  // re-measure instantly on resize
  moveIndicator(false)
}

onMounted(async () => {
  await moveIndicator(false)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.currentPage,
  async () => {
    await moveIndicator(true)
  }
)

// Close menu automatically when page changes (safe UX)
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

.navbar-brand {
  display: flex;
  align-items: center;
  min-width: 120px;
}

.brand-name {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.02em;
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
  padding-bottom: 8px; /* space for underline */
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
.nav-link:hover { opacity: var(--nav-link-hover); }
.nav-link.active { opacity: 1; }

/* ✅ remove old ::after underline if you had it */
.nav-link.active::after {
  content: none;
}

/* ✅ Shared underline indicator */
.nav-indicator {
  position: absolute;
  left: 0;
  bottom: 0;            /* 👈 stays INSIDE navbar */
  height: 2px;
  border-radius: 999px;
  background: var(--nav-active-underline);

  will-change: transform, width, opacity;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.2s ease;
}


/* Desktop: switch is rightmost */
.navbar-center {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Hamburger (mobile only; rightmost on mobile) */
.hamburger {
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--nav-border);
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.hamburger-bars {
  display: block;
  width: 18px;
  height: 2px;
  margin: 0 auto;
  background: currentColor;
  position: relative;
  border-radius: 999px;
  transition: transform 0.25s ease, background-color var(--theme-fade) var(--theme-ease);
}
.hamburger-bars::before,
.hamburger-bars::after {
  content: "";
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  background: currentColor;
  border-radius: 999px;
  transition: transform 0.25s ease, top 0.25s ease;
}
.hamburger-bars::before { top: -6px; }
.hamburger-bars::after  { top:  6px; }

.hamburger-bars.open { transform: rotate(45deg); }
.hamburger-bars.open::before { top: 0; transform: rotate(0deg); }
.hamburger-bars.open::after { top: 0; transform: rotate(90deg); }

/* Mobile dropdown */
.mobile-menu {
  width: 100%;
  padding: 0.35rem 1.5rem 0.9rem;

  display: none;
  gap: 0.25rem;
}

.mobile-link {
  width: 100%;
  text-align: left;

  background: transparent;
  border: 1px solid var(--nav-border);
  color: inherit;

  padding: 0.75rem 0.9rem;
  border-radius: 14px;

  font: inherit;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.85rem;

  opacity: var(--nav-link-opacity);
  cursor: pointer;

  transition:
    opacity 0.2s ease,
    background-color var(--theme-fade) var(--theme-ease),
    border-color var(--theme-fade) var(--theme-ease);
}
.mobile-link:hover { opacity: var(--nav-link-hover); }
.mobile-link.active { opacity: 1; }

.navdrop-enter-active,
.navdrop-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.navdrop-enter-from,
.navdrop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Mobile: center the switch; hide desktop links */
@media (max-width: 768px) {
  .navbar-links { display: none; }
  .hamburger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .navbar-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
  }

  .mobile-menu { display: grid; }
}

/* Desktop: reset mobile centering */
@media (min-width: 769px) {
  .navbar-center {
    position: static;
    transform: none;
  }
}
</style>
