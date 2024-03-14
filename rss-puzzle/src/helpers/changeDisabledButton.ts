import { findElement } from './findElement';

function changeDisabledButton(isDisabled: boolean): void {
  const button = findElement(`.check-btn`);
  if (isDisabled) {
    button.setAttribute('disabled', 'disabled');
  } else {
    button.removeAttribute('disabled');
  }
}

export default changeDisabledButton;
