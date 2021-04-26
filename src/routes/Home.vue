<template>
  <div class="h-screen grid place-items-center">
    <bounce-transition mode="out-in">
      <div v-if="!showForm">
        <div class="flex flex-col items-center">
          <illustration class="transform origin-center -rotate-12 scale-75 md:scale-90" />
          <div class="mt-3 md:mt-6 text-center">
            <h1 class="font-bold text-blue-800 text-3xl md:text-4xl">Answers!</h1>
            <p class="px-10 text-gray-500">Create and share your multiple choice answers <span class="underline font-bold">free</span>, no login required.</p>
          </div>
          <div class="mt-6">
            <button type="button" @click="showForm = true" class="btn">Create new!</button>
          </div>
          <div class="mt-6">
            <a class="text-blue-600" href="https://bimsua.me/privacy">Terms of use</a>
            <span class="mx-3">|</span>
            <a class="text-blue-600" href="https://bimsua.me/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>

      
      <form class="px-4 flex flex-col w-full sm:w-3/4 md:w-1/2 max-w-lg" v-else>
        <div class="text-center flex flex-col items-center">
          <div class="transform origin-center -rotate-12 scale-75">
            <illustration />
            <div 
              class="absolute grid place-items-center bottom-0 right-0 text-xl
                      transform translate-x-1/3 translate-y-1/3 w-7 h-7 leading-none
                      font-mono rounded-full text-white bg-green-600"
            >+</div>
          </div>
          <h1 class="font-black text-blue-800 text-3xl">Create</h1>
          <p class="text-gray-500">Enter below and you're ready to go!</p>
        </div>
        <div class="my-10">
          <div class="flex flex-col mb-5">
            <label class="input-label" for="name">Answer name</label>
            <input type="text" id="name" placeholder="Name" class="input">
          </div>
          <div class="flex flex-col">
            <label class="input-label" for="questions">Number of questions</label>
            <input type="number" min="1" max="100" id="questions" placeholder="Number of questions" class="input">
          </div>
        </div>
        <div class="flex justify-center">
          <button type="button" class="btn btn-white" @click="showForm = false">Go back</button>
          <span class="mx-1"></span>
          <router-link to="/edit">
            <button type="button" class="btn">Let's go!</button>
          </router-link>
        </div>
      </form>
    </bounce-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Illustration from '../components/Illustration.vue';
import BounceTransition from '../components/common-transitions/BounceTransition.vue';

export default defineComponent({
  name: 'HomeScreen',
  components: { Illustration, BounceTransition },
  data: () => ({
    showForm: false
  })
});
</script>