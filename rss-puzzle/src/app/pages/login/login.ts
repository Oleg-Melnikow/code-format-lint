import createElement from 'helpers/createElement';
import { Login, LoginFormType } from 'types/interfaces';
import LoginForm from './loginForm/loginForm';
import './login.scss';

class LoginPage implements Login {
  loginForm: LoginFormType;

  constructor() {
    this.loginForm = new LoginForm();
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
