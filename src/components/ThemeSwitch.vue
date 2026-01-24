<template>
  <div class="theme-switch-wrapper">
    <span class="theme-label">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>

    <label class="theme-switch">
      <input
        type="checkbox"
        v-model="isDark"
        @change="applyTheme"
        aria-label="Toggle theme"
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/*
  Dark is DEFAULT now.
  Checkbox ON = dark
  Checkbox OFF = light
*/
const isDark = ref(true)

function setTheme(dark) {
  // ✅ toggle LIGHT class (dark is default)
  document.documentElement.classList.toggle('light', !dark)
  document.body.classList.toggle('light', !dark)

  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('theme') ?? 'dark'
  isDark.value = saved === 'dark'
  setTheme(isDark.value)
})

function applyTheme() {
  setTheme(isDark.value)
}
</script>
