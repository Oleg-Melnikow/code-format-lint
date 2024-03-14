export function findElement(selector: string): HTMLElement {
  const element: HTMLElement | null = document.querySelector(selector);
  if (!element) {
    throw new Error('Element not found!');
  }
  return element;
}
