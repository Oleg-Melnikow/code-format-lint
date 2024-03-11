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

export { Login, LoginFormType, InputClassType, State, BaseClass, ContentInfo };
