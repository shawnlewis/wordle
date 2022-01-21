import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./components/modals/InfoModal";
import { WinModal } from "./components/modals/WinModal";
import { HelloModal } from "./components/modals/HelloModal";
import { makeWordOfDayGame, makeRandomGame, isWordInWordList, isWinningWord } from "./lib/words";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";

const loadedState = loadGameStateFromLocalStorage()

function App() {
  const [mode, setMode] = useState(
      (window.location.pathname === '/random' || window.location.pathname === '/random6') ? 'random6' : 
      window.location.pathname === '/random5' ? 'random5' :
          'daily6'
  )
  const [game, _] = useState(() =>
      mode === 'daily6' ? makeWordOfDayGame(6, 6) :
      mode === 'random6' ? makeRandomGame(6, 6) :
          makeRandomGame(5, 6)
      );
  // console.log('GAME', game)
  const [guesses, setGuesses] = useState<string[]>(() =>
    (mode === 'daily6' && game.solution === loadedState?.solution)
      ? loadedState?.guesses ?? []
      : []
  );
  const [name, setName] = useState<string>(
    loadedState?.name || ''
  )
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(() => game.solution === guesses[guesses.length-1]);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [shareComplete, setShareComplete] = useState(false);

  const isHelloModalOpen = name === '';

  useEffect(() => {
    // only overwrite solution and guesses if we're doing daily6
    const saveSolution = mode === 'daily6' ? game.solution : loadedState?.solution ?? '';
    const saveGuesses = mode === 'daily6' ? guesses : loadedState?.guesses ?? [];
    saveGameStateToLocalStorage(saveSolution, saveGuesses, name);
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  const onChar = (value: string) => {
    if (!isHelloModalOpen && currentGuess.length < game.lettersPerWord && guesses.length < game.maxGuesses) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!isWordInWordList(game, currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }

    const winningWord = isWinningWord(game, currentGuess);

    if (currentGuess.length === game.lettersPerWord && guesses.length < game.maxGuesses && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === game.maxGuesses - 1) {
        setIsGameLost(true);
        return setTimeout(() => {
          setIsGameLost(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`You lost, the word was ${game.solution}`}
        isOpen={isGameLost}
      />
      <Alert
        message="Game copied to clipboard"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-4">
        <h1 className="text-xl grow font-bold">
          <select value={mode} onChange={(e) => {
            if (e.target.value === 'daily6') {
              window.location.pathname = '/';
            } else if (e.target.value === 'random6') {
              window.location.pathname = '/random6';
            } else if (e.target.value === 'random5') {
              window.location.pathname = '/random5';
            }
            setMode(e.target.value)
          }}>
            <option value="daily6">Wordle 6 Daily</option>
            <option value="random6">Wordle 6 Random</option>
            <option value="random5">Wordle 5 Random</option>
          </select>
          </h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <Grid lettersPerWord={game.lettersPerWord} maxGuesses={game.maxGuesses} solution={game.solution} guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        solution={game.solution}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <HelloModal
        isOpen={isHelloModalOpen}
        handleClose={(name) => {
          setName(name)
          saveGameStateToLocalStorage(game.solution, guesses, name)
        }}
      />
      <WinModal
        wordOfDay={game}
        name={name}
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleShare={(usedClipboardMethod) => {
          setIsWinModalOpen(false);
          if (usedClipboardMethod) {
            setShareComplete(true);
            return setTimeout(() => {
              setShareComplete(false);
            }, 2000);
          }
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

      {/* <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button> */}
    </div>
  );
}

export default App;
