import lian1 from "@/assets/videos/lian1.mp4";
import lian2 from "@/assets/videos/lian2.mp4";

const videos = {
  sources: [lian1, lian2],
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
