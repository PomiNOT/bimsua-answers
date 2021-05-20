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

    <div class="grid sm:h-full sm:overflow-x-auto sm:grid-flow-col gap-y-2 gap-x-6 px-2 pb-20 sm:pb-16 pt-16 editor-rows">
      <edit-card
        v-for="q in sheet"
        :question="q.question"
        v-model:answer="q.answer"
        :key="q.question"
      />
    </div>

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
          <button type="button" @click="menuExpanded = false">Return</button>
        </template>
      </floating-menu-page>
      <floating-menu-page
        title="Editing sheet's name"
        subtitle="Click Return when you're done"
        name="name-edit"
      >
        <template #actions>
          <input type="text" v-model="name" class="input bg-opacity-25 placeholder-gray-300 text-white" placeholder="New name">
          <button type="button" @click="activePage = 'main'">Return</button>
        </template>
      </floating-menu-page>
      <floating-menu-page
        title="Add more questions"
        subtitle="Enter the number of questions you want to add"
        name="n-edit"
      >
        <template #actions>
          <input type="number" v-model="nQuestionToAdd" min="1" class="input bg-opacity-25 placeholder-gray-300 text-white" placeholder="How many to add">
          <button type="button" @click="addMore">Add</button>
          <button type="button" @click="activePage = 'main'">Return</button>
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

export default defineComponent({
  name: 'Editor',
  components: { Snackbar, EditCard, FloatingMenu, FloatingMenuPage },
  data: () => ({
    sheet: [] as any[],
    nQuestion: 20,
    name: '',
    menuExpanded: false,
    activePage: 'main',
    nQuestionToAdd: 1
  }),
  methods: {
    addMore() {
      const answerMap = ['A', 'B', 'C', 'D'];

      for (let i = 0; i < this.nQuestionToAdd; i++) {
        this.nQuestion++;

        this.sheet.push({
          question: this.nQuestion,
          answer: answerMap[this.nQuestion % 4]
        });
      }
    }
  },
  mounted() {
    this.name = this.$route.params.name as string;

    const answerMap = ['A', 'B', 'C', 'D'];

    for (let i = 0; i < this.nQuestion; i++) {
      this.sheet.push({
        question: i + 1,
        answer: answerMap[i % 4]
      });
    }
  },
});
</script>

<style scoped>
.editor-rows {
  grid-template-rows: repeat(auto-fit, minmax(70px, 1fr));
}
</style>