import createElement from 'helpers/createElement';
import { getSound, initialState } from 'state/initialState';
import CardWord from 'components/cardWord/cardWord';
import wordsRandomOrder from 'helpers/wordsRandomOrder';
import CustomButton from 'components/customButton/customButton';
import changeDisabledButton from 'helpers/changeDisabledButton';
import transformButton from 'helpers/transformButton';
import { findElement } from 'helpers/findElement';
import instanceHtml from 'helpers/instanceHtml';
import removeAttribute from 'helpers/removeAttribute';
import checkFullSentence from 'helpers/checkFullSentence';
import './gameButtons.scss';
import visibleHint from 'helpers/visibleHint';

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

    const autoCompleteButton = new CustomButton(
      {
        element: 'button',
        attributes: { class: 'button complete-btn' },
        textContent: 'Auto-Complete',
      },
      (event) => this.autoComplete.bind(this)(event)
    );

    [checkButton.render(), autoCompleteButton.render()].forEach((item) =>
      container.append(item)
    );

    root.append(container);
  }

  renderBlockWords(
    result: HTMLElement | null,
    source: HTMLElement | null
  ): void {
    if (initialState.currentSentence) {
      const { textExample } = initialState.currentSentence;
      const wordArray = textExample.split(' ');
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
    if (!initialState.hintVisible) {
      console.log(!initialState.hintVisible);
      visibleHint(true);
    }

    const resultBlock = findElement(
      `[data-result_id='${initialState.currentSentence?.id}']`
    );

    resultBlock.classList.add('completed');
    const words = [...resultBlock.querySelectorAll('.card-word')];
    [...words].forEach((el) => removeAttribute(el, 'style'));

    initialState.updateCurrentSentence();
    this.changeHint(initialState.currentSentence?.textExampleTranslate || '');

    const sourceBlock = findElement('.source-block');
    sourceBlock.innerHTML = '';
    const resultItem = this.createResultBlock();
    this.renderBlockWords(resultItem, sourceBlock);

    findElement('.results-container').append(resultItem);
    transformButton('check');
    changeDisabledButton(true);

    getSound(initialState.currentSentence?.audioExample || '');
  }

  checkSentence(event: Event): void {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) {
      throw new Error('Element not found');
    }
    changeDisabledButton(false, '.complete-btn');
    const { button } = event.target.dataset;

    if (initialState.currentSentence && button === 'check') {
      const { textExample, id } = initialState.currentSentence;
      const wordArray = textExample.split(' ');
      const resultBlock = document.querySelector(`[data-result_id='${id}']`);

      if (resultBlock) {
        const words = [...resultBlock.querySelectorAll('.card-word')];
        [...words].forEach((el, i) => {
          const word = instanceHtml(el);
          if (word.dataset.word === wordArray[i]) {
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

  private autoComplete(event: Event): void {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) {
      throw new Error('Element not found');
    }

    if (initialState.currentSentence) {
      const { textExample, id } = initialState.currentSentence;
      const resultBlock = this.sentenceAssembly(id, textExample);

      resultBlock.classList.add('completed');
      changeDisabledButton(true, '.complete-btn');

      if (checkFullSentence(resultBlock)) {
        changeDisabledButton(false);
        transformButton('continue');
      }
    }
  }

  private sentenceAssembly(id: number, textExample: string): HTMLElement {
    const resultBlock = findElement(`[data-result_id='${id}']`);
    const sourceBlock = findElement(`.source-block`);
    const items = [
      ...sourceBlock.querySelectorAll('.card-word'),
      ...resultBlock.querySelectorAll('.card-word'),
    ];
    [...resultBlock.querySelectorAll('.card-wrap')].forEach((wrap) => {
      const wrapItem = instanceHtml(wrap);
      wrapItem.dataset.status = 'empty';
      wrapItem.innerHTML = '';
    });
    let itemsWord = [...items];
    const wordArray = textExample.split(' ');

    [...resultBlock.querySelectorAll('.card-wrap')].forEach((wrapItem) => {
      const wrap = instanceHtml(wrapItem);
      const { index } = wrap.dataset;
      const wordElement = itemsWord.find((word, i) => {
        const isTrue =
          instanceHtml(word).dataset.word === wordArray[+`${index}` || 0];
        if (isTrue) {
          itemsWord = [...itemsWord.slice(0, i), ...itemsWord.slice(i + 1)];
        }
        return isTrue;
      });

      if (wordElement) {
        removeAttribute(wordElement, 'style');
        wrap.append(instanceHtml(wordElement));
        wrap.setAttribute('data-status', 'full');
      }
    });

    return resultBlock;
  }

  changeHint(hint: string): void {
    const hintElement = findElement('.hint-content');
    hintElement.textContent = hint;
  }
}

export default GameButtons;
