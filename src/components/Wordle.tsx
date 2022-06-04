import React from 'react';
import useFeedback from '../hooks/useFeedback';
import Guess from './Guess';
import './Wordle.css';

interface IWordleProps {
  guesses: string[];
  removeGuessAtIndex: (index: number) => void;
}

function Wordle({ guesses, removeGuessAtIndex }: IWordleProps) {
  return (
    <div className="wordle">
      {guesses.map((g, i) => 
        <Guess key={i} word={g} remove={() => removeGuessAtIndex(i)} />
      )}
      <Guess word={''} remove={() => {}} />
    </div>
  );
}

export default Wordle;