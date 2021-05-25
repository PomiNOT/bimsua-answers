import { createRouter, createWebHistory } from 'vue-router';
import Home from './routes/Home.vue';
import Edit from './routes/Edit.vue';
import View from './routes/View.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home 
  },
  {
    name: 'Edit',
    path: '/edit',
    component: Edit
  },
  {
    name: 'View',
    path: '/:id',
    component: View
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});