import createElement from 'helpers/createElement';
import { getRounds, initialState } from 'state/initialState';
import './gameBlock.scss';
import CardWord from 'components/cardWord/cardWord';
import wordsRandomOrder from 'helpers/wordsRandomOrder';
import CustomButton from 'components/customButton/customButton';

class GameBlock {
  async draw(root: HTMLElement): Promise<void> {
    await getRounds();
    const container = createElement('div', { class: 'game-container' });
    const cardsBlock = createElement('div', { class: 'source-block' });
    const resultBlock = createElement('div', { class: 'result-block' });

    if (initialState.roundsData) {
      const { rounds } = initialState.roundsData;
      const wordArray = rounds[0].words[0].textExample.split(' ');

      initialState.changeGameStatus({ count: 0, limit: wordArray.length - 1 });

      wordsRandomOrder(wordArray).forEach((word, posiiton) => {
        const card = new CardWord(word);
        card.draw(resultBlock, 'result', posiiton);
        card.draw(cardsBlock, 'source', posiiton);
      });
    }

    const button = new CustomButton(
      {
        element: 'button',
        attributes: { class: 'button continue-btn', disabled: 'disabled' },
        textContent: 'Continue',
      },
      this.continueGame.bind(this)
    );

    [resultBlock, cardsBlock, button.render()].forEach((item) =>
      container.append(item)
    );
    root.append(container);
  }

  continueGame(): void {
    console.log('continueGame');
  }
}

export default GameBlock;
