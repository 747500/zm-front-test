import { createApp } from 'vue'
import { createStore } from 'vuex';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue'
import { userProfile  } from './userProfile';
import { showRaw } from './showRaw';
import Home from './Home.vue';
import PasswordRecovery from './PasswordRecovery.vue';

const store = createStore({
	modules: {
    userProfile,
    showRaw,
	}
});

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
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(store).mount('#app')
