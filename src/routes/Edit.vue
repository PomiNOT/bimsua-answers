<template>
  <div v-if="!loadingDone" class="h-screen grid place-items-center">
    <div class="flex flex-col items-center">
      <two-ends-progress class="w-48 sm:w-64" :state="state" />
      <div class="mt-8 text-center">
        <h1 class="font-bold text-blue-800 text-2xl animate-slidein">You're going live!</h1>
        <p class="text-gray-500 opacity-0 animate-slidein anim-delay-100">
          {{ stateToText }}
        </p>
      </div>
    </div>
  </div>
  <editor
    :nQuestion="nQuestion"
    :sheet="sheet"
    :name="name"
    @update:nQuestion="updateNQuestion"
    @update:answer="updateAnswer"
    @update:name="updateName"
    @deleteSheet="deleteSheet"
    v-else
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TwoEndsProgress from '@/components/TwoEndsProgress.vue';
import Editor from '@/components/Editor.vue';

import firebase from '@/firebase';
import localForage from 'localforage';
import genid from 'genid';
import { Answer } from '@/types';

const ID_LENGTH = 20;

export default defineComponent({
  name: 'Edit',
  components: { TwoEndsProgress, Editor },
  data: () => ({
    state: 0,
    loadingDone: false,
    nQuestion: 20,
    id: '',
    name: '',
    sheet: {} as any
  }),
  computed: {
    stateToText(): string {
      return this.state == 0 ? 'Logging in...' : 'Preparing the sheet...';
    }
  },
  methods: {
    async updateNQuestion(newnQuestion: number) {
      await firebase
              .firestore()
              .doc(this.getPathForSheet())
              .update({ nQuestion: newnQuestion });
    },
    async updateAnswer(ans: Answer) {
      await firebase
              .firestore()
              .doc(this.getPathForSheet())
              .update({
                [`sheet.${ans.question}`]: ans.answer
              });
    },
    async updateName(newName: string) {
      await firebase
              .firestore()
              .doc(this.getPathForSheet())
              .update({ name: newName });
    },
    async deleteSheet() {
      await firebase.firestore().doc(this.getPathForSheet()).delete();
      this.$router.push('/');
    },
    getPathForSheet() {
      const userId = firebase.auth().currentUser?.uid;
      return `/users/${userId}/sheets/${this.id}`;
    }
  },
  async mounted() {
    this.name = this.$route.params.name as string;
    this.nQuestion = parseInt(this.$route.params.nQuestion as string);
    const creating = this.$route.params.creating ? true : false;

    if (creating) {
      this.id = genid(ID_LENGTH);
      await localForage.setItem('id', this.id);
    } else {
      const retrievedId = await localForage.getItem('id');

      if (!retrievedId) {
        throw new Error('Not creating but also no ID found');
      } else {
        this.id = retrievedId as string;
      }
    }

    await firebase.auth().signInAnonymously();
    this.state++;

    if (creating) {
      await firebase
        .firestore()
        .doc(this.getPathForSheet())
        .set({
          name: this.name,
          nQuestion: this.nQuestion,
          sheet: {}
        });
    }

    firebase
      .firestore()
      .doc(this.getPathForSheet())
      .onSnapshot(doc => {
        const docData = doc.data();

        this.loadingDone = true;

        this.sheet = docData?.sheet;
        this.name = docData?.name;
        this.nQuestion = docData?.nQuestion;
      });
  }
});
</script>