import fs from "fs";
import path from "path";

export default defineEventHandler(async () => {
  // 获取项目根目录路径
  const rootDir = process.cwd();

  // 构建存放音乐文件的文件夹路径
  const musicDir = path.join(rootDir, "public", "music");

  // 读取文件夹中的所有文件
  const files = await fs.promises.readdir(musicDir);

  // 获取每个文件的信息
  const songsInfo = await Promise.all(
    files.map(async (file) => {
      const fileNameWithoutExt = path.parse(file).name;
      const [title, author] = fileNameWithoutExt.split("-");
      return {
        title,
        author,
        src: `/music/${file}`, // 客户端访问路径
      };
    }),
  );

  return songsInfo;
});
