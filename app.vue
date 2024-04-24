<template>
  <div
    class=" h-screen w-screen p-6 flex justify-center items-center flex-col gap-4 md:flex-row" 
  >
    <video
      autoplay
      muted
      loop
      class="absolute top-0 left-0 w-full h-full object-cover z-[-1] blur-md"
    >
      <source src="/assets/lian.mp4" type="video/mp4" />
      <source src="/assets/lian.webp" type="image/webp" />
    </video>
    <video autoplay muted loop id="myVideo" class="rounded-md md:w-96">
      <source src="/assets/lian.mp4" type="video/mp4" />
      <source src="/assets/lian.webp" type="image/webp" />
    </video>
    <div class="flex justify-around items-center md:w-96 md:flex-col md:gap-8">
      <Introduction :title="music.title" :author="music.author" />
      <button class="opacity-40" v-on:click="play">
        <svg
          t="1713951845073"
          class="icon size-16"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4704"
          v-if="music.state.value"
        >
          <path
            d="M768 832h-128c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64h128c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64z m-384 0h-128c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64h128c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64z"
            p-id="4705"
          ></path>
        </svg>
        <svg
          t="1713951874624"
          class="icon size-16"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4851"
          v-else
        >
          <path
            d="M256 832c-11.712 0-23.36-3.2-33.664-9.536A64.170667 64.170667 0 0 1 192 768V256c0-22.208 11.52-42.816 30.336-54.464a64.298667 64.298667 0 0 1 62.272-2.816l512 256a64.064 64.064 0 0 1 0 114.56l-512 256c-8.96 4.48-18.88 6.72-28.608 6.72z"
            p-id="4852"
          ></path>
        </svg>
        <audio class="hidden">
          <source src="./assets/lian.m4a" type="audio/mpeg" />
        </audio>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Introduction from "~/components/introduction.vue";

interface Music {
  title: Ref<string>;
  author: Ref<string>;
  src: Ref<string>;
  state: Ref<boolean>;
}

const music: Music = {
  title: ref("《5:20AM》"),
  author: ref("AI東 雪蓮"),
  src: ref("./assets/lian.m4a"),
  state: ref(false),
};

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
</script>
