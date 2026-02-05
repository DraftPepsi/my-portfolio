<script setup>
const skillGroups = [
  {
    title: "Front-end",
    theme: "frontend",
    skills: [
      { name: "Vue.js", percent: 80 },
      { name: "ReactJS", percent: 80 },
      { name: "CSS", percent: 85 },
      { name: "HTML", percent: 80 },
    ],
  },
  {
    title: "Back-end",
    theme: "backend",
    skills: [
      { name: "Python", percent: 80 },
      { name: "SQL", percent: 60 },
      { name: "C/C++", percent: 60 },
      { name: "Java", percent: 30 }, 
    ],
  },
  {
    title: "Testing",
    theme: "testing",
    skills: [
      { name: "Manual Testing", percent: 95 },
      { name: "Selenium", percent: 85 },
      { name: "Robot Framework", percent: 85 },
      { name: "Ranorex", percent: 80 },
    ],
  },
  {
    title: "Tools Used",
    theme: "tools",
    skills: [
      { name: "VS Code", percent: 95 },
      { name: "Bubble.io", percent: 85 },
      { name: "Arduino", percent: 80 },
      { name: "VirtualBox", percent: 80 },
    ],
  },
  {
    title: "Version Control",
    theme: "version",
    skills: [
      { name: "Git", percent: 90 },
      { name: "GitLab", percent: 90 },
      { name: "SVN", percent: 90 },
    ],
  },
  {
    title: "ERP / Enterprise",
    theme: "erp",
    skills: [
      { name: "Frappe / ERPNext", percent: 85 },
      { name: "Oracle EBS", percent: 75 },
      { name: "Oracle APEX", percent: 75 },
    ],
  },
]

function clampPercent(n) {
  const v = Number(n)
  if (!Number.isFinite(v)) return 0
  return Math.max(0, Math.min(100, v))
}

function proficiencyLabel(n) {
  const p = clampPercent(n)
  if (p >= 90) return "Expert"
  if (p >= 75) return "Advanced"
  if (p >= 55) return "Intermediate"
  return "Beginner"
}
</script>

<template>
  <section class="skills-page">
    <h2 class="skills-title">Technical Skills</h2>
    <p class="skills-subtitle">
      An overview of my technical strengths across development and testing.
    </p>

    <div class="skills-grid">
      <div
        v-for="group in skillGroups"
        :key="group.title"
        class="skills-card"
        :data-skill-theme="group.theme"
      >
        <h3 class="skills-card-title">
          {{ group.title }}
        </h3>

        <ul class="skills-list">
          <li v-for="s in group.skills" :key="s.name" class="skill-row">
            <div class="skill-head">
              <span class="skill-name">{{ s.name }}</span>
              <span class="skill-level">
                {{ proficiencyLabel(s.percent) }}
              </span>
            </div>

            <!-- Minimal divider line (replaces progress bar) -->
            <div class="skill-line" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>