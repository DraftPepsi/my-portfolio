<script setup>
import Projects from './Projects.vue'
import Compilation from './Compilation.vue'

const props = defineProps({
  onPrev: { type: Function, required: true },
  onContact: { type: Function, required: true },
  onGoAbout: { type: Function, required: true }, // 👈 new
})

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handlePrev() {
  scrollTop()
  props.onPrev()
}

function handleContact() {
  scrollTop()
  props.onContact()
}

function handleBackToAbout() {
  scrollTop()
  props.onGoAbout()
}
</script>

<template>
  <section class="skills-page compilation-page">
    <Projects />
    <Compilation />

    <div class="nav-row">
      <button class="nav-btn" type="button" @click="handlePrev">
        ← Prev
      </button>

      <button
        class="nav-btn nav-btn-primary"
        type="button"
        @click="handleContact"
      >
        Contact Me
      </button>

      <button class="nav-btn" type="button" @click="handleBackToAbout">
        Back to Top ↑ 
      </button>
    </div>
  </section>
</template>
