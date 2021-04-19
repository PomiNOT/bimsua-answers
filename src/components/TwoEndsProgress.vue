<template>
  <div class="flex items-center">
    <div class="relative flex justify-center items-center w-6 h-6 z-10">
      <div
        class="w-6 h-6 rounded-full absolute"
        :class="state >= 0 ? 'bg-blue-600' : 'bg-gray-200'"
      ></div>
      <div v-if="state == 0" class="w-6 h-6 rounded-full border border-blue-600 animate-ping absolute"></div>
    </div>

    <div class="transition flex-1 h-3 transform scale-x-110 z-0" :class="state > 0 ? 'bg-blue-600' : 'bg-gray-200'"></div>

    <div class="relative flex justify-center items-center w-6 h-6 z-10">
      <div
        class="w-6 h-6 rounded-full absolute"
        :class="state >= 1 ? 'bg-blue-600' : 'bg-gray-200'"
      ></div>
      <div v-if="state >= 1" class="w-6 h-6 rounded-full border border-blue-600 animate-ping absolute"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TwoEndsProgress',
  props: {
    state: { type: Number, required: true }
  }
})
</script>