<script setup>
import { ref } from 'vue'

const authRegisterDto = ref({
  email: '',
  phone: '',
  password: '',
});

function authRegisterSubmit(event) {

  console.log(event)

}

</script>

<template>

  <form @submit.prevent="authRegisterSubmit">
    <div id="auth-register-fields">
      <label for="auth-register-email">E-mail</label>
      <input id="auth-register-email" name="email" type="email" v-model="authRegisterDto.email"/>

      <label for="auth-register-phone">Phone</label>
      <input id="auth-register-phone" name="phone" type="text" v-model="authRegisterDto.phone"/>

      <label for="auth-register-password">Password</label>
      <input id="auth-register-password" name="password" type="password" v-model="authRegisterDto.password"/>

      <label for="auth-register-password-confirm">Confirm password</label>
      <input id="auth-register-password-confirm" name="password" type="password"/>

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
