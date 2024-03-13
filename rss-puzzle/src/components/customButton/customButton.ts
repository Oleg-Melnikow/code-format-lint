import createElement from 'helpers/createElement';
import { Configurate } from 'types/interfaces';
import './customButton.scss';

class CustomButton {
  configurate: Configurate;

  callback?: (event: Event) => void;

  constructor(configurate: Configurate, callback?: (event: Event) => void) {
    this.configurate = configurate;
    this.callback = callback;
  }

  render(): HTMLElement {
    const { element, attributes, textContent } = this.configurate;
    const button = createElement(element, attributes, textContent);

    if (this.callback) {
      button.addEventListener('click', (event) => this.callback?.(event));
    }

    return button;
  }
}

export default CustomButton;
