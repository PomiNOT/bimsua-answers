import { createRouter, createWebHistory } from 'vue-router';
import Home from './routes/Home.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Edit',
    path: '/edit',
    component: () => import('./routes/Edit.vue')
  },
  {
    name: 'View',
    path: '/:id',
    component: () => import('./routes/View.vue')
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});