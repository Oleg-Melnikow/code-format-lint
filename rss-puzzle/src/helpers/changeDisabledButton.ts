import { findElement } from './findElement';

function changeDisabledButton(isDisabled: boolean, selector?: string): void {
  const button = findElement(selector || `.check-btn`);
  if (isDisabled) {
    button.setAttribute('disabled', 'disabled');
  } else {
    button.removeAttribute('disabled');
  }
}

export default changeDisabledButton;
