<script setup>

const props = defineProps({
    dto: Object,
});

//const emit = defineEmits(['submit']);

</script>

<template lang="pug">
form(class="dto" @submit.prevent)
  template(v-if="props.dto.id")
    label() ID
    input(type="text" readonly v-model="props.dto.id")

  template(v-if="props.dto.created_at")
    label() created_at
    input(type="text" readonly v-model="props.dto.created_at")

  template(v-if="props.dto.updated_at")
    label() updated_at
    input(type="text" readonly v-model="props.dto.updated_at")

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