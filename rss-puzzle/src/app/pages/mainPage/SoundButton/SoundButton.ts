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

    button.addEventListener('click', (event) =>
      this.playSound.bind(this)(event)
    );

    button.append(icon);
    root.append(button);
    this.audio.draw(root);
  }

  checkInstance(element: HTMLElement): HTMLAudioElement {
    if (!(element instanceof HTMLAudioElement)) {
      throw new Error('Element is not an audio');
    }
    return element;
  }

  playSound(event: Event): void {
    if (event.currentTarget instanceof HTMLElement) {
      const sound = this.checkInstance(findElement('.sound'));
      const button = event.currentTarget;

      sound.addEventListener('durationchange', (eventSound) => {
        if (!(eventSound.target instanceof HTMLAudioElement)) {
          throw new Error('Element is not an audio');
        }
        setTimeout(() => {
          this.isPlay = false;
          button.classList.remove('play');
        }, eventSound.target.duration * 1000);
      });

      if (!this.isPlay) {
        sound.load();
        sound.play();
        this.isPlay = true;
        button.classList.add('play');
      }
    }
  }
}

export default SoundButton;
