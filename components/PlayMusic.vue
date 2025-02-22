<template>
  <div class="flex gap-4">
    <button @click="last">
      <ChevronFirst :size="44" />
    </button>
    <button @click="play">
      <Pause v-if="state" :size="48" />
      <Play v-else :size="48" />
      <audio class="hidden" :src="audioSrc" type="audio/mpeg">
      </audio>
    </button>
    <button @click="next">
      <ChevronLast :size="44" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Play, Pause, ChevronLast, ChevronFirst } from "lucide-vue-next";

const { audioSrc, state } = defineProps<{
  audioSrc: string;
  state: boolean;
}>();

const emit = defineEmits(["play", "last", "next"]);

const play = () => {
  emit("play");
};

const last = () => {
  emit("last");
};

const next = () => {
  emit("next");
};
</script>