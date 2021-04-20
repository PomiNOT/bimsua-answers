<template>
  <div class="relative p-3 h-screen bg-blue-800">
    <button class="btn btn-white" @click="open = !open">Let's go</button>
    <snackbar :show="open" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Snackbar from './Snackbar.vue';

export default defineComponent({
  name: 'Editor',
  components: { Snackbar },
  data: () => ({
    open: false
  })
});
</script>