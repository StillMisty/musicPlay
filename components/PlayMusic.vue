<template>
  <div class="flex gap-4">
    <button @click="playStore.changeTrack('prev')">
      <ChevronFirst :size="44" />
    </button>
    <button @click="playStore.togglePlay">
      <Pause v-if="playStore.playerState.isPlaying" :size="48" />
      <Play v-else :size="48" />
    </button>
    <button @click="playStore.changeTrack('next')">
      <ChevronLast :size="44" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { usePlayStore } from "@/stores/playStore";
import { Play, Pause, ChevronLast, ChevronFirst } from "lucide-vue-next";

const playStore = usePlayStore();
</script>
