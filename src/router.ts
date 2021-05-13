import { createRouter, createWebHistory } from 'vue-router';
import Home from './routes/Home.vue';
import Edit from './routes/Edit.vue';
import View from './routes/View.vue';

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
    component: View
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});