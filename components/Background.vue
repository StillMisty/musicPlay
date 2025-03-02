<template>
  <video
    autoplay
    muted
    loop
    class="absolute left-0 top-0 z-[-1] h-full w-full object-cover blur-md"
    type="video/mp4"
    :src="videoStore.videoFile"
  ></video>
</template>

<script lang="ts" setup>
const videoStore = useVideoStore();
</script>
