import createElement from 'helpers/createElement';
import { contentInfo } from 'helpers/static-data';
import { BaseClass, ContentInfo } from 'types/interfaces';

class GameInfo implements BaseClass {
  private contentInfo: ContentInfo[];

  constructor() {
    this.contentInfo = contentInfo;
  }

  draw(root: HTMLElement): void {
    this.contentInfo.forEach((content) => {
      const { className, description } = content;
      root.append(createElement('p', { class: className }, description));
    });
  }
}

export default GameInfo;
