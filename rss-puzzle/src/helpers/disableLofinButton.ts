import { State } from 'types/interfaces';
import { findElement } from './findElement';

function disableLoginButton(state: State): void {
  const { name, surname } = state;
  const reg = /^[A-Z][\\-a-zA-z]+$/;
  const isValidName = reg.test(name) && name.length >= 3;
  const isValidSurname = reg.test(surname) && surname.length >= 4;

  const loginButton = findElement('.login-button');

  if (isValidName && isValidSurname) {
    loginButton.removeAttribute('disabled');
  } else {
    loginButton.setAttribute('disabled', 'disabled');
  }
}

export default disableLoginButton;
