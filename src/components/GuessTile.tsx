import React from 'react';
import { GuessTileData, TileMarking } from '../model/types';

interface ITileProps {
  guessTileData: GuessTileData;
  setMarking: (updateFunc: (prev?: TileMarking) => TileMarking) => void;
}

function Tile({ guessTileData: { letter, marking }, setMarking }: ITileProps) {
  const handleClick = () => letter && setMarking(prev => prev === 'miss' ? 'hit' : prev === 'hit' ? 'close' : 'miss');
  return (
    <div className={'tile ' + (marking || 'empty')} onClick={() => handleClick()}>
      {letter}
    </div>
  );
}

export default Tile;