import { State } from 'types/interfaces';

type PageType = 'login' | 'start' | 'main';

type StateApp = {
  user: State;
  updateState(user: State): void;
  updatePage(page: PageType): void;
  currentPage: PageType;
};

const initialState: StateApp = {
  user: {
    name: '',
    surname: '',
  },
  currentPage: 'login',

  updateState(user): void {
    this.user = user;
  },
  updatePage(page: PageType): void {
    this.currentPage = page;
  },
};

export { initialState };
