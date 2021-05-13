<template>
  <div class="flex flex-col justify-center w-28 h-32 px-2 bg-gray-200 rounded-md shadow-lg">
    <div class="mb-2">
      <div class="w-4 h-4 bg-green-700 rounded-full"></div>
    </div>
    <div>
      <div style="--index: 0" :class="{ animScaleUpAndDown: animated }" class="bg-blue-600 mb-2 h-2 w-3/4 rounded"></div>
      <div style="--index: 1" :class="{ animScaleUpAndDown: animated }" class="bg-blue-600 mb-2 h-2 w-2/4 rounded"></div>
      <div style="--index: 2" :class="{ animScaleUpAndDown: animated }" class="bg-blue-600 mb-2 h-2 w-full rounded"></div>
      <div style="--index: 3" :class="{ animScaleUpAndDown: animated }" class="bg-blue-600 mb-2 h-2 w-1/4 rounded"></div>
      <div style="--index: 4" :class="{ animScaleUpAndDown: animated }" class="bg-blue-600 mb-2 h-2 w-3/4 rounded"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Illustration',
  props: {
    animated: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<style scoped>
.animScaleUpAndDown {
  transform-origin: left;
  animation: scaleUpAndScaleDown 3s infinite;
  animation-delay: calc(var(--index) * 100ms);
}

@keyframes scaleUpAndScaleDown {
  0% {
    transform: scaleX(1);
  }
  20% {
    transform: scaleX(1);
  }
  30% {
    transform: scaleX(0);
  }
  40% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>