<script setup>
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
</script>

<template>
  <section class="skills-page">
    <h2 class="skills-title">Professional Skills</h2>

    <p class="skills-subtitle">
      Additional strengths that support development, testing, and documentation.
    </p>

    <div class="skills-grid">
      <div class="skills-card skills-card--full other-skills-card">
        <ul class="bullet-list">
          <li v-for="skill in otherSkills" :key="skill">
            {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-card--full {
  grid-column: 1 / -1;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
</style>
