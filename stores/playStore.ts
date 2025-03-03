import { useVideoStore } from "./videoStore";
import musicJson from "@/assets/music.json";
import { AudioController } from "@/controllers/AudioController";
import type { PlayerState } from "@/types/PlayerState";

export const usePlayStore = defineStore("PlayStore", () => {
  let audioController: AudioController | null = null;

  const musicIndex = useState("musicIndex", () =>
    Math.floor(Math.random() * musicJson.length),
  );

  const playerState = ref<PlayerState>({
    currentIndex: musicIndex.value,
    isPlaying: false,
    current: musicJson[musicIndex.value],
    musicJson,
  });

  const ensureAudioController = async (): Promise<AudioController> => {
    if (import.meta.client) {
      if (!audioController) {
        const initialAudioUrl = `/music/${playerState.value.current.src}`;
        audioController = new AudioController(initialAudioUrl);
      }
    }
    return audioController as AudioController;
  };

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

    const controller = await ensureAudioController();
    controller.setSource(`/music/${player.current.src}`);

    if (player.isPlaying) {
      controller.togglePlay(true);
    }

    // 更新视频
    useVideoStore().changeVideo();
  };

  const togglePlay = async () => {
    playerState.value.isPlaying = !playerState.value.isPlaying;

    const controller = await ensureAudioController();
    controller.togglePlay(playerState.value.isPlaying);
  };

  return {
    playerState,
    changeTrack,
    togglePlay,
  };
});
