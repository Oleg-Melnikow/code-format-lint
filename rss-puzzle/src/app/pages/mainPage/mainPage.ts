import createElement from 'helpers/createElement';
import './mainPage.scss';

class MainPage {
  draw(root: HTMLElement): void {
    const startPage = createElement('div', { class: 'main-page' }, 'Main Page');
    root.append(startPage);
  }
}

export default MainPage;
