import React, { useState } from 'react';

interface ITileProps {
  letter: string;
}

type TileState = 'miss' | 'hit' | 'close';

function Tile({ letter }: ITileProps) {
  const [state, setState] = useState<TileState>('miss');
  const handleClick = () => letter && setState(prev => prev == 'miss' ? 'hit' : prev == 'hit' ? 'close' : 'miss');
  return (
    <div className={'tile ' + (letter ? state : 'empty' )} onClick={() => handleClick()}>
      {letter}
    </div>
  );
}

export default Tile;