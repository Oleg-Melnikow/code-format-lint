import createElement from 'helpers/createElement';
import { Login, BaseClass, PadeId } from 'types/interfaces';
import { initialState } from 'state/initialState';
import LoginPage from './pages/login/login';
import StartPage from './pages/startPage/startPage';
import MainPage from './pages/mainPage/mainPage';

class App {
  login: Login;

  startPage: BaseClass;

  mainPage: BaseClass;

  constructor() {
    this.login = new LoginPage(this.changePage);
    this.startPage = new StartPage(this.changePage);
    this.mainPage = new MainPage(this.changePage);
  }

  public start(): void {
    const root = createElement('div', { id: 'root' });
    document.body.append(root);
    this.checkLogin(root);
  }

  changePage = (padeId: string): void => {
    const root = document.getElementById('root');
    if (root instanceof HTMLElement) {
      root.innerHTML = '';
      this.renderPage(padeId, root);
    }
  };

  private renderPage(padeId: string, root: HTMLElement): void {
    if (PadeId.Start === padeId) {
      this.startPage.draw(root);
    }
    if (PadeId.Main === padeId) {
      this.mainPage.draw(root);
    }
    if (PadeId.Login === padeId) {
      this.login.draw(root);
    }
  }

  private checkLogin(root: HTMLElement): void {
    const state = localStorage.getItem('rss-puzzle-login');
    if (state) {
      const userInfo = JSON.parse(state);
      const { user, currentPage } = userInfo;
      initialState.updateState(user, currentPage);
      this.renderPage(currentPage, root);
    } else {
      this.login.draw(root);
    }
  }
}
export default App;
