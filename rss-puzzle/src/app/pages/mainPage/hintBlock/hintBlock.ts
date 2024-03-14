import createElement from 'helpers/createElement';
import './hintBlock.scss';
import { initialState } from 'state/initialState';

class HintBlock {
  draw(root: HTMLElement): void {
    const hintBlock = createElement('div', { class: 'hint' });
    if (initialState.currentSentence) {
      const { textExampleTranslate } = initialState.currentSentence;
      const hint = createElement(
        'p',
        { class: 'hint-content' },
        textExampleTranslate
      );
      hintBlock.append(hint);
    }

    root.append(hintBlock);
  }
}

export default HintBlock;
