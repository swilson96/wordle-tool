import React, { useState } from 'react';
import './WordList.css';

interface IWordListProps {
    words: string[];
    canAddGuess: boolean;
    addGuess: (guess: string) => void;
}

function WordList({ words, canAddGuess, addGuess } : IWordListProps) {
  const [filter, setFilter] = useState('');
  return (
    <div className="WordList">
      <div className="WordListCount">{words ? words.length : 0} words available</div>
      <div className="WordListFilter">
        <input
          className="WordListFilterInput"
          maxLength={5}
          value={filter}
          onChange={e => setFilter(e.target.value)}
          />
      </div>
      <div className="WordListWords">
        {words.filter(w => w.startsWith(filter)).slice(0, 100).map(w => <div key={w} onClick={() => canAddGuess && addGuess(w)} className="WordListWordEntry">{w}</div>)}
      </div>
    </div>
  );
}

export default WordList;