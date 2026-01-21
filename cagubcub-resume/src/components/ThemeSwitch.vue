<template>
  <div class="theme-switch-wrapper">
    <span class="theme-label">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>

    <label class="theme-switch">
      <input
        type="checkbox"
        v-model="isDark"
        @change="applyTheme"
        aria-label="Toggle dark mode"
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function setTheme(dark) {
  // ✅ Make BOTH respond (matches your CSS selectors)
  document.documentElement.classList.toggle('dark', dark)
  document.body.classList.toggle('dark', dark)

  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved === 'dark'
  setTheme(isDark.value)
})

function applyTheme() {
  setTheme(isDark.value)
}
</script>
