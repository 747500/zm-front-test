<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
//import { createPopper } from '@popperjs/core';

import DeliveryForm from './Delivery/Form.vue';

const store = useStore();

const addressList = ref([]);

const dto = ref({
  region: '',
  city: '',
  address: '',
  kv: '',
  comment: '',
});

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
    body: JSON.stringify(dto.value),
  })
  .then(() => {
    updateList();
    Object.keys(dto.value).forEach(k => dto.value[k] = '');
  });
}

function updateDeliveryAddress(id) {
  const item = addressList.value.find(item => item.id === id);

  fetch(`/api/lk/delivery/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(item),
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

  div
    DeliveryForm(:dto="dto" class="dto")
      template(v-slot:submit)
        label() create
        button(@click="createDeliveryAddress()") POST /api/lk/delivery
    br

  div(v-if="!store.getters.showRaw" class="address-list")
    div(class="item" v-for="item in addressList" :key="item.id")
      DeliveryForm(class="dto" :dto="item")
        template(v-slot:submit)
          label() update
          button(type="button" @click="updateDeliveryAddress(item.id)") PUT /api/lk/delivery/{{ item.id }}

          label() delete
          button(type="button" @click="deleteDeliveryAddress(item.id)") DELETE /api/lk/delivery/{{ item.id }}

  pre(v-if="store.getters.showRaw" class="raw") {{ addressList }}

</template>

<style scoped>
form.dto {
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  align-items: baseline;
}

.address-list .item {
  border-top: 1px dashed #ccc;
  padding: 1em 0;
}

</style>
