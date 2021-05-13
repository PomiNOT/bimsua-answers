<template>
  <div class="grid h-screen place-items-center" v-if="!loadingDone">
    <div class="flex flex-col items-center">
      <div class="animate-hover">
        <illustration class="transform origin-center -rotate-12 scale-90" :animated="true" />
      </div>
    </div>
  </div>
  <viewer v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Illustration from '../components/Illustration.vue';
import Viewer from '../components/Viewer.vue';

export default defineComponent({
  name: 'View',
  components: { Illustration, Viewer },
  data: () => ({
    loadingDone: false
  }),
  mounted() {
    setTimeout(() => this.loadingDone = true, 5000);
  }
});
</script>