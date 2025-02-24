import { AudioController } from "@/controllers/AudioController";

export interface PlayerState {
  currentIndex: number;
  isPlaying: boolean;
  current: Music;
  audioController: AudioController;
  musicJson: Array<Music>;
}

interface Music {
  id: number;
  title: string;
  author: string;
  src: string;
}
