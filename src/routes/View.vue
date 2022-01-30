<template>
  <transition
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="duration-300"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-110"
    leave-active-class="transform duration-200"
    mode="out-in"
  >
    <div v-if="!loadingDone" class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="animate-hover">
        <div class="transform scale-90 -rotate-12">
          <flipper :flip-key="hasError">
            <illustration v-if="!hasError" data-flip-key="asdasd" :animated="true" />
            <div v-else data-flip-key="asdasd" class="rounded p-5 overflow-hidden bg-gray-200">
              <fade-transition appear class="delay-200">
                <div data-inverse-flip>
                  <h1 class="text-xl md:text-2xl font-bold text-blue-700">
                    Not found 😢
                  </h1>
                  <p class="text-blue-500 text-md">Well, there you go.</p>
                </div>
              </fade-transition>
            </div>
          </flipper>
        </div>
      </div>
    </div>

    <viewer
      :nQuestion="nQuestion"
      :name="name"
      :sheet="sheet"
      :rightSheet="rightSheet"
      v-else
    />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Illustration from '@/components/Illustration.vue';
import Viewer from '@/components/Viewer.vue';
import Flipper from '@/components/flip/Flipper.vue';
import FadeTransition from '@/components/common-transitions/FadeTransition.vue';
import {
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebaseApp';

import { DEFAULT_NAME } from '@/types';

export default defineComponent({
  name: 'View',
  components: { Illustration, Viewer, Flipper, FadeTransition },
  data: () => ({
    loadingDone: false,
    hasError: false,
    sheet: {} as any,
    rightSheet: {} as any,
    nQuestion: 0,
    name: DEFAULT_NAME,
    unsubscribe: null as Function | null
  }),
  async mounted() {
    const id = this.$route.params.id;
    const pathRefSnapshot = await getDoc(doc(db, `/sheet_refs/${id}`));

    if (!pathRefSnapshot.exists()) {
      this.hasError = true;
      return;
    }

    const pathRefData = pathRefSnapshot.data();

    this.unsubscribe = onSnapshot(doc(db, pathRefData.path), snap => {
      const doc = snap.data();

      this.sheet = doc?.sheet;
      this.rightSheet = doc?.rightSheet;
      this.name = doc?.name;
      this.nQuestion = doc?.nQuestion;

      this.loadingDone = true;

      if (!snap.exists()) {
        this.loadingDone = false;
        this.hasError = true;
      }
    });
  },
  beforeUnmount() {
    this.unsubscribe?.();
  }
});
</script>