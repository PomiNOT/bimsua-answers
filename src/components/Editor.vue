<template>
  <div class="relative p-3 h-screen bg-gray-200">
    <snackbar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Snackbar from './Snackbar.vue';

export default defineComponent({
  name: 'Editor',
  components: { Snackbar }
});
</script>