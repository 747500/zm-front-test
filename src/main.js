import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import { userProfile  } from './userProfile';
import { showRaw } from './showRaw';

const store = createStore({
	modules: {
    userProfile,
    showRaw,
	}
});

createApp(App).use(store).mount('#app')
