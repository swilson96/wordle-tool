import React, { useState } from 'react';
import './WordList.css';

interface IWordListProps {
    words: string[];
    canAddGuess: boolean;
    addGuess: (guess: string) => void;
}

function WordList({ words, canAddGuess, addGuess } : IWordListProps) {
  const [filter, setFilter] = useState('');
  const filtered = words.filter(w => w.startsWith(filter));
  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (filtered.length === 1 && canAddGuess) {
      addGuess(filtered[0]);
      setFilter('');
    }
  }
  return (
    <div className="WordList">
      <div className="WordListCount">{words ? words.length : 0} words available</div>
      <form className="WordListFilter" onSubmit={submit}>
        <input
          className="WordListFilterInput"
          maxLength={5}
          value={filter}
          onChange={e => setFilter(e.target.value)}
          />
      </form>
      <div className="WordListWords">
        {filtered.slice(0, 100).map(w => <div key={w} onClick={() => canAddGuess && addGuess(w)} className="WordListWordEntry">{w}</div>)}
      </div>
    </div>
  );
}

export default WordList;