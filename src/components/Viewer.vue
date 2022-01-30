<template>
  <div class="flex zoomIn justify-center">
    <div
      class="w-full p-4 bg-white bg-opacity-20 rotate-slidein sm:p-5 sm:my-20 sm:border-2
              sm:border-blue-200 sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg animate-slidein
              backdrop-filter backdrop-blur-lg
      "
    >
      <div class="mb-4 flex items-center sm:mb-5">
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-blue-800">{{ name }}</h1>
          <p class="text-gray-500">{{ nQuestion }} questions</p>
        </div>
        <fade-transition>
          <div v-if="score > 0" class="bg-green-700 bg-opacity-40 rounded text-white px-5 py-2 text-xl font-bold">
            {{ score }}
          </div>
        </fade-transition>
      </div>
      <virtual-list
        :length="nQuestion"
        :item-height="86"
        :cols="3"
        :colsSm="4"
        :colsLg="5"
        :gap="6"
        useDifferentKeyForChild
      >
        <template v-slot="{ index }">
          <view-card
            :question="index + 1"
            :answer="sheet[index + 1] ?? '...'"
            :rightAnswer="rightSheet[index + 1]"
          />
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
import FadeTransition from '@/components/common-transitions/FadeTransition.vue';

export default defineComponent({
  name: 'Viewer',
  components: { ViewCard, VirtualList, FadeTransition },
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
    },
    rightSheet: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showBackground: false
  }),
  computed: {
    score(): number {
      const rights = Object.keys(this.rightSheet).map((question) => {
        return this.rightSheet[question] == this.sheet[question];
      });

      if (rights.length == 0) {
        return 0;
      }

      const rightCount = rights.reduce((count, isRight) => count + (isRight ? 1 : 0), 0);
      const perTen = (rightCount / this.nQuestion) * 10;
      return perTen % 1 == 0 ? perTen : parseFloat(perTen.toFixed(2));
    }
  },
  async mounted() {
    await tsParticles.loadJSON('particles', '/assets/particles.json');
    this.showBackground = true;
  }
});
</script>
