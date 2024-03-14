function changeDisabledButton(isDisabled: boolean, type: string): void {
  const button = document.querySelector(`.${type}-btn`);
  if (!(button instanceof HTMLElement)) {
    throw new Error('Element not found');
  }
  if (isDisabled) {
    button.setAttribute('disabled', 'disabled');
  } else {
    button.removeAttribute('disabled');
  }
}

export default changeDisabledButton;
