<template>
  <div class="h-screen grid place-items-center">
    <bounce-transition mode="out-in">
      <div v-if="!showForm">
        <div class="flex flex-col items-center">
          <illustration class="transform origin-center -rotate-12 scale-75 md:scale-90" />
          <div class="mt-3 md:mt-6 text-center">
            <h1 class="font-bold text-blue-800 text-3xl md:text-4xl">Answers!</h1>
            <p class="px-10 text-gray-500">Create and share your multiple choice answers <span class="underline font-bold">free</span>, no login required.</p>
          </div>
          <div class="mt-6 space-x-2">
            <flipper :flip-key="menuExpanded">
              <floating-menu v-model:expanded="menuExpanded">
                <template #small>
                  <button
                    data-flip-key="dialog"
                    type="button"
                    v-show="recents.length > 0"
                    @click="menuExpanded = true"
                    class="btn btn-white"
                  >
                    Load recent
                  </button>
                </template>
                <floating-menu-page
                  name="main"
                  title="Load recent"
                  subtitle="Continue editing one of your recent sheets."
                >
                  <div class="space-y-2 max-h-36 overflow-y-auto">
                    <button
                      class="w-full flex bg-white bg-opacity-30"
                      v-for="{ id, name, nQuestion } in recentsFiltered"
                      @click="resume(id)"
                      :key="id"
                    >
                      <p class="flex-1">{{ name }}</p>
                      <p class="bg-white bg-opacity-20 rounded px-2">{{ nQuestion }}</p>
                    </button>

                    <p
                      class="text-center text-white text-opacity-50 300 font-bold text-xl"
                      v-if="recentsFiltered.length == 0"
                    >
                      No Result
                    </p>
                  </div>
                  <template #actions>
                    <input type="text" class="input h-8 w-full" v-model="searchQuery" placeholder="Search your recents...">
                    <button type="button" @click="menuExpanded = false">Close</button>
                  </template>
                </floating-menu-page>
              </floating-menu>
              <button data-flip-key="create" type="button" @click="showForm = true" class="btn">
                Create new!
              </button>
            </flipper>
          </div>
          <div class="mt-6 text-xs text-center">
            <p class="text-gray-300">{{ new Date().getFullYear() }}, bimsua Studios</p>
            <p class="text-gray-300">
              <a class="underline" href="https://github.com/bimsuastudios/bimsua-answers">Software</a> licensed under MIT License.
            </p>
          </div>
        </div>
      </div>

      <form class="px-4 flex flex-col w-full sm:w-3/4 md:w-1/2 max-w-lg" v-else>
        <div class="text-center flex flex-col items-center">
          <div class="transform origin-center -rotate-12 scale-75">
            <illustration />
            <div
              class="absolute grid place-items-center bottom-0 right-0 text-xl
                      transform translate-x-1/3 translate-y-1/3 w-7 h-7 leading-none
                      font-mono rounded-full text-white bg-green-600"
            >+</div>
          </div>
          <h1 class="font-black text-blue-800 text-2xl md:text-4xl">Create</h1>
          <p class="text-gray-500">Enter below and you're ready to go!</p>
        </div>
        <div class="my-5 md:my-10">
          <div class="flex flex-col mb-5">
            <label class="input-label" for="name">Answer name</label>
            <input type="text" id="name" v-model="sheetName" placeholder="Name" class="input">
          </div>
          <div class="flex flex-col">
            <label class="input-label" for="questions">Number of questions</label>
            <input type="number" min="1" max="100" v-model.number="nQuestion" placeholder="Number of questions" class="input">
          </div>
        </div>
        <div class="flex space-x-2 justify-center">
          <button type="button" class="btn btn-white" @click="showForm = false">Go back</button>
          <button type="button" class="btn" @click="createNew" :title="!online ? 'No Connection' : ''" :disabled="!online">Let's go!</button>
        </div>
      </form>
    </bounce-transition>

    <update-snack
      :visible="!showForm && updateSnackVisible"
      :status="updateStatus"
      @restart="refresh"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Illustration from '@/components/Illustration.vue';
import BounceTransition from '@/components/common-transitions/BounceTransition.vue';
import FloatingMenu from '@/components/FloatingMenu.vue';
import FloatingMenuPage from '@/components/FloatingMenuPage.vue';
import Flipper from '@/components/flip/Flipper.vue';
import RecentsDatabase from '@/recentsdb';
import UpdateSnack, { UpdateSnackStatus } from '@/components/UpdateSnack.vue';
import { register } from 'register-service-worker';
import online from '@/onlineNotifier';
import { Index } from 'flexsearch';

import { DEFAULT_NAME, Sheet } from '@/types';

export default defineComponent({
  name: 'HomeScreen',
  components: {
    Illustration, Flipper, BounceTransition, FloatingMenu, FloatingMenuPage,
    UpdateSnack
  },
  data: () => ({
    showForm: false,
    updateSnackVisible: false,
    sheetName: DEFAULT_NAME,
    nQuestion: 5,
    searchQuery: "",
    recents: [] as Sheet[],
    menuExpanded: false,
    updateStatus: UpdateSnackStatus.STATUS_NEW_UPDATE,
    online,
    registration: null as ServiceWorkerRegistration | null,
    recentsDB: new RecentsDatabase(),
    recentsIndex: new Index({ tokenize: 'full' })
  }),
  methods: {
    createNew() {
      this.$router.push({
        name: 'Edit',
        params: {
          name: this.sheetName,
          nQuestion: this.nQuestion,
          creating: 'true'
        }
      });
    },
    resume(id: string | undefined) {
      if (!id) {
        alert('Error: No id was supplied (undefined)');
      }

      this.$router.push({
        name: 'Edit',
        params: {
          continueId: id!
        }
      });
    },
    refresh() {
      this.registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
      window.location.replace('/?uptodate=true');
    },
    checkForUpdate() {
      const that = this;

      register('/sw.js', {
        updated (registration) {
          that.registration = registration;
          console.log('New content is available; please refresh.');
          setTimeout(() => {
            that.updateSnackVisible = true;
          }, 1000);
        },
        ready() {
          console.log('SW is active.');
        },
        registered() {
          console.log('SW is registered');
        },
        cached() {
          console.log('Content cached');
        }
      });

      if (this.$route.query.uptodate) {
        this.updateStatus = UpdateSnackStatus.STATUS_UP_TO_DATE;
        window.history.replaceState({}, document.title, '/');

        setTimeout(() => this.updateSnackVisible = false, 4000);
      }
    }
  },
  computed: {
    recentsFiltered(): Sheet[] {
      if (this.searchQuery.length == 0) return this.recents;

      const matches = this.recentsIndex.search(this.searchQuery, { suggest: true });

      return matches.map((i: number) => this.recents[i]);
    }
  },
  async mounted() {
    this.recents = await this.recentsDB.recents.toArray();

    for (const [index, { name }] of this.recents.entries()) {
      this.recentsIndex.add(index, name);
    }

    this.checkForUpdate();
  }
});
</script>