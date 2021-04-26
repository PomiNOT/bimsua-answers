<template>
  <router-view v-slot="{ Component }">
    <fade-transition mode="out-in">
      <component :is="Component" />
    </fade-transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FadeTransition from "./components/common-transitions/FadeTransition.vue";

export default defineComponent({
  components: { FadeTransition },
  name: "App",
  mounted() {
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
  },
});
</script>

<style>
</style>
