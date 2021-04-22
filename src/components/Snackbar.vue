<template>
  <div class="fixed w-screen flex justify-center left-0 bottom-8 z-50">
    <flipper>
      <div data-flip-key="box" class="transition-all duration-500 bg-white h-10" :class="show ? 'w-1 opacity-0' : 'w-3/4'"></div>
    </flipper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Flipper from './flip/Flipper.vue';

export default defineComponent({
  name: 'Snackbar',
  components: {
    Flipper
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
});
</script>
