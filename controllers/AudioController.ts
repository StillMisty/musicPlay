export class AudioController {
  private audio: HTMLAudioElement | null = null;

  constructor(src: string) {
    // 确保只在客户端初始化 Audio
    if (typeof window !== "undefined") {
      this.audio = new Audio(src);
      this.audio.addEventListener("ended", () => {
        // 播放结束后自动播放下一首
        usePlayStore().changeTrack("next");
      });
    }
  }

  togglePlay(isPlaying: boolean) {
    if (!this.audio) return;
    if (isPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  setSource(src: string) {
    if (!this.audio) return;
    this.audio.src = src;
  }
}
