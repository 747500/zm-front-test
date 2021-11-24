<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
//import { createPopper } from '@popperjs/core';

const store = useStore();

const addressList = ref({});

const newAddress = ref('');

function updateList() {
    fetch('/api/lk/delivery', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      addressList.value = data.payload;
    });
}

function createDeliveryAddress() {
  fetch('/api/lk/delivery', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      address: newAddress.value,
    }),
  })
  .then(() => {
    updateList();
    newAddress.value = '';
  });
}

function updateDeliveryAddress(id) {
  const { address } = addressList.value.find(item => item.id === id);

  fetch(`/api/lk/delivery/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ address }),
  })
  .then(() => {
    updateList();
  });
}

function deleteDeliveryAddress(id) {
  fetch(`/api/lk/delivery/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(() => {
    updateList();
  });
}

updateList();
</script>

<template lang="pug">
div
  h3 Адреса для доставки

  div(v-if="!store.getters.showRaw" class="address-list")
    input(id="add-delivery-address" v-model="newAddress")
    button(type="button" @click="createDeliveryAddress" title="POST /api/lk/delivery") +
    span
    template(class="raw" v-for="item in addressList" :key="item.id")
      input(v-model="item.address")/
      button(type="button" @click="updateDeliveryAddress(item.id)" :title="`PUT /api/lk/delivery/${item.id}`") S
      button(type="button" @click="deleteDeliveryAddress(item.id)" :title="`DELETE /api/lk/delivery/${item.id}`") -

  pre(v-if="store.getters.showRaw" class="raw") {{ addressList }}

</template>

<style scoped>
.address-list {
  display: grid;
  grid-template-columns: 10fr 1fr 1fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  align-items: baseline;
}
</style>
