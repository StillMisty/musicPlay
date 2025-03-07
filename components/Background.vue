<template>
  <div class="absolute left-0 top-0 -z-20 h-full w-full dark:bg-gray-600"></div>

  <Transition
    enter-active-class="transition-opacity duration-300 ease-in-out"
    leave-active-class="transition-opacity duration-300 ease-in-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    mode="out-in"
  >
    <video
      :key="videoStore.videoFile"
      autoplay
      muted
      loop
      class="absolute left-0 top-0 -z-10 h-full w-full object-cover blur-md"
      type="video/mp4"
      :src="videoStore.videoFile"
    ></video>
  </Transition>
</template>

<script lang="ts" setup>
const videoStore = useVideoStore();
</script>
