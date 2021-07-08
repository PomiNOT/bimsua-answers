<template>
  <div class="h-screen px-2">
    <header
      class="
        fixed top-0 left-0 z-10 w-full backdrop-filter backdrop-blur-md
        bg-gray-200 bg-opacity-50 transition-all duration-300
        h-18 p-2 flex items-center
      "
      :class="score > 0 ? 'py-4' : 'py-2'"
    >
      <div class="flex-1 leading-tight">
        <h1 class="text-blue-800 font-bold">{{ name }}</h1>
        <p class="text-gray-500">
          <span>{{ nQuestion }} questions</span>
        </p>
      </div>
      <div class="bg-red-500 flex items-center text-white font-bold px-2 rounded">
        <div class="rounded-full bg-white animate-pulse w-2 h-2"></div>
        <span class="ml-2">LIVE</span>
      </div>
      <fade-transition>
        <div v-if="score > 0" class="
          w-full absolute h-1 flex justify-center items-center bg-green-500 bottom-0 left-0
        ">
          <div class="
            leading-tight px-2 absolute bg-green-500
            text-white rounded-md font-bold
          ">
            {{ score }} <span class="text-gray-300">/ 10</span>
          </div>
        </div>
      </fade-transition>
    </header>

    <div class="h-18">&nbsp;</div>
    <div class="transition-all duration-300" :class="score > 0 ? 'h-16' : 'h-10'">&nbsp;</div>

    <virtual-list
      :length="nQuestion"
      :item-height="82"
      :gap="5"
      :cols="1"
      :cols-sm="2"
      :cols-lg="3"
      :cols-xl="4"
    >
      <template v-slot="{ index }">
        <edit-card
          :question="index + 1"
          :answer="sheet[index + 1] ?? ''"
          :rightAnswer="rightSheet[index + 1] ?? ''"
          @update:answer="updateAnswer"
          @update:rightAnswer="updateRightAnswer"
        />
      </template>
    </virtual-list>

    <div class="h-24">&nbsp;</div>

    <floating-menu :page="activePage" v-model:expanded="menuExpanded">
      <template #small>
        <div class="fixed w-full flex justify-center z-50 bottom-7 left-0">
          <button
            data-flip-key="dialog"
            type="button"
            @click="menuExpanded = true"
            class="
              px-5 py-2 rounded-full
              bg-gray-600 font-bold text-white
              bg-opacity-50 focus:outline-none focus:bg-opacity-90 backdrop-filter backdrop-blur-lg
            "
          >
            Menu
          </button>
        </div>
      </template>

      <floating-menu-page
        title="Action Menu"
        subtitle="What do you want to do?"
        name="main"
      >
        <template #actions>
          <button type="button" @click="activePage = 'share-sheet'; copied = false;">Share this sheet</button>
          <button type="button" @click="activePage = 'name-edit'; newName = name">Change sheet's name</button>
          <button type="button" @click="activePage = 'n-edit'; newnQuestion = nQuestion">Edit sheet length</button>
          <button type="button" @click="activePage = 'delete-confirm'">Delete this sheet</button>
          <button type="button" @click="goHome">Go home</button>
          <button type="button" @click="menuExpanded = false">Return</button>
        </template>
      </floating-menu-page>

      <floating-menu-page
        title="Editing sheet's name"
        subtitle="Click Save when you're done"
        name="name-edit"
      >
        <input type="text" v-model="newName" class="input w-full" placeholder="New name">
        <template #actions>
          <button type="button" @click="updateName(); activePage = 'main'">Save</button>
          <button type="button" @click="activePage = 'main'">Return</button>
        </template>
      </floating-menu-page>

      <floating-menu-page
        title="Edit sheet length"
        subtitle="Need more or less?"
        name="n-edit"
      >
        <input
          type="number"
          v-model.number="newnQuestion" min="1" class="input w-full" placeholder="New sheet length"
        >
        <template #actions>
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

      <floating-menu-page
        name="share-sheet"
        title="Share sheet"
        subtitle="Copy link to clipboard"
      >
        <template #actions>
          <button type="button" @click="copyLink">{{ copied ? 'Copied!' : 'Copy' }}</button>
          <button type="button" @click="activePage = 'main'">Cancel</button>
        </template>
      </floating-menu-page>
    </floating-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditCard from '@/components/EditCard.vue';
import FloatingMenu from '@/components/FloatingMenu.vue';
import FloatingMenuPage from '@/components/FloatingMenuPage.vue';
import FadeTransition from './common-transitions/FadeTransition.vue';
import VirtualList from '@/components/VirtualList.vue';
import copy from 'copy-to-clipboard';
import { Answer } from '@/types';

export default defineComponent({
  name: 'Editor',
  components: { EditCard, FloatingMenu, FloatingMenuPage, FadeTransition, VirtualList },
  emits: ['answerUpdate', 'nQuestionUpdate', 'nameUpdate', 'deleteSheet', 'goHome', 'rightAnswerUpdate'],
  props: {
    sheet: {
      type: Object,
      required: true
    },
    rightSheet: {
      type: Object,
      required: false,
      default: {}
    },
    nQuestion: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    menuExpanded: false,
    activePage: 'main',
    newnQuestion: 0,
    newName: '',
    deleting: false,
    copied: false
  }),
  computed: {
    shareLink(): string {
      const loc = window.location;
      return `${loc.protocol}//${loc.hostname}/${this.id}`;
    },
    score(): number {
      const rights = Object.keys(this.rightSheet).map((question) => {
        return this.rightSheet[question] == this.sheet[question];
      });

      if (rights.length == 0) {
        return 0;
      }

      const rightCount = rights.reduce((count, isRight) => count + (isRight ? 1 : 0), 0);
      const perTen = (rightCount / this.nQuestion) * 10;
      return perTen % 1 == 0 ? perTen : parseFloat(perTen.toFixed(2));
    }
  },
  methods: {
    updateAnswer(ans: unknown) {
      this.$emit('answerUpdate', ans as Answer);
    },
    updateNQuestion() {
      this.$emit('nQuestionUpdate', this.newnQuestion);
    },
    updateName() {
      this.$emit('nameUpdate', this.newName);
    },
    deleteSheet() {
      this.$emit('deleteSheet');
      this.deleting = true;
    },
    updateRightAnswer(rightAnswer: unknown) {
      this.$emit('rightAnswerUpdate', rightAnswer as Answer);
    },
    goHome() {
      this.$emit('goHome');
    },
    copyLink() {
      copy(this.shareLink);
      this.copied = true;
    }
  }
});
</script>
