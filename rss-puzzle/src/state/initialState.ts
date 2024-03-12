import { State } from 'types/interfaces';

type PageType = 'login' | 'start' | 'main';

type StateApp = {
  user: State | null;
  updateState(user: State | null, page?: PageType): void;
  updatePage(page: PageType): void;
  currentPage: PageType;
};

const initialState: StateApp = {
  user: {
    name: '',
    surname: '',
  },
  currentPage: 'login',

  updateState(user, page?: PageType): void {
    this.user = user;
    if (page) {
      this.currentPage = page;
    }
  },
  updatePage(page: PageType): void {
    this.currentPage = page;
  },
};

export { initialState };
