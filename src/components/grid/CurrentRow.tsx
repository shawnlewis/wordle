import { Cell } from "./Cell";
import {LETTERS_PER_WORD} from '../../lib/settings'

type Props = {
  guess: string;
};

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(LETTERS_PER_WORD - splitGuess.length));

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
