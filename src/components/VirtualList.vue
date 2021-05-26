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
      default: 600
    },
    gap: {
      type: Number,
      required: false,
      default: 0
    },
    cols: {
      type: Number,
      required: false,
      default: 1
    },
    colsSm: {
      type: Number,
      required: false,
      default: -1
    },
    colsMd: {
      type: Number,
      required: false,
      default: -1
    },
    colsLg: {
      type: Number,
      required: false,
      default: -1
    },
    colsXl: {
      type: Number,
      required: false,
      default: -1
    },
  },
  data: () => ({
    visibleRows: [] as number[],
    scrollTarget: null as null | any,
    columns: 2
  }),
  computed: {
    rowCount(): number {
      return Math.ceil(this.length / this.columns);
    },
  },
  methods: {
    clamp(value: number, min: number, max: number): number {
      return Math.min(Math.max(value, min), max);
    },
    updateVisibleRows() {
      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      const containerStart = (this.$el as HTMLElement).offsetTop;
      const containerHeight = this.rowCount * this.itemHeight;

      const windowStart = this.clamp(scrollTop - this.bufferHeight - containerStart, 0, containerHeight);
      const windowEnd = this.clamp(scrollTop + windowHeight + this.bufferHeight - containerStart, 0, containerHeight);
      const windowSize = windowEnd - windowStart;

      const visibleCount = Math.floor(windowSize / this.itemHeight) + 1;
      const startIndex = Math.floor(windowStart / this.itemHeight);
      
      this.visibleRows = Array.from({ length: visibleCount }, (_, i) => startIndex + i);
    },

    //Taken from https://github.com/Akryum/vue-virtual-scroller/blob/master/src/components/RecycleScroller.vue line 493
    getListenerTarget () {
      let target: any = ScrollParent(this.$el);
      // Fix global scroll target for Chrome and Safari
      if (window.document && (target === window.document.documentElement || target === window.document.body)) {
        target = window;
      }

      this.scrollTarget = target;
    },

    indices(from: number, to: number): number[] {
      to = Math.min(to, this.length);
      return Array.from({length: to - from}, (_, i) => from + i);
    },
    determineScreenLevel(): number {
      if (window.innerWidth < 640) { 
        return 0;
      } else if (window.innerWidth < 768) { 
        return 1;
      } else if (window.innerWidth < 1024) {
        return 2;
      } else if (window.innerWidth < 1280) {
        return 3;
      } else {
        return 4;
      }
    },
    resizeGrid() {
      const p = this.$props;
      const columnSizePerLevel = [p['cols'], p['colsSm'], p['colsMd'], p['colsLg'], p['colsXl']];
      const screenLevel = this.determineScreenLevel();
      let columnSizeForLevel = columnSizePerLevel[screenLevel];
      
      //Means not set
      if (columnSizeForLevel == -1) {
        for (let lvl = screenLevel; lvl >= 0; lvl--) {
          if (columnSizePerLevel[lvl] != -1) {
            columnSizeForLevel = columnSizePerLevel[lvl];
            break;
          }
        }
      }

      this.columns = columnSizeForLevel;
    }
  },
  render() {
    const listHeight = this.itemHeight * this.rowCount;

    return h(
      'div',
      { style: `position: relative; min-height: ${listHeight}px` },
      this.visibleRows.map(
        (rowIndex, i) => {
          console.log(i);

          return h(
            'div',
            { 
              style: `
              position: absolute;
              width: 100%; 
              transform: translateY(${rowIndex * this.itemHeight}px);
              display: grid;
              grid-template-columns: repeat(${this.columns}, 1fr);
              gap: ${this.gap}px;
              `,
              key: i
            },
            this.indices(rowIndex * this.columns, (rowIndex + 1) * this.columns).map(j => {
              return h(
                'div',
                { key: 'no-rerender-key' },
                this.$slots.default?.({ index: j })
              );
            })
          );
        })
      );
  },
  watch: {
    length() {
      this.updateVisibleRows();
    },
    itemHeight() {
      this.updateVisibleRows();
    },
    bufferHeight() {
      this.updateVisibleRows();
    }
  },
  mounted() {
    this.updateVisibleRows();
    this.getListenerTarget();
    this.resizeGrid();

    window.addEventListener('resize', this.updateVisibleRows);
    window.addEventListener('resize', this.resizeGrid);
    this.scrollTarget.addEventListener('scroll', this.updateVisibleRows, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeGrid);
    window.removeEventListener('resize', this.updateVisibleRows);
    this.scrollTarget.removeEventListener('scroll', this.updateVisibleRows);
  }
});
</script>
