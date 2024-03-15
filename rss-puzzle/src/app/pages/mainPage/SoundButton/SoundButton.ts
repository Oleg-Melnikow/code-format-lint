import createElement from 'helpers/createElement';
import { findElement } from 'helpers/findElement';
import { BaseClass } from 'types/interfaces';
import AudioElement from 'components/AudioElement/AudioElement';
import './soundButton.scss';

class SoundButton {
  private isPlay: boolean;

  audio: BaseClass;

  constructor() {
    this.isPlay = false;
    this.audio = new AudioElement();
  }

  draw(root: HTMLElement): void {
    const button = createElement('div', { class: 'sound-button' });
    const icon = createElement('i', { class: 'fa-solid fa-volume-high' });

    button.addEventListener('click', this.playSound.bind(this));

    button.append(icon);
    root.append(button);
    this.audio.draw(root);
  }

  playSound(): void {
    const sound = findElement('.sound');
    if (!(sound instanceof HTMLAudioElement)) {
      throw new Error('ss');
    }

    sound.addEventListener('durationchange', (event) => {
      if (!(event.target instanceof HTMLAudioElement)) {
        throw new Error('ss');
      }
      setTimeout(() => {
        this.isPlay = false;
      }, sound.duration * 1000);
      console.log(event.target.duration);
    });

    console.log(sound);
    if (!this.isPlay) {
      sound.load();
      sound.play();
      this.isPlay = true;
    }
  }
}

export default SoundButton;
