import { State } from 'types/interfaces';

type StateApp = {
  user: State;
  updateState(user: State): void;
};

const initialState: StateApp = {
  user: {
    name: '',
    surname: '',
  },

  updateState(user): void {
    this.user = user;
  },
};

export { initialState };
