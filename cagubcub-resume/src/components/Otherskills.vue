<script setup>
const props = defineProps({
  onPrev: { type: Function, required: true },
  onNext: { type: Function, required: true },
})

const otherSkills = [
  'Experienced in analyzing project requirements to support accurate development and testing.',
  'Skilled in creating Work Breakdown Structures (WBS) to organize tasks and project deliverables.',
  'Proficient in test specification and test scenario analysis to ensure comprehensive coverage.',
  'Experienced in writing clear and detailed test cases and test scenarios.',
  'Capable of producing structured project requirement documentation.',
  'Experienced in creating user-level manuals and documentation.',
  'Skilled in developing technical and developer-focused documentation.',
  'Familiar with process documentation and standardization to support consistent workflows.',
]

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
    <h2 class="skills-title">Other Skills</h2>

    <p class="skills-subtitle">
      Additional competencies supporting development, testing, and documentation.
    </p>

    <!-- Content -->
    <div class="skills-grid">
      <!-- ✅ Make single card full width -->
      <div class="skills-card skills-card--full">
        <ul class="bullet-list">
          <li v-for="skill in otherSkills" :key="skill">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>

    <!-- NAV -->
    <div class="nav-row">
      <button class="nav-btn" type="button" @click="handlePrev">
        ← Prev
      </button>

      <button class="nav-btn" type="button" @click="handleNext">
        Next →
      </button>
    </div>
  </section>
</template>

<style scoped>
/* If skills-grid is a 2-column grid, this makes the card span both columns */
.skills-card--full {
  grid-column: 1 / -1;
  width: 100%;
}

/* Optional: keep it nicely centered and not overly wide on huge screens */
.skills-card--full {
  max-width: 900px;
  margin: 0 auto;
}
</style>
