import React, { useState } from 'react';
import words from './words/data';
import Wordle from './components/Wordle';
import FrequencyList from './components/FrequencyList';
import filter from './logic/filter';
import { alphabet } from './model/constants';
import { WordleData, buildGuessRowDataFromGuess, FrequencyMap } from './model/types';
import WordList from './components/WordList';
import './App.css';


function App() {
  const [wordleData, setWordleData] = useState<WordleData>({ guessData: [] });

  const canAddGuess = wordleData.guessData.length < 6;

  const addGuess = (guess: string) => {
      setWordleData(prev => ({...prev, guessData: [...prev.guessData, buildGuessRowDataFromGuess(guess)] }));
  }

  const filteredWords = filter(words, wordleData);

  const frequencies: FrequencyMap = {};
  const positionFrequencies: FrequencyMap[] = [{},{},{},{},{}];
  alphabet.split('').forEach(l => { 
    frequencies[l] = 0;
    for (var i = 0; i < 5; ++i) {
      positionFrequencies[i][l] = 0;
    }
  });

  filteredWords.forEach(w => w.split('').forEach((l, i) => { 
    frequencies[l]++;
    positionFrequencies[i][l]++;
  }));

  const score = (w: string) => w.split('')
    .filter((l, i) => w.indexOf(l) === i)
    //.map((l, i) => frequencies[l] + positionFrequencies[i][l])
    //.map((l, i) => positionFrequencies[i][l])
    .map((l, i) => frequencies[l])
    .reduce((acc, s) => s + acc, 0);

  filteredWords.sort((a, b) => score(b) - score(a));

  return (
    <div className="App">
      <div className="column">
        <Wordle wordleData={wordleData} setWordleData={setWordleData} />
        <div className="row">
          {positionFrequencies.map((f, i) => <FrequencyList key={i} frequencies={f} />)}
        </div>
      </div>
      <FrequencyList frequencies={frequencies} />
      <WordList words={filteredWords} canAddGuess={canAddGuess} addGuess={addGuess} />
    </div>
  );
}

export default App;
