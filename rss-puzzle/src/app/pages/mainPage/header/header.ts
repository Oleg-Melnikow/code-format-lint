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

    logoutBtn.addEventListener('click', this.singOut.bind(this));
    hintBtn.addEventListener('click', (event) => this.hideHint(event));

    header.append(hintBtn);
    header.append(logoutBtn);

    root.append(header);
  }

  singOut(): void {
    localStorage.removeItem('rss-puzzle-login');
    initialState.updateState(null, 'login');
    this.callback('login');
  }

  hideHint(event: Event): void {
    if (!(event.target instanceof HTMLElement)) {
      throw new Error('Element not found');
    }
    event.target.classList.toggle('hide');

    const hint = findElement('.hint');
    hint.classList.toggle('hide');
    initialState.chnageHindVisible();
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
