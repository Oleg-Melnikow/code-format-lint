import createElement from 'helpers/createElement';
import { BaseClass } from 'types/interfaces';
import GameInfo from './gameInfo/gameInfo';

import './startPage.scss';

class StartPage {
  content: BaseClass;

  constructor() {
    this.content = new GameInfo();
  }

  draw(root: HTMLElement): void {
    const startPage = createElement('div', { class: 'start-page' });
    const startPageInfo = createElement('div', { class: 'start-info' });

    this.content.draw(startPageInfo);

    startPage.append(startPageInfo);
    root.append(startPage);
  }
}

export default StartPage;
