<script setup>
  import { ref } from 'vue';

  const profileData = ref({});

  fetch('/api/lk/profile', {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    profileData.value = data;
  });

</script>

<template lang="pug">
div
  div(class="title") Profile
  pre(class="raw") {{ profileData }}
</template>

<style scoped>

</style>
