import { StringifyOptions } from "querystring";

const gameStateKey = "gameState";

type StoredGameState = {
  solution: StringifyOptions;
  guesses: string[];
  name: string;
};

export const saveGameStateToLocalStorage = (solution: string, guesses: string[], name: string) => {
  const gameState = {
    solution,
    guesses,
    name,
  };
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);

  return state ? (JSON.parse(state) as StoredGameState) : null;
};
