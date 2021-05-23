<script lang="ts">
import { defineComponent, h } from 'vue';

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
    visibleItems: [] as number[]
  }),
  methods: {
    updateVisibleItems() {
      const windowHeight = window.innerHeight;
      const { scrollTop } = document.documentElement;

      const containerStart = (this.$el as HTMLElement).offsetTop;
      const containerEnd = containerStart + this.itemHeight * this.length;

      const windowStart = Math.max(scrollTop - containerStart - this.bufferHeight, 0);
      const windowEnd = Math.min(scrollTop + windowHeight + this.bufferHeight, containerEnd);
      const windowSize = windowEnd - windowStart;

      const visibleCount = Math.floor(windowSize / this.itemHeight);
      const startIndex = Math.floor(windowStart / this.itemHeight);
      
      this.visibleItems = Array.from({ length: visibleCount }, (_, i) => startIndex + i);
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
    window.addEventListener('resize', this.updateVisibleItems);
    window.addEventListener('scroll', this.updateVisibleItems, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateVisibleItems);
    window.removeEventListener('scroll', this.updateVisibleItems);
  }
});
</script>
