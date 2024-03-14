import { findElement } from './findElement';

function transformButton(type: 'check' | 'continue'): void {
  const button = findElement(`.check-btn`);

  button.dataset.button = type;
  button.textContent = type;
}

export default transformButton;
