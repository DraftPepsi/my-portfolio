<script setup>
import Projects from './Projects.vue'
import Compilation from './Compilation.vue'

const props = defineProps({
  onPrev: { type: Function, required: true },
  onRestart: { type: Function, required: true },
})
</script>

<template>
  <!-- ONE PAGE wrapper -->
  <section class="skills-page compilation-page">
    <!-- PROJECTS -->
    <Projects />

    <!-- COMPILATION -->
    <Compilation
      :onPrev="props.onPrev"
      :onRestart="props.onRestart"
    />
  </section>
</template>
