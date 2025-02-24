const videos = {
  sources: ["/videos/lian1.mp4", "/videos/lian2.mp4"],
  getRandomVideo(): string {
    const randomIndex = Math.floor(Math.random() * this.sources.length);
    return this.sources[randomIndex];
  },
};

export const useVideoStore = defineStore("VideoStore", () => {
  const videoFile = ref(videos.getRandomVideo());
  const changeVideo = () => {
    videoFile.value = videos.getRandomVideo();
  };
  return {
    videoFile,
    changeVideo,
  };
});
