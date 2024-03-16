import createElement from 'helpers/createElement';
import { getRounds, initialState } from 'state/initialState';
import { updatePlayingField } from 'helpers/updatePlayingField';
import './customSelect.scss';

type TypeSelect = 'level' | 'round';

class CustomSelect {
  optionsCount: number;

  type: TypeSelect;

  constructor(optionsCount: number, type: TypeSelect) {
    this.optionsCount = optionsCount;
    this.type = type;
  }

  draw(root: HTMLElement): void {
    const select = createElement('select', {
      id: 'level',
      class: 'select',
    });

    for (let i = 1; i <= this.optionsCount; i += 1) {
      const element = createElement('option', { value: `${i}` }, `Level ${i}`);
      select.append(element);
    }

    select.addEventListener('change', async (event: Event) => {
      if (event.target instanceof HTMLSelectElement) {
        const item = event.target;
        const level = +item.value;
        if (this.type === 'level') {
          await getRounds(level);
        }
        if (this.type === 'round' && initialState.roundsData) {
          const currentRound = initialState.roundsData.rounds[level];
          initialState.updateCurrentRound(currentRound);
        }

        updatePlayingField(true);
      }
    });

    root.append(select);
  }
}

export default CustomSelect;
