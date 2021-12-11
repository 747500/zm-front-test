<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const showRaw = ref(false);

const profileData = ref({});
const profileValidation = ref({});

function profileLoad() {
  fetch('/api/lk/profile', {
    method: 'GET',
    credentials: 'include',
  })
  .then(async response => {
    if (200 === response.status) {
      const data = await response.json();
      profileData.value = data.payload;
    }
  })
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
    if (200 === response.status) {
      profileLoad();
      return;
    }
    return response.json();
  })
  .then(data => {
    if (!data) {
      profileValidation.value = {};
      return;
    }

    if ('error' === data.status && 'Validation' === data.payload?.message) {
      profileValidation.value = data.payload.values;
      // Object.keys(data.payload.values).forEach(k => {
      //   profileValidation.value[k] = true; // data.payload.values[k];
      // })
    }
  })
}

profileLoad();

</script>

<template lang="pug">
div(class="box-container")
  div(style="width: 32rem;")
    h3 Профиль
    pre(v-if="store.getters.showRaw" class="raw") {{ profileData }}
    form(v-if="!store.getters.showRaw" @submit.prevent="profileUpdate")
      label() ID
      input(v-model="profileData.id" readonly)

      label() lastname
      input(v-model="profileData.lastname")

      label() firstname
      input(v-model="profileData.firstname")

      label() surname
      input(v-model="profileData.surname")

      label() email
      input(v-model="profileData.email" type="email")

      label() phone
      input(v-model="profileData.phone" :class="{ invalid: profileValidation.phone }" type="phone")

      label() birthday
      input(v-model="profileData.birthday" type="date")

      label() status
      input(v-model="profileData.status" readonly)

      label() created_at
      input(v-model="profileData.created_at" type="datetime" readonly)

      label() updated_at
      input(v-model="profileData.updated_at" type="datetime" readonly)

      label() submit
      button(type="submit")
        | POST /api/lk/profile

    pre(class="raw") {{ profileValidation }}

</template>

<style scoped>

form {
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  align-items: baseline;
}
.invalid {
  color: red;
}

</style>
