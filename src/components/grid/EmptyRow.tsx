import { Cell } from "./Cell";

type Props = {
  lettersPerWord: number;
};

export const EmptyRow = ({lettersPerWord}: Props) => {
  const emptyCells = Array.from(Array(lettersPerWord));

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
