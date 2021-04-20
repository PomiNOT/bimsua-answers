<template>
  <div class="fixed w-screen flex justify-center left-0 bottom-8 z-50">
    <bounce-transition>
      <div v-show="show" :class="show ? '' : 'delay-500'">
        <div
          class="
            transition-all duration-500 bg-white
            rounded h-12 overflow-hidden whitespace-nowrap
            flex items-center shadow-xl
            px-4
          "
          :class="expand ? 'w-72 sm:w-96' : 'w-12'"
        >
          <fade-transition>
            <span v-show="show" class="font-bold" :class="show ? 'delay-500' : ''">Answer changed from A to B</span>
          </fade-transition>
        </div>
      </div>
    </bounce-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Flipper, Flipped } from 'vue-flip-toolkit';
import BounceTransition from './common-transitions/BounceTransition.vue';
import FadeTransition from './common-transitions/FadeTransition.vue';

export default defineComponent({
  name: 'Snackbar',
  components: {
    Flipper, Flipped, FadeTransition,
    BounceTransition
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    expand: false,
    timeout: 0
  }),
  watch: {
    show(show) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      
      if (show) {
        this.timeout = setTimeout(() => {
          this.expand = true;
        }, 400);
      } else {
        this.expand = false;
      }
    }
  }
});
</script>