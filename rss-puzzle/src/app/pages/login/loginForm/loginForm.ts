import createElement from 'helpers/createElement';
import { LoginFormType, InputClassType } from 'types/interfaces';
import { saveUserData } from 'helpers/saveUserData';
import InputClass from '../inputClass/inputClass';
import './loginForm.scss';

class LoginForm implements LoginFormType {
  input: InputClassType;

  constructor() {
    this.input = new InputClass();
  }

  draw(parent: HTMLElement): void {
    const form = this.createFormLogin();
    parent.append(form);
  }

  private createFormLogin(): HTMLElement {
    const form = createElement('form', { name: 'login', class: 'login-form' });
    const inputTags = this.input.draw();

    const loginButton = createElement('input', {
      class: 'login-button',
      type: 'submit',
      value: 'Login',
      disabled: 'disabled',
    });

    [loginButton, ...inputTags].forEach((element) => form.prepend(element));

    form.addEventListener('submit', this.callback.bind(this));

    return form;
  }

  private callback(event: SubmitEvent): void {
    event.preventDefault();
    const state = this.input.getState();
    saveUserData(state);
  }
}

export default LoginForm;
