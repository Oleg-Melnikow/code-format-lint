import createElement from 'helpers/createElement';
import { Login } from 'types/interfaces';
import LoginPage from './pages/login/login';

class App {
  login: Login;

  constructor() {
    this.login = new LoginPage();
  }

  public start(): void {
    const root = createElement('div', { id: 'root' });
    document.body.append(root);
    this.login.draw(root);
  }
}
export default App;
