import createElement from 'helpers/createElement';
import { Login, LoginFormType } from 'types/interfaces';
import LoginForm from './loginForm/loginForm';
import './login.scss';

class LoginPage implements Login {
  loginForm: LoginFormType;

  callback: (padeId: string) => void;

  constructor(callback: (padeId: string) => void) {
    this.callback = callback;
    this.loginForm = new LoginForm(this.callback);
  }

  draw(root: HTMLElement): void {
    const loginPage = createElement('div', { class: 'login-page' });
    const loginFormBlock = createElement('div', { class: 'login-block' });
    this.loginForm.draw(loginFormBlock);
    loginPage.append(loginFormBlock);
    root.append(loginPage);
  }
}

export default LoginPage;
