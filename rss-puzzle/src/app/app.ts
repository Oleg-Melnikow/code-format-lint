import createElement from 'helpers/createElement';
import { Login } from 'types/interfaces';
import { initialState } from 'state/initialState';
import LoginPage from './pages/login/login';

class App {
  login: Login;

  constructor() {
    this.login = new LoginPage();
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
}
export default App;
