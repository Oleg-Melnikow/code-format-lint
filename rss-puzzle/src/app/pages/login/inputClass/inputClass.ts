import createElement from 'helpers/createElement';
import { InputClassType } from 'types';

class InputClass implements InputClassType {
  inputArray: string[];

  constructor() {
    this.inputArray = ['surname', 'name'];
  }

  draw(): HTMLElement[] {
    return this.createFormLogin();
  }

  private createFormLogin(): HTMLElement[] {
    const inputTags = this.inputArray.map((inputItem: string): HTMLElement => {
      let labelText = inputItem;
      if (inputItem === 'name') {
        labelText = 'first name';
      }
      const label = createElement('label', { for: inputItem }, labelText);
      const input = createElement('input', {
        id: inputItem,
        type: 'text',
        placeholder: `Enter your ${inputItem}`,
        required: 'required',
      });

      label.append(input);

      return label;
    });

    return inputTags;
  }
}

export default InputClass;
