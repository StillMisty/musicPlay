import { playerState } from "@/stores/playStore";
import { useVideoStore } from "@/stores/videoStore";

/**
 * 更改音乐
 */
function changeTrack(direction: "next" | "prev"): void {
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

  updatePlaybackState(false, player.current.src);

  // 更新视频
  useVideoStore().changeVideo();
}

/**
 * 更新播放器状态
 */
function updatePlaybackState(isPlaying: boolean, source?: string): void {
  const { value: player } = playerState;
  player.isPlaying = isPlaying;
  player.audioController.togglePlay(isPlaying);

  if (source) {
    player.audioController.setSource(source);
  }
}

/**
 * 切换播放状态
 */
function togglePlay() {
  const isPlaying = !playerState.value.isPlaying;
  updatePlaybackState(isPlaying);
}

export { changeTrack, togglePlay };
