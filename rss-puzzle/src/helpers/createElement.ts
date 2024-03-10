function createElement(
  element: string,
  attributes?: Record<string, string>,
  textContent?: string
): HTMLElement {
  const tag: HTMLElement = document.createElement(element);

  if (attributes) {
    const attributesArray = Object.entries(attributes);

    attributesArray.forEach((attribute) => {
      const [name, value] = attribute;
      tag.setAttribute(name, value);
    });
  }

  if (textContent) {
    tag.textContent = textContent;
  }

  return tag;
}

export default createElement;
