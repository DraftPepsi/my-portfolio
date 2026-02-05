<script setup>
import { ref, onMounted } from "vue"

/* EMITS */
const emit = defineEmits(["next"])

/* Show states (keep transitions the same) */
const showCard = ref(false)

/* Scroll to top + go next */
function goTopAndNext() {
  window.scrollTo({ top: 0, behavior: "smooth" })
  emit("next")
}

onMounted(() => {
  showCard.value = false
  showCard.value = true
})
</script>

<template>
  <section class="intro-layout">
    <!-- HEADER -->
    <header class="intro-header">
      <h1 class="intro-name">Carl Patrick Cagubcub</h1>
      <p class="intro-role">Software Engineer</p>
    </header>

    <!-- LEFT COLUMN (2 CARDS) -->
    <div class="intro-left">
      <!-- Introduction -->
      <Transition name="cardfade">
        <div v-if="showCard" class="intro-card">
          <h3 class="intro-title">Introduction</h3>

          <p>
            Hi, I’m Carl — a Software Engineer with a strong background in Quality
            Assurance. I enjoy building reliable systems and making sure software
            works the way it should.
          </p>

          <p>
            I have experience in both manual and automated testing, as well as
            developing web applications. I like collaborating with teams, learning
            new tools, and delivering user-friendly software people can trust.
          </p>
        </div>
      </Transition>

      <!-- Education -->
      <Transition name="cardfade">
        <div v-if="showCard" class="intro-card">
          <h3 class="intro-title">Education</h3>

          <p class="edu-degree">
            Bachelor of Science in Electronics and Communications Engineering
          </p>
          <p class="edu-meta">
            University of Perpetual Help System DALTA – Las Piñas • October 2023
          </p>
        </div>
      </Transition>
    </div>

    <!-- RIGHT COLUMN (2 CARDS) -->
    <div class="intro-right">
      <!-- Work Experience -->
      <Transition name="cardfade">
        <div v-if="showCard" class="work-card">
          <h3 class="work-title">Work Experience</h3>

          <div class="work-item">
            <p class="work-company">Tsukiden Global Solutions Inc.</p>

            <div class="work-header">
              <span class="work-role">Software Engineer</span>
              <span class="work-date">Oct 2023 – Present</span>
            </div>

            <p class="work-desc">
              Responsible for manual and automated testing, writing test cases,
              identifying defects, and collaborating with developers to ensure
              software quality.
            </p>
          </div>

          <br />

          <div class="work-item">
            <p class="work-company">Melham Construction Corporation</p>

            <div class="work-header">
              <span class="work-role">Hardware Engineer Intern</span>
              <span class="work-date">Jul 2022 – Sep 2022</span>
            </div>

            <p class="work-desc">
              Assisted in testing and documentation, supporting validation tasks
              and project deliverables.
            </p>
          </div>
        </div>
      </Transition>

      <!-- Languages -->
      <Transition name="cardfade">
        <div v-if="showCard" class="intro-card">
          <h3 class="intro-title">Languages</h3>

          <div class="lang-stack">
            <div class="lang-row">
              <div class="lang-top">
                <span class="lang-name">English</span>
                <span class="lang-level">Fluent</span>
              </div>
              <div class="lang-line" aria-hidden="true"></div>
            </div>

            <div class="lang-row">
              <div class="lang-top">
                <span class="lang-name">Filipino (Tagalog)</span>
                <span class="lang-level">Native</span>
              </div>
              <div class="lang-line" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>

  <!-- NAV BUTTONS -->
  <Transition name="cardfade">
    <div v-if="showCard" class="nav-row">
      <button
        class="nav-btn is-hidden"
        type="button"
        aria-hidden="true"
        tabindex="-1"
      >
        ← Previous
      </button>

      <button class="nav-btn" type="button" @click="goTopAndNext">
        Next →
      </button>
    </div>
  </Transition>
</template>

<style scoped>
/* HEADER */
.intro-header {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
  margin-bottom: 14px;
}

.intro-name {
  font-size: clamp(2.2rem, 4.5vw, 3rem);
  font-weight: 700;
  line-height: 1.08;
  margin: 0;
  letter-spacing: -0.02em;
  color: var(--text-color);
}

.intro-role {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 500;
  opacity: 0.7;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

/* ✅ MAKE THESE TITLES MATCH "Work Experience" */
.intro-title {
  margin: 0 0 1rem 0;
  font-weight: 600;
  font-size: 1.25em;
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-align: left;
}

.work-title {
  text-align: left;
}

/* ✅ BOTTOM CARDS SMALLER BUT STILL BOTTOM-ALIGNED (DESKTOP) */
@media (min-width: 769px) {
  .intro-left,
  .intro-right {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 1.5rem;
    height: 100%;
    min-height: 0;
  }

  .intro-left :deep(.intro-card):nth-of-type(2),
  .intro-right :deep(.intro-card):nth-of-type(2) {
    min-height: 240px;
  }
}

/* Education */
.edu-degree {
  font-weight: 650;
  margin: 0 0 0.35rem 0;
}

.edu-meta {
  margin: 0;
  opacity: 0.85;
}

/* ✅ Languages (now labels + line, no % bar) */
.lang-stack {
  display: grid;
  gap: 1.4rem;
  margin-top: 0.5rem;
}

.lang-row {
  display: block !important;
}

.lang-top {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  margin-bottom: 0.55rem;
}

.lang-name {
  font-weight: 600;
  white-space: nowrap;
}

.lang-level {
  justify-self: end;
  opacity: 0.9;
  font-weight: 600;
  white-space: nowrap;
}

/* Divider line (replaces progress bar) */
.lang-line {
  height: 2px;
  width: 100%;
  border-radius: 2px;
  background: linear-gradient(to right, rgba(var(--card-rgb), 0.85), transparent);
  opacity: 0.55;
}

/* ✅ MOBILE: add equal spacing between stacked cards (no grid, no stretching) */
@media (max-width: 768px) {
  .intro-left > .intro-card + .intro-card {
    margin-top: 1.25rem;
  }

  .intro-right > .work-card + .intro-card {
    margin-top: 1.25rem;
  }
}
</style>