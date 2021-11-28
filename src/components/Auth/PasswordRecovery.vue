<script setup>
import { ref } from 'vue';

const lkLostPasswordDto = ref({
  email: null,
});

const resultMessage = ref('');

function requestPasswordRecovery() {
  const s = `${window.location.protocol}//${window.location.host}/`;
  console.log(s);
  const url = new URL(s);
  url.pathname = '/passwordRecovery';

  console.log(url.toString());

  fetch('/api/auth/password/recovery', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      ...lkLostPasswordDto.value,
      url: url.toString()
      }),
  })
  .then(async response => {
    if (201 === response.status) {
      resultMessage.value = 'Ok';
      setTimeout(() => { resultMessage.value = '' }, 3000);
    }
    else {
      const data = await response.json();
      resultMessage.value = data.payload ? data.payload : data;
    }
  });
}


</script>

<template lang="pug">
div
  form(@submit.prevent="requestPasswordRecovery")
    label() E-mail
    input(v-model="lkLostPasswordDto.email" type="email")

    label() Submit form
    button(type="submit" :disabled="lkLostPasswordDto.length === 0")
      | PUT /api/auth/password/recovery

  <pre>{{ resultMessage}}</pre>
</template>

<style scoped>

form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  align-items: baseline;
}

</style>
