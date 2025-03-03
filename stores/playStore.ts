import { useVideoStore } from "./videoStore";
import { AudioController } from "@/controllers/AudioController";
import type { PlayerState } from "@/types/PlayerState";

export const usePlayStore = defineStore("PlayStore", () => {
  let audioController: AudioController | null = null;

  const { data } = useFetch("/api/songs");

  let isLoading = ref(true);

  const playerState: Ref<PlayerState> = ref({
    currentIndex: 0,
    isPlaying: false,
    musicList: [{ title: "", author: "", src: "" }],
  });

  // 使 isLoading 与 data 同步
  watchEffect(() => {
    if (data.value) {
      playerState.value.currentIndex = Math.floor(
        Math.random() * data.value.length,
      );
      playerState.value.musicList = data.value;
      isLoading.value = false;
    }
  });

  /**
   * 确保 AudioController 已经初始化
   **/
  const ensureAudioController = async (): Promise<AudioController> => {
    if (import.meta.client) {
      if (!audioController) {
        const initialAudioUrl =
          playerState.value.musicList[playerState.value.currentIndex].src || "";
        audioController = new AudioController(initialAudioUrl);
      }
    }
    return audioController as AudioController;
  };

  /**
   * 切换上一首或下一首
   * @param direction - 切换方向
   **/
  async function changeTrack(direction: "next" | "prev"): Promise<void> {
    const { value: player } = playerState;
    const total = player.musicList.length;

    player.currentIndex =
      direction === "next"
        ? (player.currentIndex + 1) % total
        : (player.currentIndex - 1 + total) % total;

    const controller = await ensureAudioController();
    controller.setSource(
      playerState.value.musicList[playerState.value.currentIndex].src,
    );

    if (player.isPlaying) {
      controller.togglePlay(true);
    }

    // 更新视频
    useVideoStore().changeVideo();
  }

  /**
   * 播放或暂停
   **/
  const togglePlay = async () => {
    // 如果没有曲目，不执行任何操作
    if (playerState.value.musicList.length === 0) return;

    playerState.value.isPlaying = !playerState.value.isPlaying;

    const controller = await ensureAudioController();
    controller.togglePlay(playerState.value.isPlaying);
  };

  return {
    playerState,
    changeTrack,
    togglePlay,
    isLoading,
  };
});
