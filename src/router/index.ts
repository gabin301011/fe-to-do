import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Assignment from '../views/Assignment.vue';
import Details from '../components/assignment/Details.vue';
import Achived from '../views/Archived.vue';
import Deleted from '../views/Deleted.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/task',
    name: 'Assignment',
    component: Assignment,
  },
  {
    path: '/task/:id',
    name: 'Details',
    component: Details,
    props: true,
  },
  {
    path: '/archived',
    name: 'Archived',
    component: Achived,
  },
  {
    path: '/deleted',
    name: 'Deleted',
    component: Deleted,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
