import { useVideoStore } from "./videoStore";
import musicJson from "@/assets/music.json";
import { AudioController } from "@/controllers/AudioController";
import type { PlayerState } from "@/types/PlayerState";
import { ref } from "vue";

const importMusic = async (src: string) => {
  const audioUrl = new URL(`../assets/music/${src}`, import.meta.url).href;
  return audioUrl;
};

export const usePlayStore = defineStore("PlayStore", () => {
  let audioController: AudioController;

  const musicIndex = Math.floor(Math.random() * musicJson.length);
  const playerState = ref<PlayerState>({
    currentIndex: 0,
    isPlaying: false,
    current: musicJson[musicIndex],
    musicJson,
  });
  const initAudioController = async () => {
    if (import.meta.client) {
      const initialAudioUrl = await importMusic(musicJson[musicIndex].src);
      audioController = new AudioController(initialAudioUrl);
    }
  };
  // 异步初始化
  initAudioController();

  const changeTrack = async (direction: "next" | "prev"): Promise<void> => {
    const { value: player } = playerState;
    const totalTracks = player.musicJson.length;

    // 计算新的索引
    const newIndex =
      direction === "next"
        ? (player.currentIndex + 1) % totalTracks
        : (player.currentIndex - 1 + totalTracks) % totalTracks;

    // 更新播放器状态
    player.currentIndex = newIndex;
    player.current = player.musicJson[newIndex];

    audioController.setSource(await importMusic(player.current.src));
    if (player.isPlaying) {
      audioController.togglePlay(true);
    }
    // 更新视频
    useVideoStore().changeVideo();
  };

  const togglePlay = () => {
    playerState.value.isPlaying = !playerState.value.isPlaying;
    audioController.togglePlay(playerState.value.isPlaying);
  };

  return {
    playerState,
    changeTrack,
    togglePlay,
  };
});
