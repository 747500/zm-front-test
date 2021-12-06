<script setup>
import { ref } from 'vue';

const category = ref([]);

const notify = ref({
  category: '',
  title: '',
  message: '',
});

const notifyList = ref([]);

function getNotifyList() {

  let cats;

  const url = new URL('/api/lk/notify', window.location);

  if (category.value.length) {
    cats = category.value;
    url.searchParams.set('category', cats);
  }  

  fetch(url, {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    return response.json();
  })
  .then(response => {
    notifyList.value = response.payload;
  })
  .catch(console.error);
}

function postNotify() {
  console.log(JSON.stringify(notify.value));

  fetch('/api/lk/notify/forCurrentUser', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(notify.value),
  })
  .then(() => {
    getNotifyList();
  })
}

getNotifyList();

</script>


<template lang="pug">
div
  form(class="new-notify" @submit.prevent="postNotify()")
    label() category
    div
      input(type="radio" name="notify-category" id="Users" value="Users" v-model="notify.category")
      label(for="notify-category") Users

      input(type="radio" name="notify-category" id="Orders" value="Orders" v-model="notify.category")
      label(for="notify-category") Orders

      input(type="radio" name="notify-category" id="News" value="News" v-model="notify.category")
      label(for="notify-category")  News

    label() title
    input(type="text" v-model="notify.title")

    label() message
    input(type="text" v-model="notify.message")

    label() submit
    button(type="submit") POST

  hr

  form(@submit.prevent)
    input(type="checkbox" id="notify-category-users" value="Users" @change="getNotifyList" v-model="category")
    label(for="notify-category-users") Users

    input(type="checkbox" id="notify-category-orders" value="Orders" @change="getNotifyList" v-model="category")
    label(for="notify-category-orders") Orders

    input(type="checkbox" id="notify-category-news" value="News" @change="getNotifyList" v-model="category")
    label(for="notify-category-news")  News

  pre {{ notifyList }}


</template>



<style scoped>

form.new-notify {
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  align-items: baseline;
}

</style>