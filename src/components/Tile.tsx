import React from 'react';

interface ITileProps {
  letter: string;
}

function Tile({ letter }: ITileProps) {
  return (
    <div className="tile">
      {letter}
    </div>
  );
}

export default Tile;