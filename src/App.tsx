import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./components/modals/InfoModal";
import { WinModal } from "./components/modals/WinModal";
import { HelloModal } from "./components/modals/HelloModal";
import { getWordOfDay, isWordInWordList, isWinningWord } from "./lib/words";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";
import {LETTERS_PER_WORD, MAX_GUESSES} from './lib/settings'

const loadedState = loadGameStateFromLocalStorage()

function App() {
  const randomMode = window.location.pathname === '/random'
  const [wordOfDay, _] = useState(() => getWordOfDay(randomMode));
  const [guesses, setGuesses] = useState<string[]>(() =>
    wordOfDay.solution === loadedState?.solution ? loadedState.guesses : []
  );
  const [name, setName] = useState<string>(
    loadedState?.name || ''
  )
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(() => wordOfDay.solution === guesses[guesses.length-1]);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [shareComplete, setShareComplete] = useState(false);

  const isHelloModalOpen = name === '';

  useEffect(() => {
    saveGameStateToLocalStorage(wordOfDay.solution, guesses, name);
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  const onChar = (value: string) => {
    if (!isHelloModalOpen && currentGuess.length < LETTERS_PER_WORD && guesses.length < MAX_GUESSES) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }

    const winningWord = isWinningWord(wordOfDay.solution, currentGuess);

    if (currentGuess.length === LETTERS_PER_WORD && guesses.length < MAX_GUESSES && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === MAX_GUESSES - 1) {
        setIsGameLost(true);
        return setTimeout(() => {
          setIsGameLost(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`You lost, the word was ${wordOfDay.solution}`}
        isOpen={isGameLost}
      />
      <Alert
        message="Game copied to clipboard"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Wordle 6</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <Grid solution={wordOfDay.solution} guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        solution={wordOfDay.solution}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <HelloModal
        isOpen={isHelloModalOpen}
        handleClose={(name) => {
          setName(name)
          saveGameStateToLocalStorage(wordOfDay.solution, guesses, name)
        }}
      />
      <WinModal
        wordOfDay={wordOfDay}
        name={name}
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={() => {
          setIsWinModalOpen(false);
          setShareComplete(true);
          return setTimeout(() => {
            setShareComplete(false);
          }, 2000);
        }}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button>
    </div>
  );
}

export default App;
