<template>
  <button
    type="button"
    class="
      font-bold focus:outline-none focus:bg-gray-300
      rounded-full w-9 h-9 border-2 border-gray-400
      select-none touch-manipulation
    "
    :class="determineColor"
  >
    {{ choice }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hammer from 'hammerjs';

export default defineComponent({
  name: 'EditCardButton',
  emits: ['updateAnswer', 'updateRightAnswer'],
  props: {
    choice: {
      type: String,
      required: true
    },
    currentChoice: {
      type: String,
      required: false
    },
    rightChoice: {
      type: String,
      required: false
    }
  },
  data: () => ({
    hammer: null as null | HammerManager
  }),
  computed: {
    determineColor(): Object {
      const isRightChoice = this.rightChoice == this.choice;
      const selected = this.choice == this.currentChoice;
      const rightChoicePassed = !!this.rightChoice;
      
      if (!rightChoicePassed) {
        return {
          'selected-color': selected
        };
      } else {
        return {
          'right-choice-color': isRightChoice,
          'erased': isRightChoice && !this.currentChoice,
          'wrong-choice-color erased': selected && !isRightChoice
        };
      }
    }
  },
  methods: {
    tapHandler() {
      const rightChoicePassed = !!this.rightChoice;

      if (!rightChoicePassed) {
        this.$emit('updateAnswer', this.choice);
      }  
    },
    doubleTapHandler() {
      const isRightChoice = this.rightChoice == this.choice;

      if (isRightChoice) {
        this.$emit('updateRightAnswer', '');
      }
      else {
        this.$emit('updateRightAnswer', this.choice);
      }
    }
  },
  mounted() {
    this.hammer = new Hammer.Manager(this.$el);
    const tap = new Hammer.Tap({ event: 'tap' });
    const press = new Hammer.Press({ event: 'press' });
    this.hammer.add([press, tap]);

    this.hammer.on('tap', this.tapHandler);
    this.hammer.on('press', this.doubleTapHandler);
  },
  beforeUnmount() {
    this.hammer?.off('tap', this.tapHandler);
    this.hammer?.off('press', this.doubleTapHandler);
  }
});
</script>

<style scoped>
.erased {
  position: relative;
}

.erased::before {
  content: '';
  position: absolute;
  width: 140%;
  height: 3px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  @apply rounded-md bg-black;
}

.erased::after {
  content: '';
  position: absolute;
  width: 140%;
  height: 3px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  @apply rounded-md bg-black;
}

.selected-color {
  @apply bg-blue-400 focus:bg-blue-500 text-white border-blue-400;
}

.right-choice-color {
  @apply border-green-400 focus:bg-green-500 text-white bg-green-400;
}

.wrong-choice-color {
  @apply border-gray-300 text-white opacity-20 focus:bg-gray-300 bg-gray-400;
}

.touch-manipulation {
  touch-action: manipulation;
}
</style>
