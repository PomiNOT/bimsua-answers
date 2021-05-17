<template>
  <transition
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="duration-300"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-110"
    leave-active-class="transform duration-200"
    mode="out-in"
  >
    <div v-if="!loadingDone" class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="animate-hover">
        <div class="transform scale-90 -rotate-12">
          <flipper :flip-key="hasError">
            <illustration v-if="!hasError" data-flip-key="asdasd" :animated="true" />
            <div v-else data-flip-key="asdasd" class="rounded p-5 overflow-hidden bg-gray-300">
              <fade-transition appear class="delay-200">
                <div data-inverse-flip>
                  <h1 class="text-xl md:text-2xl font-bold text-red-700">
                    An error occurred
                  </h1>
                  <p class="text-blue-800 text-md">Your answer sheet was damaged on the way to you, please try again.</p>
                </div>
              </fade-transition>
            </div>
          </flipper>
        </div>
      </div>
    </div>

    <viewer v-else />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Illustration from '@/components/Illustration.vue';
import Viewer from '@/components/Viewer.vue';
import Flipper from '@/components/flip/Flipper.vue';
import FadeTransition from '@/components/common-transitions/FadeTransition.vue';

export default defineComponent({
  name: 'View',
  components: { Illustration, Viewer, Flipper, FadeTransition },
  data: () => ({
    loadingDone: false,
    hasError: false
  }),
  mounted() {
    setTimeout(() => this.loadingDone = true, 2000);
  }
});
</script>