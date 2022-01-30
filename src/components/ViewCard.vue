<template>
  <div class="rounded-lg shadow-md h-20 relative" :class="{
    'highlighted': highlighted,
    'bg-green-500 bg-opacity-60 text-white': !!rightAnswer && rightAnswer == answer,
    'bg-red-500 bg-opacity-70 text-white': !!rightAnswer && rightAnswer != answer,
    'bg-white bg-opacity-50': !!!rightAnswer
  }" :title="title">
    <div class="absolute top-1 left-2">{{ question }}</div>
    <div class="h-full grid place-items-center font-bold text-3xl">
      {{ rightAnswer || answer }}
    </div>
    <div v-if="!!rightAnswer && rightAnswer != answer" class="absolute opacity-75 bottom-1 right-2">
      <span class="erased font-bold">{{ answer }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ViewCard',
  props: {
    question: {
      type: Number,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    rightAnswer: {
      type: String,
      required: false
    }
  },
  data: () => ({
    highlighted: false,
    timeout: null as number | null
  }),
  computed: {
    title() {
      if (!!this.rightAnswer && this.rightAnswer == this.answer) {
        return 'Correct answer!';
      } else if (!!this.rightAnswer && this.rightAnswer != this.answer) {
        return `Correct answer is ${this.rightAnswer} not ${this.answer}`;
      } else {
        return 'Proposed answer';
      }
    }
  },
  watch: {
    answer() {
      if (this.timeout) clearTimeout(this.timeout);

      this.highlighted = true;
      this.timeout = setTimeout(() => {
        this.highlighted = false;
        this.timeout = null;
      }, 2000);
    }
  }
});
</script>

<style scoped>
.highlighted {
  @apply bg-yellow-500 bg-opacity-40 animate-pulse;
}

.erased {
  position: relative;
}

.erased::before {
  content: '';
  position: absolute;
  width: 180%;
  height: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  @apply rounded-md bg-white;
}
</style>