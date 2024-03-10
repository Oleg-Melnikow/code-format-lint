interface Login {
  loginForm: LoginFormType;
  draw(root: HTMLElement): void;
}

interface LoginFormType {
  draw(root: HTMLElement): void;
}

interface InputClassType {
  inputArray: string[];
  draw(): HTMLElement[];
}

export { Login, LoginFormType, InputClassType };
