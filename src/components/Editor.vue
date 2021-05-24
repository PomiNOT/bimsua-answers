<template>
  <div class="h-screen">
    <header class="
      fixed top-0 left-0 z-10 w-full backdrop-filter backdrop-blur-md
      bg-gray-200 bg-opacity-50
      h-18 p-2 flex items-center"
    >
      <div class="flex-1 leading-tight">
        <h1 class="text-blue-800 font-bold">{{ name }}</h1>
        <p class="text-gray-500">{{ nQuestion }} questions</p>
      </div>
      <div class="bg-red-500 flex items-center text-white font-bold px-2 rounded">
        <div class="rounded-full bg-white animate-pulse w-2 h-2"></div>
        <span class="ml-2">LIVE</span>
      </div>
    </header>

    <div class="h-10">&nbsp;</div>
    <div class="h-18">&nbsp;</div>

    <virtual-list
      :length="Math.ceil(nQuestion / columns)"
      :item-height="82"
    >
      <template v-slot="{ index }">
        <div class="p-1 gap-x-2 grid" :class="`grid-cols-${columns}`">
          <edit-card
            v-for="i in indices(index * columns, (index + 1) * columns)"
            :question="i + 1" :answer="sheet[i + 1] ?? ''" @update:answer="updateAnswer"
            :key="i"
          />
        </div>
      </template>
    </virtual-list>

    <div class="h-24">&nbsp;</div>

    <floating-menu buttonName="Menu" :page="activePage" v-model:expanded="menuExpanded">
      <floating-menu-page
        title="Action Menu"
        subtitle="What do you want to do?"
        name="main"
      >
        <template #actions>
          <button type="button" @click="activePage = 'name-edit'; newName = name">Change sheet's name</button>
          <button type="button" @click="activePage = 'n-edit'; newnQuestion = nQuestion">Edit sheet length</button>
          <button type="button" @click="activePage = 'delete-confirm'">Delete this sheet</button>
          <button type="button" @click="menuExpanded = false">Return</button>
        </template>
      </floating-menu-page>
      
      <floating-menu-page
        title="Editing sheet's name"
        subtitle="Click Save when you're done"
        name="name-edit"
      >
        <template #actions>
          <input type="text" v-model="newName" class="input" placeholder="New name">
          <button type="button" @click="updateName(); activePage = 'main'">Save</button>
          <button type="button" @click="activePage = 'main'">Return</button>
        </template>
      </floating-menu-page>

      <floating-menu-page
        title="Edit sheet length"
        subtitle="Need more or less?"
        name="n-edit"
      >
        <template #actions>
          <input
            type="number"
            v-model.number="newnQuestion" min="1" class="input" placeholder="New sheet length"
          >
          <fade-transition>
            <p class="text-white text-opacity-70" v-if="nQuestion > 500">
              It's already too much dude!
            </p>
          </fade-transition>
          <button type="button" @click="updateNQuestion(); menuExpanded = false">Resize</button>
          <button type="button" @click="activePage = 'main'">Return</button>
        </template>
      </floating-menu-page>

      <floating-menu-page
        name="delete-confirm"
        title="Are you sure to delete?"
        subtitle="Your data will be lost forever"
      >
        <template #actions>
          <button type="button" @click="deleteSheet">{{ deleting ? 'Trashing...' : 'Delete' }}</button>
          <button type="button" @click="activePage = 'main'">Cancel</button>
        </template>
      </floating-menu-page>
    </floating-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Snackbar from '@/components/Snackbar.vue';
import EditCard from '@/components/EditCard.vue';
import FloatingMenu from '@/components/FloatingMenu.vue';
import FloatingMenuPage from '@/components/FloatingMenuPage.vue';
import FadeTransition from './common-transitions/FadeTransition.vue';
import VirtualList from '@/components/VirtualList.vue';
import { Answer } from '@/types';

export default defineComponent({
  name: 'Editor',
  components: { Snackbar, EditCard, FloatingMenu, FloatingMenuPage, FadeTransition, VirtualList },
  emits: ['update:answer', 'update:nQuestion', 'update:name', 'deleteSheet'],
  props: {
    sheet: {
      type: Object,
      required: true
    },
    nQuestion: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({
    menuExpanded: false,
    activePage: 'main',
    columns: 2,
    newnQuestion: 0,
    newName: '',
    deleting: false
  }),
  methods: {
    indices(from: number, to: number): number[] {
      to = Math.min(to, this.nQuestion);
      return Array.from({length: to - from}, (_, i) => from + i);
    },
    resize() {
      if (window.innerWidth < 640) {
        this.columns = 1;
      } else if (window.innerWidth < 1024) {
        this.columns = 2;
      } else if (window.innerWidth < 1280) {
        this.columns = 3;
      } else {
        this.columns = 4;
      }
    },
    updateAnswer(ans: Answer) {
      this.$emit('update:answer', ans);
    },
    updateNQuestion() {
      this.$emit('update:nQuestion', this.newnQuestion);
    },
    updateName() {
      this.$emit('update:name', this.newName);
    },
    deleteSheet() {
      this.$emit('deleteSheet');
      this.deleting = true;
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize);
  }
});
</script>

<style scoped>
.editor-rows {
  grid-template-rows: repeat(auto-fit, minmax(70px, 1fr));
}
</style>