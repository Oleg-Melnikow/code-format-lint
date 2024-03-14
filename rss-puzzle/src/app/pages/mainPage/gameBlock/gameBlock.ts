import createElement from 'helpers/createElement';
import { getRounds, initialState } from 'state/initialState';
import { BaseClass } from 'types/interfaces';
import './gameBlock.scss';
import CardWord from 'components/cardWord/cardWord';
import wordsRandomOrder from 'helpers/wordsRandomOrder';
import GameButtons from '../gameButtons/gameButtons';

class GameBlock {
  containerResults: HTMLElement;

  gameButtons: BaseClass;

  constructor() {
    this.containerResults = createElement('div', {
      class: 'results-container',
    });
    this.gameButtons = new GameButtons();
  }

  async draw(root: HTMLElement): Promise<void> {
    await getRounds();
    const { containerResults } = this;
    const container = createElement('div', { class: 'game-container' });
    const cardsBlock = createElement('div', { class: 'source-block' });
    const resultBlock = this.createResultBlock();

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
