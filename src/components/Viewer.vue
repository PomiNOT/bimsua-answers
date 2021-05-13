<template>
  <div class="h-screen grid place-items-center">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-blue-800">This feature is not currently implemented.</h1>
      <router-link to="/">
        <button type="button" class="btn mt-6">Go Home</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Viewer'
});
</script>
