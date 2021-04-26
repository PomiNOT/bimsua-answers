<template>
  <flipper :flip-key="expanded" @onComplete="showText = true" :spring="springConfig">
    
  </flipper>
</template>

<script lang="ts">
import { SpringConfig } from 'flip-toolkit/lib/springSettings/types';
import { defineComponent } from 'vue';
import Flipper from './flip/Flipper.vue';

export default defineComponent({
  name: 'Snackbar',
  components: {
    Flipper
  },
  data: () => ({
    expanded: false,
    springConfig: {
      stiffness: 1000,
      damping: 60
    } as SpringConfig
  }),
  mounted() {

  }
});
</script>
