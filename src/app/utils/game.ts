export function checkPairs(prevCard: number, currCard: number): boolean {
  return prevCard === currCard;
}

export const shuffleCards = <T>(array: T[]): T[] => {
  // Duplique le tableau en le concaténant avec lui-même
  const duplicatedArray = array.concat(array);

  // Mélange le tableau dupliqué (algorithme de Fisher-Yates)
  for (let i = duplicatedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicatedArray[i], duplicatedArray[j]] = [
      duplicatedArray[j],
      duplicatedArray[i],
    ];
  }

  return duplicatedArray;
};
