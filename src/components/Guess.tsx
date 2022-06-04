import React from 'react';
import Tile from './Tile';

interface IGuessProps {
  word: string;
  remove: () => void;
}

function Guess({ word, remove }: IGuessProps) {
  return (
    <div className="guess">
      <Tile letter={word ? word[0] : ''}/>
      <Tile letter={word ? word[1] : ''}/>
      <Tile letter={word ? word[2] : ''}/>
      <Tile letter={word ? word[3] : ''}/>
      <Tile letter={word ? word[4] : ''}/>
      <button disabled={!word} onClick={remove}>x</button>
    </div>
  );
}

export default Guess;