import createElement from 'helpers/createElement';
import { BaseClass } from 'types/interfaces';
import { getRounds, initialState } from 'state/initialState';
import visibleHint from 'helpers/visibleHint';
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

  async draw(root: HTMLElement): Promise<void> {
    await getRounds();
    const mainPage = createElement('div', { class: 'main-page' });
    this.header.draw(mainPage);
    this.gameBlock.draw(mainPage);
    root.append(mainPage);
    this.checkControls();
  }

  private checkControls(): void {
    const controls = localStorage.getItem('rss-puzzle-controls');

    if (controls) {
      const { soundVisible, hintVisible } = JSON.parse(controls);
      initialState.soundVisible = soundVisible;
      initialState.hintVisible = hintVisible;
      visibleHint(!soundVisible, 'sound');
      visibleHint(!hintVisible, 'hint');
    }
  }
}

export default MainPage;
