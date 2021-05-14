<template>
  <div class="px-4">
    <div class="text-center py-5">
      <h1 class="text-2xl font-bold text-blue-800">Your stuff hee</h1>
      <p class="text-gray-500">17 questions</p>
    </div>
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4">
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
      <view-card />
    </div>
    <div class="fixed w-full h-full top-0 left-0" style="z-index: -1;" id="particles"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { tsParticles } from 'tsparticles';
import ViewCard from './ViewCard.vue';

export default defineComponent({
  name: 'Viewer',
  components: { ViewCard },
  mounted() {
    tsParticles.loadJSON('particles', 'particles.json');
  }
});
</script>
