import { ref } from "vue";
import type { PlayerState } from "@/types/music";
import { AudioController } from "@/controllers/AudioController";
import musicJson from "@/assets/music.json";

export const playerState = ref<PlayerState>({
  currentIndex: 0,
  isPlaying: false,
  current: musicJson[0],
  audioController: new AudioController(musicJson[0]["src"]),
  musicJson,
});
