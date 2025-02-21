<template>
  <div class=" h-screen w-screen p-6 flex justify-center items-center flex-col gap-4 md:flex-row">
    <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-[-1] blur-md" type="video/mp4"
      :src="videoSrc">
    </video>
    <video autoplay muted loop id="myVideo" class="rounded-md md:w-96" type="video/mp4" :src="videoSrc">
    </video>
    <div class="opacity-50 flex justify-around items-center md:w-96 md:flex-col md:gap-8">
      <Introduction :title="music.title" :author="music.author" />
      <PlayMusic :audioSrc="music.src" :state="music.state" @play="play" @last="last" @next="next" />
    </div>
  </div>
</template>
<script lang="ts" setup>

import Introduction from "@/components/Introduction.vue";
import PlayMusic from "@/components/PlayMusic.vue";
import videoFile from '@/assets/lian.mp4'
import musicJson from "@/assets/music.json";

const musicIndex = ref(0);

const music = {
  title: ref(musicJson[musicIndex.value].title),
  author: ref(musicJson[musicIndex.value].author),
  src: ref(`/_nuxt/assets/music/${musicJson[musicIndex.value].src}`),
  state: ref(false),
};

watch(musicIndex, (index) => {
  music.title.value = musicJson[index].title;
  music.author.value = musicJson[index].author;
  music.src.value = `/_nuxt/assets/music/${musicJson[index].src}`;
});

const videoSrc = ref(videoFile);


function play() {
  const audio = document.querySelector("audio") as HTMLAudioElement;
  if (music.state.value) {
    audio.pause();
  } else {
    audio.play();
  }
  music.state.value = !music.state.value;
  
  audio.onended = () => {
    music.state.value = false;
  };
}

function last() {
  musicIndex.value = musicIndex.value === 0 ? musicJson.length - 1 : musicIndex.value - 1;
  music.state.value = false;
}

function next() {
  musicIndex.value = musicIndex.value === musicJson.length - 1 ? 0 : musicIndex.value + 1;
  music.state.value = false;
}
</script>
