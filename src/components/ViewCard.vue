<template>
  <div class="rounded-lg h-20 bg-white bg-opacity-40 relative">
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
  }
});
</script>
