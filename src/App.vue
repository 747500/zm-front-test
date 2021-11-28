<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { shallowRef } from 'vue'
import { useStore } from 'vuex'

import HelloWorld from './components/HelloWorld.vue'

import AuthRegister from './components/Auth/Register.vue';
import AuthLogin from './components/Auth/Login.vue';
import AuthPasswordRecovery from './components/Auth/PasswordRecovery.vue';
import AuthLogout from './components/Auth/Logout.vue';

import LkPassword from './components/lk/lkPassword.vue';

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

<template lang="pug">
div(class="settings")
  form()
    input(id="showRaw" type="checkbox" @click="store.commit('toggleRaw')" :checked="store.getters.showRaw")
    label(for="showRaw") raw data

div(class="flex-container")
  div(class="hello-world")
    HelloWorld(msg="Hello Vue 3 + Vite")

  div(v-if="!store.getters.isAuthorized" class="login-options")
    h3(class="flex-container" style="font-weight: 100;")
      a(href="#" :class="{ active: logOrReg === AuthRegister }" @click.prevent="logOrReg = AuthRegister") Register
      a(href="#" :class="{ active: logOrReg === AuthLogin }" @click.prevent="logOrReg = AuthLogin") Log in
      a(href="#" :class="{ active: logOrReg === AuthPasswordRecovery }" @click.prevent="logOrReg = AuthPasswordRecovery") Recovery

    div(class="component")
      component(:is="logOrReg")

    div(class="foreign-services")
      a(href="/api/auth/facebook") FB
      a(href="/api/auth/vk") VK
      a(href="/api/auth/okru") OK

  div(v-if="store.getters.isAuthorized")
    AuthLogout()

  div(v-if="store.getters.isAuthorized")
    LkPassword()

router-view()

</template>

<style>
body {
  background-color: #efefef;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 9pt;
  margin: 0;
  padding: 0;
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

.login-options h3 a {
  display: block;
  text-align: center;
  flex-basis: 33%;
}

.login-options .component {
  border-top: 1px dashed #ccc;
  padding: 1em 0;
}

.settings {
  padding: 1em;
  margin: 0 0 1em 0;
  box-shadow: .32em .12em .4em #ccc, -.32em 0 .4em #ddd;
  background-color: #fff;
}

.app-menu {
  padding: 1em;
  margin: 1em 0 1em 0;
  box-shadow: .32em .12em .4em #ccc, -.32em 0 .4em #ddd;
  background-color: #fff;
}

.hello-world {
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), center no-repeat url('./assets/logo.png');
}

.flex-container {
  display: flex;
}

.flex-container > div {
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
