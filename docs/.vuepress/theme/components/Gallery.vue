<script setup lang="ts">
import { computed } from 'vue'

const isDev = import.meta.env.DEV
const frameSrc = computed(() =>
  isDev ? 'http://localhost:13333' : '/gallery-app/index.html',
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
.gallery-wrapper {
  position: fixed;
  inset: var(--vp-nav-height, 56px) 0 0 0;
  z-index: 0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)),
    url('/desktop.png') center / cover no-repeat fixed;
}

.gallery-frame {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
