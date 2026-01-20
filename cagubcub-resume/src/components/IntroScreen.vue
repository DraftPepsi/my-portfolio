<template>
  <div class="intro" @click="$emit('enter')">
    <Transition name="textfade">
      <h1 v-if="showText" class="intro-title">Hello, I'm Carl!</h1>
    </Transition>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ThemeSwitch from './ThemeSwitch.vue'

const showText = ref(false)
let timerId = null

onMounted(() => {
  timerId = setTimeout(() => {
    showText.value = true
  }, 500)
})

onBeforeUnmount(() => {
  if (timerId) clearTimeout(timerId)
})
</script>
<style scoped>
.intro-title {
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  font-size: clamp(2.4rem, 5.5vw, 3.2rem);
  font-weight: 600;        /* ← slightly bolder */
  line-height: 1.15;
  text-align: center;
}
</style>
