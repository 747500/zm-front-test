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

<template>
  <pre class="raw">{{ store.getters.profile }}</pre>

  <div>
    <button @click="logout">POST /auth/logout</button>
  </div>

</template>

<style scoped>
</style>