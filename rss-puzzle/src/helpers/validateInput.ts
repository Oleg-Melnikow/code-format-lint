function validateInput(input: HTMLInputElement): void {
  const reg = /^[A-Z][\\-a-zA-z]+$/;
  const isValid = reg.test(input.value);
  const { nextElementSibling: helperText }: HTMLElement = input;
  let errorMessage = '';
  const isCorrectLength = input.id === 'name' ? 2 : 3;

  if (!input.value || !isValid) {
    input.classList.add('error');
  }
  if (input.value && !isValid) {
    errorMessage =
      input.value.length > isCorrectLength
        ? `Please, enter correct ${input.id}`
        : `Enter name more ${isCorrectLength} letter`;
  }
  if (!input.value) {
    errorMessage = 'Field is empty';
  }

  if (!helperText) {
    throw new Error('Element helper-text not foud');
  }

  helperText.textContent = errorMessage;
  if (isValid && input.value) {
    input.classList.remove('error');
    helperText.textContent = '';
  }
}

export default validateInput;
