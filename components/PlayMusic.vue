<template>
  <div class="flex gap-4">
    <button @click="changeTrack('prev')">
      <ChevronFirst :size="44" />
    </button>
    <button @click="togglePlay">
      <Pause v-if="state" :size="48" />
      <Play v-else :size="48" />
      <audio class="hidden" :src="audioSrc" type="audio/mpeg"></audio>
    </button>
    <button @click="changeTrack('next')">
      <ChevronLast :size="44" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Play, Pause, ChevronLast, ChevronFirst } from "lucide-vue-next";
import { changeTrack, togglePlay } from "@/controllers/MusicController";
const { audioSrc, state } = defineProps<{
  audioSrc: string;
  state: boolean;
}>();
</script>
