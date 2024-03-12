import createElement from 'helpers/createElement';
import { BaseClass } from 'types/interfaces';
import Header from './header/header';
import './mainPage.scss';

class MainPage {
  callback: (padeId: string) => void;

  header: BaseClass;

  constructor(callback: (padeId: string) => void) {
    this.callback = callback;
    this.header = new Header(this.callback);
  }

  draw(root: HTMLElement): void {
    const startPage = createElement('div', { class: 'main-page' });
    this.header.draw(startPage);
    root.append(startPage);
  }
}

export default MainPage;
