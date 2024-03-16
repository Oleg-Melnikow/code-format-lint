import createElement from 'helpers/createElement';
import { initialState } from 'state/initialState';
import icon from 'assets/logout.svg';
import hintIcon from 'assets/hint.png';
import { findElement } from 'helpers/findElement';

class Header {
  callback: (padeId: string) => void;

  constructor(callback: (padeId: string) => void) {
    this.callback = callback;
  }

  draw(root: HTMLElement): void {
    const header = createElement('header', { class: 'header' });

    const logoutBtn = createElement('button', { class: 'logout-btn' });
    this.addIconToButton(logoutBtn, icon, 'logout');

    const hintBtn = createElement('button', { class: 'hint-btn' }, 'Hint');
    this.addIconToButton(hintBtn, hintIcon, 'hint');

    const sound = createElement('button', { class: 'sound-btn' });
    sound.append(createElement('i', { class: 'fa-solid fa-music' }));

    logoutBtn.addEventListener('click', this.singOut.bind(this));
    hintBtn.addEventListener('click', (event) => this.hideHint(event));
    sound.addEventListener('click', (event) => this.hideSound(event));

    [sound, hintBtn, logoutBtn].forEach((button) => header.append(button));

    root.append(header);
  }

  singOut(): void {
    localStorage.removeItem('rss-puzzle-login');
    localStorage.removeItem('rss-puzzle-controls');
    initialState.updateState(null, 'login');
    this.callback('login');
  }

  hideHint(event: Event): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      throw new Error('Element not found');
    }
    event.currentTarget.classList.toggle('hide');

    const hint = findElement('.hint');
    hint.classList.toggle('hide');
    initialState.chnageHindVisible();
  }

  hideSound(event: Event): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      throw new Error('Element not found');
    }
    event.currentTarget.classList.toggle('hide');

    const soundButton = findElement('.sound-button');
    soundButton.classList.toggle('hide');
    initialState.chnageSoundVisible();
  }

  addIconToButton(button: HTMLElement, image: string, name: string): void {
    const iconBtn = createElement('img', {
      class: `${name}-icon`,
      alt: name,
    });
    if (iconBtn instanceof HTMLImageElement) {
      iconBtn.src = image;
    }
    button.append(iconBtn);
  }
}

export default Header;
