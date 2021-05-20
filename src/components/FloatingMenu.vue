<template>
  <flipper :flip-key="{ expanded, page }">
    <div class="fixed w-full flex justify-center z-50 bottom-7 left-0" v-if="!expanded">
      <button
        data-flip-key="dialog"
        type="button"
        @click="$emit('update:expanded', true)"
        class="
          px-5 py-2 rounded-full
          bg-gray-600 font-bold text-white
          bg-opacity-50 focus:outline-none focus:bg-opacity-90 backdrop-filter backdrop-blur-lg
        "
      >
        {{ buttonName }}
      </button>
    </div>
    <div class="fixed bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg px-2 top-0 left-0 z-50 w-full h-full grid place-items-center" v-else>
      <div data-flip-key="dialog" class="p-5 w-full sm:w-96 overflow-hidden bg-gray-600 bg-opacity-60 rounded-lg">
        <div ref="pageList" data-inverse-flip>
          <slot></slot>
        </div>
      </div>
    </div>
  </flipper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Flipper from '@/components/flip/Flipper.vue';

export default defineComponent({
  name: 'FloatingMenu',
  emits: ['update:expanded'],
  props: {
    expanded: {
      type: Boolean,
      required: false,
      default: false
    },
    buttonName: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: false,
      default: 'main'
    }
  },
  components: { Flipper },
  methods: {
    updateShowHide() {
      const pageList = this.$refs.pageList as HTMLElement;
      pageList.querySelectorAll('.floating-menu-page[data-page]').forEach(child => {
        if (child.dataset.page == this.page) {
          child.classList.remove('hidden');
        } else {
          child.classList.add('hidden');
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