<template>
  <div class="rounded-lg h-20 border-2 border-blue-200 bg-white shadow-md relative">
    <div class="absolute top-1 left-2 text-blue-600">5</div>
    <div class="h-full grid place-items-center text-blue-500 font-bold text-3xl">A</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewCard'
});
</script>
