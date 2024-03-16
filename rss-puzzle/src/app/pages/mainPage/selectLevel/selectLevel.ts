import CustomSelect from 'components/customSelect/customSelect';
import createElement from 'helpers/createElement';
import './selectLevel.scss';
import { initialState } from 'state/initialState';

class SelectLevel {
  levelsNumber: number;

  constructor() {
    this.levelsNumber = 6;
  }

  draw(root: HTMLElement): void {
    const selectBlock = createElement('div', { class: 'select-block' });
    const selectLevel = new CustomSelect(this.levelsNumber, 'level');

    selectLevel.draw(selectBlock);

    if (initialState.roundsData?.roundsCount) {
      const selectRound = new CustomSelect(
        initialState.roundsData?.roundsCount,
        'round'
      );
      selectRound.draw(selectBlock);
    }

    root.append(selectBlock);
  }
}

export default SelectLevel;
