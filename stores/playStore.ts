import { useVideoStore } from "./videoStore";
import { AudioController } from "@/controllers/AudioController";
import type { PlayerState } from "@/types/PlayerState";

export const usePlayStore = defineStore("PlayStore", () => {
  let audioController: AudioController | null = null;
  let isLoading = ref(true);
  const playerState: Ref<PlayerState> = ref({
    currentIndex: 0,
    isPlaying: false,
    musicList: [{ title: "", author: "", src: "" }],
  });

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

    audioController?.setSource(
      playerState.value.musicList[playerState.value.currentIndex].src,
    );

    if (player.isPlaying) {
      audioController?.togglePlay(true);
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
    audioController?.togglePlay(playerState.value.isPlaying);
  };

  /**
   * 初始化数据
   **/
  const init = async () => {
    const { data } = await useFetch("/api/songs");
    if (data.value && isLoading.value) {
      playerState.value.currentIndex = Math.floor(
        Math.random() * data.value.length,
      );
      playerState.value.musicList = data.value;

      // 初始音频控制器
      if (import.meta.client && playerState.value.musicList.length > 0) {
        const initialAudioUrl =
          playerState.value.musicList[playerState.value.currentIndex].src;
        audioController = new AudioController(initialAudioUrl);
      }
    }
    isLoading.value = false;
  };

  // 在客户端渲染时，自动加载音频列表
  if (import.meta.client) {
    onMounted(() => {
      init();
    });
  }

  return {
    playerState,
    changeTrack,
    togglePlay,
    isLoading,
  };
});
