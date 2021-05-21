<template>
  <div class="floating-menu-page" :data-page="name">
    <h1 class="text-white text-lg font-bold">{{ title }}</h1>
    <h2 class="text-white text-opacity-50">{{ subtitle }}</h2>
    <slot></slot>
    <div class="mt-3 space-y-2 flex flex-col">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    }
  }
});
</script>

<style>
.floating-menu-page button {
  @apply text-white border border-gray-400 py-1 px-2 rounded;
  @apply hover:bg-gray-100 focus:outline-none hover:bg-opacity-25 focus:bg-gray-100 focus:bg-opacity-25;
}
</style>
