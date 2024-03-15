import { findElement } from './findElement';

function visibleHint(isHide: boolean, type: 'hint' | 'sound'): void {
  const array =
    type === 'hint' ? ['.hint-btn', '.hint'] : ['.sound-btn', '.sound-button'];
  array.forEach((item) => {
    const hint = findElement(item);
    if (isHide) {
      hint.classList.add('hide');
    } else {
      hint.classList.remove('hide');
    }
  });
}

export default visibleHint;
