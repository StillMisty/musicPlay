import { AudioController } from "@/controllers/AudioController";

export interface PlayerState {
  currentIndex: number;
  isPlaying: boolean;
  current: Music;
  musicJson: Array<Music>;
}

interface Music {
  id: number;
  title: string;
  author: string;
  src: string;
}
