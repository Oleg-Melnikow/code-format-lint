import createElement from 'helpers/createElement';
import { BaseClass } from 'types/interfaces';
import { initialState } from 'state/initialState';
import { saveUserData } from 'helpers/saveUserData';
import CustomButton from 'components/customButton/customButton';
import GameInfo from './gameInfo/gameInfo';
import UserInfo from './userInfo/userInfo';

import './startPage.scss';

class StartPage {
  content: BaseClass;

  userGreeting: BaseClass;

  contentBlocks: string[];

  callback: (padeId: string) => void;

  constructor(callback: (padeId: string) => void) {
    this.content = new GameInfo();
    this.userGreeting = new UserInfo();
    this.contentBlocks = ['start', 'user'];
    this.callback = callback;
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

    const button = new CustomButton(
      {
        element: 'button',
        attributes: { class: 'button start-btn' },
        textContent: 'Start',
      },
      this.playApp.bind(this)
    );

    startPage.append(button.render());
    root.append(startPage);
  }

  private playApp(): void {
    if (initialState.user) {
      saveUserData(initialState.user, 'main');
    }
    this.callback('main');
  }
}

export default StartPage;
