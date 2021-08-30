<template>
  <div class="flex flex-col text-center items-center">
    <img width="50" height="50" src="/wifi-off.svg" alt="No Connection">
    <h1 class="text-blue-800 font-bold text-3xl">No Connection</h1>
    <p class="text-gray-500">Please check your Wi-Fi or Ethernet settings.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Offline'
});
</script>
