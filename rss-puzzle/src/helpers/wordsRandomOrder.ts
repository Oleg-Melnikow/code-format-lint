function wordsRandomOrder(words: string[]): string[] {
  return words.sort(() => 0.5 - Math.random());
}

export default wordsRandomOrder;
