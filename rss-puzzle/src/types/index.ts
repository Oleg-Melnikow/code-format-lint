type State = {
  name: string;
  surname: string;
};

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
  getState(): State;
}

export { Login, LoginFormType, InputClassType, State };
