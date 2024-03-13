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
    const wrap = createElement('div', {
      class: 'card-wrap',
      'data-index': `${posiiton}`,
    });
    let card = null;

    if (typeBlock === 'source') {
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
    const { limit, count } = initialState.gameStatus;

    if (limit >= count) {
      const block = document.querySelector('.result-block');

      if (!(event.target instanceof HTMLElement)) {
        throw new Error('Element not found');
      }

      const element: HTMLElement = event.target;

      if (block) {
        const item = block.querySelector(`[data-index='${count}']`);

        if (item) {
          item.append(element);
        }

        initialState.gameStatus.count += 1;
      }
    }
  }
}

export default CardWord;
