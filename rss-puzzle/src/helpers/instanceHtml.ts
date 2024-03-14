function instanceHtml(element: Element): HTMLElement {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Element not found');
  }
  return element;
}

export default instanceHtml;
