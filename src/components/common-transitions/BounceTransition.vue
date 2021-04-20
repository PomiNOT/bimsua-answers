<template>
  <transition
    enter-from-class="scale-75 opacity-0"
    enter-to-class="scale-100 opacity-100"
    enter-active-class="transform transition ease-bouncy duration-300"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="scale-75 opacity-0"
    leave-active-class="transform transition ease-bouncy duration-200"
    v-bind="$attrs"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BounceTransition'
});
</script>