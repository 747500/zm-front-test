<script setup>
import { useStore } from 'vuex'

import LkProfile from './components/lk/lkProfile.vue';
import LkDelivery from './components/lk/lkDelivery.vue';
import LkExtAuth from './components/lk/lkExtAuth.vue';

const store = useStore();

</script>
<template lang="pug">

div(v-if="store.getters.isAuthorized")
  div(class="app-menu")
    h2 Личный кабинет

  div(class="flex-container")
    div
      LkProfile()

    div
      LkExtAuth()

    div
      LkDelivery()

</template>