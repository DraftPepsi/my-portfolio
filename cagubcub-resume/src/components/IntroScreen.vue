<template>
  <div class="intro" @click="$emit('enter')">
    <Transition name="textfade">
      <div v-if="showText" class="intro-text">
        <h1 class="intro-title">Hello, I'm Carl!</h1>
        <p class="intro-hint">Click anywhere to continue</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

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

