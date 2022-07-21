import React from 'react';
import Tile from './GuessTile';
import { GuessRowData, emptyGuessTileData, TileMarking } from '../model/types';

interface IGuessProps {
  guessRowData: GuessRowData;
  remove: () => void;
  setMarking: (updateFunc: (prevValue: GuessRowData) => GuessRowData) => void;
}

function GuessRow({ guessRowData: { guess, tilesData }, setMarking, remove }: IGuessProps) {
  const onTileMarked = (index: number) => (updateFunc: (prevTileMarking?: TileMarking) => TileMarking) => setMarking(prevRowData => {
    const newMarking = updateFunc(prevRowData.tilesData[index].marking);
    const newTileData = { ...prevRowData.tilesData[index], marking: newMarking };
    return {
      ...prevRowData,
      tilesData: [...prevRowData.tilesData.slice(0, index), newTileData, ...prevRowData.tilesData.slice(index + 1)]
    };
  });
  return (
    <div className="row">
      <Tile guessTileData={tilesData.length ? tilesData[0] : emptyGuessTileData} setMarking={onTileMarked(0)} />
      <Tile guessTileData={tilesData.length ? tilesData[1] : emptyGuessTileData} setMarking={onTileMarked(1)}/>
      <Tile guessTileData={tilesData.length ? tilesData[2] : emptyGuessTileData} setMarking={onTileMarked(2)}/>
      <Tile guessTileData={tilesData.length ? tilesData[3] : emptyGuessTileData} setMarking={onTileMarked(3)}/>
      <Tile guessTileData={tilesData.length ? tilesData[4] : emptyGuessTileData} setMarking={onTileMarked(4)}/>
      <button disabled={!guess} onClick={remove}>x</button>
    </div>
  );
}

export default GuessRow;