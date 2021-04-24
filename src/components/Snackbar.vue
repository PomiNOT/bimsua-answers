<template>
  <flipper>
    <div class="flex fixed bottom-5 left-0 w-screen justify-center" v-if="!expanded">
      <div data-flip-key="dialog" @click="expanded = true" class="overflow-hidden cursor-pointer flex items-center justify-center rounded h-10 w-40 bg-white">
        <div class="font-bold" data-inverse-flip>Send suggestion</div>
      </div>
    </div>
    <div class="flex fixed top-0 left-0 h-screen w-screen justify-center items-center" v-else>
      <div 
        data-flip-key="dialog" 
        class="overflow-hidden rounded bg-white"
      >
        <form class="flex p-6 flex-col items-end" data-inverse-flip>
          <div class="flex flex-col mb-5">
            <label class="input-label" for="name">Send suggestion</label>
            <input type="text" id="suggestion" placeholder="Suggestion" class="input">
          </div>
          <button type="button" @click="expanded = false" class="btn">Send</button>
        </form>
      </div>
    </div>
  </flipper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Flipper from './flip/Flipper.vue';

export default defineComponent({
  name: 'Snackbar',
  components: {
    Flipper
  },
  data: () => ({
    expanded: false
  })
});
</script>
