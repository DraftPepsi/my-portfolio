<template>
  <div class="theme-switch-wrapper">
    <span class="theme-label">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>

    <label class="theme-switch">
      <input type="checkbox" v-model="isDark" @change="applyTheme" />
      <span class="slider"></span>
    </label>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.body.classList.add('dark')
  }
})

function applyTheme() {
  document.body.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>
