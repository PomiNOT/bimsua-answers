<template>
  <div class="flex zoomIn justify-center">
    <div 
      class="w-full p-4 bg-white bg-opacity-20 rotate-slidein sm:p-5 sm:my-20 sm:border-2 
              sm:border-blue-200 sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg animate-slidein
              backdrop-filter backdrop-blur-lg
      "
    >
      <div class="mb-4 sm:mb-5">
        <h1 class="text-2xl font-bold text-blue-800">{{ name }}</h1>
        <p class="text-gray-500">{{ nQuestion }} questions</p>
      </div>
      <virtual-list
        :length="nQuestion"
        :item-height="86"
        :cols="3"
        :colsSm="4"
        :colsLg="5"
        :gap="6"
      >
        <template v-slot="{ index }">
          <view-card :question="index + 1" :answer="sheet[index + 1] ?? '...'" />
        </template>
      </virtual-list>
    </div>
    <div
      class="fixed filter blur-md sm:filter-none bg-gradient-to-b transition-opacity duration-300 w-full h-full top-0 left-0"
      :class="{ 'opacity-0': !showBackground }" style="z-index: -1;" id="particles"
    >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { tsParticles } from 'tsparticles';
import ViewCard from '@/components/ViewCard.vue';
import VirtualList from '@/components/VirtualList.vue';

export default defineComponent({
  name: 'Viewer',
  components: { ViewCard, VirtualList },
  props: {
    nQuestion: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    sheet: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showBackground: false
  }),
  async mounted() {
    await tsParticles.loadJSON('particles', '/particles.json');
    this.showBackground = true;
  }
});
</script>
