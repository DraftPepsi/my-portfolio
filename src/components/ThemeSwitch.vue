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
import { ref, onMounted } from "vue"

const isDark = ref(true) // dark default

function setTheme(dark) {
  // Dark is default; Light adds class
  document.documentElement.classList.toggle("light", !dark)
  localStorage.setItem("theme", dark ? "dark" : "light")
}

onMounted(() => {
  const saved = localStorage.getItem("theme") ?? "dark"
  isDark.value = saved === "dark"
  setTheme(isDark.value)
})

function applyTheme() {
  setTheme(isDark.value)
}
</script>
