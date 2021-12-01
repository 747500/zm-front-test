<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()

const dto = ref({
  password: '',
  token: route.query.token,
});

const resultMessage = ref('');

function setPassword() {
  fetch('/api/auth/password/set', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(dto.value),
  })
  .then(async response => {
    router.replace('/');
  });
}

</script>

<template lang="pug">
div(class="flex-container box-container")
  div
    h3 Password recovery
    form(@submit.prevent="setPassword")
      input(type="hidden" v-model="dto.token")

      label() Password
      input(v-model="dto.password" type="password")

      label() Password confirm
      input(v-model="dto.confirm" type="password")

      label() Submit form
      button(type="submit" :disabled="dto.password.length < 8 || dto.password !== dto.confirm")
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

