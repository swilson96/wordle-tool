export type FrequencyMap = { [key: string]: number };

export type WordleData = {
  guessData: GuessRowData[];
}

export interface GuessRowData {
    guess: string;
    tilesData: GuessTileData[];
  }
  
  export const emptyGuessRowData = {
    guess: '',
    tilesData: []
  }
  
  export const buildGuessRowDataFromGuess = (guess: string): GuessRowData => ({
    guess,
    tilesData: guess.split('').map(c => ({ letter: c, marking: 'miss' }))
  });

  export interface GuessTileData {
    letter: string;
    marking?: TileMarking;
  }
  
  export const emptyGuessTileData: GuessTileData = {
    letter: ''
  };
  
  export type TileMarking = 'miss' | 'hit' | 'close';