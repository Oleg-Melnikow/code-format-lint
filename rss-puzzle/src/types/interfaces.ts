type State = {
  name: string;
  surname: string;
};

type ContentInfo = { className: string; description: string };

interface Login {
  loginForm: LoginFormType;
  draw(root: HTMLElement): void;
}

interface BaseClass {
  draw(root: HTMLElement): void;
}

type LoginFormType = BaseClass;

interface InputClassType {
  inputArray: string[];
  draw(): HTMLElement[];
  getState(): State;
}

interface Configurate {
  element: string;
  attributes?: Record<string, string>;
  textContent?: string;
}

export {
  Login,
  LoginFormType,
  InputClassType,
  State,
  BaseClass,
  ContentInfo,
  Configurate,
};
