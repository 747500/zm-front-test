<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const authLoginDto = ref({
  email: '',
  password: '',
});

function authLoginSubmit(event) {

  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authLoginDto.value),
    credentials: 'include',
  })
  .then(response => {
    if (201 === response.status) {
      store.commit('login');
    }
  })
}

</script>

<template>

  <form @submit.prevent="authLoginSubmit">
    <div id="auth-login-fields">
      <label for="auth-login-email">E-mail</label>
      <input id="auth-login-email" name="email" type="email" v-model="authLoginDto.email"/>

      <label for="auth-login-password">Password</label>
      <input id="auth-login-password" name="password" type="password" v-model="authLoginDto.password"/>

      <label for="auth-login-submit">Submit form</label>
      <button id="auth-login-submit">POST /auth/login</button>
    </div>
  </form>
</template>

<style scoped>

#auth-login-fields {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 0.33em;
  row-gap: 0.33em;
  align-items: baseline;
}

</style>
