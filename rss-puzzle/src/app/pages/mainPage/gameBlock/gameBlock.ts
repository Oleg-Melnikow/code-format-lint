import createElement from 'helpers/createElement';
import { getRounds, initialState } from 'state/initialState';
import './gameBlock.scss';
import CardWord from 'components/cardWord/cardWord';
import wordsRandomOrder from 'helpers/wordsRandomOrder';
import CustomButton from 'components/customButton/customButton';
import changeDisabledButton from 'helpers/changeDisabledButton';

class GameBlock {
  containerResults: HTMLElement;

  constructor() {
    this.containerResults = createElement('div', {
      class: 'results-container',
    });
  }

  async draw(root: HTMLElement): Promise<void> {
    await getRounds();
    const { containerResults } = this;
    const container = createElement('div', { class: 'game-container' });
    const cardsBlock = createElement('div', { class: 'source-block' });
    const resultBlock = this.createResultBlock();

    const button = new CustomButton(
      {
        element: 'button',
        attributes: { class: 'button continue-btn', disabled: 'disabled' },
        textContent: 'Continue',
      },
      (event) => this.continueGame.bind(this)(event)
    );
    const checkButton = new CustomButton(
      {
        element: 'button',
        attributes: { class: 'button check-btn', disabled: 'disabled' },
        textContent: 'Check',
      },
      (event) => this.checkSentence.bind(this)(event)
    );

    this.renderBlockWords(resultBlock, cardsBlock);
    if (containerResults.childNodes.length) {
      containerResults.innerHTML = '';
    }
    containerResults.append(resultBlock);

    [
      containerResults,
      cardsBlock,
      button.render(),
      checkButton.render(),
    ].forEach((item) => container.append(item));

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

  continueGame(event: Event): void {
    if (event.target instanceof HTMLElement) {
      event.target.setAttribute('disabled', 'disabled');
      changeDisabledButton(true, 'check');
    }

    const resultBlock = document.querySelector(
      `[data-result_id='${initialState.currentSentence?.id}']`
    );

    if (resultBlock) {
      const words = [...resultBlock.querySelectorAll('.card-word')];
      [...words].forEach((el) => {
        const isClue = el.hasAttribute('style');
        if (isClue) {
          el.removeAttribute('style');
        }
      });
    }

    initialState.updateCurrentSentence();

    const sourceBlock: HTMLElement | null =
      document.querySelector('.source-block');
    const resultItem = this.createResultBlock();

    if (sourceBlock) {
      sourceBlock.innerHTML = '';
      this.renderBlockWords(resultItem, sourceBlock);
    }

    this.containerResults.append(resultItem);
  }

  checkSentence(event: Event): void {
    event.preventDefault();
    if (initialState.currentSentence) {
      const { textExample, id } = initialState.currentSentence;
      const wordArray = textExample.split(' ');
      const resultBlock = document.querySelector(`[data-result_id='${id}']`);
      if (resultBlock) {
        const words = [...resultBlock.querySelectorAll('.card-word')];
        [...words].forEach((el, i) => {
          if (!(el instanceof HTMLElement)) {
            throw new Error('Element not found');
          }
          const word = el;
          if (el.dataset.word === wordArray[i]) {
            console.log(el.dataset.word, wordArray[i]);
            word.style.border = '2px solid #00ff00';
          } else {
            word.style.border = '2px solid red';
          }
        });
      }
    }
  }
}

export default GameBlock;
