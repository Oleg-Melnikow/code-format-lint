import createElement from 'helpers/createElement';
import { BaseClass } from 'types/interfaces';
import GameInfo from './gameInfo/gameInfo';
import UserInfo from './userInfo/userInfo';

import './startPage.scss';

class StartPage {
  content: BaseClass;

  userGreeting: BaseClass;

  contentBlocks: string[];

  constructor() {
    this.content = new GameInfo();
    this.userGreeting = new UserInfo();
    this.contentBlocks = ['start', 'user'];
  }

  draw(root: HTMLElement): void {
    const startPage = createElement('div', { class: 'start-page' });
    this.contentBlocks.forEach((block) => {
      const container = createElement('div', { class: `${block}-info` });
      if (block === 'start') {
        this.content.draw(container);
      } else {
        this.userGreeting.draw(container);
      }
      startPage.append(container);
    });

    root.append(startPage);
  }
}

export default StartPage;
