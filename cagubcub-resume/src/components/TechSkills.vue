<script setup>
const props = defineProps({
  onPrev: { type: Function, required: true },
  onNext: { type: Function, required: true },
  showPrev: { type: Boolean, default: true },
})

const skillGroups = [
  {
    title: 'Front-end',
    theme: 'frontend',
    skills: [
      { name: 'HTML', percent: 85 },
      { name: 'CSS', percent: 80 },
      { name: 'JavaScript', percent: 70 },
      { name: 'ReactJS', percent: 65 },
    ],
  },
  {
    title: 'Back-end',
    theme: 'backend',
    skills: [
      { name: 'Python', percent: 85 },
      { name: 'SQL / PL-SQL', percent: 75 },      
      { name: 'Java', percent: 60 },
      { name: 'C / C++', percent: 55 },
    ],
  },
  {
    title: 'Testing',
    theme: 'testing',
    skills: [
      { name: 'Manual Testing', percent: 85 },
      { name: 'Selenium', percent: 70 },
      { name: 'Robot Framework', percent: 65 },
      { name: 'Ranorex', percent: 60 },
    ],
  },
  {
    title: 'Tools Used',
    theme: 'tools', // Purple
    skills: [
      { name: 'VS Code', percent: 90 },
      { name: 'Bubble.io', percent: 75 },
      { name: 'Arduino', percent: 60 },
    ],
  },
  {
    title: 'Version Control',
    theme: 'version', // Brown
    skills: [
      { name: 'Git', percent: 80 },
      { name: 'GitLab', percent: 70 },
      { name: 'SVN', percent: 60 },
    ],
  },
  {
    title: 'ERP / Enterprise',
    theme: 'erp', // Yellow
    skills: [
      { name: 'Frappe / ERPNext', percent: 85 },
      { name: 'VirtualBox', percent: 85 },
      { name: 'Oracle EBS', percent: 75 },
      { name: 'Oracle APEX', percent: 70 },
    ],
  },
]

function clampPercent(n) {
  const v = Number(n)
  if (!Number.isFinite(v)) return 0
  return Math.max(0, Math.min(100, v))
}

/* ✅ Scroll helpers */
function goTopAndNext() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  props.onNext()
}

function goTopAndPrev() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  props.onPrev()
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
          <li
            v-for="s in group.skills"
            :key="s.name"
            class="skill-row"
          >
            <div class="skill-head">
              <span class="skill-name">{{ s.name }}</span>
              <span class="skill-percent">
                {{ clampPercent(s.percent) }}%
              </span>
            </div>

            <div
              class="skill-bar"
              role="progressbar"
              :aria-label="`${s.name} proficiency`"
              :aria-valuenow="clampPercent(s.percent)"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="skill-fill"
                :style="{ width: clampPercent(s.percent) + '%' }"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- NAV -->
    <div class="nav-row">
      <button
        v-if="showPrev"
        class="nav-btn"
        type="button"
        @click="goTopAndPrev"
      >
        ← Prev
      </button>

      <button
        class="nav-btn"
        type="button"
        @click="goTopAndNext"
      >
        Next →
      </button>
    </div>
  </section>
</template>
