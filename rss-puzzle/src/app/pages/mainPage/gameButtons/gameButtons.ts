import createElement from 'helpers/createElement';
import { initialState } from 'state/initialState';
import CardWord from 'components/cardWord/cardWord';
import wordsRandomOrder from 'helpers/wordsRandomOrder';
import CustomButton from 'components/customButton/customButton';
import changeDisabledButton from 'helpers/changeDisabledButton';
import transformButton from 'helpers/transformButton';
import { findElement } from 'helpers/findElement';
import './gameButtons.scss';

class GameButtons {
  draw(root: HTMLElement): void {
    const container = createElement('div', { class: 'game-buttons' });

    const checkButton = new CustomButton(
      {
        element: 'button',
        attributes: {
          class: 'button check-btn',
          disabled: 'disabled',
          'data-button': 'check',
        },
        textContent: 'Check',
      },
      (event) => this.checkSentence.bind(this)(event)
    );

    container.append(checkButton.render());
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

  continueGame(): void {
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

    findElement('.results-container').append(resultItem);
    transformButton('check');
    changeDisabledButton(true);
  }

  checkSentence(event: Event): void {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) {
      throw new Error('Element not found');
    }
    const { button } = event.target.dataset;

    if (initialState.currentSentence && button === 'check') {
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

    if (button === 'continue') {
      this.continueGame();
    }
  }
}

export default GameButtons;
