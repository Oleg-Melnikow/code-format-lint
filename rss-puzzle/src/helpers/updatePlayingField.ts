import { getSound, initialState } from 'state/initialState';
import CardWord from 'components/cardWord/cardWord';
import createElement from './createElement';
import { findElement } from './findElement';
import transformButton from './transformButton';
import changeDisabledButton from './changeDisabledButton';
import wordsRandomOrder from './wordsRandomOrder';

function resetSound(): void {
  const sound = findElement('.sound');
  if (!(sound instanceof HTMLAudioElement)) {
    throw new Error('Element is not an audio');
  }
  sound.pause();
  sound.currentTime = 0;
  const button = findElement('.sound-button');
  button.classList.remove('play');
}

function renderBlockWords(
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

function updatePlayingField(isReset?: boolean): void {
  const hintElement = findElement('.hint-content');
  hintElement.textContent =
    initialState.currentSentence?.textExampleTranslate || '';

  const resultContainer = findElement('.results-container');
  if (isReset) {
    resultContainer.innerHTML = '';
  }

  const resultBlockId = initialState.currentSentence?.id;

  const resultBlock = createElement('div', {
    class: 'result-block',
    'data-result_id': `${resultBlockId}`,
  });

  const sourceBlock = findElement('.source-block');
  sourceBlock.innerHTML = '';

  renderBlockWords(resultBlock, sourceBlock);
  resultContainer.append(resultBlock);

  resetSound();

  getSound(initialState.currentSentence?.audioExample || '');

  transformButton('check');
  changeDisabledButton(true);
  changeDisabledButton(false, '.complete-btn');
}

export { updatePlayingField };
