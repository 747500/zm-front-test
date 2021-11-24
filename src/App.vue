<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { shallowRef } from 'vue'
import { useStore } from 'vuex'

import HelloWorld from './components/HelloWorld.vue'
import AuthRegister from './components/AuthRegister.vue';
import AuthLogin from './components/AuthLogin.vue';
import AuthLogout from './components/AuthLogout.vue';
import LkProfile from './components/lk/lkProfile.vue';
import LkDelivery from './components/lk/lkDelivery.vue';
import LkPassword from './components/lk/lkPassword.vue';
import LkExtAuth from './components/lk/lkExtAuth.vue';

const store = useStore();

fetch('/api/auth/whoami', {
  credentials: 'include',
})
.then(response => {
  if (200 === response.status){
    store.commit('login');
  }
})

// store.watch(
//   (state, getters) => getters.isAuthorized,
//   (now, was) => {
//     console.log(`${was} >>> ${now}`);
//   }
// );

const logOrReg = shallowRef(AuthRegister);

</script>

<template>
  <div class="flex-container">
    <div class="hello-world">
      <HelloWorld msg="Hello Vue 3 + Vite" />
    </div>

    <div v-if="!store.getters.isAuthorized">
      <h3 style="font-weight: 100;">
        <a href="#" :class="{ active: logOrReg === AuthRegister }" @click.prevent="logOrReg = AuthRegister">Register</a>
        |
        <a href="#" :class="{ active: logOrReg === AuthLogin }" @click.prevent="logOrReg = AuthLogin">Log in</a>
      </h3>

      <div>
        <component :is="logOrReg" />
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

    <div v-if="store.getters.isAuthorized">
      <LkPassword/>
    </div>

  </div>


  <div v-if="store.getters.isAuthorized">
    <h2>LK</h2>
    <div class="flex-container">
      <div>
        <LkProfile/>
      </div>
      <div>
        <LkExtAuth/>
      </div>
      <div>
        <LkDelivery/>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #efefef;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 9pt;
}

a {
  color: #065748;
  text-decoration: none;
}

a:hover {
  color:crimson;
}

input {
  border: 1px solid #555;
  border-radius: 3px;
  padding: .32em;
}

button {
  border: 1px solid #555;
  border-radius: 3px;
  padding: .32em .64em;
}

input[readonly] {
  color: rgb(80, 71, 71);
  border-width: 1px;
}

#app {
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
  /*
  border: 1px solid #ccc;
  border-radius: .72em;
  */
  padding: 1em;
  margin: 1em;
  box-shadow: .32em .12em .4em #ccc, -.32em 0 .4em #ddd;
  background-color: #fff;
}

h3 {
  text-align: center;
}

.title {
  text-align: center;
  padding: 1.2em;
  font-size: 1.2em;
}

.active {
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
