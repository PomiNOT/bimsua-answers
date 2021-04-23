<template>
  <flipper>
    <div class="pointer-events-none flex fixed bottom-5 left-0 w-screen justify-center" v-if="show">
      <div data-flip-key="dialog" class="overflow-hidden flex items-center justify-center h-10 w-5/12 bg-white">
        <div class="font-bold" data-inverse-flip>More options</div>
      </div>
    </div>
    <div data-flip-key="dialog" class="pointer-events-none flex fixed top-0 left-0 h-screen w-screen justify-center items-center" v-else>
      <div data-flip-key="dialog" class="overflow-hidden flex items-center justify-center h-64 w-64 bg-white">
        <div class="font-bold" data-inverse-flip>Settings</div>
      </div>
    </div>
  </flipper>
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
