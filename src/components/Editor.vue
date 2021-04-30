<template>
  <div>
    <header class="
      fixed z-50 w-full backdrop-filter backdrop-blur-md
      bg-gray-200 bg-opacity-50
      h-18 p-2 flex items-center"
    >
      <div class="flex-1 leading-tight">
        <h1 class="text-blue-800 font-bold">Limits</h1>
        <p class="text-gray-500">6 questions</p>
      </div>
      <div class="bg-red-500 flex items-center text-white font-bold px-2 rounded">
        <div class="rounded-full bg-white animate-pulse w-2 h-2"></div>
        <span class="ml-2">LIVE</span>
      </div>
    </header>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2 pt-16">
      <edit-card
        v-for="q in sheet"
        :question="q.question"
        v-model:answer="q.answer"
        :key="q.question"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Snackbar from './Snackbar.vue';
import EditCard from './EditCard.vue';

export default defineComponent({
  name: 'Editor',
  components: { Snackbar, EditCard },
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
  data: () => ({
    sheet: [] as any[]
  }),
  mounted() {
    const answerMap = ['A', 'B', 'C', 'D'];

    for (let i = 0; i < 22; i++) {
      this.sheet.push({
        question: i + 1,
        answer: answerMap[i % 4]
      });
    }
  }
});
</script>