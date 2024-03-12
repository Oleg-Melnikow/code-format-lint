import createElement from 'helpers/createElement';
import { getRounds, initialState } from 'state/initialState';
import './gameBlock.scss';
import CardWord from 'components/cardWord/cardWord';
import wordsRandomOrder from 'helpers/wordsRandomOrder';

class GameBlock {
  async draw(root: HTMLElement): Promise<void> {
    await getRounds();
    const container = createElement('div', { class: 'game-container' });
    const cardsBlock = createElement('div', { class: 'cards-block' });
    const resultBlock = createElement('div', { class: 'result-block' });

    if (initialState.roundsData) {
      const { rounds } = initialState.roundsData;
      const wordArray = rounds[0].words[0].textExample.split(' ');

      initialState.changeGameStatus({ count: 0, limit: wordArray.length - 1 });

      wordsRandomOrder(wordArray).forEach((word, posiiton) => {
        const card = new CardWord(word);
        card.draw(resultBlock, 'result', posiiton);
        card.draw(cardsBlock, 'random', posiiton);
      });
    }

    container.append(resultBlock);
    container.append(cardsBlock);
    root.append(container);
  }
}

export default GameBlock;
