import createElement from 'helpers/createElement';
import validateInput from 'helpers/validateInput';
import disableLofinButton from 'helpers/disableLofinButton';
import { InputClassType, State } from 'types/interfaces';

class InputClass implements InputClassType {
  inputArray: string[];

  private state: State;

  constructor() {
    this.inputArray = ['surname', 'name'];
    this.state = {
      name: '',
      surname: '',
    };
  }

  draw(): HTMLElement[] {
    return this.createFormLogin();
  }

  getState(): State {
    return this.state;
  }

  private createFormLogin(): HTMLElement[] {
    const inputTags = this.inputArray.map((inputItem: string): HTMLElement => {
      let labelText = inputItem;
      let inputValue = this.state.surname;
      if (inputItem === 'name') {
        labelText = 'first name';
        inputValue = this.state.name;
      }
      const label = createElement('label', { for: inputItem }, labelText);
      const input = createElement('input', {
        id: inputItem,
        type: 'text',
        placeholder: `Enter your ${inputItem}`,
        required: 'required',
        value: inputValue,
        minlength: inputItem === 'name' ? '3' : '4',
      });

      if (input instanceof HTMLInputElement) {
        input.addEventListener('input', this.changeInput.bind(this));
        input.addEventListener('blur', this.blurInput.bind(this));
      }

      label.append(input);
      label.append(createElement('div', { class: 'helper-text' }));

      return label;
    });

    return inputTags;
  }

  resetInputs(): void {
    this.state = { name: '', surname: '' };
  }

  changeInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const { id, value } = event.target;
      if (id === 'name') {
        this.state = { ...this.state, name: value };
      } else {
        this.state = { ...this.state, surname: value };
      }
      this.state = { ...this.state };
      validateInput(event.target);
    }
    disableLofinButton(this.state);
  }

  blurInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      validateInput(event.target);
    }
  }
}

export default InputClass;
