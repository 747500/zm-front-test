<script setup>
import { ref } from 'vue';

const showRaw = ref(false);
const profileData = ref({});

function profileLoad() {
  fetch('/api/lk/profile', {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    profileData.value = data;
  });
}

function profileUpdate() {
  fetch('/api/lk/profile', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(profileData.value),
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    profileLoad();
  });
}

profileLoad();

</script>

<template lang="pug">
div
  h3 Profile
  pre(v-if="showRaw" class="raw") {{ profileData }}
  form(v-if="!showRaw" @submit.prevent="profileUpdate")
    label() ID
    input(v-model="profileData.id" readonly)

    label() registerProvider
    input(v-model="profileData.registerProvider" readonly)

    label() providerId
    input(v-model="profileData.providerId" readonly)

    label() lastname
    input(v-model="profileData.lastname")

    label() firstname
    input(v-model="profileData.firstname")

    label() surname
    input(v-model="profileData.surname")

    label() email
    input(v-model="profileData.email" type="email" readonly)

    label() phone
    input(v-model="profileData.phone" type="phone" readonly)

    label() birthday
    input(v-model="profileData.birthday" type="date")

    label() status
    input(v-model="profileData.status" readonly)

    label() created_at
    input(v-model="profileData.created_at" type="datetime" readonly)

    label() updated_at
    input(v-model="profileData.updated_at" type="datetime" readonly)

    label() submit
    button(type="submit") Update
</template>

<style scoped>

form {
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 0.33em;
  row-gap: 0.33em;
  align-items: baseline;
}

input {
  border: 1px solid #555;
  border-radius: 3px;
}

input[readonly] {
  color: rgb(80, 71, 71);
  border-width: 1px;
}
</style>
