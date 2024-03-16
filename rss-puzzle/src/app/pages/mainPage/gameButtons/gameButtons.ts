import createElement from 'helpers/createElement';
import { initialState } from 'state/initialState';
import CustomButton from 'components/customButton/customButton';
import changeDisabledButton from 'helpers/changeDisabledButton';
import transformButton from 'helpers/transformButton';
import { findElement } from 'helpers/findElement';
import instanceHtml from 'helpers/instanceHtml';
import removeAttribute from 'helpers/removeAttribute';
import checkFullSentence from 'helpers/checkFullSentence';
import visibleHint from 'helpers/visibleHint';
import { updatePlayingField } from 'helpers/updatePlayingField';
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

  continueGame(): void {
    if (!initialState.hintVisible) {
      visibleHint(true, 'hint');
    }

    if (!initialState.soundVisible) {
      visibleHint(true, 'sound');
    }

    const resultBlock = findElement(
      `[data-result_id='${initialState.currentSentence?.id}']`
    );

    resultBlock.classList.add('completed');
    const words = [...resultBlock.querySelectorAll('.card-word')];
    [...words].forEach((el) => removeAttribute(el, 'style'));

    initialState.updateCurrentSentence();
    updatePlayingField();
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
}

export default GameButtons;
