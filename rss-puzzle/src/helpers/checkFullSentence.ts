function checkFullSentence(block: Element): boolean {
  return block.querySelectorAll(`[data-status='empty']`).length === 0;
}

export default checkFullSentence;
