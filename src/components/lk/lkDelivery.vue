<script setup>
import { ref } from 'vue';

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
  div(class="title") Delivery addresses
  div
    form(@submit.prevent="createDeliveryAddress" class="address-list")
      label(for="add-delivery-address" style="text-align: center;") New
      input(id="add-delivery-address" v-model="newAddress")
      button(type="submit") +
  div(class="address-list")
    template(class="raw" v-for="item in addressList" :key="item.id")
      input(type="text" readonly v-model="item.id" style="width: 1em; text-align: right;")
      input(v-model="item.address")/
      button(type="button" @click="updateDeliveryAddress(item.id)") S
      button(type="button" @click="deleteDeliveryAddress(item.id)") -
</template>

<style scoped>
.address-list {
  display: grid;
  grid-template-columns: 1fr 10fr 1fr 1fr;
  column-gap: 0.33em;
  row-gap: 0.12em;
  align-items: baseline;
}
</style>
