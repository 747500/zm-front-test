import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import { userProfile } from './userProfile';
import { showRaw } from './showRaw';
import router from './router';

const store = createStore({
  modules: {
    userProfile,
    showRaw,
  },
});

createApp(App).use(router).use(store).mount('#app');
