<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const authRegisterDto = ref({
  email: null,
  password: null,
});

function authRegisterSubmit(event) {
  console.log(event);

  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authRegisterDto.value),
  })
    .then((response) => {
      console.log(response);
      if (201 === response.status) {
        store.commit('login');
      }
    })
    .catch(console.error);
}
</script>

<template>
  <form @submit.prevent="authRegisterSubmit">
    <div id="auth-register-fields">
      <label for="auth-register-email">E-mail</label>
      <input
        id="auth-register-email"
        v-model="authRegisterDto.email"
        name="email"
        type="email"
      />

      <!--
      <label for="auth-register-phone">Phone</label>
      <input id="auth-register-phone" name="phone" type="text" v-model="authRegisterDto.phone"/>
      -->

      <label for="auth-register-password">Password</label>
      <input
        id="auth-register-password"
        v-model="authRegisterDto.password"
        name="password"
        type="password"
      />

      <label for="auth-register-password-confirm">Confirm password</label>
      <input
        id="auth-register-password-confirm"
        name="password"
        type="password"
      />

      <label for="auth-register-submit">Submit form</label>
      <button id="auth-register-submit">POST /auth/register</button>
    </div>
  </form>
</template>

<style scoped>
#auth-register-fields {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 0.33em;
  row-gap: 0.33em;
  align-items: baseline;
}
</style>
