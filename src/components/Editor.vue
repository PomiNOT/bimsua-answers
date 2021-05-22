<template>
  <div class="h-screen">
    <header class="
      fixed top-0 left-0 z-10 w-full backdrop-filter backdrop-blur-md
      bg-gray-200 bg-opacity-50
      h-18 p-2 flex items-center"
    >
      <div class="flex-1 leading-tight">
        <h1 class="text-blue-800 font-bold">{{ name }}</h1>
        <p class="text-gray-500">{{ sheet.length }} questions</p>
      </div>
      <div class="bg-red-500 flex items-center text-white font-bold px-2 rounded">
        <div class="rounded-full bg-white animate-pulse w-2 h-2"></div>
        <span class="ml-2">LIVE</span>
      </div>
    </header>

    <div class="h-10">&nbsp;</div>
    <div class="h-18">&nbsp;</div>

    <recycle-scroller
      :items="sheet.slice(0, Math.ceil(sheet.length / columns))"
      :item-size="84"
      key-field="question"
      page-mode
      class="px-2"
      v-slot="{ index }"
    >
      <div class="p-1 gap-x-2 grid" :class="`grid-cols-${columns}`">
        <edit-card
          v-for="i in indices(index * columns, (index + 1) * columns)"
          :question="sheet[i].question" v-model:answer="sheet[i].answer"
          :key="sheet[i].question"
        />
      </div>
    </recycle-scroller>

    <div class="h-24">&nbsp;</div>

    <floating-menu buttonName="Menu" :page="activePage" v-model:expanded="menuExpanded">
      <floating-menu-page
        title="Action Menu"
        subtitle="What do you want to do?"
        name="main"
      >
        <template #actions>
          <button type="button" @click="activePage = 'name-edit'">Change sheet's name</button>
          <button type="button" @click="activePage = 'n-edit'">Add more questions</button>
          <button type="button" @click="$router.push('/')">Delete this sheet</button>
          <button type="button" @click="activePage = 'poke'">Order Food!</button>
          <button type="button" @click="menuExpanded = false">Return</button>
        </template>
      </floating-menu-page>
      
      <floating-menu-page
        title="Editing sheet's name"
        subtitle="Click Return when you're done"
        name="name-edit"
      >
        <template #actions>
          <input type="text" v-model="name" class="input" placeholder="New name">
          <button type="button" @click="activePage = 'main'">Return</button>
        </template>
      </floating-menu-page>

      <floating-menu-page
        title="Add more questions"
        :subtitle="`Isn't ${nQuestion} enough?`"
        name="n-edit"
      >
        <template #actions>
          <input
            type="number"
            v-model="nQuestionToAdd" min="1" class="input" placeholder="How many to add"
          >
          <fade-transition>
            <p class="text-white text-opacity-70" v-if="nQuestion > 500">
              It's already too much dude!
            </p>
          </fade-transition>
          <button type="button" @click="addMore(); menuExpanded = false">Add</button>
          <button type="button" @click="activePage = 'main'">Return</button>
        </template>
      </floating-menu-page>

      <floating-menu-page
        name="poke"
      >
        <h1 class="text-3xl text-center text-white font-bold animate-pulse">Ordering McDonalds...</h1>
        <template #actions>
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

export default defineComponent({
  name: 'Editor',
  components: { Snackbar, EditCard, FloatingMenu, FloatingMenuPage, FadeTransition },
  data: () => ({
    sheet: [] as any[],
    nQuestion: 69,
    name: '',
    menuExpanded: false,
    activePage: 'main',
    nQuestionToAdd: 1,
    columns: 2
  }),
  methods: {
    addMore() {
      const answerMap = ['A', 'B', 'C', 'D'];

      for (let i = 0; i < this.nQuestionToAdd; i++) {
        this.nQuestion++;

        this.sheet.push({
          question: this.nQuestion,
          answer: ''
        });
      }
    },
    indices(from: number, to: number): number[] {
      to = Math.min(to, this.sheet.length);
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
    }
  },
  mounted() {
    this.name = this.$route.params.name as string ?? 'My Amazing Answers';

    for (let i = 0; i < this.nQuestion; i++) {
      this.sheet.push({
        question: i + 1,
        answer: ''
      });
    }

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