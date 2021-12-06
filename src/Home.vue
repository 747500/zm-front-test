<script setup>
import { useStore } from 'vuex'

const store = useStore();

</script>
<template lang="pug">

div(v-if="store.getters.isAuthorized")
  div(class="app-menu")
    h2
      router-link(to="/lk") Личный кабинет

  router-view()

  //- div(class="flex-container box-container")
  //-   div
  //-     LkProfile()

  //-   div
  //-     LkExtAuth()

  //-   div
  //-     LkDelivery()

</template>
 