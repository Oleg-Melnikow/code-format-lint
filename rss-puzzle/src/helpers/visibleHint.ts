import { findElement } from './findElement';

function visibleHint(isHide: boolean): void {
  ['.hint-btn', '.hint'].forEach((item) => {
    const hint = findElement(item);
    if (isHide) {
      hint.classList.add('hide');
    } else {
      hint.classList.remove('hide');
    }
  });
}

export default visibleHint;
