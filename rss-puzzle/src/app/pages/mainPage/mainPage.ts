import createElement from 'helpers/createElement';
import { BaseClass } from 'types/interfaces';
import Header from './header/header';
import GameBlock from './gameBlock/gameBlock';
import './mainPage.scss';

class MainPage {
  callback: (padeId: string) => void;

  header: BaseClass;

  gameBlock: BaseClass;

  constructor(callback: (padeId: string) => void) {
    this.callback = callback;
    this.header = new Header(this.callback);
    this.gameBlock = new GameBlock();
  }

  draw(root: HTMLElement): void {
    const mainPage = createElement('div', { class: 'main-page' });
    this.header.draw(mainPage);
    this.gameBlock.draw(mainPage);
    root.append(mainPage);
  }
}

export default MainPage;
