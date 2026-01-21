<script setup>
const props = defineProps({
  onPrev: { type: Function, required: true },
  // optional: if you want a "restart" to page 1 or intro
  onRestart: { type: Function, required: false },
})

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function handlePrev() {
  scrollTop()
  props.onPrev()
}

function handleRestart() {
  scrollTop()
  if (props.onRestart) props.onRestart()
}
</script>

<template>
  <!-- ✅ Only change: add compilation-page -->
  <section class="compilation-section">
    <h2 class="skills-title">Compilation</h2>
    <p class="skills-subtitle">
      A combined summary of my experience, skills, and strengths.
    </p>

    <div class="skills-grid">
      <div class="skills-card">
        <h3 class="skills-card-title">Profile</h3>
        <ul class="bullet-list">
          <li>Software engineer with hands-on experience in quality assurance and application development.</li>
          <li>Enjoys ensuring systems work reliably while continuously improving usability and performance.</li>
          <li>Comfortable working in collaborative environments and adapting to new tools and processes.</li>
        </ul>
      </div>

      <div class="skills-card">
        <h3 class="skills-card-title">Core Strengths</h3>
        <ul class="bullet-list">
          <li>Builds and maintains user-friendly web interfaces with a focus on clarity and usability.</li>
          <li>Works with back-end logic, databases, and system processes to support stable applications.</li>
          <li>Uses modern tools and version control practices to collaborate effectively with teams.</li>
        </ul>
      </div>

      <div class="skills-card">
        <h3 class="skills-card-title">Work &amp; Project Highlights</h3>
        <ul class="bullet-list">
          <li>Contributed to multiple internal and client-facing systems across different business domains.</li>
          <li>Supported projects by testing features, documenting requirements, and collaborating with developers.</li>
          <li>Gained experience working on reservation, booking, management, and enterprise systems.</li>
        </ul>
      </div>
    </div>

    <div class="nav-row">
      <button class="nav-btn" type="button" @click="handlePrev">
        ← Prev
      </button>

      <button class="nav-btn" type="button" @click="handleRestart">
        Back to Top ↑
      </button>
    </div>
  </section>
</template>

