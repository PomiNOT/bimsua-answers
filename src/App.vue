<template>
  <router-view v-slot="{ Component }">
    <fade-transition mode="out-in">
      <component :is="Component" />
    </fade-transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FadeTransition from '@/components/common-transitions/FadeTransition.vue';

export default defineComponent({
  components: { FadeTransition },
  name: "App",
  methods: {
    installViewportCorrectionPlugin() {
      //Copied from postcss-viewport-height-correction's github
      var customViewportCorrectionVariable = "vh";

      function setViewportProperty(doc: HTMLElement) {
        var prevClientHeight: any;
        var customVar = "--" + (customViewportCorrectionVariable || "vh");
        function handleResize() {
          var clientHeight = doc.clientHeight;
          if (clientHeight === prevClientHeight) return;
          requestAnimationFrame(function updateViewportHeight() {
            doc.style.setProperty(customVar, clientHeight * 0.01 + "px");
            prevClientHeight = clientHeight;
          });
        }
        handleResize();
        return handleResize;
      }

      window.addEventListener(
        "resize",
        setViewportProperty(document.documentElement)
      );
    }
  },
  mounted() {
    this.installViewportCorrectionPlugin();
  }
});
</script>

<style>
.firebase-emulator-warning {
  width: 200px !important;
  bottom: 5px !important;
  left: 5px !important;
  top: 5px !important;
  bottom: initial !important;
  padding: 5px;
  transform-origin: center;
  pointer-events: none;
  touch-action: none;
  animation: disappear forwards;
  animation-duration: 300ms;
  animation-delay: 6s;
  @apply rounded-lg bg-white shadow font-bold;
}

@keyframes disappear {
 from {
   opacity: 1;
 }
 to {
   opacity: 0;
   transform: scale(0);
 }
}
</style>
