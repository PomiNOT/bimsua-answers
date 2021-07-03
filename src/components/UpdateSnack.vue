<template>
  <bounce-transition>
    <div v-if="modelValue" class="fixed bottom-5 px-2 w-full flex justify-center" style="z-index: 200;">
      <div class="
        bg-white bg-opacity-70 backdrop-filter backdrop-blur-md
        shadow-lg px-3 h-9 rounded-lg font-bold text-blue-800
        overflow-hidden
      " data-flip-key="snack">
        <div
          class="h-full transition-transform duration-300"
          :style="`transform: translateY(-${page*100}%)`"
          data-inverse-flip
        >
          <div class="h-full flex items-center">
            <span class="mr-2">🎉</span> A new version is available!
          </div>
          <div class="h-full flex items-center">
            <span class="mr-2">🔄</span> Click here to refresh
          </div>
        </div>
      </div>
    </div>
  </bounce-transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BounceTransition from '@/components/common-transitions/BounceTransition.vue';

export default defineComponent({
  name: 'UpdateSnack',
  components: { BounceTransition },
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data: () => ({
    page: 0
  }),
  mounted() {
    setTimeout(() => this.page++, 5000);
    setTimeout(() => this.$emit('update:modelValue', false), 10000);
  }
});
</script>