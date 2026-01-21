<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const expandedIndex = ref(null)

function toggle(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

/* Close when clicking outside */
function handleOutsideClick(event) {
  const card = event.target.closest('.project-card')
  if (!card) expandedIndex.value = null
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))

/* Height animation hooks */
function onEnter(el) {
  el.style.height = '0px'
  el.style.opacity = '0'
  el.style.transform = 'translateY(-6px)'

  // Force reflow so the browser registers height=0 before we expand
  void el.offsetHeight

  const h = el.scrollHeight
  el.style.height = `${h}px`
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'
}

function onAfterEnter(el) {
  el.style.height = 'auto' // allow natural height after animation
}

function onLeave(el) {
  // If it was auto, set to current px so it can animate down
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'

  void el.offsetHeight

  el.style.height = '0px'
  el.style.opacity = '0'
  el.style.transform = 'translateY(-6px)'
}

const projects = [
  {
    title: 'Payroll & HR Management System (HRMS)',
    client: 'Construction company · Internal enterprise system',
    role: 'Software Developer (Current)',
    bullets: [
      'Set up a complete local ERPNext and Frappe Framework development environment.',
      'Designed custom DocTypes, roles, and permission structures for HR and payroll.',
      'Customized the front-end using Vue.js and reworked backend APIs in Python.',
      'Configured role-based access without heavy hard-coding to improve maintainability.',
    ],
    tech: 'ERPNext, Frappe Framework, Python, Vue.js, Ubuntu, Docker',
  },
  {
    title: 'Software Management System for Windows',
    client: 'Confidential enterprise (Japan) · Software distribution platform',
    role: 'Software Developer & QA Tester',
    bullets: [
      'Fixed backend logic and investigated scheduled cron jobs for software updates.',
      'Revised system documentation and user guides for operational clarity.',
      'Created test scenarios and executed automated tests using Ranorex.',
    ],
    tech: 'Python, HTML, PostgreSQL (pgAdmin 4), Ranorex',
  },
  {
    title: 'Domestic Flights & Hotel Reservation Platform',
    client: 'Confidential enterprise (Japan)',
    role: 'QA Tester',
    bullets: [
      'Created reusable backend test data for reservation workflows.',
      'Reviewed PRD and user guides to improve clarity and testability.',
      'Performed regression, smoke, ad hoc, and black-box testing.',
    ],
  },
  {
    title: 'Domestic Car Rental Reservation System',
    client: 'Confidential enterprise (Japan)',
    role: 'QA Tester',
    bullets: [
      'Prepared backend test data for booking and cancellation flows.',
      'Designed test scenarios aligned with business rules.',
      'Executed regression and smoke testing across releases.',
    ],
  },
  {
    title: 'Domestic Taxi Booking System (Electronic Ticketing)',
    client: 'Confidential enterprise (Japan) · B2B electronic ticketing system',
    role: 'QA Tester / Automation Engineer',
    bullets: [
      'Authored detailed test manuals, procedures, and test scenarios.',
      'Developed and executed automated test scripts using T-DASH.',
      'Performed automated and manual testing across booking workflows.',
    ],
    tech: 'Python, Selenium, Robot Framework, T-DASH',
  },
  {
    title: 'Conference Room Reservation System',
    client: 'TGSI · Internal company system',
    role: 'Full-Stack Developer',
    bullets: [
      'Designed and developed an internal conference room reservation system.',
      'Implemented end-to-end booking workflows and availability logic.',
      'Delivered a fully functional in-house scheduling platform.',
    ],
    tech: 'Bubble.io',
  },
  {
    title: 'Supply Chain & Financial Management System',
    client: 'Confidential enterprise · Procurement system',
    role: 'Software Developer / Analyst',
    bullets: [
      'Contributed to procurement workflows using Oracle E-Business Suite.',
      'Analyzed system controls and documented complex procurement logic.',
      'Enabled smoother handoff for succeeding teams through detailed documentation.',
    ],
    tech: 'Oracle EBS, Oracle Database',
  },
  {
    title: 'Learning Management System for New Recruits',
    client: 'TGSI · Internal training platform',
    role: 'Analyst & Software Developer (Trainee)',
    bullets: [
      'Led requirements analysis and authored detailed specification documents.',
      'Created WBS, identified task difficulty, and coordinated team workflows.',
      'Enabled testers to prepare scenarios before development began.',
    ],
    tech: 'React.js, Java, Spring Boot',
  },
]
</script>

<template>
  <section class="projects-section">
    <h2 class="skills-title">Projects</h2>
    <p class="skills-subtitle">
      These are projects I’ve worked on and am currently contributing to.
    </p>

    <div class="skills-grid projects-grid">
      <div
        v-for="(p, i) in projects"
        :key="p.title"
        class="skills-card project-card"
        :class="{ expanded: expandedIndex === i }"
        @click.stop="toggle(i)"
      >
        <h3 class="skills-card-title project-title">
          {{ p.title }}
        </h3>

        <Transition
          name="project-accordion"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @leave="onLeave"
        >
          <div v-if="expandedIndex === i" class="project-panel">
            <div class="project-content">
              <p class="project-client">{{ p.client }}</p>
              <p class="project-role">{{ p.role }}</p>

              <ul class="project-bullets">
                <li v-for="(b, bi) in p.bullets" :key="bi">
                  {{ b }}
                </li>
              </ul>

              <p v-if="p.tech" class="project-tech">
                <strong>Tech:</strong> {{ p.tech }}
              </p>
            </div>
          </div>
        </Transition>

        <div class="project-hint">
          {{ expandedIndex === i ? 'Click to collapse' : 'Click me!' }}
        </div>
      </div>
    </div>
  </section>
</template>
