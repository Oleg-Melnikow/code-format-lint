import { State } from 'types';

function disableLofinButton(state: State): void {
  const { name, surname } = state;
  const reg = /^[A-Z][\\-a-zA-z]+$/;

  const isValidName = reg.test(name);
  const isValidSurname = reg.test(surname);
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

export default disableLofinButton;
