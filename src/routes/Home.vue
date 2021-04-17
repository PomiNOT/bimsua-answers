<template>
  <div class="font-inter h-screen grid place-items-center">
    <div class="flex flex-col items-center">
      <illustration class="transform origin-center -rotate-12 scale-90 md:scale-100" />

      <div class="mt-6 text-center">
        <h1 class="font-bold text-blue-800 text-4xl">Answers!</h1>
        <p class="px-10 text-gray-500">Create and share your multiple choice answers <span class="underline font-bold">free</span>, no login required.</p>
      </div>

      <div class="mt-6">
        <button type="button" class="btn">Create new!</button>
        <span class="mx-1"></span>
        <button type="button" class="btn">How to use</button>
      </div>

      <div class="mt-6">
        <a class="text-blue-600" href="https://bimsua.me/privacy">Terms of use</a>
        <span class="mx-3">|</span>
        <a class="text-blue-600" href="https://bimsua.me/privacy">Privacy Policy</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Illustration from '../components/Illustration.vue';

export default defineComponent({
  name: 'HomeScreen',
  components: { Illustration }
});
</script>