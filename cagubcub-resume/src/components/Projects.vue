<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const expandedIndex = ref(null)
const internshipExpanded = ref(false)

function toggle(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

function toggleInternship() {
  internshipExpanded.value = !internshipExpanded.value
}

function handleOutsideClick(event) {
  const card = event.target.closest('.project-card')
  if (!card) {
    expandedIndex.value = null
    internshipExpanded.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))

function onEnter(el) {
  el.style.height = '0px'
  el.style.opacity = '0'
  el.style.transform = 'translateY(-6px)'
  void el.offsetHeight
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'
}

function onAfterEnter(el) {
  el.style.height = 'auto'
}

function onLeave(el) {
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'
  void el.offsetHeight
  el.style.height = '0px'
  el.style.opacity = '0'
  el.style.transform = 'translateY(-6px)'
}

/* ============================== */
/*   PROJECT DATA                 */
/* ============================== */

const tsukidenProjects = [
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
    title: 'Taxi Booking System (Electronic Ticketing)',
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

const internshipProject = {
  title: 'Melham Construction Corporation',
  client: 'On-site internship · Hardware & prototype projects',
  role: 'Hardware Engineer Intern',
  bullets: [
    'Developed an RFID-based patient medical bracelet system integrating medical records and billing.',
    'Assisted in hardware integration, testing, and validation of the prototype.',
    'Worked on a cleft lip and palate voice recognition project (hardware setup + signal validation).',
    'Supported documentation and reporting for technical handoff and research review.',
  ],
  tech: 'C++, Arduino',
}
</script>

<template>
  <section class="projects-section">
    <h2 class="skills-title">Projects</h2>
    <p class="skills-subtitle">
      These are projects I’ve worked on and am currently contributing to.
    </p>

    <h3 class="company-title">Tsukiden Global Solutions Inc.</h3>

    <!-- ✅ ONE grid for everything -->
    <div class="skills-grid projects-grid">
      <!-- Tsukiden projects -->
      <div
        v-for="(p, i) in tsukidenProjects"
        :key="p.title"
        class="skills-card project-card glow-card"
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

      <!-- ✅ Spacer + header inside grid so spacing is consistent -->
      <div class="internship-break" aria-hidden="true"></div>

      <h3 class="company-title internship-title">Internship Experience</h3>

      <!-- ✅ Internship card spans FULL WIDTH (reaches end of right container) -->
      <div
        class="skills-card project-card glow-card internship-wide"
        :class="{ expanded: internshipExpanded }"
        @click.stop="toggleInternship"
      >
        <h3 class="skills-card-title project-title">
          {{ internshipProject.title }}
        </h3>

        <Transition
          name="project-accordion"
          @enter="onEnter"
          @after-enter="onAfterEnter"
          @leave="onLeave"
        >
          <div v-if="internshipExpanded" class="project-panel">
            <div class="project-content">
              <p class="project-client">{{ internshipProject.client }}</p>
              <p class="project-role">{{ internshipProject.role }}</p>

              <ul class="project-bullets">
                <li v-for="(b, i) in internshipProject.bullets" :key="i">
                  {{ b }}
                </li>
              </ul>

              <p v-if="internshipProject.tech" class="project-tech">
                <strong>Tech:</strong> {{ internshipProject.tech }}
              </p>
            </div>
          </div>
        </Transition>

        <div class="project-hint">
          {{ internshipExpanded ? 'Click to collapse' : 'Click me!' }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ✅ Gap between Supply Chain row and Internship section */
.internship-break {
  grid-column: 1 / -1;
  height: 14px; /* adjust if you want more/less space */
}

/* ✅ Internship header sits on its own row */
.internship-title {
  grid-column: 1 / -1;
  margin: 0; /* grid spacing is handled by break + grid gap */
}

/* ✅ Internship accordion spans full width */
.internship-wide {
  grid-column: 1 / -1;
}
</style>
