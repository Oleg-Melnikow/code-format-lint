import { initialState } from 'state/initialState';
import { State } from 'types/interfaces';

function saveUserData(state: State): void {
  localStorage.setItem('rss-puzzle-login', JSON.stringify(state));
  initialState.updateState(state);
}

export { saveUserData };
