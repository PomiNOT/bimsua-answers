<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { Flipper } from 'flip-toolkit';
import { SpringConfig } from 'flip-toolkit/lib/springSettings/types';
import isEqual from 'lodash.isequal';

export default defineComponent({
  name: 'Flipper',
  setup(props, context) {
    return () => context.slots.default?.({});
  },
  emits: ['onComplete'],
  props: {
    spring: {
      type: Object,
      required: false
    },
    flipKey: {
      type: [String, Number, Boolean, Object],
      required: true
    },
    delay: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data: () => ({
    flippingInstance: null as Flipper | null,
    oldFlipKey: null as string | number | boolean | object | null
  }),
  beforeUpdate() {
    this.flippingInstance?.recordBeforeUpdate();
  },
  updated() {
    nextTick(() => {
      if (!isEqual(this.oldFlipKey, this.flipKey)) {
        this.updateFlipList();
        this.flippingInstance?.update(null, null);
        this.oldFlipKey = this.flipKey as string | number | boolean | object | null;
      }
    });
  },
  methods: {
    updateFlipList() {
      let parent = this.$el.parentElement;

      parent.querySelectorAll('[data-flip-key]').forEach((flipElement: Element) => {
        this.flippingInstance?.addFlipped({
          element: flipElement as HTMLElement,
          flipId: (flipElement as HTMLElement).dataset.flipKey,
          children: null,
          spring: this.spring
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
              transformOrigin: 'center',
            });
          });
      });
    },
  },
  mounted() {
    let parent = this.$el.parentElement;

    let springConf: SpringConfig = this.spring ?? {
      stiffness: 1500,
      damping: 100
    }

    this.flippingInstance = new Flipper({
      element: parent,
      spring: springConf,
      onComplete: () => this.$emit('onComplete')
    });

    this.oldFlipKey = this.flipKey;

    this.updateFlipList();
  }
});
</script>