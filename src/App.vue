<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { ref } from 'vue'
import { useStore } from 'vuex'

import HelloWorld from './components/HelloWorld.vue'
import AuthRegister from './components/AuthRegister.vue';
import AuthLogin from './components/AuthLogin.vue';
import AuthLogout from './components/AuthLogout.vue';
import LkProfile from './components/lk/lkProfile.vue';
import LkDelivery from './components/lk/lkDelivery.vue';

const store = useStore();

fetch('/api/auth/whoami', {
  credentials: 'include',
})
.then(response => {
  if (200 === response.status){
    store.commit('login');
  }
  return response.json()
})
.then(data => {
  store.commit('profile', data.payload);
});

// store.watch(
//   (state, getters) => getters.isAuthorized,
//   (now, was) => {
//     console.log(`${was} >>> ${now}`);
//   }
// );

const logOrReg = ref(null);

</script>

<template>
  <div class="flex-container">
    <div class="hello-world">
      <HelloWorld msg="Hello Vue 3 + Vite" />
    </div>

    <div v-if="!store.getters.isAuthorized">
      <div class="title">
        <a href="#" :class="logOrReg ? 'active' : ''" @click.prevent="logOrReg = true">Register</a>
        |
        <a href="#" :class="logOrReg ? '' : 'active'" @click.prevent="logOrReg = false">Log in</a>
      </div>

      <div>
        <component :is="logOrReg ? AuthRegister : AuthLogin" />
      </div>

      <div class="foreign-services">
        <a href="/api/auth/facebook">FB</a>
        <a href="/api/auth/vk">VK</a>
        <a href="/api/auth/okru">OK</a>
      </div>
    </div>

    <div v-if="store.getters.isAuthorized">
      <AuthLogout/>
    </div>

  </div>


  <div v-if="store.getters.isAuthorized">
    <h2>LK</h2>
    <div class="flex-container">
      <div>
        <LkProfile/>
      </div>
      <div>
        <LkDelivery/>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 7pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.hello-world {
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), center no-repeat url('./assets/logo.png');
}

.flex-container {
  display: flex;
}

.flex-container > div {
  padding: .33em;
  border: 1px solid #ccc;
  border-radius: .72em;
  padding: 1em;
  margin: 0.33em;
}

.title {
  text-align: center;
  padding: 1.2em;
  font-size: 1.2em;
}

.title .active {
  font-weight: 900;
}

pre.raw {
  text-align: left;
}

form label {
  text-align: right;
  padding: .18em;
}

.foreign-services {
  display: flex;
  justify-content: center;
  margin-top: .72em;
  padding-top: .72em;
  border-top: 1px dashed #ccc;
}

.foreign-services > a {
  display: block;
  padding: .72em;
  margin: 0 .72em;
  border: 1px solid #ccc;
  border-radius: .24em;
  text-decoration: none;
}

.foreign-services > a:hover {
  background-color: lightsalmon;
}

</style>
