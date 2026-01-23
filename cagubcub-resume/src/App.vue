<template>
  <!-- 🧭 Navbar (fixed). Hidden on IntroScreen -->
  <Navbar
    v-if="!showIntro"
    :currentPage="currentPage"
    :onGoAbout="() => goToPage(1)"
    :onGoSkills="() => goToPage(2)"
    :onGoExperience="() => goToPage(3)"
    :onOpenContact="openContactDialog"
    :onGoIntro="goToIntro"
  />

  <!-- ⬇️ Page content (transitions happen here) -->
  <Transition name="fade" mode="out-in">
    <div :key="showIntro ? 'intro' : 'main'">
      <IntroScreen v-if="showIntro" @enter="showIntro = false" />

      <main v-else>
        <div class="page">
          <Transition name="pagefade" mode="out-in">
            <div :key="currentPage">
              <Introduction
                v-if="currentPage === 1"
                :key="'intro-page-' + hasVisitedIntro"
                :skipTyping="hasVisitedIntro"
                @next="goNextFromIntro"
              />

              <SkillsPage
                v-else-if="currentPage === 2"
                :showPrev="true"
                :onPrev="prevPage"
                :onNext="nextPage"
              />

              <CompilationPage
                v-else-if="currentPage === 3"
                :onPrev="prevPage"
                :onContact="openContactDialog"
                :onGoAbout="() => goToPage(1)"
              />
            </div>
          </Transition>
        </div>
      </main>
    </div>
  </Transition>

  <!-- 📩 Contact Modal (global, outside page transitions) -->
  <ContactDialog
    :open="isContactOpen"
    emailTo="pcagubcub@gmail.com"
    linkedinUrl="https://www.linkedin.com/in/ccagubcub/"
    resumeUrl="/public/Cagubcub_Resume.pdf"
    @close="isContactOpen = false"
  />
</template>

<script setup>
import { ref } from "vue"

import Navbar from "./components/Navbar.vue"
import IntroScreen from "./components/IntroScreen.vue"
import Introduction from "./components/Introduction.vue"
import SkillsPage from "./components/SkillsPage.vue"
import CompilationPage from "./components/CompilationPage.vue"
import ContactDialog from "./components/ContactDialog.vue"

const showIntro = ref(true)
const currentPage = ref(1)
const hasVisitedIntro = ref(false)

const isContactOpen = ref(false)

const MIN_PAGE = 1
const MAX_PAGE = 3

function nextPage() {
  if (currentPage.value < MAX_PAGE) currentPage.value++
}

function prevPage() {
  if (currentPage.value > MIN_PAGE) {
    const next = currentPage.value - 1

    // ✅ If we are going back to About (page 1), skip typing
    if (next === 1) hasVisitedIntro.value = true

    currentPage.value = next
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

function goNextFromIntro() {
  // ✅ After the first time leaving About, never type again when returning
  hasVisitedIntro.value = true
  nextPage()
}

function goToPage(page) {
  // ✅ If navigating to About via navbar, skip typing (same as Prev behavior)
  if (page === 1 && !showIntro.value) {
    hasVisitedIntro.value = true
  }

  window.scrollTo({ top: 0, behavior: "smooth" })
  currentPage.value = page
}

/* ✅ NEW: return to IntroScreen when clicking your brand/logo */
function goToIntro() {
  window.scrollTo({ top: 0, behavior: "smooth" })

  // Optional: close contact modal if open
  isContactOpen.value = false

  // Optional: reset to About so after intro you land cleanly
  currentPage.value = 1

  // Show IntroScreen again
  showIntro.value = true
}

function openContactDialog() {
  window.scrollTo({ top: 0, behavior: "smooth" })
  isContactOpen.value = true
}
</script>
