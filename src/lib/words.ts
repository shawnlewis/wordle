import { WORDS } from "../constants/wordlist";
import { WORDS6 } from "../constants/wordlist6";
import { VALIDGUESSES } from "../constants/validGuesses";
import { VALIDGUESSES6 } from "../constants/validGuesses6";

interface Game {
  targetList: string[];
  validGuesses: string[];
  lettersPerWord: number;
  maxGuesses: number;
  solution: string;
  solutionIndex: number;
}

export const isWordInWordList = (game: Game, word: string) => {
  return (
    game.targetList.includes(word.toLowerCase()) ||
    game.validGuesses.includes(word.toLowerCase())
  );
};

export const isWinningWord = (game: Game, word: string) => {
  return game.solution === word;
};

const getWordLists = (lettersPerWord: number) => {
  if (lettersPerWord === 5) {
    return {
      targetList: WORDS,
      validGuesses: VALIDGUESSES
    }
  } else if (lettersPerWord === 6) {
    return {
      targetList: WORDS6,
      validGuesses: VALIDGUESSES6
    }
  }
  throw new Error('invalid')
}

export const makeRandomGame = (lettersPerWord: number, maxGuesses: number): Game => {
  const lists = getWordLists(lettersPerWord);
  const index = Math.floor(Math.random() * lists.targetList.length);
  return {
    ...lists,
    lettersPerWord,
    maxGuesses,
    solution: lists.targetList[index].toUpperCase(),
    solutionIndex: index
  }
}
export const makeWordOfDayGame = (lettersPerWord: number, maxGuesses: number): Game => {
  const lists = getWordLists(lettersPerWord);
  const epochMs = 1641013200000;
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  return {
    ...lists,
    lettersPerWord,
    maxGuesses,
    solution: lists.targetList[index].toUpperCase(),
    solutionIndex: index
  }
}
