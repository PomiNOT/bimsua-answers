<template>
  <div class="rounded-lg h-20 bg-white bg-opacity-40 relative" :class="{ 'highlighted': highlighted }">
    <div class="absolute top-1 left-2 text-blue-400">{{ question }}</div>
    <div class="h-full grid place-items-center text-blue-600 font-bold text-3xl">{{ answer }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewCard',
  props: {
    question: {
      type: Number,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  data: () => ({
    highlighted: false,
    timeout: null as any
  }),
  watch: {
    answer() {
      if (this.timeout) clearTimeout(this.timeout);

      this.highlighted = true;
      this.timeout = setTimeout(() => {
        this.highlighted = false;
        this.timeout = null;
      }, 2000);
    }
  }
});
</script>

<style scoped>
.highlighted {
  @apply bg-yellow-500 bg-opacity-40 animate-pulse;
}
</style>