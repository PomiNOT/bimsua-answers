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
    @answerUpdate="addToUpdateQueueAndSubmit"
    @nameUpdate="updateName"
    @deleteSheet="deleteSheet"
    @goHome="$router.push('/')"
    v-else
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TwoEndsProgress from '@/components/TwoEndsProgress.vue';
import Editor from '@/components/Editor.vue';

import { auth, db, analytics } from '@/firebaseApp';
import { 
  setPersistence,
  signInAnonymously,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

import { DEFAULT_NAME } from '@/types';
import RecentsDatabase from '@/recentsdb';
import localForage from 'localforage';
import genid from 'genid';
import debounce from 'lodash.debounce';

const ID_LENGTH = 20;

const recentsdb = new RecentsDatabase();

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
    changes: {} as any,
    batch: 0,
    unsubscribe: null as Function | null,
    submitAnswersDebounced: null as Function | null
  }),
  computed: {
    stateToText(): string {
      return this.state == 0 ? 'Logging in...' : 'Preparing the sheet...';
    }
  },
  methods: {
    async updateNQuestion(newnQuestion: number) {
      await Promise.all([
        updateDoc(doc(db, this.getPathForSheet()), {
          nQuestion: newnQuestion
        }),
        recentsdb.recents.update(this.id, {
          nQuestion: newnQuestion
        })
      ])
    },
    
    addToUpdateQueueAndSubmit(ans: any) {
      this.changes[`sheet.${ans.question}.${this.batch}`] = ans.answer;
      this.sheet[ans.question] = ans.answer;
      this.submitAnswersDebounced?.();
    },

    async submitAnswers() {
      let batchChanges: any = {};

      Object
        .keys(this.changes)
        .filter(key => {
          const batchNOfKey = key.split('.')[2];
          return parseInt(batchNOfKey) == this.batch;
        })
        .forEach(key => {
          let keyNameWithNumberRemoved = key.split('.').slice(0, 2).join('.');
          batchChanges[keyNameWithNumberRemoved] = this.changes[key];
          delete this.changes[key];
        });

      console.log(batchChanges);

      this.batch++;

      await updateDoc(doc(db, this.getPathForSheet()), batchChanges);
    },

    async updateName(newName: string) {
      await Promise.all([
        updateDoc(doc(db, this.getPathForSheet()), {
          name: newName
        }),
        recentsdb.recents.update(this.id, {
          name: newName
        })
      ]);
    },

    async deleteSheet() {
      let batch = writeBatch(db);

      batch.delete(doc(db, this.getPathForSheet()));
      batch.delete(doc(db, `/sheet_refs/${this.id}`));

      await Promise.all([
        batch.commit(),
        localForage.removeItem('lastID'),
        recentsdb.recents.delete(this.id)
      ]);

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
    let continueId = this.$route.params.continueId as string;
    const creating = !!this.$route.params.creating;

    if (creating) {
      this.id = genid(ID_LENGTH);
      await Promise.all([
        localForage.setItem('lastID', this.id),
        recentsdb.recents.put({
          id: this.id,
          name: this.name,
          nQuestion: this.nQuestion
        })
      ]);
    } else if (continueId) {
      this.id = continueId;
      await localForage.setItem('lastID', this.id);
    }
    else {
      const retrievedId = await localForage.getItem('lastID');

      if (!retrievedId) {
        alert('No recent session found.');
        this.$router.push('/');
      } else {
        this.id = retrievedId as string;
      }
    }

    await new Promise((resolve) => {
      auth.onAuthStateChanged(async user => {
        if (!user) {
          await setPersistence(auth, browserLocalPersistence);
          await signInAnonymously(auth);
        }

        resolve(null);
      });
    });
    
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

      if (import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS) {
        analytics.logEvent(
          analytics.analyticsInstance,
          'create_sheet',
          {
            numberOfQuestions: this.nQuestion,
            isDefaultName: this.name == DEFAULT_NAME
          }
        );
      }
    }

    this.unsubscribe = onSnapshot(doc(db, this.getPathForSheet()), (snap) => {
      const docData = snap.data();

      this.sheet = docData?.sheet;
      this.name = docData?.name;
      this.nQuestion = docData?.nQuestion;
      this.loadingDone = true;
    });

    this.submitAnswersDebounced = debounce(
      this.submitAnswers.bind(this),
      1000
    );
  },
  beforeUnmount() {
    this.unsubscribe?.();
  }
});
</script>