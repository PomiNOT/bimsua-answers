<template>
  <div class="flex flex-col justify-center w-28 h-32 px-2 bg-gray-200 rounded-md shadow-lg">
    <div class="mb-2">
      <div class="w-4 h-4 bg-green-700 rounded-full"></div>
    </div>
    <div>
      <div class="bg-blue-600 mb-2 h-2 w-3/4 rounded"></div>
      <div class="bg-blue-600 mb-2 h-2 w-2/4 rounded"></div>
      <div class="bg-blue-600 mb-2 h-2 w-full rounded"></div>
      <div class="bg-blue-600 mb-2 h-2 w-1/4 rounded"></div>
      <div class="bg-blue-600 mb-2 h-2 w-3/4 rounded"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Illustration'
});
</script>