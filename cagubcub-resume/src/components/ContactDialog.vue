<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue"

const props = defineProps({
  open: { type: Boolean, default: false },
  emailTo: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
  resumeUrl: { type: String, required: true }, // ✅ pass "/Cagubcub_Resume.pdf" from App.vue
})

const emit = defineEmits(["close"])

function close() {
  emit("close")
}

function onKeyDown(e) {
  if (props.open && e.key === "Escape") close()
}

/* Lock background scroll */
watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : ""
  },
  { immediate: true }
)

onMounted(() => window.addEventListener("keydown", onKeyDown))
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyDown)
  document.body.style.overflow = ""
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="contact-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Contact dialog"
        @click.self="close"
      >
        <Transition name="modal-pop">
          <div class="contact-modal">
            <header class="contact-header">
              <h2 class="contact-title">Get in Touch</h2>
              <button class="close-btn" @click="close" aria-label="Close">✕</button>
            </header>

            <p class="contact-text">
              I’d be happy to connect — you can reach me using any of the options below.
            </p>

            <div class="contact-actions">
              <!-- LinkedIn -->
              <a
                class="contact-btn primary accent-blue"
                :href="linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 23.5h4V7.98h-4V23.5ZM8.5 7.98h3.83v2.12h.05c.53-1 1.83-2.12 3.76-2.12 4.02 0 4.76 2.65 4.76 6.09v9.43h-4v-8.37c0-2-.04-4.57-2.78-4.57-2.79 0-3.22 2.18-3.22 4.43v8.51h-4V7.98Z"
                  />
                </svg>
                LinkedIn
              </a>

              <!-- Email -->
              <a class="contact-btn primary accent-pink" :href="`mailto:${emailTo}`">
                <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
                  />
                </svg>
                Email Me
              </a>
            </div>

            <!-- Resume -->
            <a
              class="contact-btn secondary accent-orange"
              :href="resumeUrl"
              download="Cagubcub_Resume.pdf"
            >
              <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6 2h9l5 5v15c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2Zm8 1.5V8h4.5L14 3.5ZM7 12.5h10v1.5H7v-1.5Zm0 3h10V17H7v-1.5Zm0 3h7v1.5H7V18.5Z"
                />
              </svg>
              My Resume
            </a>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Overlay */
.contact-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.55);
}
:global(html:not(.dark)) .contact-overlay {
  background: rgba(0, 0, 0, 0.35);
}

/* Modal */
.contact-modal {
  width: min(520px, 92vw);
  border-radius: 18px;
  padding: 1.75rem;

  /* ✅ uses your theme token */
  background: var(--bg-color);

  /* ✅ THIS fixes your “white text in light mode” bug */
  color: var(--text-color);

  /* ✅ border derived from current text color */
  border: 1px solid color-mix(in srgb, var(--text-color) 18%, transparent 82%);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

:global(html:not(.dark)) .contact-modal {
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.18);
}

/* Header */
.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-color); /* ✅ explicit */
  font-size: 1.35rem;
  cursor: pointer;
  opacity: 0.7;
}
.close-btn:hover {
  opacity: 1;
}

.contact-text {
  margin: 0.75rem 0 1.25rem;
  opacity: 0.85;
  line-height: 1.5;
}

/* Buttons */
.contact-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;

  text-decoration: none;
  border-radius: 999px;
  padding: 0.75rem 1.1rem;
  font-weight: 800;

  /* ✅ outline matches current theme (no “dark-mode outline” in light mode) */
  border: 1px solid color-mix(in srgb, var(--text-color) 22%, transparent 78%);
  background: transparent;

  /* text stays readable; accent classes tint it */
  color: inherit;

  transition: transform 0.2s ease, box-shadow 0.25s ease, opacity 0.2s ease;
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  color: currentColor;
}

/* Resume spans full width */
.contact-btn.secondary {
  width: 100%;
}

/* Accent color just tints text/icon */
.accent-blue   { color: rgb(var(--logo-indigo)); }
.accent-pink   { color: rgb(var(--logo-pink)); }
.accent-orange { color: rgb(var(--logo-orange)); }

.contact-btn:hover {
  transform: translateY(-2px);
  opacity: 0.96;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.22);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-pop-enter-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.modal-pop-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>
