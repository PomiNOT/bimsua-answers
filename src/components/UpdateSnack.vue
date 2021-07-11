<template>
  <teleport to="body">
    <bounce-transition>
      <div v-if="visible" class="fixed inline-flex bottom-5 right-5" style="z-index: 200;">
        <button
          type="button"
          @click="$emit('click')"
          class="
            bg-white
            shadow-lg px-3 h-9 rounded-lg font-bold text-blue-800
            overflow-hidden select-none ease-out-sine
            transition-sizing duration-300
            focus:outline-none focus:ring focus:ring-gray-300
            active:bg-gray-200
          "
          :class="shrink ? (status == 2 ? 'w-38' : 'w-10') : 'w-72'"
          title="Click to update to the latest version."
        >
          <div class="h-full">
            <div
              class="h-full transition-transform duration-300 whitespace-nowrap"
              :style="`transform: translateY(-${page*100}%)`"
            >
              <div class="h-full flex items-center" :class="{ 'w-0': shrink }">
                <span class="mr-2">🎉</span> A new version is available!
              </div>
              <div class="h-full flex items-center" :class="{ 'w-0': shrink }">
                <span class="mr-2">👆</span> Refresh or click here.
              </div>
              <div class="h-full flex items-center">
                <span class="mr-2">🔄</span>
              </div>
              <div class="h-full flex items-center">
                <span class="mr-2">🥳</span> Up to date!
              </div>
            </div>
          </div>
        </button>
      </div>
    </bounce-transition>
  </teleport>
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
  emits: ['click'],
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
    shrink: false,
    timeouts: [] as number[]
  }),
  watch: {
    status() {
      this.timeouts.forEach(clearTimeout);

      if (this.status == UpdateSnackStatus.STATUS_SEEN_UPDATE) {
        this.page = 2;
        this.shrink = true;
      } else if (this.status == UpdateSnackStatus.STATUS_UP_TO_DATE) {
        this.page = 3;
        this.shrink = true;
      }

      if (this.status == UpdateSnackStatus.STATUS_NEW_UPDATE) {
        this.timeouts[0] = setTimeout(() => this.page++, 3000);
        this.timeouts[1] = setTimeout(() => this.page++, 6000);
        this.timeouts[2] = setTimeout(() => this.shrink = true, 6500);
      }
    }
  }
});
</script>