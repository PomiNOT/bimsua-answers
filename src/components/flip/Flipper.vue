<script lang="ts">
import { defineComponent } from 'vue';
import Flipping from 'flipping/lib/adapters/web';

export default defineComponent({
  setup(props, context) {
    return () => context.slots.default?.({});
  },
  data: () => ({
    flippingInstance: null as Flipping | null
  }),
  beforeUpdate() {
    this.flippingInstance?.read();
  },
  updated() {
    this.$nextTick(() => {
      this.flippingInstance?.flip();
    });
  },
  mounted() {
    let parent = this.$el.parentElement;

    this.flippingInstance = new Flipping({
      selector: () => {
        return Array.from(parent.querySelectorAll('[data-flip-key]'));
      }
    });
  }
});
</script>