<template>
  <!-- Global theme toggle -->
  <div class="global-theme-switch">
    <ThemeSwitch />
  </div>

<!-- Intro screen (first load only) -->
<Transition name="fade" mode="out-in">
  <div :key="showIntro ? 'intro' : 'main'">
    <IntroScreen
      v-if="showIntro"
      @enter="showIntro = false"
    />

    <!-- Main content (pages) -->
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


            <TechSkills
              v-else-if="currentPage === 2"
              :showPrev="currentPage > MIN_PAGE"
              :onPrev="prevPage"
              :onNext="nextPage"
            />

            <OtherSkills
              v-else-if="currentPage === 3"
              :onPrev="prevPage"
              :onNext="nextPage"
            />

            <CompilationPage
              v-else-if="currentPage === 4"
              :onPrev="prevPage"
              :onRestart="restartToIntro"
              />

          </div>
        </Transition>
      </div>
    </main>
  </div>
</Transition>
</template>

<script setup>
import { ref } from 'vue'

import ThemeSwitch from './components/ThemeSwitch.vue'
import IntroScreen from './components/IntroScreen.vue'
import Introduction from './components/Introduction.vue'
import TechSkills from './components/TechSkills.vue'
import OtherSkills from './components/OtherSkills.vue'
import Compilation from './components/Compilation.vue'
import CompilationPage from './components/CompilationPage.vue'


const showIntro = ref(true)
const currentPage = ref(1)
const hasVisitedIntro = ref(false)

const MIN_PAGE = 1
const MAX_PAGE = 4

function nextPage() {
  if (currentPage.value < MAX_PAGE) currentPage.value++
}

function prevPage() {
  if (currentPage.value > MIN_PAGE) currentPage.value--
}

function goNextFromIntro() {
  hasVisitedIntro.value = true
  nextPage()
}

/* Optional: used by Compilation "Back to Top / Restart" button */
function restartToIntro() {
  currentPage.value = 1
  hasVisitedIntro.value = true
}
</script>
