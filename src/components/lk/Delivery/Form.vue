<script setup>

const props = defineProps({
    dto: Object,
});

//const emit = defineEmits(['submit']);

</script>

<template lang="pug">
form(class="dto" @submit.prevent)
  label(v-if="props.dto.id") ID
  input(v-if="props.dto.id" type="text" readonly v-model="props.dto.id")

  label(v-if="props.dto.created_at") created_at
  input(v-if="props.dto.created_at" type="text" readonly v-model="props.dto.created_at")

  label(v-if="props.dto.updated_at") updated_at
  input(v-if="props.dto.updated_at" type="datetime" readonly v-model="props.dto.updated_at")

  label() region
  input(type="text" v-model="props.dto.region")

  label() city
  input(type="text" v-model="props.dto.city")

  label() address
  input(type="text" v-model="props.dto.address")

  label() kv
  input(type="text" v-model="props.dto.kv")

  label() comment
  textarea(v-model="props.dto.comment")

  slot(name="submit")

</template>