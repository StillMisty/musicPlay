const videos = {
  sources: ["lian1.mp4", "lian2.mp4", "lian3.mp4", "lian4.mp4"],
  getRandomVideo(): string {
    const randomIndex = Math.floor(Math.random() * this.sources.length);
    return `/videos/${this.sources[randomIndex]}`;
  },
};

export const useVideoStore = defineStore("VideoStore", () => {
  const videoFile = ref<string>(videos.getRandomVideo());

  const changeVideo = () => {
    let newVideo;
    do {
      newVideo = videos.getRandomVideo();
    } while (newVideo === videoFile.value && videos.sources.length > 1);

    videoFile.value = newVideo;
  };

  return {
    videoFile,
    changeVideo,
  };
});
