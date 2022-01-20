import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  maxGuesses: number;
  lettersPerWord: number;
  solution: string;
  guesses: string[];
  currentGuess: string;
};

export const Grid = ({ maxGuesses, lettersPerWord, solution, guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < maxGuesses - 1 ? Array.from(Array((maxGuesses - 1) - guesses.length)) : [];

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow solution={solution} key={i} guess={guess} />
      ))}
      {guesses.length < maxGuesses && <CurrentRow guess={currentGuess} lettersPerWord={lettersPerWord} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} lettersPerWord={lettersPerWord} />
      ))}
    </div>
  );
};
