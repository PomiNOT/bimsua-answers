<template>
  <flipper :flip-key="{ expanded, page }">
    <slot name="small" v-if="!expanded">
    </slot>

    <div v-else data-flip-key="dialog" class="
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform z-50
      p-5 w-11/12 sm:w-96 overflow-hidden bg-gray-600 bg-opacity-60 rounded-lg
    ">
      <div ref="pageList" data-inverse-flip>
        <slot></slot>
      </div>
    </div>

    <fade-transition>
      <div
        v-if="expanded" 
        @click="$emit('update:expanded', false)"
        class="fixed top-0 left-0 z-40 w-full h-full bg-black
              bg-opacity-10 backdrop-filter backdrop-blur-lg"
      >
      </div>
    </fade-transition>
  </flipper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Flipper from '@/components/flip/Flipper.vue';
import FadeTransition from './common-transitions/FadeTransition.vue';

export default defineComponent({
  name: 'FloatingMenu',
  emits: ['update:expanded'],
  props: {
    expanded: {
      type: Boolean,
      required: false,
      default: false
    },
    page: {
      type: String,
      required: false,
      default: 'main'
    }
  },
  components: { Flipper, FadeTransition },
  methods: {
    updateShowHide() {
      const pageList = this.$refs.pageList as HTMLElement;
      pageList.querySelectorAll('.floating-menu-page[data-page]').forEach(child => {
        let cElement = child as HTMLElement;

        if (cElement.dataset.page == this.page) {
          cElement.classList.remove('hidden');
        } else {
          cElement.classList.add('hidden');
        }
      });
    }
  },
  updated() {
    if (this.expanded) {
      this.updateShowHide();
    }
  }
});
</script>