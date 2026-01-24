<script setup>
import TechSkills from './TechSkills.vue'
import OtherSkills from './Otherskills.vue'

const props = defineProps({
  onPrev: { type: Function, required: true },
  onNext: { type: Function, required: true },
  showPrev: { type: Boolean, default: true },
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handlePrev() {
  scrollToTop()
  props.onPrev()
}

function handleNext() {
  scrollToTop()
  props.onNext()
}
</script>

<template>
  <section class="skills-page">
    <!-- Optional: one page header (keep if you want a single H1 for the page) -->
    <!-- <h1 class="page-title">Skills</h1> -->

    <!-- Technical -->
    <TechSkills />

    <!-- Professional -->
    <div class="skills-divider" aria-hidden="true"></div>
    <OtherSkills />

    <!-- ONE NAV (for the whole Skills page) -->
    <div class="nav-row">
      <button
        v-if="showPrev"
        class="nav-btn"
        type="button"
        @click="handlePrev"
      >
        ← Prev
      </button>

      <button class="nav-btn" type="button" @click="handleNext">
        Next →
      </button>
    </div>
  </section>
</template>

<style scoped>
/* simple spacer between the two sections */
.skills-divider {
  height: 1.5rem;
}
</style>
