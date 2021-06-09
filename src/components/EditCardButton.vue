<template>
  <button
    type="button"
    class="
      font-bold focus:outline-none focus:bg-gray-300
      rounded-full w-9 h-9 border-2 border-gray-400
      transition-colors duration-100
    "
    :class="determineColor"
  >
    {{ choice }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import interact from 'interactjs';

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
    interactable: null as any
  }),
  computed: {
    determineColor(): Object {
      const isRightChoice = this.rightChoice == this.choice;
      const selected = this.choice == this.currentChoice;
      const rightChoicePassed = !!this.rightChoice;
      
      if (!rightChoicePassed) {
        return {
          'bg-blue-400 focus:bg-blue-500 text-white border-blue-400': selected
        };
      } else {
        return {
          'border-green-400 focus:bg-green-500 text-white bg-green-400': isRightChoice,
          'border-gray-300 text-white erased focus:bg-gray-300 bg-gray-400': selected && !isRightChoice
        };
      }
    }
  },
  mounted() {
    this.interactable = interact(this.$el)
        .on('tap', (e) => {
          e.preventDefault();
          const rightChoicePassed = !!this.rightChoice;

          if (!rightChoicePassed) {
            this.$emit('updateAnswer', this.choice);
          }  
        })
        .on('hold', (e) => {
          e.preventDefault();
          const isRightChoice = this.rightChoice == this.choice;

          if (isRightChoice) {
            this.$emit('updateRightAnswer', '');
          }
          else {
            this.$emit('updateRightAnswer', this.choice);
          }
        })
  },
  beforeUnmount() {
    this.interactable.off('hold').off('tap');
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
  animation: scaleUp 300ms;
  @apply rounded-md bg-black bg-opacity-70;
}

@keyframes scaleUp {
  0% {
    width: 0px;
  }
  100% {
    width: 140%;
  }
}
</style>
