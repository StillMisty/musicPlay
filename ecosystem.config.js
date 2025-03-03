export const apps = [
  {
    name: "MusicPlayer",
    script: ".output/server/index.mjs",
    watch: false,
    max_memory_restart: "256M", // 如果内存超过1G就自动重启
  },
];
