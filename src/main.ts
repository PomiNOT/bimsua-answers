import { createApp } from 'vue';
import router from './router';

import App from './App.vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import './styles/tailwind.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const app = createApp(App);
app.use(router);
app.use(VueVirtualScroller);
app.mount('#app');