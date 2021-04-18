import { createRouter, createWebHistory } from 'vue-router';
import Home from './routes/Home.vue';
import Edit from './routes/Edit.vue';

const routes = [
  {
    path: '/',
    component: Home 
  },
  {
    path: '/edit',
    component: Edit
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});