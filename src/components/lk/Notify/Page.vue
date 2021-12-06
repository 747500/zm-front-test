<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const category = ref([]);

const notify = ref({
  category: '',
  title: '',
  message: '',
});

const notifyList = ref([]);

function getNotifyList() {
  const url = new URL('/api/lk/notify', window.location);

  if (category.value.length) {
    url.searchParams.set('category', category.value);
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

function setRead(id) {
  fetch(`/api/lk/notify/${id}`, {
    method: 'PUT',
    credentials: 'include',
  })
  .then(() => {
    getNotifyList();
  })
}

getNotifyList();

</script>


<template lang="pug">
div(class="box-container flex-container notify-container")
  div 
    h3 Создать уведомление
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
      button(type="submit" :disabled="!(notify.title.length && notify.message.length && notify.category.length)") POST


  div(class="notify-list")
    div(class="filter")
      form(@submit.prevent)
        input(type="checkbox" id="notify-category-users" value="Users" @change="getNotifyList" v-model="category")
        label(for="notify-category-users") Users

        input(type="checkbox" id="notify-category-orders" value="Orders" @change="getNotifyList" v-model="category")
        label(for="notify-category-orders") Orders

        input(type="checkbox" id="notify-category-news" value="News" @change="getNotifyList" v-model="category")
        label(for="notify-category-news")  News

    div(class="list")
      div(v-if="!store.getters.showRaw")
        template(v-for="item in notifyList")
          div(:class="{ unread: item.is_unread }" class="item")
            div(class="head flex-container")
              div()
                input(type="checkbox" @change="setRead(item.id)" :disabled="!item.is_unread" v-model="item.is_unread")
              div()
                div [{{ item.category }}]
                div {{ item.title }}
                div {{ new Date(item.created_at).toLocaleString('ru') }}
                div {{ new Date(item.updated_at).toLocaleString('ru') }}
            div() {{ item.message }}

      pre(v-if="store.getters.showRaw" class="raw") {{ notifyList }}

</template>



<style scoped>

.notify-container {
  align-items: flex-start;
}

form.new-notify {
  display: grid;
  grid-template-columns: 1fr 4fr;
  column-gap: 0.12em;
  row-gap: 0.6em;
  align-items: baseline;
}

.unread {
  background-color: rgb(255, 247, 199);
}

.notify-list .filter {
  border-bottom: 1px solid #ccc;
  margin: 0;
  padding: 1rem 0;
}

.notify-list .item:not(:first-child) {
  border-top: 1px dashed #ccc;
}

.notify-list .item {
  margin: 0;
  padding: 1rem 0;
}

</style>