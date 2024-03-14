import createElement from 'helpers/createElement';
import { LoginFormType, InputClassType } from 'types/interfaces';
import { saveUserData } from 'helpers/saveUserData';
import CustomButton from 'components/customButton/customButton';
import InputClass from '../inputClass/inputClass';
import './loginForm.scss';

class LoginForm implements LoginFormType {
  input: InputClassType;

  callback: (padeId: string) => void;

  constructor(callback: (padeId: string) => void) {
    this.input = new InputClass();
    this.callback = callback;
  }

  draw(parent: HTMLElement): void {
    const form = this.createFormLogin();
    parent.append(form);
  }

  private createFormLogin(): HTMLElement {
    const form = createElement('form', { name: 'login', class: 'login-form' });
    const inputTags = this.input.draw();

    const button = new CustomButton({
      element: 'button',
      attributes: {
        class: 'button login-button',
        type: 'submit',
        value: 'Login',
        disabled: 'disabled',
      },
      textContent: 'Login',
    });

    [button.render(), ...inputTags].forEach((element) => form.prepend(element));

    form.addEventListener('submit', this.submitLoginForm.bind(this));

    return form;
  }

  private submitLoginForm(event: SubmitEvent): void {
    event.preventDefault();
    const state = this.input.getState();
    saveUserData(state, 'start');
    this.callback('start');
    this.input.resetInputs();
  }
}

export default LoginForm;
