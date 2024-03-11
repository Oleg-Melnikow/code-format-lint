import createElement from 'helpers/createElement';
import { Login, BaseClass } from 'types/interfaces';
import { initialState } from 'state/initialState';
import LoginPage from './pages/login/login';
import StartPage from './pages/startPage/startPage';
import MainPage from './pages/mainPage/mainPage';

class App {
  login: Login;

  startPage: BaseClass;

  mainPage: BaseClass;

  constructor() {
    this.login = new LoginPage();
    this.startPage = new StartPage(this.changePage);
    this.mainPage = new MainPage();
  }

  public start(): void {
    const root = createElement('div', { id: 'root' });
    document.body.append(root);

    const state = localStorage.getItem('rss-puzzle-login');
    if (state) {
      const userInfo = JSON.parse(state);
      initialState.updateState(userInfo);
    }

    this.login.draw(root);
  }

  changePage = (): void => {
    const root = document.getElementById('root');
    if (root instanceof HTMLElement) {
      root.innerHTML = '';
      this.mainPage.draw(root);
    }
  };
}
export default App;
