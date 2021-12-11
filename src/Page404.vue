<script setup></script>

<template lang="pug">
div(class="page flex-container page-404")
  div
  div(class="flex-container column")
    div
    div(class="message column flex-container")
      h1 404
      h2 Page Not Found
      p
        router-link(:to="{ name: 'Home' }") Home
    div
  div
</template>

<style scoped>
div {
  align-items: stretch;
}
.flex-container {
  display: flex;
}

.flex-container.column {
  flex-direction: column;
}
.page {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
}

.page > div {
  flex-basis: 33%;
}

.flex-container.column > div {
  flex-basis: 33%;
}

.page.page-404 .message {
  text-align: center;

  padding: 1em;
  margin: 1em 0 1em 0;
  box-shadow: 0.25em 0.25em 0.5em #555, -0.25em 0 0.4em #555;
  background-color: #fff;

  color: darkred;

  display: flex;
}

.flex-container.message > * {
  flex-basis: 33%;
}
</style>
