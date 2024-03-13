import createElement from 'helpers/createElement';

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

    const element = event.target;

    const resultBlock = document.querySelector('.result-block');
    const sourceBlock = document.querySelector('.source-block');
    const isResultBlock = resultBlock?.contains(event.target);

    if (resultBlock && !isResultBlock) {
      const item = resultBlock.querySelector(`[data-status='empty']`);
      if (item) {
        item.append(element);
        item.setAttribute('data-status', 'full');
      }
    }
    if (isResultBlock && sourceBlock) {
      const positionWord = event.target.dataset.position;
      const resultWrap: HTMLElement | null = event.target.parentElement;

      if (resultWrap) {
        resultWrap.setAttribute('data-status', 'empty');
      }

      const cardWrap = sourceBlock.querySelector(
        `[data-index='${positionWord}']`
      );
      cardWrap?.append(event.target);
    }
  }
}

export default CardWord;
