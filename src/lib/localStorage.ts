const gameStateKey = "gameState";

type StoredGameState = {
  guesses: string[];
  name: string;
};

export const saveGameStateToLocalStorage = (guesses: string[], name: string) => {
  const gameState = {
    guesses,
    name,
  };
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);

  return state ? (JSON.parse(state) as StoredGameState) : null;
};
