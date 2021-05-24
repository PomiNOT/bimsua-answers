<template>
  <div class="flex zoomIn justify-center">
    <div 
      class="w-full p-4 bg-white bg-opacity-20 backdrop-filter 
              backdrop-blur-md rotate-slidein sm:p-5 sm:my-20 sm:border-2 
              sm:border-blue-200 sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg animate-slidein"
    >
      <div class="mb-4 sm:mb-5">
        <h1 class="text-2xl font-bold text-blue-800">How the Universe works</h1>
        <p class="text-gray-500">{{ sheet.length }} questions</p>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        <view-card v-for="ans in sheet" :question="ans.question" :answer="ans.answer" :key="ans.question"/>
      </div>
    </div>
    <div
      class="fixed bg-gradient-to-b transition-opacity duration-300 w-full h-full top-0 left-0"
      :class="{ 'opacity-0': !showBackground }" style="z-index: -1;" id="particles"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { tsParticles } from 'tsparticles';
import ViewCard from '@/components/ViewCard.vue';
import firebase from '@/firebase';

export default defineComponent({
  name: 'Viewer',
  components: { ViewCard },
  data: () => ({
    sheet: [] as any[],
    showBackground: false
  }),
  async mounted() {
    await tsParticles.loadJSON('particles', '/particles.json');
    this.showBackground = true;
  }
});
</script>
