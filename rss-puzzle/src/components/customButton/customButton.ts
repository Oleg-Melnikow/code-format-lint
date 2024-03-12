import createElement from 'helpers/createElement';
import { Configurate } from 'types/interfaces';
import './customButton.scss';

class CustomButton {
  configurate: Configurate;

  callback?: () => void;

  constructor(configurate: Configurate, callback?: () => void) {
    this.configurate = configurate;
    this.callback = callback;
  }

  render(): HTMLElement {
    const { element, attributes, textContent } = this.configurate;
    const button = createElement(element, attributes, textContent);

    if (this.callback) {
      button.addEventListener('click', this.callback);
    }

    return button;
  }
}

export default CustomButton;
