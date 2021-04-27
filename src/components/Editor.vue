<template>
  <div class="border-2 border-blue-600">
    <header class="p-2 flex items-center bg-gray-300">
      <div class="flex-1 leading-tight">
        <h1 class="text-blue-800 font-bold">Limits</h1>
        <p class="text-gray-500">6 questions</p>
      </div>
      <div class="bg-red-500 flex items-center text-white font-bold px-2 rounded">
        <div class="rounded-full bg-white animate-pulse w-2 h-2"></div>
        <span class="ml-2">LIVE {{ timeLive }}</span>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Snackbar from './Snackbar.vue';

export default defineComponent({
  name: 'Editor',
  components: { Snackbar },
  methods: {
    formatDuration(seconds: number): string {
      if (seconds < 0) throw new Error('Duration must be positive.');
      seconds = Math.floor(seconds);
      let hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
      let mins = (Math.floor(seconds / 60) % 60).toString().padStart(2, '0');
      let secs = (seconds % 60).toString().padStart(2, '0');

      return `${hours}:${mins}:${secs}`;
    }
  },
  computed: {
    timeLive(): string {
      return this.formatDuration(this.seconds);
    }
  },
  data: () => ({
    seconds: 0,
  }),
  mounted() {
    setInterval(() => this.seconds++, 1000);
  }
});
</script>