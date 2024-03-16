import { initialState } from 'state/initialState';

class AudioElement {
  draw(root: HTMLElement): void {
    const audio = document.createElement('audio');
    audio.classList.add('sound');
    const source = document.createElement('source');
    source.classList.add('source');

    if (source instanceof HTMLSourceElement) {
      source.src = initialState.currentUrlAudio;
      source.type = 'audio/mp3';
    }

    audio.append(source);
    document.body.prepend(audio);
    audio.append(source);

    root.append(audio);
  }
}

export default AudioElement;
