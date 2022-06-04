import React, { useState } from 'react';
import words from './words/data';
import Wordle from './components/Wordle';
import WordList from './components/WordList';
import './App.css';

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);

  const canAddGuess = guesses.length < 6;

  const addGuess = (guess: string) => {
      setGuesses(prev => [...prev, guess]);
  }

  const removeGuessAtIndex = (index: number) => {
      if (guesses.length <= index || index < 0) {
          throw  new Error("invalid guess index " + index);
      }
      setGuesses(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  return (
    <div className="App">
      <Wordle guesses={guesses} removeGuessAtIndex={removeGuessAtIndex} />
      <WordList words={words} canAddGuess={canAddGuess} addGuess={addGuess} />
    </div>
  );
}

export default App;
