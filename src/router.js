import { createWebHistory, createRouter } from 'vue-router';
import Home from './Home.vue';
import PasswordRecovery from './PasswordRecovery.vue';
import Page404 from './404.vue';

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
  },
  {
    path: "/passwordRecovery",
    name: "Password Recovery",
    component: PasswordRecovery,
  },
  {
    path: "/:catchAll(.*)",
    component: Page404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
