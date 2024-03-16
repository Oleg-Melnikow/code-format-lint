import createElement from 'helpers/createElement';
import { getSound, initialState } from 'state/initialState';
import { BaseClass } from 'types/interfaces';
import CardWord from 'components/cardWord/cardWord';
import wordsRandomOrder from 'helpers/wordsRandomOrder';
import GameButtons from '../gameButtons/gameButtons';
import HintBlock from '../hintBlock/hintBlock';
import SoundButton from '../SoundButton/SoundButton';
import './gameBlock.scss';

class GameBlock {
  containerResults: HTMLElement;

  gameButtons: BaseClass;

  hint: BaseClass;

  soundButton: BaseClass;

  constructor() {
    this.containerResults = createElement('div', {
      class: 'results-container',
    });
    this.gameButtons = new GameButtons();
    this.hint = new HintBlock();
    this.soundButton = new SoundButton();
  }

  draw(root: HTMLElement): void {
    const { containerResults } = this;
    const container = createElement('div', { class: 'game-container' });
    const cardsBlock = createElement('div', { class: 'source-block' });
    const resultBlock = this.createResultBlock();

    this.soundButton.draw(container);
    this.hint.draw(container);

    this.renderBlockWords(resultBlock, cardsBlock);
    if (containerResults.childNodes.length) {
      containerResults.innerHTML = '';
    }
    containerResults.append(resultBlock);

    [containerResults, cardsBlock].forEach((item) => container.append(item));

    this.gameButtons.draw(container);

    root.append(container);
  }

  renderBlockWords(
    result: HTMLElement | null,
    source: HTMLElement | null
  ): void {
    if (initialState.currentSentence) {
      getSound(initialState.currentSentence.audioExample);
      const { textExample } = initialState.currentSentence;
      const wordArray = textExample.split(' ');
      console.log(textExample);
      initialState.changeGameStatus({ count: 0, limit: wordArray.length - 1 });

      wordsRandomOrder(wordArray).forEach((word, position) => {
        const card = new CardWord(word);
        if (result) {
          card.draw(result, 'result', position);
        }
        if (source) {
          card.draw(source, 'source', position);
        }
      });
    }
  }

  createResultBlock(): HTMLElement {
    const resultBlockId = initialState.currentSentence?.id;
    return createElement('div', {
      class: 'result-block',
      'data-result_id': `${resultBlockId}`,
    });
  }
}

export default GameBlock;
