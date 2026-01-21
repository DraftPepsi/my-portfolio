<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  emailTo: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
  resumeUrl: { type: String, required: true }, // PDF path
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function onKeyDown(e) {
  if (props.open && e.key === 'Escape') close()
}

/* Lock background scroll */
watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
  { immediate: true }
)

onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = ''
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
        <div class="contact-modal" v-if="open">
          <header class="contact-header">
            <h2 class="contact-title">Get in Touch</h2>
            <button class="close-btn" @click="close" aria-label="Close">
              ✕
            </button>
          </header>

          <p class="contact-text">
            You can reach me through any of the options below.
          </p>

          <div class="contact-actions">
            <a
              class="contact-btn primary"
              :href="linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <a
              class="contact-btn primary"
              :href="`mailto:${emailTo}`"
            >
              Email Me
            </a>
          </div>

          <a
            class="contact-btn secondary"
            :href="resumeUrl"
            download
          >
            Download Resume (PDF)
          </a>
        </div>
      </Transition>
    </div>
  </Transition>
</Teleport>

</template>

<style scoped>
/* Darken background & block interaction */
.contact-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-items: center;
  padding: 1.5rem;

  /* ✅ prevents visual bleed-through + re-compositing seams */
  isolation: isolate;
  contain: paint;
}

/* Solid modal — follows theme */
.contact-modal {
  width: min(420px, 100%);
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 18px;
  padding: 1.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);

  /* ✅ keep modal on its own clean layer */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Header */
.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: inherit;
  cursor: pointer;
  opacity: 0.75;
}

.close-btn:hover {
  opacity: 1;
}

/* Text */
.contact-text {
  margin: 0.75rem 0 1.25rem;
  opacity: 0.85;
  line-height: 1.5;
}

/* Buttons */
.contact-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  font-weight: 600;

  /* ✅ remove transform hover to prevent seams */
  transition: opacity 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

/* Main buttons */
.contact-btn.primary {
  background: var(--nav-btn-bg);
  color: var(--nav-btn-text);
  border: 1px solid var(--nav-btn-border);
}

.contact-btn.primary:hover {
  opacity: 0.92;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
}

/* Resume button */
.contact-btn.secondary {
  width: 100%;
  background: transparent;
  border: 1px dashed var(--nav-btn-border);
  color: inherit;
}

.contact-btn.secondary:hover {
  opacity: 0.9;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
}

/* ===== Overlay fade ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== Modal pop (fade + scale) ===== */
.modal-pop-enter-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.modal-pop-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.modal-pop-enter-from {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}

.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}

/* Accessibility: reduce motion */
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .modal-pop-enter-active,
  .modal-pop-leave-active {
    transition: none;
  }
}
</style>