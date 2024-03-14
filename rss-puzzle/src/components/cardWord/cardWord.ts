import changeDisabledButton from 'helpers/changeDisabledButton';
import createElement from 'helpers/createElement';
import { initialState } from 'state/initialState';

class CardWord {
  card: string;

  constructor(card: string) {
    this.card = card;
  }

  async draw(
    root: HTMLElement,
    typeBlock: 'result' | 'source',
    posiiton: number
  ): Promise<void> {
    const attributesWrap = {
      class: 'card-wrap',
      'data-index': `${posiiton}`,
    };

    let wrap = createElement('div', {
      ...attributesWrap,
      'data-status': 'empty',
    });

    let card = null;

    if (typeBlock === 'source') {
      wrap = createElement('div', attributesWrap);

      const attributes: Record<string, string> = {
        class: 'card-word',
        'data-word': this.card,
        'data-position': `${posiiton}`,
      };

      card = createElement('div', attributes, this.card);
      card.addEventListener('click', this.chooseCard.bind(this));
      wrap.append(card);
    }
    root.append(wrap);
  }

  chooseCard(event: Event): void {
    event.preventDefault();
    if (!(event.target instanceof HTMLElement)) {
      throw new Error('Element not found');
    }

    const resultId = initialState.currentSentence?.id;
    const resultBlock = document.querySelector(
      `[data-result_id='${resultId}']`
    );
    const sourceBlock = document.querySelector('.source-block');
    const isResultBlock = resultBlock?.contains(event.target);
    const isCompleted = !!event.target.closest('.completed');

    if (resultBlock && !isResultBlock && !isCompleted) {
      this.moveToResult(resultBlock, event.target);
    }

    if (isResultBlock && sourceBlock) {
      this.moveFromResultToSource(isCompleted, event.target, sourceBlock);
      const isClue = event.target.hasAttribute('style');
      if (isClue) {
        event.target.removeAttribute('style');
      }
    }
  }

  private moveFromResultToSource(
    isCompleted: boolean,
    word: HTMLElement,
    sourceBlock: Element
  ): void {
    if (!isCompleted) {
      const positionWord = word.dataset.position;
      const resultWrap: HTMLElement | null = word.parentElement;
      const cardWrap = sourceBlock.querySelector(
        `[data-index='${positionWord}']`
      );

      if (resultWrap) {
        resultWrap.setAttribute('data-status', 'empty');
      }

      cardWrap?.append(word);
      changeDisabledButton(true, 'continue');
      changeDisabledButton(true, 'check');
    }
  }

  private moveToResult(resultBlock: Element, word: HTMLElement): void {
    const item = resultBlock.querySelector(`[data-status='empty']`);
    if (item) {
      item.append(word);
      item.setAttribute('data-status', 'full');
    }
    this.checkCorrectSentence(resultBlock);
  }

  private checkCorrectSentence(resultBlock: Element): void {
    const isFullSentence =
      resultBlock.querySelectorAll(`[data-status='empty']`).length === 0;

    if (isFullSentence) {
      const arrayWords = [...resultBlock.querySelectorAll('.card-word')];
      const checkSentence = initialState.currentSentence?.textExample;

      const resultSentence = arrayWords
        .map((wordElement) => {
          if (!(wordElement instanceof HTMLElement)) {
            throw new Error('Element not found');
          }
          return wordElement.dataset.word;
        })
        .join(' ');

      changeDisabledButton(checkSentence !== resultSentence, 'continue');
      changeDisabledButton(false, 'check');
    }
  }
}

export default CardWord;
