<template>
  <div class="text-center">
    <h1 class="text-4xl">
      {{ playState.musicList[playState.currentIndex].title }}
    </h1>
    <h2 class="text-2xl">
      {{ playState.musicList[playState.currentIndex].author }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { usePlayStore } from "@/stores/playStore";

const playStore = usePlayStore();
const playState = playStore.playerState;
</script>
