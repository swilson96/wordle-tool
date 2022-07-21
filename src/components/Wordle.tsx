import React from 'react';
import GuessRow from './GuessRow';
import { WordleData, emptyGuessRowData, GuessRowData } from '../model/types';
import './Wordle.css';

interface IWordleProps {
  wordleData: WordleData;
  setWordleData: (updateFunc: (prev: WordleData) => WordleData) => void;
}

function Wordle({ wordleData, setWordleData }: IWordleProps) {
  const guessData = wordleData.guessData;
  const onGuessMarked = (index: number) => (updateFunc: (prev: GuessRowData) => GuessRowData) => setWordleData(prevData => {
    const newRowData = updateFunc(prevData.guessData[index]);
    return {
      ...prevData,
      guessData: [...prevData.guessData.slice(0, index), newRowData, ...prevData.guessData.slice(index + 1)]
    };
  });
  const removeGuessAtIndex = (index: number) => {
    if (wordleData.guessData.length <= index || index < 0) {
        throw  new Error("invalid guess index " + index);
    }
    setWordleData(prev => ({
      ...prev, 
      guessData: [...prev.guessData.slice(0, index), ...prev.guessData.slice(index + 1)]
    }));
}
  return (
    <div className="wordle">
      {guessData.map((g, i) => 
        <GuessRow key={i} guessRowData={g} remove={() => removeGuessAtIndex(i)} setMarking={onGuessMarked(i)} />
      )}
      {guessData.length < 6 &&
        <GuessRow guessRowData={emptyGuessRowData} remove={() => {}} setMarking={() => {}} />
      }
    </div>
  );
}

export default Wordle;