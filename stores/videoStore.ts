const loadVideo = async (src: string) => {
  // 动态导入视频模块
  const videoUrl = new URL(`../assets/videos/${src}`, import.meta.url).href;
  return videoUrl;
};

const videos = {
  sources: ["lian1.mp4", "lian2.mp4", "lian3.mp4"],
  async getRandomVideo(): Promise<string> {
    const randomIndex = Math.floor(Math.random() * this.sources.length);
    return await loadVideo(this.sources[randomIndex]);
  },
};

export const useVideoStore = defineStore("VideoStore", () => {
  const videoFile: Ref<null | string> = ref(null);

  const initVideo = async () => {
    videoFile.value = await videos.getRandomVideo();
  };
  initVideo();

  const changeVideo = async () => {
    let newVideo;
    do {
      newVideo = await videos.getRandomVideo();
    } while (newVideo === videoFile.value && videos.sources.length > 1);

    videoFile.value = newVideo;
  };

  return {
    videoFile,
    changeVideo,
  };
});
