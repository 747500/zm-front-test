<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

</script>

<template lang="pug">
div(v-if="store.getters.isAuthorized")
  div(class="app-menu")
    h3(class="flex-container")
      router-link(to="/lk/profile") Профайл
      router-link(to="/lk/password") Пароль
      router-link(to="/lk/social") Соц. сети
      router-link(to="/lk/delivery" ) Адреса для доставки
      router-link(to="/lk/notify" ) Уведомления

  //- pre(class="raw") {{ router }}

  router-view()

</template>

<style>

.app-menu {
  padding: .12rem 1rem;
}

.app-menu h3 {
  font-weight: 100;
}

.app-menu h3 .router-link-active {
  font-weight: 900;
}

.app-menu h3 a {
  display: block;
  padding: 0.5rem 1rem;
}

</style>