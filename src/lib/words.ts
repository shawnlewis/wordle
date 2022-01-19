import { LETTERS_PER_WORD } from './settings'
import { WORDS } from "../constants/wordlist";
import { WORDS6 } from "../constants/wordlist6";
import { VALIDGUESSES } from "../constants/validGuesses";
import { VALIDGUESSES6 } from "../constants/validGuesses6";

const W = LETTERS_PER_WORD === 5 ? WORDS : WORDS6;
const VG = LETTERS_PER_WORD === 5 ? VALIDGUESSES : VALIDGUESSES6;

export const isWordInWordList = (word: string) => {
  return (
    W.includes(word.toLowerCase()) ||
    VG.includes(word.toLowerCase())
  );
};

export const isWinningWord = (solution: string, word: string) => {
  return solution === word;
};

export const getWordOfDay = (random: boolean) => {
  // January 1, 2022 Game Epoch
  let index = Math.floor(Math.random() * W.length);
  if (!random) {
    const epochMs = 1641013200000;
    const now = Date.now();
    const msInDay = 86400000;
    index = Math.floor((now - epochMs) / msInDay);
  }

  console.log("WORD", W[index].toUpperCase());

  return {
    solution: W[index].toUpperCase(),
    solutionIndex: index,
  };
};

// export const { solution, solutionIndex } = getWordOfDay(random);
