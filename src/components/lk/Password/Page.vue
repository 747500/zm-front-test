<script setup>
import { ref } from 'vue';

const lkPasswordDto = ref({
  old: null,
  new: null,
});

const resultMessage = ref('');

const passwordConfirm = ref('');

function passwordUpdate() {
  fetch('/api/auth/password', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(lkPasswordDto.value),
  }).then(async (response) => {
    if (201 === response.status) {
      resultMessage.value = 'Ok';
      setTimeout(() => {
        resultMessage.value = '';
      }, 3000);
    } else {
      const data = await response.json();
      resultMessage.value = data.payload ? data.payload : data;
    }
  });
}
</script>

<template lang="pug">
div(class="box-container")
    div(style="width: 32rem;")
      h3 Установка/смена пароля

      form(class="page-password" @submit.prevent="passwordUpdate")
        label() current password
        input(v-model="lkPasswordDto.old" @keyup="passwordCompare" type="password")

        label() new password
        input(v-model="lkPasswordDto.new" @keyup="passwordCompare" type="password")

        label() new password (confirm)
        input(v-model="passwordConfirm" @keyup="passwordCompare" type="password")

        label() submit
        button(type="submit" :disabled="lkPasswordDto.new !== passwordConfirm || passwordConfirm.length < 8")
          | POST /api/auth/password

    pre {{ resultMessage}}
</template>

<style>
form.page-password {
  display: grid;
  grid-template-columns: 2fr 3fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  align-items: baseline;
}
</style>
