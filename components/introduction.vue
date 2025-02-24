<template>
  <div class="text-center">
    <h1 class="text-4xl">{{ title }}</h1>
    <h2 class="text-2xl">{{ author }}</h2>
  </div>
</template>

<script lang="ts" setup>
const { title, author } = defineProps<{
  title: string;
  author: string;
}>();
</script>
