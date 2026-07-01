<script setup lang="ts">
/**
 * Overrides vuepress-theme-plume's VPSocialLinks to add a WeChat (微信公众号)
 * icon with a hover-to-reveal-QR-code tooltip, placed next to the GitHub icon
 * in the navbar.
 *
 * Design (ui-ux-pro-max): glassmorphism tooltip card, dark‑aware, subtle
 * entrance animation, matching the existing social‑link icon grid.
 */
import type { SocialLink as SocialLinkType } from 'vuepress-theme-plume/shared/index.js'
import VPSocialLink from 'vuepress-theme-plume/components/VPSocialLink.vue'
import { ref } from 'vue'

defineProps<{
  links: SocialLinkType[]
}>()

const showQr = ref(false)
</script>

<template>
  <div class="vp-social-links">
    <!-- Render original social links (e.g. GitHub) -->
    <VPSocialLink
      v-for="{ link, icon, ariaLabel } in links"
      :key="link"
      :icon="icon"
      :link="link"
      :aria-label="ariaLabel"
    />

    <!-- WeChat icon with hover QR code -->
    <div
      class="vp-social-link wechat-link no-icon"
      role="button"
      tabindex="0"
      aria-label="wechat"
      @mouseenter="showQr = true"
      @mouseleave="showQr = false"
      @focus="showQr = true"
      @blur="showQr = false"
      @click.prevent
    >
      <img class="vp-icon is-svg wechat-icon" src="/微信公众号.svg" alt="微信" />

      <Transition name="qr">
        <div v-show="showQr" class="wechat-qrcode-wrapper">
          <div class="wechat-qrcode-card">
            <img src="/wxgzh.jpg" alt="扫描微信公众号二维码关注" loading="lazy" />
            <p class="wechat-qrcode-label">扫描微信公众号二维码关注</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.vp-social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* ============================================================
 * WeChat icon — matches VPSocialLink dimensions & interaction
 * ============================================================ */
.wechat-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color var(--vp-t-color);
  cursor: pointer;
  outline: none;
}
.wechat-link:hover,
.wechat-link:focus-visible {
  color: var(--vp-c-text-1);
}
.wechat-link:focus-visible {
  border-radius: 50%;
  outline-offset: 4px;
}
.wechat-link > :deep(.vp-icon.is-svg) {
  width: 20px;
  height: 20px;
  fill: currentcolor;
}

.wechat-icon {
  width: 20px;
  height: 20px;
  display: block;
  opacity: 0.78;
}

[data-theme="dark"] .wechat-icon {
  filter: brightness(2.5);
}

/* ============================================================
 * QR code tooltip — glassmorphism card, square for 430×430 QR
 * ============================================================ */
.wechat-qrcode-wrapper {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding-top: 12px;
}

.wechat-qrcode-card {
  background: var(--vp-c-bg-elv);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 14px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

[data-theme="dark"] .wechat-qrcode-card {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.04) inset;
}

.wechat-qrcode-card img {
  display: block;
  width: 200px;
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
}

.wechat-qrcode-label {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  letter-spacing: 0.02em;
}

/* ============================================================
 * Entrance / exit transition
 * ============================================================ */
.qr-enter-active,
.qr-leave-active {
  transition:
    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.qr-enter-from,
.qr-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
</style>
