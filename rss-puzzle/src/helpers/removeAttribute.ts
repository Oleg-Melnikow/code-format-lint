function removeAttribute(element: Element, attribute: string): void {
  const isClue = element.hasAttribute('style');
  if (isClue) {
    element.removeAttribute(attribute);
  }
}

export default removeAttribute;
