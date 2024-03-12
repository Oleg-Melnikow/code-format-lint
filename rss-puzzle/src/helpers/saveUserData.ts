import { initialState } from 'state/initialState';
import { State } from 'types/interfaces';

function saveUserData(state: State, currentPage: string): void {
  localStorage.setItem(
    'rss-puzzle-login',
    JSON.stringify({ user: state, currentPage })
  );
  initialState.updateState(state);
}

export { saveUserData };
