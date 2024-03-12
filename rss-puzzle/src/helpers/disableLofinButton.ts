import { State } from 'types/interfaces';

function disableLoginButton(state: State): void {
  const { name, surname } = state;
  const reg = /^[A-Z][\\-a-zA-z]+$/;
  const isValidName = reg.test(name) && name.length >= 3;
  const isValidSurname = reg.test(surname) && surname.length >= 4;

  const loginButton: HTMLElement | null =
    document.querySelector('.login-button');

  if (!(loginButton instanceof HTMLElement)) {
    throw new Error('Element helper-text not foud');
  }

  if (isValidName && isValidSurname) {
    loginButton.removeAttribute('disabled');
  } else {
    loginButton.setAttribute('disabled', 'disabled');
  }
}

export default disableLoginButton;
