<template>
  <div class="grid h-screen place-items-center">
    <div class="flex flex-col items-center">
      <div class="bg-gray-200 relative w-24 h-24 overflow-hidden rounded" ref="square">
        <div ref="hightlight" class="w-full z-0 rounded top-0 left-0 absolute h-full bg-blue-800"></div>
        <div class="h-full grid grid-cols-2 grid-rows-2 place-items-center" ref="circlesContainer">
          <transition-group name="circles">
            <div class="
              text-blue-800 opacity-0 rounded-full bg-gray-300
              w-8 h-8 grid place-items-center font-bold"
              v-for="text in texts"
              :key="text"
            >{{ text }}</div>
          </transition-group>
        </div>
      </div>
      <h1 class="text-blue-800 text-center text-lg mt-4 opacity-0 font-bold" ref="loadingTitle">Getting ready</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Viewer',
  data: () => ({
    texts: ['A', 'B', 'C', 'D']
  }),
  methods: {
    shuffle() {
      this.texts.sort(() => 0.2 - Math.random());
    }
  },
  async mounted() {
    const square = this.$refs.square as HTMLElement;
    const hightlight = this.$refs.hightlight as HTMLElement;
    const circlesContainer = this.$refs.circlesContainer as HTMLElement;
    const circles = Array.from(
      circlesContainer.children
    );
    const loadingTitle = this.$refs.loadingTitle as HTMLElement;

    const bouncyEasing = 'cubic-bezier(0.68, -0.6, 0.32, 1.6)';
    const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';

    await square.animate(
      {
        transform: ['scale(0)', 'scale(1)'],
        opacity: [0, 1]
      },
      { duration: 500 , easing: bouncyEasing }
    ).finished;

    loadingTitle.animate({
      transform: ['translateY(30px)', 'translateY(0)'],
      opacity: [0, 1],
    }, { duration: 700, fill: 'forwards', easing: easeOutExpo });

    await hightlight.animate(
      {
        transform: ['scale(1)', 'scale(0)'],
        opacity: [1, 0]
      },
      { duration: 300, easing: 'ease-out', delay: 200, fill: 'forwards' }
    ).finished;

    let circleAnimations = [];

    for (const [i, circle] of circles.entries()) {
      let circleAnimation = circle.animate(
        {
          transform: ['scale(0)', 'scale(1)'],
          opacity: [0, 1]
        },
        { duration: 200, delay: i * 100, easing: bouncyEasing }
      ).finished;

      circleAnimation.then(() => circle.classList.remove('opacity-0'));

      circleAnimations.push(circleAnimation);
    }

    await Promise.all(circleAnimations);

    setInterval(() => {
      this.shuffle();
    }, 1500);
  }
});
</script>

<style scoped>
.circles-move {
  transition: transform 300ms;
}
</style>