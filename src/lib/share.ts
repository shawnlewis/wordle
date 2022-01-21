import { getGuessStatuses } from "./statuses";

export const shareStatus = (solution: string, solutionIndex: number, guesses: string[]) => {
  const message = 
      "wordle6.com " +
        solutionIndex +
        " " +
        guesses.length +
        "/6\n\n" +
        generateEmojiGrid(solution, guesses);
  if (navigator.share != null) {
    navigator.share({
      title: 'wordle6 game',
      text: message
    });
    return false;
  } else {
    navigator.clipboard.writeText(message);
    return true;
  }
};

export const generateEmojiGrid = (solution: string, guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess);
      return guess
        .split("")
        .map((letter, i) => {
          switch (status[i]) {
            case "correct":
              return "🟩";
            case "present":
              return "🟨";
            default:
              return "⬜";
          }
        })
        .join("");
    })
    .join("\n");
};
