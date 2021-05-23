<script lang="ts">
//Virtual List that listens on the page for scroll events.

import { defineComponent, h } from 'vue';
import ScrollParent from 'scrollparent';

export default defineComponent({
  name: 'VirtualList',
  props: {
    length: {
      type: Number,
      required: true
    },
    itemHeight: {
      type: Number,
      required: true
    },
    bufferHeight: {
      type: Number,
      required: false,
      default: 768
    }
  },
  data: () => ({
    visibleItems: [] as number[],
    scrollTarget: null as null | any
  }),
  methods: {
    clamp(value: number, min: number, max: number): number {
      return Math.min(Math.max(value, min), max);
    },
    updateVisibleItems() {
      const windowHeight = window.innerHeight;
      const { scrollTop } = document.documentElement;

      const containerStart = (this.$el as HTMLElement).offsetTop;
      const containerHeight = this.length * this.itemHeight;

      const windowStart = this.clamp(scrollTop - this.bufferHeight - containerStart, 0, containerHeight);
      const windowEnd = this.clamp(scrollTop + windowHeight + this.bufferHeight - containerStart, 0, containerHeight);
      const windowSize = windowEnd - windowStart;

      const visibleCount = Math.floor(windowSize / this.itemHeight) + 1;
      const startIndex = Math.floor(windowStart / this.itemHeight);
      
      this.visibleItems = Array.from({ length: visibleCount }, (_, i) => startIndex + i);
    },

    //Taken from https://github.com/Akryum/vue-virtual-scroller/blob/master/src/components/RecycleScroller.vue line 493
    getListenerTarget () {
      let target: any = ScrollParent(this.$el);
      // Fix global scroll target for Chrome and Safari
      if (window.document && (target === window.document.documentElement || target === window.document.body)) {
        target = window;
      }

      this.scrollTarget = target;
    }

  },
  render() {
    const listHeight = this.itemHeight * this.length;

    return h('div', { style: `min-height: ${listHeight}px` }, this.visibleItems.map(
      (i) => {
        return h(
          'div',
          { style: `position: absolute; width: 100%; transform: translateY(${i * this.itemHeight}px)` },
          this.$slots.default?.({ index: i })
        );
      }
    ));
  },
  watch: {
    length() {
      this.updateVisibleItems();
    },
    itemHeight() {
      this.updateVisibleItems();
    },
    bufferHeight() {
      this.updateVisibleItems();
    }
  },
  mounted() {
    this.updateVisibleItems();
    this.getListenerTarget();

    window.addEventListener('resize', this.updateVisibleItems);
    this.scrollTarget.addEventListener('scroll', this.updateVisibleItems, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateVisibleItems);
    this.scrollTarget.removeEventListener('scroll', this.updateVisibleItems);
  }
});
</script>
