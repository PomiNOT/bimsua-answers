<template>
  <div class="font-inter">
    <router-view v-slot="{ Component }">
      <fade-transition mode="out-in">
        <component :is="Component" />
      </fade-transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FadeTransition from './components/common-transitions/FadeTransition.vue';

export default defineComponent({
  components: { FadeTransition },
  name: 'App',
});
</script>

<style>
</style>
