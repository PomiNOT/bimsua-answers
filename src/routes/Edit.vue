<template>
  <div class="font-inter h-screen grid place-items-center">
    <div class="flex flex-col items-center">
      <two-ends-progress class="w-48 sm:w-64" :state="state" />
      <div class="mt-8 text-center">
        <h1 class="font-bold text-blue-800 text-2xl animate-slidein">You're going live!</h1>
        <p class="text-gray-500 opacity-0 animate-slidein anim-delay-100">
          {{ stateToText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TwoEndsProgress from '../components/TwoEndsProgress.vue';

export default defineComponent({
  name: 'Edit',
  components: { TwoEndsProgress },
  data: () => ({
    state: 0
  }),
  computed: {
    stateToText(): string {
      return this.state == 0 ? 'Connecting to the server...' : 'Logging in...';
    }
  },
  mounted() {
    setTimeout(() => this.state++, 1000);
  }
});
</script>