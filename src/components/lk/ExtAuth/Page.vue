<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const extAuth = ref({});

function listExtAuth() {
  fetch('/api/lk/profile/ext-auth', {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      extAuth.value = Object.keys(body.payload).map((k) => {
        return {
          name: k,
          status: body.payload[k],
        };
      });
    });
}

listExtAuth();
</script>

<template lang="pug">
div(class="page-ext-auth box-container")
  div(style="width: 32rem;")
    h3 Соц. сети
    form(v-if="!store.getters.showRaw")
      template(v-for="item in extAuth")
        label(:for="item.name") {{ item.name }}
        input(type="checkbox" :id="item.name" :checked="item.status" onclick="return false;")

    pre(v-if="store.getters.showRaw" class="raw") {{ extAuth }}

</template>

<style scoped>
label {
  text-align: left;
}

form {
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  /*align-items: baseline;*/
}
</style>
