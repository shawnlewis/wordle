import { Cell } from "./Cell";
import {LETTERS_PER_WORD} from '../../lib/settings'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(LETTERS_PER_WORD));

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
