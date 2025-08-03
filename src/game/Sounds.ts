import jankenponAudio from '../assets/audio/jankenpon.m4a';
import aikodeshoAudio from '../assets/audio/aikodesho.m4a';
import winAudio from '../assets/audio/win.m4a';
import loseAudio from '../assets/audio/lose.m4a';

type TSounds = 'jankenpon' | 'aikodesho' | 'win' | 'lose';

export class Sounds {
  private jankenponAudio: HTMLAudioElement;
  private aikodeshoAudio: HTMLAudioElement;
  private winAudio: HTMLAudioElement;
  private loseAudio: HTMLAudioElement;
  jankenponAudioDuration: number = 0;
  aikodeshoAudioDuration: number = 0;
  winAudioDuration: number = 0;
  loseAudioDuration: number = 0;

  constructor() {
    this.jankenponAudio = new Audio(jankenponAudio);
    this.aikodeshoAudio = new Audio(aikodeshoAudio);
    this.winAudio = new Audio(winAudio);
    this.loseAudio = new Audio(loseAudio);
    this.setJankenponAudioDuration();
    this.setAikodeshoAudioDuration();
    this.setWinAudioDuration();
    this.setLoseAudioDuration();
  }

  private setJankenponAudioDuration() {
    this.jankenponAudio.addEventListener('loadeddata', () => {
      this.jankenponAudioDuration = this.jankenponAudio.duration;
    });
  }

  private setAikodeshoAudioDuration() {
    this.aikodeshoAudio.addEventListener('loadeddata', () => {
      this.aikodeshoAudioDuration = this.aikodeshoAudio.duration;
    });
  }

  private setWinAudioDuration() {
    this.winAudio.addEventListener('loadeddata', () => {
      this.winAudioDuration = this.winAudio.duration;
    });
  }

  private setLoseAudioDuration() {
    this.loseAudio.addEventListener('loadeddata', () => {
      this.loseAudioDuration = this.loseAudio.duration;
    });
  }

  public play(sound: TSounds) {
    switch (sound) {
      case 'jankenpon':
        this.jankenponAudio.play();
        break;
      case 'aikodesho':
        this.aikodeshoAudio.play();
        break;
      case 'win':
        this.winAudio.play();
        break;
      case 'lose':
        this.loseAudio.play();
        break;
    }
  }
}
