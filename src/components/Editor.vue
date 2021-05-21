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

    <grid
      :length="nQuestion" 
      :pageProvider="providerFn"
      :pageSize="pageSize"
      class="grid gap-2 px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <template #probe>
        <edit-card :question="1" answer="A" />
      </template>

      <template v-slot:default="{ item, style }">
        <edit-card :style="style" :question="item.question" v-model:answer="item.answer" />
      </template>

      <template v-slot:placeholder="{ item, style }">
        <div :style="style" class="bg-gray-200 animate-pulse rounded-lg">{{ item }}</div>
      </template>
    </grid>

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
        subtitle="Currently locked to adding 100"
        name="n-edit"
      >
        <template #actions>
          <input type="number" disabled v-model="nQuestionToAdd" min="1" class="input" placeholder="How many to add">
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
import Grid from 'vue-virtual-scroll-grid';

export default defineComponent({
  name: 'Editor',
  components: { Snackbar, EditCard, FloatingMenu, FloatingMenuPage, Grid },
  data: () => ({
    sheet: [] as any[],
    nQuestion: 200,
    name: '',
    menuExpanded: false,
    activePage: 'main',
    nQuestionToAdd: 100,
    pageSize: 10
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
    },
    async providerFn(currentPage: number, pageSize: number): Promise<any[]> { 
      const from = currentPage * pageSize;
      const to = Math.min(this.nQuestion, (currentPage + 1) * pageSize);
      return this.sheet.slice(from, to);
    }
  },
  mounted() {
    this.name = this.$route.params.name as string ?? 'My Amazing Answers';

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