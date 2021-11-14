import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import { userProfile  } from './userProfile';

const store = createStore({
	modules: {
    userProfile,
	}
});

createApp(App).use(store).mount('#app')
