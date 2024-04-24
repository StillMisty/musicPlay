<template>
  <div class="text-center opacity-60">
    <h1 class="text-4xl">{{ props.title.value }}</h1>
    <h2 class="text-2xl">{{ props.author.value }}</h2>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: Ref<string>;
  author: Ref<string>;
}>();
</script>

<style></style>
