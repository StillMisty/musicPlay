<template>
  <div class=" h-screen w-screen p-6 flex justify-center items-center flex-col gap-4 md:flex-row">
    <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-[-1] blur-md" type="video/mp4"
      :src="videoSrc">
    </video>
    <video autoplay muted loop id="myVideo" class="rounded-md md:w-96" type="video/mp4" :src="videoSrc">
    </video>
    <div class="opacity-50 flex-col flex gap-4 justify-around items-center md:w-96 md:gap-8">
      <Introduction :title="music.title" :author="music.author" />
      <PlayMusic :audioSrc="music.src" :state="music.state" @play="play" @last="last" @next="next" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import videoFile from '@/assets/lian.mp4'
import musicJson from "@/assets/music.json";
const musicModules = import.meta.glob('@/assets/music/*.m4a');


const musicIndex = ref(0);

const music = ref({
  title: musicJson[musicIndex.value].title,
  author: musicJson[musicIndex.value].author,
  src: await loadMusic(),
  state: false,
});

loadMusic();

watch(musicIndex, (index) => {
  music.value.title = musicJson[index].title;
  music.value.author = musicJson[index].author;
  loadMusic().then((src) => {
    music.value.src = src;
  });
});

const videoSrc = ref(videoFile);

async function loadMusic() {
  const module = await musicModules[`/assets/music/${musicJson[musicIndex.value].src}`]() as { default: string };
  return module.default;
};

function play() {
  const audio = document.querySelector("audio") as HTMLAudioElement;
  if (music.value.state) {
    audio.pause();
  } else {
    audio.play();
  }
  music.value.state = !music.value.state;

  audio.onended = () => {
    music.value.state = false;
  };
}

function last() {
  musicIndex.value = musicIndex.value === 0 ? musicJson.length - 1 : musicIndex.value - 1;
  music.value.state = false;
}

function next() {
  musicIndex.value = musicIndex.value === musicJson.length - 1 ? 0 : musicIndex.value + 1;
  music.value.state = false;
}
</script>
