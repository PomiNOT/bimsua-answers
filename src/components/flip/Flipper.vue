<script lang="ts">
import { defineComponent } from 'vue';
import { Flipper } from 'flip-toolkit';

export default defineComponent({
  setup(props, context) {
    return () => context.slots.default?.({});
  },
  data: () => ({
    flippingInstance: null as Flipper | null
  }),
  beforeUpdate() {
    this.flippingInstance?.recordBeforeUpdate();
  },
  updated() {
    this.$nextTick(() => {
      this.updateFlipList();
      this.flippingInstance?.update(null, null);
    });
  },
  methods: {
    updateFlipList() {
      let parent = this.$el.parentElement;

      parent.querySelectorAll('[data-flip-key]').forEach((flipElement: Element) => {
        this.flippingInstance?.addFlipped({
          element: flipElement as HTMLElement,
          flipId: (flipElement as HTMLElement).dataset.flipKey,
          children: null
        });

        flipElement
          .querySelectorAll('[data-inverse-flip]')
          .forEach((inverseFlipElement: Element) => {
            this.flippingInstance?.addInverted({
              element: inverseFlipElement as HTMLElement,
              parent: flipElement as HTMLElement,
              opacity: true,
              translate: false,
              scale: true,
              transformOrigin: 'center'
            });
          });
      });
    }
  },
  mounted() {
    let parent = this.$el.parentElement;

    this.flippingInstance = new Flipper({
      element: parent
    });

    this.updateFlipList();
  }
});
</script>