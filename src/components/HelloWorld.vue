<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="hello-container">
    <h1>{{ msg }}</h1>

    <p>
      Recommended IDE setup:<br />
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Documentation
      </a>
    </p>

    <p>
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
      Edit<br />
      <code>components/HelloWorld.vue</code><br />
      to test hot module replacement.
    </p>
  </div>
</template>

<style scoped>
.hello-container {
  text-align: center;
}
</style>
