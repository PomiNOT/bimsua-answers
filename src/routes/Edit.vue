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
    :id="id"
    @nQuestionUpdate="updateNQuestion"
    @answerUpdate="updateAnswer"
    @nameUpdate="updateName"
    @deleteSheet="deleteSheet"
    v-else
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TwoEndsProgress from '@/components/TwoEndsProgress.vue';
import Editor from '@/components/Editor.vue';

import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import localForage from 'localforage';
import genid from 'genid';

const ID_LENGTH = 20;

const auth = getAuth();
const db = getFirestore();

export default defineComponent({
  name: 'Edit',
  components: { TwoEndsProgress, Editor },
  data: () => ({
    state: 0,
    loadingDone: false,
    nQuestion: 20,
    id: '',
    name: '',
    sheet: {} as any,
    unsubscribe: null as Function | null
  }),
  computed: {
    stateToText(): string {
      return this.state == 0 ? 'Logging in...' : 'Preparing the sheet...';
    }
  },
  methods: {
    async updateNQuestion(newnQuestion: number) {
      await updateDoc(doc(db, this.getPathForSheet()), {
        nQuestion: newnQuestion
      });
    },
    async updateAnswer(ans: any) {
      await updateDoc(doc(db, this.getPathForSheet()), {
        [`sheet.${ans.nQuestion}`]: ans.answer
      });
    },
    async updateName(newName: string) {
      await updateDoc(doc(db, this.getPathForSheet()), {
        name: newName
      });
    },
    async deleteSheet() {
      let batch = writeBatch(db);

      batch.delete(doc(db, this.getPathForSheet()));
      batch.delete(doc(db, `/sheet_refs/${this.id}`));

      await batch.commit();

      this.$router.push('/');
    },
    getPathForSheet(): string {
      const userId = auth.currentUser?.uid;
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

    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
    
    this.state++;

    if (creating) {
      let batch = writeBatch(db);

      batch.set(doc(db, this.getPathForSheet()), {
        name: this.name,
        nQuestion: this.nQuestion,
        sheet: {}
      });

      batch.set(doc(db, `/sheet_refs/${this.id}`), {
        path: this.getPathForSheet(),
        createdBy: auth.currentUser?.uid,
        createdAt: serverTimestamp()
      });

      await batch.commit();
    }

    this.unsubscribe = onSnapshot(doc(db, this.getPathForSheet()), snap => {
      const docData = snap.data();

      this.sheet = docData?.sheet;
      this.name = docData?.name;
      this.nQuestion = docData?.nQuestion;
      this.loadingDone = true;
    });
  },
  beforeUnmount() {
    this.unsubscribe?.();
  }
});
</script>