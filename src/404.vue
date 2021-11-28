<script setup>

</script>

<template lang="pug">
div(class="page flex-container")
  div
  div(class="flex-container column")
    div
    div(class="message")
      h1 Page Not Found
      p
        router-link(:to="{ name: 'Home' }" class ="btn btn-info") Home
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

.flex-container.column > div{
  flex-basis: 33%;
}

.message {
  text-align: center;

  padding: 1em;
  margin: 1em 0 1em 0;
  box-shadow: .25em .25em .5em #555, -.25em 0 .4em #555;
  background-color: #fff;
}
</style>