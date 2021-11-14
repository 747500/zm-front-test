<script setup>

import { useStore } from 'vuex'

const store = useStore();

function logout() {

  fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
  .then(response => {
    store.commit('logout');
  })

}

</script>

<template lang="pug">
div
  h3 Log out
  br
  pre(class="raw") {{ store.getters.profile }}

  div
    button(@click="logout") POST /auth/logout
</template>

<style scoped>
</style>