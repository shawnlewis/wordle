import { Cell } from "./Cell";

type Props = {
  lettersPerWord: number;
  guess: string;
};

export const CurrentRow = ({ lettersPerWord, guess }: Props) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(lettersPerWord - splitGuess.length));

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={100 + i} />
      ))}
    </div>
  );
};
