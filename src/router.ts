import { createRouter, createWebHistory } from 'vue-router';
import Home from './routes/Home.vue';
import Edit from './routes/Edit.vue';
import Viewer from './routes/Viewer.vue';

const routes = [
  {
    path: '/',
    component: Home 
  },
  {
    path: '/edit',
    component: Edit
  },
  {
    path: '/view',
    component: Viewer
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});