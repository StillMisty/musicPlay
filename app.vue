<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center gap-4 p-6 md:flex-row"
  >
    <video
      autoplay
      muted
      loop
      class="absolute left-0 top-0 z-[-1] h-full w-full object-cover blur-md"
      type="video/mp4"
      :src="video.videoFile"
    ></video>
    <video
      autoplay
      muted
      loop
      id="myVideo"
      class="rounded-md md:w-96"
      type="video/mp4"
      :src="video.videoFile"
    ></video>
    <div
      class="flex flex-col items-center justify-around gap-4 opacity-50 md:w-96 md:gap-8"
    >
      <Introduction
        :title="playState.current.title"
        :author="playState.current.author"
      />
      <PlayMusic
        :audioSrc="playState.current.src"
        :state="playState.isPlaying"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePlayStore } from "@/stores/playStore";
import { useVideoStore } from "@/stores/videoStore";

const video = useVideoStore();

const playStore = usePlayStore();
const playState = playStore.playerState;
</script>
