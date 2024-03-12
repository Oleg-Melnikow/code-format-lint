import createElement from 'helpers/createElement';
import { initialState } from 'state/initialState';
import icon from 'assets/logout.svg';

class Header {
  callback: (padeId: string) => void;

  constructor(callback: (padeId: string) => void) {
    this.callback = callback;
  }

  draw(root: HTMLElement): void {
    const header = createElement('header', { class: 'header' });

    const logoutBtn = createElement('button', { class: 'logout-btn' });
    const iconBtn = createElement('img', {
      class: 'logout-icon',
      alt: 'logout',
    });
    if (iconBtn instanceof HTMLImageElement) {
      iconBtn.src = icon;
    }

    logoutBtn.addEventListener('click', this.singOut.bind(this));

    logoutBtn.append(iconBtn);
    header.append(logoutBtn);

    root.append(header);
  }

  singOut(): void {
    localStorage.removeItem('rss-puzzle-login');
    initialState.updateState(null, 'login');
    this.callback('login');
  }
}

export default Header;
