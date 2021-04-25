<template>
  <flipper :flip-key="{ index, expanded }" @onComplete="showText = true" :spring="springConfig">
    <div class="flex fixed bottom-5 left-0 w-screen justify-center" v-if="!expanded">
      <div 
        data-flip-key="dialog" @click="expanded = true"
        class="shadow-lg overflow-hidden cursor-pointer rounded p-2 bg-white"
      >
        <div class="font-bold" data-inverse-flip>
          <span 
            class="transition-opacity duration-300"
            :class="showText ? 'opacity-100' : 'opacity-0'"
          >
            {{ text }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex fixed top-0 left-0 h-screen w-screen justify-center items-center" v-else>
      <div 
        data-flip-key="dialog" 
        class="overflow-hidden rounded bg-white"
      >
        <form class="shadow-md flex p-6 flex-col items-end" data-inverse-flip>
          <div class="flex flex-col mb-5">
            <label class="input-label" for="name">Send suggestion</label>
            <input type="text" id="suggestion" placeholder="Suggestion" class="input">
          </div>
          <button type="button" @click="expanded = false" class="btn">Cancel</button>
        </form>
      </div>
    </div>
  </flipper>
</template>

<script lang="ts">
import { SpringConfig } from 'flip-toolkit/lib/springSettings/types';
import { defineComponent } from 'vue';
import FadeTransition from './common-transitions/FadeTransition.vue';
import Flipper from './flip/Flipper.vue';

export default defineComponent({
  name: 'Snackbar',
  components: {
    Flipper,
    FadeTransition
  },
  data: () => ({
    expanded: false,
    showText: true,
    textList: [
      'Send suggestion',
      'Đề xuất đáp án',
      'Envoyer une suggestion',
      '發送建議',
      'Saada ettepanek',
      'שלח הצעה',
      'Send forslag',
      'Изпратете предложение',
      '提案を送信する',
      'Siųsti pasiūlymą'
    ],
    index: 0,
    springConfig: {
      stiffness: 1000,
      damping: 60
    } as SpringConfig
  }),
  computed: {
    text(): string {
      return this.textList[this.index];
    }
  },
  mounted() {
    setInterval(() => {
      this.showText = false;

      setTimeout(() => {
        this.index++;
        this.index %= this.textList.length;
      }, 300);
    }, 5000);
  }
});
</script>
