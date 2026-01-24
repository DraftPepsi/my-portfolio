// main.js
import { createApp } from "vue"
import App from "./App.vue"
import "./style.css"

function applyTheme(theme) {
  const isDark = theme === "dark"
  document.documentElement.classList.toggle("dark", isDark)
  // optional: keep only if you use this elsewhere
  document.documentElement.setAttribute("data-theme", theme)
}

const saved = localStorage.getItem("theme")
const initial = saved ?? "dark"     // ✅ default to dark if nothing saved
applyTheme(initial)

createApp(App).mount("#app")
