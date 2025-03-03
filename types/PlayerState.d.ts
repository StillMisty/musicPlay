import { AudioController } from "@/controllers/AudioController";

export interface PlayerState {
  currentIndex: number;
  isPlaying: boolean;
  musicList: Array<Music>;
}

interface Music {
  title: string;
  author: string;
  src: string;
}
