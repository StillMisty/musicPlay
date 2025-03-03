<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center gap-4 p-6 md:flex-row"
  >
    <Background />
    <video
      autoplay
      muted
      loop
      class="rounded-md h-72 w-96 object-cover"
      type="video/mp4"
      :src="videoStore.videoFile"
    ></video>
    <div
      class="flex flex-col items-center justify-around gap-4 opacity-50 md:w-96 md:gap-8"
    >
      <div v-if="playStore.isLoading">
        <LoaderCircle :size="64" class="animate-spin" />
      </div>
      <template v-else>
        <Introduction />
        <PlayMusic />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";

const videoStore = useVideoStore();

const playStore = usePlayStore();
</script>
