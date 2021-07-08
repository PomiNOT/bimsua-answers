<template>
  <bounce-transition>
    <div
      style="z-index: 200;"
      class="
        bg-white bg-opacity-50 backdrop-filter backdrop-blur-md
        shadow-lg px-3 h-9 rounded-lg font-bold text-blue-800
        overflow-hidden select-none cursor-pointer transition-all duration-300
        fixed bottom-5 right-5
      "
      :class="shrink ? 'w-36' : 'w-72'"
      v-if="visible"
      title="Click to update to the latest version."
    >
      <div class="h-full" data-inverse-flip>
        <div
          class="h-full transition-transform duration-300"
          :style="`transform: translateY(-${page*100}%)`"
        >
          <div class="h-full flex items-center" :class="{ 'no-width': shrink }">
            <span class="mr-2">🎉</span> A new version is available!
          </div>
          <div class="h-full flex items-center" :class="{ 'no-width': shrink }">
            <span class="mr-2">👆</span> Refresh or click here.
          </div>
          <div class="h-full flex items-center">
            <span class="mr-2">🔄</span> Update app
          </div>
          <div class="h-full flex items-center">
            <span class="mr-2">🥳</span> App updated!
          </div>
        </div>
      </div>
    </div>
  </bounce-transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BounceTransition from '@/components/common-transitions/BounceTransition.vue';

export enum UpdateSnackStatus {
  STATUS_NEW_UPDATE,
  STATUS_SEEN_UPDATE,
  STATUS_UP_TO_DATE
}

export default defineComponent({
  name: 'UpdateSnack',
  components: { BounceTransition },
  props: {
    status: {
      type: Number as PropType<UpdateSnackStatus>,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    page: 0,
    shrink: false
  }),
  async beforeMount() {
    if (this.status == UpdateSnackStatus.STATUS_SEEN_UPDATE) {
      this.page = 2;
      this.shrink = true;
    } else if (this.status == UpdateSnackStatus.STATUS_UP_TO_DATE) {
      this.page = 3;
      this.shrink = true;
    }
  },
  async mounted() {
    if (this.status == UpdateSnackStatus.STATUS_NEW_UPDATE) {
      setTimeout(() => this.page++, 5000);
      setTimeout(() => this.page++, 8000);
      setTimeout(() => this.shrink = true, 8500);
    }
  }
});
</script>

<style scoped>
.no-width {
  width: 0;
  white-space: nowrap;
}
</style>