import { findElement } from './findElement';

function completeSectence(id: number | undefined): void {
  if (id) {
    const resultBlock = findElement(`[data-result_id='${id}']`);
    resultBlock.classList.add('completed');
  }
}

export default completeSectence;
