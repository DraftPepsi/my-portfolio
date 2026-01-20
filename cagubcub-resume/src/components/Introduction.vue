<script setup>
import { ref, onMounted } from 'vue'

/*   EMITS + PROPS                */
const emit = defineEmits(['next'])

const props = defineProps({
  skipTyping: { type: Boolean, default: false },
})

/*   TYPING INTRO                 */
const fullText = 'Software Engineer'
const typedText = ref('')
const showCursor = ref(true)
const showCard = ref(false)

/*   PROJECTS (RIGHT SIDE)        */
const showProjects = ref(false)

const projects = [
  { title: 'Payroll and HR Management System Website', role: 'Software Developer - Current' },
  { title: 'Software Management System for Windows', role: 'Software Developer and QA Tester' },
  { title: 'Domestic Hotel and Flights Website', role: 'Back-end Developer and QA Tester' },
  { title: 'Domestic Car Rental Service Website', role: 'Back-end Developer and QA Tester' },
  { title: 'Digital Taxi Booking System used for Company Services', role: 'QA Tester and Automation Developer' },
  { title: 'Conference Room Reservation System', role: 'Software Developer' },
  { title: 'Supply Chain and Financial Management System', role: 'Software Developer and Researcher' },
  { title: 'Learning Management System for New Recruits', role: 'Software Developer and Analyst, Team Leader' },
  { title: 'Cleft lip and Palate Voice Recognition ', role: 'Hardware Developer - Internship' },
  { title: 'RFID Patient Medical Bracelet - Medical Records and Billing', role: 'Hardware Developer - Internship' },
]


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay(char) {
  let delay = 35 + Math.random() * 85
  if (char === ',' || char === '.' || char === '&') delay += 90 + Math.random() * 120
  if (char === ' ') delay *= 0.6
  return delay
}

/*   INTRO SEQUENCE               */
async function runIntro() {
  // ✅ RETURN VISIT: skip typing entirely
  if (props.skipTyping) {
    typedText.value = fullText
    showCursor.value = false
    showCard.value = true
    showProjects.value = true
    return
  }

  // 🧠 FIRST VISIT: typing animation
  await sleep(500)

  for (let i = 0; i < fullText.length; i++) {
    const ch = fullText[i]
    typedText.value += ch
    await sleep(randomDelay(ch))
  }

  await sleep(450)
  showCursor.value = false

  showCard.value = true
  showProjects.value = true
}

/* ✅ Scroll to top + go next */
function goTopAndNext() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  emit('next')
}

onMounted(() => {
  // reset state to avoid stale values
  typedText.value = ''
  showCursor.value = true
  showCard.value = false
  showProjects.value = false

  runIntro()
})
</script>

<template>
  <section class="intro-layout">
    <!-- HEADER -->
    <h2 class="intro-role">
      <span class="typing-text">
        {{ typedText }}
        <span v-if="showCursor" class="caret">|</span>
      </span>
    </h2>

    <!-- LEFT SIDE -->
    <div class="intro-left">
      <Transition name="cardfade">
        <div v-if="showCard" class="intro-card">
          <h3 class="intro-title">Introduction</h3>

          <p>
            Hi, I’m Carl. I’m a Quality Assurance Tester who enjoys making sure
            things work the way they should — and improving them when they don’t.
            I have experience with both manual and automated testing.
          </p>

          <p>
            I am also a Software Developer and enjoy developing web applications.
            I like working closely with teams, learning new tools, and building
            reliable, user-friendly software that people can trust.
          </p>
        </div>
      </Transition>

      <Transition name="cardfade">
        <div v-if="showCard" class="work-card">
          <h3 class="work-title">Work Experience</h3>
          <div class="work-item">
            <p class="work-company">Tsukiden Global Solutions Inc.</p>

            <div class="work-header">
              <span class="work-role">Software Engineer</span>
              <span class="work-date">October 2023 – Present</span>
            </div>
            <p class="work-desc">
              Responsible for manual and automated testing, writing test cases,
              identifying defects, and collaborating with developers to ensure
              software quality.
            </p>
          </div>
<br>
          <div class="work-item">
            <p class="work-company">Melham Construction Corporation</p>
            <div class="work-header">
              <span class="work-role">Hardware Engineer Intern</span>
              <span class="work-date">July 2022 – September 2022</span>
            </div>

            <p class="work-desc">
              Responsible for manual and automated testing, writing test cases,
              identifying defects, and collaborating with developers to ensure
              software quality.
            </p>
          </div>
        </div>
      </Transition>
    </div>

    <!-- RIGHT SIDE -->
    <div class="intro-right">
      <Transition name="projectfade">
        <div v-if="showCard && showProjects" class="projects-card">
          <h3 class="projects-title">Projects Handled</h3>

          <ul class="projects-list">
            <li v-for="p in projects" :key="p.title" class="project-item">
              <p class="project-name">{{ p.title }}</p>
              <p class="project-role">{{ p.role }}</p>
            </li>
          </ul>
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

      <button
        class="nav-btn"
        type="button"
        @click="goTopAndNext"
      >
        Next →
      </button>
    </div>
  </Transition>
</template>
