<script setup lang="ts">
import { computed } from 'vue'

const isDev = import.meta.env.DEV
const frameSrc = computed(() =>
  isDev ? 'http://localhost:13333?embed=1' : '/gallery-app/index.html?embed=1',
)
</script>

<template>
  <div class="gallery-wrapper">
    <iframe
      :src="frameSrc"
      class="gallery-frame"
      title="Gallery"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
/* Background: match blog pages — semi-white + desktop.png wallpaper */
.gallery-wrapper {
  position: fixed;
  inset: var(--vp-nav-height, 56px) 0 0 0;
  z-index: 0;
  background-color: rgba(255, 255, 255, 0.92);
}

/* Faint desktop.png wallpaper behind the iframe — matches body::before on blog pages */
.gallery-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: url('/desktop.png') center / cover no-repeat fixed;
  opacity: 0.12;
  pointer-events: none;
}

[data-theme='dark'] .gallery-wrapper {
  background-color: rgba(27, 27, 31, 0.88);
}

.gallery-frame {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
