<template>
  <flipper :flip-key="expanded">
    <div class="fixed w-full flex justify-center z-50 bottom-7 left-0" v-if="!expanded">
      <button
        data-flip-key="dialog"
        type="button"
        @click="expanded = true"
        class="
          px-5 py-2 rounded-full
          bg-gray-600 font-bold text-white
          bg-opacity-50 focus:outline-none focus:bg-opacity-90 backdrop-filter backdrop-blur-lg
        "
      >
        Menu
      </button>
    </div>
    <div class="fixed px-2 top-0 left-0 z-50 w-full h-full grid place-items-center" v-else>
      <div data-flip-key="dialog" class="p-5 overflow-hidden bg-gray-600 bg-opacity-75 rounded-lg backdrop-filter backdrop-blur-lg">
        <div data-inverse-flip>
          <h1 class="text-xl font-bold text-white">Action Menu</h1>
          <p class="text-gray-200 text-sm">Chooose an action to do to this answer sheet</p>
          <div class="flex flex-col my-6 space-y-2">
            <button type="button" class="text-white border border-gray-400 hover:bg-gray-100 focus:outline-none hover:bg-opacity-25 focus:bg-gray-100 focus:bg-opacity-25 py-1 px-2 rounded" @click="$router.push('/')">Save and return</button>
            <button type="button" class="text-white border border-gray-400 hover:bg-gray-100 focus:outline-none hover:bg-opacity-25 focus:bg-gray-100 focus:bg-opacity-25 py-1 px-2 rounded" @click="$router.push('/')">Discard this sheet</button>
            <button type="button" class="text-white border border-gray-400 hover:bg-gray-100 focus:outline-none hover:bg-opacity-25 focus:bg-gray-100 focus:bg-opacity-25 py-1 px-2 rounded" @click="expanded = false">Return</button>
          </div>
        </div>
      </div>
    </div>
  </flipper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Flipper from './flip/Flipper.vue';

export default defineComponent({
  name: 'FloatingMenu',
  components: { Flipper },
  data: () => ({
    expanded: false
  })
});
</script>
